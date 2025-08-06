import React from "react";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";



const AdminLayout: React.FC = () => {
  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px",
          },
        }}
      />
      <AdminHeader></AdminHeader>
      <div className="mt-32">
       <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminLayout;
