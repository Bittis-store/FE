import React, { lazy } from 'react';

// Client
export const HomaPage = lazy(()=>import("~/pages/client/HomePage"));


// Auth
export const RegisterPage = lazy(()=>import("~/pages/client/Auth/Register"));
export const LoginPage = lazy(()=>import("~/pages/client/Auth/Login"));
export const VerifyAccountPage = lazy(()=>import("~/pages/client/Auth/Email"));
export const ForgotPasswordPage = lazy(()=>import("~/pages/client/Auth/ForgotPassword"));

// Products and Cart
export const ProductsPage = lazy(()=>import("~/pages/client/ProductPage/ProductPage"));
export const ProductsDetailPage = lazy(()=>import("~/pages/client/ProductDetailsPage/Productdetails"));
export const CartDetailPage = lazy(()=>import("~/pages/client/CartDetail/CartDetail"));

// Checkout
export const ShippingPage = lazy(() => import('~/pages/client/Checkout/Shipping'));
export const PaymentMethodPage = lazy(() => import('~/pages/client/Checkout/PaymentMethod'));
export const CheckoutPage = lazy(() => import('~/pages/client/Checkout/CheckOut'));
export const OrderSuccessPage = lazy(() => import('~/pages/client/Checkout/OrderSuccess'));
export const OrderErrorPage = lazy(() => import('~/pages/client/Checkout/OrderError'));

// @ Account 
export const ProfilePage = lazy(() => import('~/pages/client/Account/Profile'));
export const MyOrdersPage = lazy(
    () => import('~/pages/client/Account/MyOrders'),
);
export const MyOrderDetailsPage = lazy(
    () => import('~/pages/client/Account/MyOrders/OrderDetail/OrderDetailPage'),
);
// Admin
export const DashboardPage = lazy(() => import('~/pages/Admin/_dashboard_'));

// Category
export const CategoryList = lazy(() => import('~/pages/Admin/_category_'));
export const CreateCategory = lazy(() => import('~/pages/Admin/_category_/CreateCategory'));
export const UpdateCategory = lazy(() => import('~/pages/Admin/_category_/UpdateCategory'));

// Product
export const ProductList = lazy(() => import('~/pages/Admin/_product_'));
export const CreateProduct = lazy(() => import('~/pages/Admin/_product_/CreateProduct'));
export const UpdateProduct = lazy(() => import('~/pages/Admin/_product_/UpdateProduct'));

// Color
export const ColorList = lazy(() => import('~/pages/Admin/_color_'));
export const CreateColor = lazy(() => import('~/pages/Admin/_color_/CreateColor'));
export const UpdateColor = lazy(() => import('~/pages/Admin/_color_/UpdateColor'));

// Order admin
export const ManageOrders = lazy(() => import('~/pages/Admin/_order_/ManageOrder'));
export const OrdersDetails = lazy(() => import('~/pages/Admin/_order_/OrderDetails'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>loading...</div>}>{children}</React.Suspense>;
};
