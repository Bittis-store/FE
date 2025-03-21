import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, TableProps, Tag, Tooltip } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Params } from '@/types/Api';
import { Currency } from '@/utils';
import { IProduct } from '@/types/ProductNew';

interface IFilter {
    text: string;
    value: string;
}

export const ProductsListColumns = ({
    categoriesFilter,
    tagsFilter,
    query,
    getColumnSearchProps,
    getFilteredValue,
    mutateHideProduct,
    mutateShowProduct,
}: {
    categoriesFilter: IFilter[];
    tagsFilter?: IFilter[];
    query: Params;
    mutateHideProduct: (id: string) => void;
    mutateShowProduct: (id: string) => void;
    getColumnSearchProps: (dataIndex: string) => ColumnType<any>;
    getFilteredValue: (key: string) => string[] | undefined;
}): TableProps<IProduct>['columns'] => {
    return [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'search',
            width: '30%',
            ...getColumnSearchProps('name'),
            render: (text, record) => (
                <>
                    <div className="flex items-center gap-2">
                        <div>
                            <h4 className="max-w-[300px] truncate font-semibold text-[16px]">
                                {text}
                            </h4>
                            <p className="text-[10px]">ID: {record._id}</p>
                        </div>
                    </div>
                    <div className="ms-7 mt-1 border-s-4 border-graydark border-opacity-10 p-5">
                        {record.variants.map((item, index) => (
                            <div
                                className="my-4 flex items-center gap-2"
                                key={index}
                            >
                                <div>
                                    <img
                                        src={item?.image}
                                        className="h-8 w-8 object-cover"
                                        alt={record.name + index}
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px]">
                                        Kích thước: {item?.size.name}
                                    </p>
                                    <p className="text-[10px]">
                                        Màu sắc: {item?.color.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            title: 'Đã bán',
            key: 'sold',
            render: (_, record) => <p className="text-center">{record.sold}</p>,
            responsive: ['md'],
        },
        {
            title: 'Giá tiền (VNĐ)',
            key: 'price',
            render: (_, record) => {
                return <>{Currency.format(record.price)}</>;
            },
        },
        {
            title: 'Kho hàng',
            key: 'stock',
            render: (_, record) => (
                <>
                    <div className="flex flex-col justify-between">
                        <p className="h-14 whitespace-nowrap">
                            Tổng:{' '}
                            {record?.variants.reduce(
                                (acc, curr) => acc + (curr?.stock || 0),
                                0,
                            ) !== 0 ? (
                                record?.variants.reduce(
                                    (acc, curr) => acc + (curr?.stock || 0),
                                    0,
                                )
                            ) : (
                                <span className="text-red-500">Hết hàng</span>
                            )}
                        </p>
                    </div>
                    <div className="">
                        {record.variants.map((item, index) => (
                            <p className="my-4 h-8" key={index}>
                                {item?.stock ? (
                                    item.stock
                                ) : (
                                    <span className="text-red-500">
                                        Hết hàng
                                    </span>
                                )}
                            </p>
                        ))}
                    </div>
                </>
            ),
        },
        {
            title: 'Thẻ hàng',
            key: 'tags',
            filters: tagsFilter,
            filteredValue: getFilteredValue('tags'),
            render: (_, record) => {
                return (
                    <h4>
                        {record.tags.map((item: any) => item.name).join(', ')}
                    </h4>
                );
            },
        },
        {
            title: 'Danh mục',
            key: 'category',
            filters: categoriesFilter,
            filteredValue: getFilteredValue('category'),
            render: (_, record) => {
                return (
                    <h4>
                        {typeof record.category === 'object'
                            ? record.category.name
                            : record.category}
                    </h4>
                );
            },
        },
        {
            title: 'Trạng thái',
            key: 'isActive',
            filteredValue: getFilteredValue('isActive'),
            filters: [
                { text: 'Ẩn', value: 'false' },
                { text: 'Hiện', value: 'true' },
            ],
            render: (_, record) => {
                return (
                    <>
                        <p className="text-red-500">
                            {!record.isActive && 'Đã ẩn'}
                        </p>
                        <p className="text-green-400">
                            {record.isActive && 'Đang hiển thị'}
                        </p>
                    </>
                );
            },
        },

        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space
                    key={record._id}
                    className="flex flex-col items-start justify-start"
                >
                    <Tooltip title="Cập nhật">
                        <Link
                            to={`/admin/products/${record._id}/edit`}
                            className="text-blue-500 transition-colors duration-500 hover:text-blue-400"
                        >
                            Cập nhật
                        </Link>
                    </Tooltip>
                    {record.isActive && (
                        <Tooltip title="Ẩn sản phẩm này">
                            <Popconfirm
                                placement="leftBottom"
                                title="Ấn sản phẩm khỏi người dùng?"
                                description="Người dùng sẽ không thể thấy sản phẩm này của bạn."
                                onConfirm={() => mutateHideProduct(record._id)}
                                okText="Đồng ý"
                                cancelText="Đóng"
                            >
                                <p className="cursor-pointer text-blue-500 transition-colors duration-500 hover:text-blue-400">
                                    Ẩn đi
                                </p>
                            </Popconfirm>
                        </Tooltip>
                    )}
                    {!record.isActive && (
                        <Tooltip title="Hiện thị sản phẩm này">
                            <Popconfirm
                                placement="leftBottom"
                                title="Hiện thị sản phẩm này?"
                                description="Người dùng sẽ thầy sản phẩm này của bạn."
                                onConfirm={() => mutateShowProduct(record._id)}
                                okText="Đồng ý"
                                cancelText="Đóng"
                            >
                                <p className="text-blue-500 transition-colors duration-500 hover:text-blue-400">
                                    Hiển thị
                                </p>
                            </Popconfirm>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];
};
