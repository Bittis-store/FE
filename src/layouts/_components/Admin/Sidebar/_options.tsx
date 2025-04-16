import {
    AppstoreOutlined,
    BarChartOutlined,
    ControlOutlined,
    FolderOutlined,
    ShoppingCartOutlined,
    StarFilled,
    UserOutlined,
} from '@ant-design/icons';
import { ADMIN_ROUTES } from '~/constants/router';

export type IChildrenItem = {
    label: string;
    route: string;
};
export type IMenuItem = {
    icon: JSX.Element;
    label: string;
    route?: string;
    children?: IChildrenItem[];
};

export const menuGroups: IMenuItem[] = [
    {
        icon: <BarChartOutlined />,
        label: 'Thống kê',
        route: ADMIN_ROUTES.DASHBOARD,
    },
    {
        icon: <ShoppingCartOutlined />,
        label: 'Quản lý đơn hàng',
        route: ADMIN_ROUTES.ORDERS,
    },
    {
        icon: <AppstoreOutlined />,
        label: 'Quản lý sản phẩm',
        children: [
            { label: 'Tất cả sản phẩm', route: ADMIN_ROUTES.PRODUCTS },
            { label: 'Tạo mới sản phẩm', route: ADMIN_ROUTES.PRODUCTS_CREATE },
        ],
    },
    // {
    //     icon: <UserOutlined />,
    //     label: 'Quản lý người dùng',
    //     children: [{ label: 'Tất cả người dùng', route: ADMIN_ROUTES.USERS }],
    // },
    {
        icon: <FolderOutlined />,
        label: 'Quản lý danh mục',
        children: [
            { label: 'Tất cả danh mục', route: ADMIN_ROUTES.CATEGORIES },
            { label: 'Thêm mới danh mục', route: ADMIN_ROUTES.CATEGORIES_CREATE },
        ],
    },
    {
        icon: <ControlOutlined />,
        label: 'Quản lý thuộc tính',
        children: [
            { label: 'Màu sắc', route: ADMIN_ROUTES.COLORS },
            { label: 'Kích cỡ', route: ADMIN_ROUTES.SIZES },
            { label: 'Thẻ phân loại', route: ADMIN_ROUTES.TAGS },
        ],
    },
    {
        icon: <StarFilled />,
        label: 'Quản lý đánh giá',
        children: [{ label: 'Tất cả đánh giá', route: ADMIN_ROUTES.REVIEWS }],
    },
];
