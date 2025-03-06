import { ShoppingCartOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function UserToolBar() {
    return (
        <div className='ml-12 flex items-center gap-8'>
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
        </div>
    );
}
