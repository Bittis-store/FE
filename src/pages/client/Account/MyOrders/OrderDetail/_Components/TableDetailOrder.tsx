import { Button, Flex, Table, Tooltip } from 'antd';
import { TableProps } from 'antd/lib';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
// import { useGetVariantDetail } from '~/hooks/products/Queries/useGetVariantDetail';
// import RateBtn from '~/pages/Clients/Account/MyOrders/Components/RateBtn';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { Currency } from '~/utils';

interface DataType {
    key: number;
    image: string;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    productId: string;
    total?: number;
    isReviewed: boolean;
    variant: {
        variantAttributes: { name: string; key: string; value: string }[];
    };
}

interface Props {
    orderItems: DataType[];
    status: string;
}

const TableDetailOrder = ({ orderItems, status }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const handleRateProduct = (productId: string, orderId: string) => {
        dispatch(setReviewData({ orderId, isOpen: false }));
        navigate(`${MAIN_ROUTES.PRODUCTS}/${productId}`);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (key) => <p>{key + 1}</p>,
        },
        {
            title: 'Ảnh Sản Phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt='product' className='h-20 w-20 object-cover' />,
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (
                    <>
                        <Flex justify='center' align='center'>
                            <Tooltip title='Xem chi tiết sản phẩm'>
                                <Link to={`/products/${record.productId}`}>
                                    <h3>{record.name}</h3>
                                </Link>
                            </Tooltip>
                        </Flex>
                    </>
                );
            },
        },
        {
            title: 'Màu',
            dataIndex: 'color',
            key: 'color',
            render: (color) => <p>{color}</p>,
        },
        {
            title: 'Kích cỡ',
            dataIndex: 'size',
            key: 'size',
            render: (size) => <p>{size}</p>,
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <p>{Currency.format(price)}</p>,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => <p>{quantity}</p>,
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => <p>{Currency.format(record.price * record.quantity)}</p>,
        },
        ...(status === 'done'
            ? [
                  {
                      title: 'Đánh giá',
                      key: 'action',
                      render: (_: number, record: DataType) => {
                          console.log(record);
                          return (
                              <>
                                  {/* {!record.isReviewed && (
                                      <RateBtn
                                          handleRate={handleRateProduct}
                                          productId={record.productId}
                                          orderId={id!}
                                      />
                                  )} */}
                                  {record.isReviewed && (
                                      <Button type='default' disabled>
                                          Đã đánh giá
                                      </Button>
                                  )}
                              </>
                          );
                      },
                  },
              ]
            : []),
    ];

    const data: DataType[] = orderItems.map((item, index) => ({
        key: index,
        image: item.image,
        name: item.name,
        color: item.color,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
        isReviewed: item.isReviewed,
        variant: item.variant,
    }));

    return <Table className='mt-5 w-full' columns={columns} dataSource={data} pagination={false} />;
};

export default TableDetailOrder;
