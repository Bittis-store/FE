import { EditOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Popconfirm, Rate, Space, Tag, Tooltip } from 'antd';
import useTable from '~/hooks/_common/useTable';
import useActiveReview from '~/hooks/review/mutations/useActiveReview';
import useHiddenReview from '~/hooks/review/mutations/useHiddenReview';
import useGetAllReviews from '~/hooks/review/queries/useGetAllReviews';
import { IReviewItemTable } from '~/types/review';
import TableDisplay from '../../../components/_common/TableDisplay';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { Link } from 'react-router-dom';

const SizeList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<IReviewItemTable>();
    const { data: reviews } = useGetAllReviews(query);
    const { mutate: hiddenReview } = useHiddenReview();
    const { mutate: activeReview } = useActiveReview();

    const reviewList = reviews?.data?.data.map((review) => {
        return {
            userName: review.userId?.name,
            userId: review.userId?._id,
            content: review.content,
            rating: review.rating,
            _id: review._id,
            productId: review.productId,
            isHided: review.isHided,
        };
    });

    const totalDocs = reviews?.totalDocs;
    const currentPage = Number(query.page || 1);

    const columns: TableProps<IReviewItemTable>['columns'] = [
        {
            title: 'Người đánh giá',
            dataIndex: 'userName',
            key: 'search',
            render: (_, record) => {
                return <h4>{record.userName}</h4>;
            },
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'content',
            key: 'content',
            render: (_, record) => {
                console.log(record);
                return (
                    <div>
                        <Link to={`/products/${record.productId._id}`}>{record.productId.name}</Link>
                    </div>
                );
            },

            width: '200px',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            render: (content) => <p>{content}</p>,
        },
        {
            title: 'Số sao',
            dataIndex: 'rating',
            key: 'rating',
            render: (rate) => <Rate disabled defaultValue={rate}></Rate>,
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isHided',
            key: 'isHided',
            render: (isHided) => <Tag color={`${isHided ? 'red' : 'green'}`}>{isHided ? 'Đã ẩn' : 'Hiển thị'}</Tag>,
        },

        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'} className='cursor-pointer'>
                    {!record.isHided && (
                        <Popconfirm
                            title=''
                            description='Bạn muốn ẩn đánh giá này?'
                            onConfirm={() => hiddenReview(record._id)}
                            okText='Đồng ý'
                            cancelText='Hủy'
                            placement='leftTop'
                        >
                            <Tooltip title='Ẩn đánh giá'>
                                <div className='text-blue-500'>
                                    <EditOutlined
                                        className='rounded-full bg-blue-100 p-2'
                                        style={{ fontSize: '1rem' }}
                                    />
                                </div>
                            </Tooltip>
                        </Popconfirm>
                    )}
                    {record.isHided && (
                        <Popconfirm
                            title=''
                            description='Bạn muốn hiển thị đánh giá này?'
                            onConfirm={() => activeReview(record._id)}
                            okText='Đồng ý'
                            cancelText='Hủy'
                            placement='leftTop'
                        >
                            <Tooltip title='Hiển thị đánh giá'>
                                <div className='text-blue-500'>
                                    <EditOutlined
                                        className='rounded-full bg-blue-100 p-2'
                                        style={{ fontSize: '1rem' }}
                                    />
                                </div>
                            </Tooltip>
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin title='Quản lý đánh giá'>
            <TableDisplay<IReviewItemTable>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={reviewList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default SizeList;
