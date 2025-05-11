/* eslint-disable no-nested-ternary */
import { ADMIN_ROUTES } from '~/constants/router';
import useTable from '~/hooks/_common/useTable';
import useGetTags from '~/hooks/Tags/Queries/useGetTags';
import { ITag } from '~/types/Tag';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import TableDisplay from '../../../components/_common/TableDisplay';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';

const TagList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<ITag>();
    const { data: tags } = useGetTags(query);
    const tagList = tags?.data.tags;
    const totalDocs = tags?.data.totalDocs;
    const currentPage = Number(query.page || 1);

    // Memoize columns to prevent recreation on each render
    const columns: TableProps<ITag>['columns'] = useMemo(() => [
        {
            title: 'Tên thẻ',
            dataIndex: 'name',
            key: 'search',
            render: (text) => <h4>{text}</h4>,
            ...getColumnSearchProps('name'),
            width: '20%',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật thẻ'></Tooltip>
                        <Link to={`${ADMIN_ROUTES.TAGS_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ], [getColumnSearchProps]);

    // Memoize option button
    const addButton = useMemo(() => (
        <Link to={ADMIN_ROUTES.TAGS_CREATE}>
            <Button icon={<PlusOutlined />} type='primary'>
                Thêm mới thẻ
            </Button>
        </Link>
    ), []);

    return (
        <WrapperPageAdmin
            title='Quản lý thẻ'
            option={addButton}
        >
            <TableDisplay<ITag>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={tagList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default TagList;
