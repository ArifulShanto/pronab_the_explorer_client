import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    
    const location = useLocation();
    
    
    // if (!user) {
    //     return <Navigate to  = "/login" state = {{from : location}} replace></Navigate>
    // }

    return children;
};

export default RequireAuth;