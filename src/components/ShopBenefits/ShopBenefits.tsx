import { DeliveryIcon, HandIcon, HelpCenterIcon, PaymentIcon } from '../_common/Icons';

export default function ShopBenefits() {
    return (
        <div className='text-global flex justify-between'>
            <div className='flex items-center justify-center gap-3 text-center'>
                <DeliveryIcon   className='h-8 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-base font-semibold'>Vận chuyển miễn phí</h4>
                    <p className='mt-1 text-sm'>Cho tất cả các đơn thanh toán online</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 text-center'>
                <PaymentIcon className='h-8 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-base font-semibold'>Giao dịch bảo mật</h4>
                    <p className='mt-1 text-sm'>An toàn 100%</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 text-center'>
                <HelpCenterIcon className='h-8 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-base font-semibold'>Hỗ trợ khách hàng</h4>
                    <p className='mt-1 text-sm'>Hỗ trợ 24/7</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 text-center'>
                <HandIcon className='h-8 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-md font-semibold'>Bảo đảm chất lượng</h4>
                    <p className='mt-1 text-sm'>Đổi hàng bị lỗi</p>
                </div>
            </div>
        </div>
    );
}
