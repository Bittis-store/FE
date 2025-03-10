import React, { lazy } from 'react';

// Client
export const HomaPage = lazy(()=>import("~/pages/client/HomePage"));
export const RegisterPage = lazy(()=>import("~/pages/client/Auth/Register"));
export const LoginPage = lazy(()=>import("~/pages/client/Auth/Login"));

// Admin


export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>loading...</div>}>{children}</React.Suspense>;
};
