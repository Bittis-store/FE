import useLogout from '~/hooks/Auth/Mutation/useLogout';
import MenuItem from './MenuItem';
import { ADMIN_ROUTES, MAIN_ROUTES } from '~/constants/router';
import showMessage from '~/utils/ShowMessage';

const menus = [
    { name: 'Tài khoản', path: MAIN_ROUTES.PROFILE },
    { name: 'Đơn hàng', path: MAIN_ROUTES.MY_ORDERS },
    // { name: 'My Address', path: MAIN_ROUTES.MY_ADDRESS },
];

const MenuAccount = ({ isAdmin }: { isAdmin: boolean }) => {
    const handleLogout = useLogout();
    return (
        <div className='flex max-h-[100vh] flex-col justify-items-center'>
            <div className='m-4 flex flex-col justify-center gap-y-3'>
                {menus.map((item, i) => (
                    <MenuItem name={item.name} key={i} path={item.path} />
                ))}
                {isAdmin && <MenuItem name='Quản lý Admin' path={ADMIN_ROUTES.DASHBOARD} />}

                <button
                    onClick={() => {
                        handleLogout();
                        showMessage('Đã đăng xuất khỏi tài khoản của bạn.', 'success');
                    }}
                    className='mt-5 border p-2 transition-transform duration-200 ease-in-out hover:border-[#da291c] active:-translate-y-3'
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default MenuAccount;
