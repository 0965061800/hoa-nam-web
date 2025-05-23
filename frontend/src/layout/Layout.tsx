import React from "react";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";



const Layout: React.FC = () => {
  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px",
          },
        }}
      />
      <Header></Header>
      <div className="mt-32">
       <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
