import { SearchOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserToolBar from './UserToolbar/UserToolBar';
import { Form, Input } from 'antd';
import useFilter from '~/hooks/common/useFilter';
import { PRODUCT_ENDPOINT } from '~/constants/endPoint';
export default function Header() {
    const location = useLocation();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { updateQueryParam } = useFilter();
    const onFinish = (values: { search: string }) => {
        console.log('Search values:', values);
        if (location.pathname !== PRODUCT_ENDPOINT.PRODUCT) {
            navigate(`${PRODUCT_ENDPOINT.PRODUCT}?search=${values.search}`);

        } else {
            updateQueryParam({ search: values.search });
        }
    };

    return (
        <>
            <div className='mx-auto flex h-[40px] items-center justify-center bg-[#303030]'>
                <p className='text-sm font-medium text-white uppercase'>
                    ĐỔI HÀNG MIỄN PHÍ - Tại tất cả cửa hàng trong 30 ngày
                </p>
            </div>
            <div className='sticky top-0 z-[51] bg-white'>
                <div className='max-w-layout layout:mx-auto mx-4'>
                    <header>
                        <div className='flex w-full items-center justify-between'>
                            <div className='flex items-center gap-10'>
                                <Link
                                    to={'/'}
                                    className='text-[4rem] font-extrabold uppercase duration-300 hover:text-orange-500'
                                >
                                    BITTIS
                                </Link>
                                <div>
                                    <ul className='flex'>
                                        <li>
                                            <Link
                                                to={'/'}
                                                className='text-base font-bold uppercase duration-300 hover:text-orange-500'
                                            >
                                                Trang chủ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={'/products'}
                                                className={`ml-8 text-base font-bold uppercase duration-300 hover:text-orange-500`}
                                            >
                                                Sản phẩm
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={'/products'}
                                                className={`ml-8 text-base font-bold uppercase duration-300 hover:text-orange-500`}
                                            >
                                                Giới thiệu
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Form
                                    form={form}
                                    onFinish={onFinish}
                                    layout='inline'
                                    className='rounded-full border-[1px] border-[#7777] px-4 py-2'
                                >
                                    <Form.Item name='search'>
                                        <Input
                                            prefix={<SearchOutlined className='text-xl' />}
                                            placeholder='Tìm kiếm...'
                                            className='text-sm'
                                            bordered={false}
                                        />
                                    </Form.Item>
                                </Form>
                                <UserToolBar />
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
}
