import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Switch, Button, Radio } from 'antd';
import WrapperPageAdmin from '~/pages/Admin/_common/WrapperPageAdmin';
import { ADMIN_ROUTES } from '~/constants/router';
import { IVoucherDTO } from '~/types/Voucher';
import WrapperCard from '~/pages/Admin/_product_/_component/WrapperCard';
import moment from 'moment';

// Update enum to match schema
enum DiscountType {
    Percentage = 'percentage',
    Fixed = 'fixed',
}

const FormVoucher = () => {
    const [form] = Form.useForm();
    const { id } = useParams<{ id: string }>();

    const [isResetCode, setIsResetCode] = useState(false);
    const [discountType, setDiscountType] = useState<DiscountType | null>(null);

    const handleUpdateAndResetCode = () => {
        setIsResetCode(true);
        form.setFieldsValue({ resetCode: true });
    };

    const handleSubmit = async (values: IVoucherDTO) => {};

    const handleDiscountTypeChange = (e: any) => {
        setDiscountType(e.target.value);
    };

    return (
        <WrapperPageAdmin
            title={id ? 'Cập nhật voucher' : 'Tạo voucher'}
            option={
                <Link to={ADMIN_ROUTES.VOUCHER} className='underline'>
                    Quay lại
                </Link>
            }
        >
            <Form form={form} onFinish={handleSubmit} layout='vertical' className='flex flex-col gap-4'>
               
                <Form.Item>
                    <div className='flex gap-2'>
                        <Button
                            // loading={isLoading && !isResetCode}
                            // disabled={isLoading}
                            type='primary'
                            htmlType='submit'
                        >
                            {id ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                        {id && (
                            <Button
                                // loading={isLoading && isResetCode}
                                // disabled={isLoading}
                                type='dashed'
                                htmlType='submit'
                                onClick={handleUpdateAndResetCode}
                            >
                                Cập nhật và reset mã voucher
                            </Button>
                        )}
                    </div>
                </Form.Item>
            </Form>
        </WrapperPageAdmin>
    );
};

export default FormVoucher;
