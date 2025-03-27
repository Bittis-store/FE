import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UserToolBar from './UserToolbar/UserToolBar';
export default function Header() {
    return (
        <>
            <div className='flex h-[40px] items-center justify-center bg-[#303030]'>
                <p className='text-sm font-medium text-white uppercase'>
                    ĐỔI HÀNG MIỄN PHÍ - Tại tất cả cửa hàng trong 30 ngày
                </p>
            </div>
            <header dir='ltr' className='sticky top-0 z-[51] bg-white shadow-md'>
                <div className='max-w-standard mx-4 flex items-center justify-between xl:mx-auto'>
                    <div className='flex items-center gap-10'>
                        <Link to={'/'}>
                            <img
                                src='https://res.cloudinary.com/dbbontzg4/image/upload/v1741668454/bitisLogo-removebg-preview_vdkw3y.png'
                                alt=''
                                className='w-32 object-contain'
                            />
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
                            </ul>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='flex items-center gap-2 rounded-full border-[1px] border-[#7777] px-4 py-2'>
                            <button className='flex items-center'>
                                <SearchOutlined className='text-xl' />
                            </button>
                            <input type='text' placeholder='Tìm kiếm...' className='text-sm outline-none' />
                        </div>
                        <UserToolBar />
                    </div>
                </div>
            </header>
        </>
    );
}
