import React from 'react';
import { Outlet } from 'react-router-dom';




const PublicRoute:React.FC = () => {
    return (
        <Outlet></Outlet>
    );
};

export default PublicRoute;