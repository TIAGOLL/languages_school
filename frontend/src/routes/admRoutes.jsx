import { useContext } from 'react';

import { AuthContext } from '../contexts/auth';
import { Navigate } from 'react-router-dom';


export default function AdmRoutes({ children }) {

    const { signedAdmin, loading } = useContext(AuthContext);

    if (loading) {
        return <div />;
    }

    if (!signedAdmin) {
        return <Navigate to="/admin" />;
    }

    return children;
}

