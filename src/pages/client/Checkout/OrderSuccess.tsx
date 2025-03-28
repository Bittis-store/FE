import { MAIN_ROUTES } from '~/constants/router';
import UseVNPayReturn from '~/hooks/orders/Queries/useVnPayReturn';
import { Button, Result, Watermark } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const isSuccess = params.get('vnp_ResponseCode') == '00';
    UseVNPayReturn(params);
    if (!isSuccess) {
        navigate(MAIN_ROUTES.ERROR_ORDER);
        return null;
    }
    return (
        <Watermark content={['BITTIS-STORE', 'Thank you!']}>
            <div className='h-[100vh]' />
            <Result
                status='success'
                title='Đơn đặt hàng của bạn đã gửi thành công!'
                subTitle='Bạn sẽ nhận được thông báo xác nhận qua email của chúng tôi.'
                className='bg-gray-3 bg-opacity-65 fixed top-[50%] left-[50%] z-99999 -translate-x-[50%] -translate-y-[50%] rounded-md border border-transparent p-10'
                extra={[
                    // <Button
                    //     onClick={() => {
                    //         navigate(MAIN_ROUTES.MY_ORDERS, { replace: true });
                    //     }}
                    //     type='primary'
                    //     key='home'
                    // >
                    //     Kiểm tra trạng thái
                    // </Button>,
                    <Button
                        key='my-order'
                        onClick={() => {
                            navigate('/', { replace: true });
                        }}
                    >
                        Trang chủ
                    </Button>,
                ]}
            />
        </Watermark>
    );
}
