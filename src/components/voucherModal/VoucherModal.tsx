import { CheckOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useVoucherUser } from '~/hooks/voucher/useGetVoucherUser';
import { changeVoucher } from '~/store/slice/orderSlice';
import { useTypedSelector } from '~/store/store';
import { IVoucher } from '~/types/Voucher';
import { Currency } from '~/utils';

export default function VoucherModal({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState(false);
    const { data: voucherData, isPending: voucherPending } = useVoucherUser();
    const dispatch = useDispatch();
    const totalPrice = useTypedSelector((state) => state.order.totalPrice);
    const selectedVoucher = useTypedSelector((state) => state.order.voucher);
    const handleChangeVoucher = (item: IVoucher) => {
        dispatch(changeVoucher(item));
        setOpen(false);
    };
    // const totalPrice = useTypedSelector(state=> state.order)
    return (
        <>
            <div onClick={() => setOpen(true)}>{children}</div>
            <Modal
                title='Mã giảm giá'
                centered
                open={isOpen}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={'70vw'}
                footer={
                    <div>
                        <button
                            onClick={() => setOpen(false)}
                            className='cursor-pointer rounded-md border border-red-400 px-4 py-2 text-red-400 duration-300 hover:bg-red-400 hover:text-white'
                        >
                            Hủy bỏ
                        </button>
                    </div>
                }
            >
                <div className='min-h-[50vh]'>
                    {voucherPending ? (
                        <div className='flex w-full items-center justify-center py-8'>
                            <Spin />
                        </div>
                    ) : voucherData?.length === 0 ? (
                        <div className='flex h-[50vh] items-center justify-center'>
                            <h3 className='text-lg font-medium'>Không có mã giảm giá nào</h3>
                        </div>
                    ) : (
                        <div className='mt-4 grid grid-cols-3 justify-center gap-5'>
                            {voucherData &&
                                voucherData
                                    .sort((a, b) => {
                                        const aEligible = totalPrice >= a.minimumOrderPrice ? 1 : 0;
                                        const bEligible = totalPrice >= b.minimumOrderPrice ? 1 : 0;
                                        const aRemainingUsage = a.usagePerUser - (a.usedCount || 0);
                                        const bRemainingUsage = b.usagePerUser - (b.usedCount || 0);
                                        const aIsExhausted = aRemainingUsage <= 0 ? 1 : 0;
                                        const bIsExhausted = bRemainingUsage <= 0 ? 1 : 0;
                                        return (
                                            aIsExhausted - bIsExhausted ||
                                            bEligible - aEligible ||
                                            bRemainingUsage - aRemainingUsage
                                        );
                                    })
                                    .map((item, index) => (
                                        <div
                                            onClick={() => {
                                                if (
                                                    totalPrice >= item.minimumOrderPrice && 
                                                    item.usagePerUser !== item.usedCount && item.remainingQuantity !== 0
                                                ) {
                                                    handleChangeVoucher(item);
                                                }
                                            }}
                                            key={index}
                                            className={`relative flex w-full overflow-hidden ${
                                                totalPrice < item.minimumOrderPrice ||
                                                item.usagePerUser === item.usedCount || !item.remainingQuantity
                                                    ? 'cursor-not-allowed border-[#737373]'
                                                    : 'cursor-pointer border-black'
                                            } items-center gap-5 rounded-md border bg-gray-50 px-4 py-4`}
                                        >
                                            {selectedVoucher === item && (
                                                <div className='absolute top-0 right-0 rounded-bl-sm bg-green-500 px-2 py-1'>
                                                    <CheckOutlined />
                                                </div>
                                            )}
                                            <div className='flex flex-col items-center select-none'>
                                                <img
                                                    src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png'
                                                    className={`${
                                                        (totalPrice < item.minimumOrderPrice ||
                                                            item.usagePerUser === item.usedCount) || !item.remainingQuantity &&
                                                        'opacity-50'
                                                    } w-8`}
                                                    alt=''
                                                />
                                                <span
                                                    className={`${
                                                        totalPrice < item.minimumOrderPrice ||
                                                        item.usagePerUser === item.usedCount || !item.remainingQuantity
                                                            ? 'rounded-md bg-black/45 px-1.5 text-white'
                                                            : 'rounded-md bg-red-500 px-1.5 text-white'
                                                    }`}
                                                >
                                                    X {item.remainingQuantity}
                                                </span>
                                            </div>
                                            <div
                                                className={`${
                                                    (totalPrice < item.minimumOrderPrice ||
                                                        item.usagePerUser === item.usedCount) || !item.remainingQuantity &&
                                                    'text-[#737373]'
                                                }`}
                                            >
                                                <h3 className='text-lg font-semibold'>{item.name.toUpperCase()}</h3>
                                                <div className='select-none'>
                                                    {totalPrice < item.minimumOrderPrice ||
                                                    item.usagePerUser === item.usedCount  ? (
                                                        <>
                                                            {item.usagePerUser === item.usedCount ? (
                                                                <>
                                                                    <p className='text-xs'>
                                                                        Bạn đã hết lượt sử dụng mã này
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className='text-xs'>
                                                                        Chưa đạt giá tiền tối thiểu
                                                                    </p>
                                                                    <p className='text-xs'>
                                                                        Yêu cầu:{' '}
                                                                        {Currency.format(item.minimumOrderPrice)}
                                                                    </p>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className='text-xs'>Mã Giảm: {item.code} </p>
                                                            <p className='text-xs'>
                                                                Giảm{' '}
                                                                {item.discountType === 'percentage'
                                                                    ? `${item.voucherDiscount}% Tối đa ${Currency.format(item.maxDiscountAmount)}`
                                                                    : `${Currency.format(item.voucherDiscount)} trên giá trị đơn hàng`}{' '}
                                                            </p>
                                                            <p className='text-xs'>
                                                                Đơn tối thiểu: {Currency.format(item.minimumOrderPrice)}
                                                            </p>
                                                            <p className='text-xs'>
                                                                Số lượt sử dụng còn lại:{' '}
                                                                {item.usedCount && item.usedCount !== 0
                                                                    ? item.usagePerUser - item.usedCount
                                                                    : item.usagePerUser}
                                                            </p>
                                                        </>
                                                    )}
                                                    {item.usedCount !== item.usagePerUser && (
                                                        <p className='text-xs'>
                                                            Hạn sử dụng:{' '}
                                                            {dayjs(item.endDate).diff(dayjs(), 'day') > 0
                                                                ? `${dayjs(item.endDate).diff(dayjs(), 'day')} ngày`
                                                                : `${dayjs(item.endDate).diff(dayjs(), 'hour')} giờ`}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
