import { useAuth } from "@/hooks/useAuth";
import {Navigate, Outlet } from "react-router-dom";


interface Props {
    role: string
}

const PrivateRoute : React.FC<Props> = ({role}: Props) => {
    const { userName } = useAuth();

    if (userName !== null) {
        if (role === "User")  return <Navigate to="/signin" />;
        if (role === "Admin") return <Navigate to="/admin/signin" />;
    }
    return <Outlet></Outlet>
};

export default PrivateRoute;