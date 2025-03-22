import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Modal, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import WrapperList from '~/components/_common/wrapperList/WrapperList';
import useCancelOrder from '~/hooks/orders/Mutations/useCancelOrder';
import showMessage from '~/utils/ShowMessage';

const schemaFormCancelOrder = z.object({
    reason: z.string({ message: 'You need to tell us the reason!' }),
    description: z.string().optional(),
});

type IFormCancelOrder = z.infer<typeof schemaFormCancelOrder>;

const PopupFormCancelOrder = ({ id }: { id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const { mutateAsync, isSuccess, isPending } = useCancelOrder(id);
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<IFormCancelOrder>({
        resolver: zodResolver(schemaFormCancelOrder),
    });

    const reason = watch('reason');

    useEffect(() => {
        setVisible(reason === 'orther');
    }, [reason]);

    const onSubmit: SubmitHandler<IFormCancelOrder> = async (data) => {
        try {
            if (data.reason === 'orther') {
                const reasonCombined = data.description || '';
                await mutateAsync(reasonCombined);
            } else {
                await mutateAsync(data.reason);
            }

            showMessage('Cancel order successfully!', 'success');
            setIsModalOpen(false);
            reset();
        } catch (error) {
            showMessage('Something wrong!', 'error');
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
        reset();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        reset();
    };

    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(false);
            reset();
        }
    }, [isSuccess, reset]);

    return (
        <>
            <Button onClick={showModal} type='primary' danger>
                Hủy Đơn Hàng
            </Button>
            <Modal open={isModalOpen} footer='' onCancel={handleCancel}>
                <WrapperList classic className='m-0' title='Tại sao bạn muốn hủy đơn hàng này?'>
                    <Form
                        onFinish={handleSubmit(onSubmit)}
                        className='w-full'
                        name='layout-multiple-horizontal'
                        layout='vertical'
                    >
                        <Form.Item
                            validateStatus={errors.reason ? 'error' : ''}
                            help={errors.reason?.message}
                            label='Lí do'
                            name='horizontal'
                            required
                        >
                            <Controller
                                name='reason'
                                control={control}
                                render={({ field }) => (
                                    <Radio.Group {...field} className='flex flex-col'>
                                        <Radio value='Sản phẩm không giống như kì vọng'>
                                            Sản phẩm không giống như kì vọng
                                        </Radio>
                                        <Radio value='Không đủ tài chính để thanh toán đơn hàng'>
                                            Không đủ tài chính để thanh toán đơn hàng
                                        </Radio>
                                        <Radio value='Đổi ý không muốn mua sản phẩm này nữa'>
                                            Đổi ý không muốn mua sản phẩm này nữa
                                        </Radio>
                                        <Radio value='Không muốn tiết lộ'>Không muốn tiết lộ</Radio>
                                        <Radio value='orther'>Khác:</Radio>
                                    </Radio.Group>
                                )}
                            />
                        </Form.Item>
                        {visible && (
                            <Form.Item
                                validateStatus={errors.description ? 'error' : ''}
                                help={errors.description?.message}
                                label='Lí do khác'
                            >
                                <Controller
                                    name='description'
                                    control={control}
                                    render={({ field }) => (
                                        <TextArea {...field} rows={5} placeholder='Điền lí do khác tại đây ...' />
                                    )}
                                />
                            </Form.Item>
                        )}
                        <Flex align='end' justify='end' gap='small'>
                            <Button onClick={handleCancel} type='text'>
                                Thoát
                            </Button>
                            <Button htmlType='submit' loading={isPending} type='primary'>
                                Hủy Đơn Hàng
                            </Button>
                        </Flex>
                    </Form>
                </WrapperList>
            </Modal>
        </>
    );
};

export default PopupFormCancelOrder;
