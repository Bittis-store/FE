import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link, useParams } from 'react-router-dom';
import { variationsValidator } from '~/validation/Products/validators';
import WrapperCard from './_component/WrapperCard';
import { ADMIN_ROUTES } from '~/constants/router';
import WrapperPageAdmin from '~/pages/Admin/_common/WrapperPageAdmin';
import VariationItem from '~/pages/Admin/_product_/_component/VariationItem';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import useGetTags from '~/hooks/Tags/Queries/useGetTags';
import useGetColors from '~/hooks/Colors/Queries/useGetColors';
import useGetSizes from '~/hooks/Sizes/Queries/useGetSizes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import convertApiResponseToFileList from '~/pages/Admin/_product_/Helper/convertImageUrlToFileList';
import useUpdateProduct from '~/hooks/Products/Mutations/useUpdateProduct';
import { handleEditProduct } from '~/pages/Admin/_product_/Helper/handleEditProduct';
import showMessage from '~/utils/ShowMessage';
import { useGetDetailProductForAdmin } from '~/hooks/Products/Queries/useGetDetailProductForAdmin';

interface ProductFormValues {
    name: string;
    price: number;
    discount?: number;
    category: string;
    tags: string[];
    description: string;
    variants: ProductVariant[];
    isActive: boolean;
}

interface ProductVariant {
    size: string;
    color: string;
    quantity: number;
    image?: string;
    imageUrlRef?: string;
    thumbnail?: UploadFile[];
    [key: string]: any;
}

const UpdateProduct = () => {
    const [form] = Form.useForm<ProductFormValues>();
    const { id } = useParams();
    const [variantFile, setVariantFile] = useState<UploadFile[][]>([]);

    // Queries
    const { data: categories } = useGetCategories({ limit: '100000' });
    const { data: tags } = useGetTags({ limit: '100000' });
    const { data: sizes } = useGetSizes({ limit: '100000' });
    const { data: colors } = useGetColors({ limit: '100000' });
    const { mutate: updateProduct, isPending } = useUpdateProduct();
    const { data: targetProduct } = useGetDetailProductForAdmin(id as string);

    const onFinish = useCallback(
        (values: ProductFormValues) => {
            const transformedValues = {
                ...values,
                variants: values.variants.map((variant) => ({
                    ...variant,
                    stock: variant.quantity,
                    imageUrlRef: variant.imageUrlRef || '',
                })),
            };
            handleEditProduct(transformedValues, id as string, updateProduct);
        },
        [id, updateProduct]
    );

    const handleChangeAttributeThumbnail = useCallback((index: number): UploadProps['onChange'] => {
        return ({ fileList }) => {
            setVariantFile((prev) => {
                const newFiles = [...prev];
                newFiles[index] = fileList;
                return newFiles;
            });
        };
    }, []);

    const handleRemoveAttributeThumbnail = useCallback((index: number) => {
        setVariantFile((prev) => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            return newFiles;
        });
    }, []);

    useEffect(() => {
        if (!targetProduct || !colors?.data.colors || !sizes?.data.sizes) return;

        const { variants, ...rest } = targetProduct;
        const newVariantFile: UploadFile[][] = [];

        const variaConverts = variants.map((varia, i) => {
            const image = convertApiResponseToFileList({
                url: varia?.image!,
                urlRef: varia?.imageUrlRef,
                isArr: true,
            }) as UploadFile[];

            newVariantFile[i] = image;

            return {
                ...varia,
                size: varia?.size._id,
                color: varia?.color._id,
                thumbnail: image,
            };
        });

        setVariantFile(newVariantFile);

        // Transform category object to string ID if needed
        const formattedRest = {
            ...rest,
            category: typeof rest.category === 'object' && rest.category !== null ? rest.category._id : rest.category,
        };

        form.setFieldsValue({ ...formattedRest, variants: variaConverts });
    }, [targetProduct, colors, sizes, form]);

    const categoryOptions = useMemo(
        () =>
            categories?.data?.categories?.map((item: any) => ({
                label: item.name,
                value: item._id,
            })),
        [categories]
    );

    const tagOptions = useMemo(
        () =>
            tags?.data?.tags?.map((tag: any) => ({
                label: tag.name,
                value: tag._id,
            })),
        [tags]
    );

    return (
        <WrapperPageAdmin
            title='Cập nhật mới sản phẩm'
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS} className='underline'>
                    Quay lại
                </Link>
            }
        >
            <Form layout='vertical' form={form} onFinish={onFinish}>
                <div className='grid grid-cols-1 gap-4'>
                    <WrapperCard title='Thông tin cơ bản'>
                        <Form.Item
                            label='Tên sản phẩm'
                            name='name'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                                { min: 3, message: 'Tên sản phẩm phải có ít nhất 3 ký tự!' },
                                { max: 50, message: 'Tên sản phẩm không được vượt quá 50 ký tự!' },
                            ]}
                        >
                            <Input placeholder='Nhập tên sản phẩm...' size='large' />
                        </Form.Item>
                        <Form.Item
                            className='flex font-medium text-[#08090F] capitalize'
                            name='price'
                            required
                            label='giá tiền (VNĐ)'
                            rules={[{ required: true, message: 'Vui lòng nhập giá của sản phẩm!' }]}
                        >
                            <InputNumber<number>
                                min={10000}
                                placeholder='Nhập giá tiền của sản phẩm...'
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/VNĐ\s?|(,*)/g, '') as unknown as number}
                                size='large'
                                className='w-full'
                            />
                        </Form.Item>
                        <Form.Item
                            className='flex font-medium text-[#08090F] capitalize'
                            name='discount'
                            label='Giảm giá (%)'
                            rules={[
                                { type: 'number', min: 0, max: 99, message: 'Giảm giá phải lớn hơn 0 và nhỏ hơn 99!' },
                            ]}
                        >
                            <InputNumber<number>
                                placeholder='Nhập giá phần trăm giảm giá...'
                                size='large'
                                className='w-full'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Danh mục'
                            name='category'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[{ required: true, message: 'Vui lòng chọn danh mục cho sản phẩm' }]}
                        >
                            <Select
                                size='large'
                                placeholder='Chọn danh mục cho sản phẩm...'
                                className='w-full'
                                options={categoryOptions}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Thẻ phân loại'
                            name='tags'
                            required
                            className='font-medium text-[#08090F]'
                            rules={[{ required: true, message: 'Vui lòng chọn thẻ phân loại cho sản phẩm' }]}
                        >
                            <Select
                                size='large'
                                mode='multiple'
                                allowClear
                                className='w-full normal-case'
                                placeholder='Chọn các thẻ phân loại cho sản phẩm...'
                                options={tagOptions}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Mô tả'
                            name='description'
                            className='font-medium text-[#08090F]'
                            rules={[{ required: true, message: 'Vui lòng viết mô tả cho sản phẩm' }]}
                        >
                            <TextArea placeholder='Nhập mô tả sản phẩm...' rows={4} className='w-full' />
                        </Form.Item>
                    </WrapperCard>
                    <WrapperCard title='Thông tin bán hàng'>
                        <Form.List name='variants' rules={[{ validator: variationsValidator }]}>
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }, index) => (
                                        <VariationItem
                                            key={key}
                                            colors={colors?.data.colors || []}
                                            variantFile={variantFile}
                                            handleChangeThumbnail={handleChangeAttributeThumbnail}
                                            handleRemoveThumbnail={handleRemoveAttributeThumbnail}
                                            sizes={sizes?.data.sizes || []}
                                            index={index}
                                            fieldName={name}
                                            restField={restField}
                                            removeVariation={remove}
                                        />
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type='dashed'
                                            htmlType='button'
                                            onClick={() =>
                                                fields.length >= 15
                                                    ? showMessage('Bạn chỉ có thể thêm tối đa 15 biến thể !', 'warning')
                                                    : add()
                                            }
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Thêm biến thể
                                        </Button>
                                    </Form.Item>
                                    {errors && <Form.ErrorList errors={errors} className='text-red-600' />}
                                </>
                            )}
                        </Form.List>
                    </WrapperCard>
                </div>
                <Form.Item>
                    <div className='border-opacity-5 sticky right-0 bottom-0 my-2 flex justify-end rounded-md border-t-2 border-black bg-white p-4'>
                        <Button
                            type='default'
                            htmlType='submit'
                            className='mr-3 px-5'
                            loading={isPending}
                            disabled={isPending}
                            size='large'
                        >
                            Cập nhật
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </WrapperPageAdmin>
    );
};

export default UpdateProduct;
