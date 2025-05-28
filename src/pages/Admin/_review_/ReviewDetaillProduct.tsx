import { Rate, TableProps } from 'antd';
import { Link, useParams } from 'react-router';
import useTable from '~/hooks/_common/useTable';
import { IReviewItemTable } from '~/types/review';
import TableDisplay from '~/components/_common/TableDisplay';
import useGetAllReviewsProduct from '~/hooks/review/queries/useGetAllReviewsProduct';
import { formatDate } from '~/utils/formatDate';
import { useGetDetailProductForAdmin } from '~/hooks/Products/Queries/useGetDetailProductForAdmin';

export default function ReviewDetaillProduct() {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<IReviewItemTable>();
    const { id } = useParams();
    console.log(id);
    const { data: reviews } = useGetAllReviewsProduct(id as string, query);
    const { data: product } = useGetDetailProductForAdmin(id as string);
    const totalDocs = reviews?.totalDocs;
    const currentPage = Number(query.page || 1);
    const reviewList = reviews?.data?.data.map((review) => {
        return {
            userName: review.userId?.name,
            userId: review.userId?._id,
            content: review.content,
            rating: review.rating,
            _id: review._id,
            productId: review.productId,
            isHided: review.isHided,
            createdAt: review.createdAt,
        };
    });
    console.log(reviewList);
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
            title: 'Thời gian',
            dataIndex: 'rating',
            key: 'rating',
            render: (_, record) => <span>{formatDate(record.createdAt!)}</span>,
        },
    ];
    return (
        <div>
            <div className='my-4 flex justify-between px-2'>
                <div>
                    <h3 className='text-lg font-medium'>Đánh giá của {product?.name}</h3>
                    <Link to={'/admin/reviews'} className='text-sm text-cyan-500 duration-300 hover:opacity-60'>
                        Xem những đánh giá khác
                    </Link>
                </div>
                <div className='flex flex-col gap-2'>
                    <Link to={'/admin/products'} className='text-sm underline'>
                        &lt; Quay trở về danh sách sản phẩm
                    </Link>
                </div>
            </div>
            <TableDisplay<IReviewItemTable>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={reviewList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </div>
    );
}
