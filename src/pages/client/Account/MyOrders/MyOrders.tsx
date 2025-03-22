import WrapperList from '~/components/_common/wrapperList/WrapperList';
import { ConfigProvider } from 'antd';
import OrderTable from './Components/OrderTable';

const MyOrders = () => {
    return (
        <WrapperList classic title='Các đơn hàng của tôi' className='my-5'>
            {/* @Content */}
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            titleFontSize: 16,
                            inkBarColor: '#da291c',
                            itemActiveColor: '#da291c',
                        },
                    },
                }}
            >
                {/* <Tabs defaultActiveKey='1' items={items} onChange={onChange} /> */}
                <OrderTable />
            </ConfigProvider>
        </WrapperList>
    );
};

export default MyOrders;
