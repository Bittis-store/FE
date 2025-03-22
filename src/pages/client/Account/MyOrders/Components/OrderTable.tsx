import { orderColumns, DataType } from './_helper';
import useGetMyOrders from '~/hooks/orders/Queries/useGetMyOrders';
import TableDisplay from '~/components/_common/TableDisplay';
import useTable from '~/hooks/_common/useTable';
import { ColumnsType } from 'antd/es/table';

const OrderTable: React.FC = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<DataType>();
    const { data } = useGetMyOrders(query);
    const myOrders = data?.data.data.orders;
    const totalDocs = data?.data.data.totalDocs;
    const columns: ColumnsType<DataType> = orderColumns({ getColumnSearchProps, query }) || [];

    return (
        <>
            <TableDisplay
                onFilter={onFilter}
                onSelectPaginateChange={onSelectPaginateChange}
                columns={columns}
                totalDocs={totalDocs}
                dataSource={myOrders}
                currentPage={Number(query.page || 1)}
            ></TableDisplay>
        </>
    );
};

export default OrderTable;
