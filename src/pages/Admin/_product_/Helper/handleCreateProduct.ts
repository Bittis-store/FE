import { IProductForm } from '~/types/Product';
import { v4 as uuidv4 } from 'uuid';

const renameFile = (file: File, uuidString: string, fileName: string): File => {
    const extension = fileName.split('.').pop() || '';
    return new File([file], `${uuidString}_____${fileName}_____.${extension}`, {
        type: file.type,
        lastModified: file.lastModified,
    });
};

export const handleCreateProduct = (data: IProductForm, createProduct: (product: FormData) => void) => {
    const formData = new FormData();
    const { name, description, variants, price, discount, tags, category, isActive } = data;
    const newVariants = [];

    if (variants) {
        Object.values(variants).forEach((value) => {
            const thumbnail = value?.thumbnail?.fileList?.[0];
            const originFileObj = thumbnail?.originFileObj;

            if (originFileObj) {
                const uuidString = uuidv4();
                const fileName = thumbnail.name;

                formData.append('variantImages', renameFile(originFileObj, uuidString, fileName));

                newVariants.push({
                    imageUrlRef: `${uuidString}_____${fileName}_____.${fileName.split('.').pop() || ''}`,
                    size: value.size,
                    color: value.color,
                    stock: value.stock,
                });
            }
        });
    }

    formData.append('name', name);
    formData.append('isActive', String(Boolean(isActive)));
    formData.append('category', category);
    formData.append('price', String(price));
    formData.append('discount', discount ? String(discount) : '0');
    formData.append('tags', tags?.join(',') || '');
    formData.append('variantString', JSON.stringify(newVariants));
    formData.append('description', description || '');

    createProduct(formData);
};
