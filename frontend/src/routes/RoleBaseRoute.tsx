import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
    allowedRole: string
}

export default function RoleBasedRoute({ allowedRole }: Props) {
  const { userName, roles } = useAuth();

  if (!userName || !roles?.includes(allowedRole)) {
    if (allowedRole === "User") return <Navigate to="/signin" />
    else return <Navigate to ="/admin/signin"/>
  }
  return <Outlet />;
}