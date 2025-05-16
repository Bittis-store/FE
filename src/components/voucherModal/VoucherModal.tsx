import { Modal } from 'antd';
import { ReactNode, useState } from 'react';

export default function VoucherModal({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <div onClick={() => setOpen(true)}>{children}</div>
            <Modal
                title='Voucher'
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
                <div className='min-h-[50vh]'></div>
            </Modal>
        </>
    );
}
