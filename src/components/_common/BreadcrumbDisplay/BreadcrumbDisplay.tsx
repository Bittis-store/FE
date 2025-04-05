import { Breadcrumb, ConfigProvider } from 'antd';
import { useLocation } from 'react-router-dom';
// Function to translate English words to Vietnamese
const translateToVietnamese = (word: string) => {
    const translations: { [key: string]: string } = {
        Home: 'Trang chủ',
        Products: 'Sản phẩm',
        Wishlist: 'Danh sách yêu thích',
        Profile: 'Thông tin tài khoản',
        'My Orders': 'Đơn hàng của tôi',
        Contact: 'Liên hệ',

        // Add more translations as needed
    };
    return translations[word] || word; // Return the original word if no translation is found
};

const BreadcrumbDisplay = ({ titleProduct }: { titleProduct?: string }) => {
    const location = useLocation();

    const breadCrumbView = () => {
        // get current location
        const { pathname } = location;

        // capitalize the first letter of the each segment
        const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

        // seperate the segments from the URL
        const pathnames = pathname
            .split('/')
            .filter((item) => item)
            .map((item) =>
                item.includes('-')
                    ? item
                          .split('-')
                          .map((word) => capatilize(word))
                          .join(' ')
                    : capatilize(item)
            );

        return (
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 16,
                    },
                }}
            >
                <div className='breadcrumb-container flex h-[60px] w-full items-center font-semibold'>
                    <Breadcrumb
                        separator='>'
                        items={[
                            pathnames.length <= 0
                                ? { title: translateToVietnamese('Home') }
                                : {
                                      title: translateToVietnamese('Home'),
                                      href: '/',
                                  },

                            ...pathnames.map((name) => ({
                                title:
                                    name === pathnames[pathnames.length - 1] && titleProduct
                                        ? titleProduct
                                        : translateToVietnamese(capatilize(name)),
                            })),
                        ]}
                    />
                </div>
            </ConfigProvider>
        );
    };

    return <>{breadCrumbView()}</>;
};

export default BreadcrumbDisplay;
