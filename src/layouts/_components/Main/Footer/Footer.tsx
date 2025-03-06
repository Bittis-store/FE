import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className='mt-18 border-t-[1px] border-[#C0C0C0] py-5'>
            <div className='max-w-screen-default mx-4 default:mx-auto'>
                <div className='flex justify-between'>
                    <div className='w-1/4 default:w-1/5'>
                        <h3 className='text-global text-sm font-bold uppercase'>Công ty cổ phần Bitis Hủnter</h3>
                        <ul className='text-global mt-4'>
                            <li>
                                <p className='text-sm'>FPT @Polytechnic</p>
                            </li>
                            <li>
                                <p className='text-sm'>
                                    Địa chỉ trụ sở tại tòa nhà FPT Polytechnic, Cổng số 2, 13 P. Trịnh Văn Bô, Xuân
                                    Phương, Nam Từ Liêm, Hà Nội
                                </p>
                            </li>
                            <li>
                                <p className='text-sm'>
                                    Địa chỉ liên hệ tại Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam Từ
                                    Liêm, Hà Nội
                                </p>
                            </li>
                            <li>
                                <p className='text-sm'>Điện thoại: +84 123 456 734</p>
                            </li>
                            <li>
                                <p className='text-sm'>Fax: +84 123 456 734</p>
                            </li>
                            <li>
                                <p className='text-sm'>Email: bitishunter@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-global text-sm font-bold uppercase'>Hỗ trợ</h3>
                        <ul className='text-global mt-4 flex flex-col gap-4 font-medium'>
                            <li>
                                <Link to={'/'} className='hover:text-red-500'>
                                    <p className='text-sm'>Liên lạc</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className='hover:text-red-500'>
                                    <p className='text-sm'>Chính sách và bảo mật</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className='hover:text-red-500'>
                                    <p className='text-sm'>Chăm sóc khách hàng</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='mt-8 flex justify-between border-t-[1px] border-[#C0C0C0] py-5'>
                    <h3 className='text-global text-sm font-semibold uppercase'>
                        @ {new Date().getFullYear()} Bitis Hủnter
                    </h3>
                    <h3 className='text-global text-sm font-semibold uppercase'>Dự án tốt nghiệp</h3>
                </div>
            </div>
        </footer>
    );
}
