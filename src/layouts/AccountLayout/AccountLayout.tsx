import { Outlet, useLocation, useParams } from 'react-router-dom';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { Col, Row } from 'antd';
import AccountSidebarLeft from '~/layouts/_components/AccountSidebarLeft';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';

const AccountLayout = () => {
    useDocumentTitle('Account');
    const { id } = useParams();
    const location = useLocation();
    const isOrderDetailPage = location.pathname === `/my-orders/${id}`;
    return (
        <>
            {isOrderDetailPage && <BreadcrumbDisplay titleProduct='Chi Tiết Đơn Hàng' />}
            <Row justify='space-between'>
                <Col span={6} className='hidden md:block'>
                    <AccountSidebarLeft />
                </Col>
                <Col span={17}>
                    <Outlet />
                </Col>
            </Row>
        </>
    );
};

export default AccountLayout;
