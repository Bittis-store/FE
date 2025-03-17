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
                <div className='max-w-standard mx-4 flex items-center justify-between py-3 xl:mx-auto'>
                    <div className='flex items-center gap-10'>
                        <Link to={'/'}>
                            <img
                                src='data:image/png;base64,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'
                                className='w-[55px]'
                                alt=''
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
