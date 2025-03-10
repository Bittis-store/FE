import { ShoppingCartOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';
import { Link } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import useLogout from '~/hooks/Auth/Mutation/useLogout';
import { useTypedSelector } from '~/store/store';

export default function UserToolBar() {
    const isAuth = useTypedSelector((state) => state.auth.authenticate);
    const handleLogout = useLogout();
    const isAdmin = useTypedSelector((state) => state.auth.user?.role === 'admin');
    const toast = useToast();

    const items: MenuProps['items'] = [
        ...(isAdmin
            ? [
                  {
                      label: (
                          <Link to={'/admin'} className='text-global'>
                              Quản trị
                          </Link>
                      ),
                      key: 'admin-dashboard',
                  },
              ]
            : []),
        {
            label: (
                <Link to={'/'} className='text-global'>
                    Thông tin
                </Link>
            ),
            key: 'profile-info',
        },
        {
            label: (
                <Link to={'/'} className='text-global'>
                    Đơn hàng
                </Link>
            ),
            key: 'orders',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <button
                    onClick={() => {
                        handleLogout();
                        toast('success', 'Đã đăng xuất khỏi tài khoản của bạn.');
                    }}
                >
                    Đăng xuất
                </button>
            ),
            key: 'logout',
        },
    ];
    return (
        <div className='ml-12 flex items-center gap-8'>
            {isAuth && (
                <>
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        placement='bottom'
                        className='cursor-pointer'
                        overlayClassName='border-[1px] w-[150px] border-global  rounded-lg'
                    >
                        <div className='flex flex-col items-center justify-center'>
                            <UserOutlined className='text-2xl' />
                            <span className='text-sm'>Tài khoản</span>
                        </div>
                    </Dropdown>

                    <span className='flex flex-col items-center justify-center'>
                        <ShoppingCartOutlined className='text-2xl' />
                        <span className='pointer-events-none text-sm'>Giỏ hàng</span>
                    </span>
                </>
            )}
            {!isAuth && (
                <>
                    <Link to={'/register'} className='flex flex-col items-center justify-center'>
                        <UserAddOutlined className='text-2xl' />
                        <span className='text-sm'>Đăng ký</span>
                    </Link>
                    <Link to={'/login'} className='flex flex-col items-center justify-center'>
                        <UserOutlined className='text-2xl' />
                        <span className='text-sm'>Đăng nhập</span>
                    </Link>
                    <span className='flex flex-col items-center justify-center'>
                        <ShoppingCartOutlined className='text-2xl' />
                        <span className='pointer-events-none text-sm'>Giỏ hàng</span>
                    </span>
                </>
            )}
        </div>
    );
}
