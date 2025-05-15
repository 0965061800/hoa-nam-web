import { useAuth } from "@/hooks/useAuth";
import Layout from "@/layout/Layout";
import {Navigate } from "react-router-dom";


interface Props {
    children: React.ReactNode;
}

const PrivateRoute : React.FC<Props> = ({children}) => {
    const { userName } = useAuth();

    return userName ? <Layout>{children}</Layout> : <Navigate to="/signin" />;
};

export default PrivateRoute;