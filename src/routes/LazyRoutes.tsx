import React, { lazy } from 'react';

// Client
export const HomaPage = lazy(()=>import("~/pages/client/HomePage"));
export const RegisterPage = lazy(()=>import("~/pages/client/Auth/Register"));
export const LoginPage = lazy(()=>import("~/pages/client/Auth/Login"));
export const VerifyAccountPage = lazy(()=>import("~/pages/client/Auth/Email"));
export const ForgotPasswordPage = lazy(()=>import("~/pages/client/Auth/ForgotPassword"));
export const ProductsPage = lazy(()=>import("~/pages/client/ProductPage/ProductPage"));
export const ProductsDetailPage = lazy(()=>import("~/pages/client/ProductDetailsPage/Productdetails"));
export const CartDetailPage = lazy(()=>import("~/pages/client/CartDetail/CartDetail"));


// Admin
export const DashboardPage = lazy(() => import('~/pages/admin/_dashboard_'));
// @Category
export const CategoryList = lazy(() => import('~/pages/admin/_category_'));
export const CreateCategory = lazy(
    () => import('~/pages/admin/_category_/CreateCategory'),
);
export const UpdateCategory = lazy(
    () => import('~/pages/admin/_category_/UpdateCategory'),
);
export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>loading...</div>}>{children}</React.Suspense>;
};
