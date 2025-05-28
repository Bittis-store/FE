import type { TableProps } from 'antd';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import useTable from '~/hooks/_common/useTable';
import useGetAllReviews from '~/hooks/review/queries/useGetAllReviews';
import { IReviewItemTable } from '~/types/review';
import TableDisplay from '../../../components/_common/TableDisplay';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';

const SizeList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<IReviewItemTable>();
    const { data: reviews } = useGetAllReviews(query);

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
