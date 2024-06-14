'use client';
import React, { PropsWithChildren } from 'react';
import useAuthStore from '../../store/authStore';
import LoginComponent from '../LoginComponent';

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const { isAuth } = useAuthStore();
    if (!isAuth) {
        return <LoginComponent />;
    }
    return children;
};

export default PrivateRoute;
