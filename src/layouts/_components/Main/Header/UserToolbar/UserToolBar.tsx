import { HeartOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import CartDrawer from '~/components/CartDrawer';
import { MAIN_ROUTES } from '~/constants/router';
import useLogout from '~/hooks/Auth/Mutation/useLogout';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import useGetAllWishlist from '~/hooks/wishlist/Queries/useGetAllWishlist';
import { RootState, useTypedSelector } from '~/store/store';
import showMessage from '~/utils/ShowMessage';

export default function UserToolBar() {
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuth = useTypedSelector((state) => state.auth.authenticate);
    const handleLogout = useLogout();
    const { data: wishListData } = useGetAllWishlist({ userId: user?._id });
    const wishListAllItems = wishListData?.data?.wishList?.length;
    const { data, isFetching } = useGetMyCart();
    const isAdmin = useTypedSelector((state) => state.auth.user?.role === 'admin');
    const location = useLocation();
    const locationPathDisableCart = [MAIN_ROUTES.CART];
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
                <Link to={MAIN_ROUTES.PROFILE} className='text-global'>
                    Thông tin
                </Link>
            ),
            key: 'profile-info',
        },

        {
            type: 'divider',
        },
        {
            label: (
                <button
                    onClick={() => {
                        handleLogout();
                        showMessage('Đã đăng xuất khỏi tài khoản của bạn.', 'success');
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
                    <Link to={MAIN_ROUTES.WISH_LIST} className='flex flex-col items-center justify-center'>
                        <Badge count={wishListAllItems} overflowCount={10}>
                            <HeartOutlined className='text-2xl' />
                        </Badge>
                        <span className='text-sm'>Yêu thích</span>
                    </Link>
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

                    {!locationPathDisableCart.includes(location.pathname) ? (
                        <CartDrawer data={data} isFetching={isFetching}>
                            <span className='flex flex-col items-center justify-center'>
                                <Badge count={data ? data.items.length : 0} overflowCount={10}>
                                    <ShoppingCartOutlined className='text-2xl' />
                                </Badge>
                                <span className='text-sm'>Giỏ hàng</span>
                            </span>
                        </CartDrawer>
                    ) : (
                        <span className='flex flex-col items-center justify-center'>
                            <Badge count={data ? data.items.length : 0} overflowCount={10}>
                                <ShoppingCartOutlined className='text-2xl' />
                            </Badge>
                            <span className='text-sm'>Giỏ hàng</span>
                        </span>
                    )}
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
