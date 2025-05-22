import { Button, Flex, Table, Tooltip } from 'antd';
import { TableProps } from 'antd/lib';
import { Link } from 'react-router-dom';
// import { useGetVariantDetail } from '~/hooks/products/Queries/useGetVariantDetail';
// import RateBtn from '~/pages/Clients/Account/MyOrders/Components/RateBtn';
import { Currency } from '~/utils';
import RateBtn from '../../Components/RateBtn';

interface DataType {
    key: string | number;
    image: string;
    name: string;
    color: string[] | string;
    size: string[] | string;
    price: number;
    quantity: number;
    productId: string;
    total?: number;
    isReviewed: boolean;
}

interface Props {
    orderItems: DataType[];
    status: string;
    showModal: (productId: string) => void;
}

const TableDetailOrder = ({ orderItems, status, showModal }: Props) => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (_, __, index) => <p>{index + 1}</p>,
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
            render: (color) => <p>{typeof color === 'object' ? color.join(', ') : color}</p>,
            minWidth: 100,
        },
        {
            title: 'Kích cỡ',
            dataIndex: 'size',
            key: 'size',
            render: (size) => <p>{typeof size === 'object' ? size.join(', ') : size}</p>,
            minWidth: 100,
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
                          return (
                              <>
                                  {!record.isReviewed && (
                                      <RateBtn openReviewModal={showModal} productId={record.productId} />
                                  )}
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

    const data = orderItems.reduce((prev: DataType[], curr, index) => {
        if (prev.some((item: DataType) => item.productId === curr.productId)) {
            const mergeVariant = prev.map((variant) => {
                if (variant.productId === curr.productId) {
                    return {
                        key: curr.productId,
                        image: curr.image,
                        name: curr.name,
                        color: [...prev.map((pevVariant) => pevVariant.color), curr.color],
                        size: [...prev.map((pevVariant) => pevVariant.size), curr.size],
                        price: curr.price,
                        quantity: variant.quantity + curr.quantity,
                        productId: curr.productId,
                        isReviewed: curr.isReviewed,
                    };
                }

                return variant;
            });

            return mergeVariant as DataType[];
        }
        return [
            ...prev,
            {
                key: curr.productId,
                image: curr.image,
                name: curr.name,
                color: curr.color,
                size: curr.size,
                price: curr.price,
                quantity: curr.quantity,
                productId: curr.productId,
                isReviewed: curr.isReviewed,
            },
        ];
    }, []);
    // console.log(data)
    return (
        <>
            <Table className='mt-5 w-full' rowKey='productId' columns={columns} dataSource={data} pagination={false} />
        </>
    );
};

export default TableDetailOrder;
