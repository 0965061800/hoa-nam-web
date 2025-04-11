import React from "react";
import Logo from "./../../public/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
  return (
    <div className="header mx-auto container max-w-[1440px] px-28 py-7 flex items-center justify-between">
      <div
        className="webName flex w-fit items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="logo w-20 h-20">
          <img src={Logo} className="w-full h-full object-cover"></img>
        </div>
        <div className="name text-3xl font-bold font-logo font-thin text-red-600">
          Hoa Nam
        </div>
      </div>
      <div className="navigation flex gap-20">
        <NavLink
          to="/courses"
          className="font-primative px-3 py-1 font-semibold text-lg cursor-pointer hover:bg-primative hover:text-white rounded-lg transition-all"
        >
          Các khóa học
        </NavLink>
        <NavLink
          to="/courses"
          className="font-primative px-3 py-1 font-semibold text-lg cursor-pointer hover:bg-primative hover:text-white rounded-lg transition-all"
        >
          Về chúng tôi
        </NavLink>
        <NavLink
          to="/courses"
          className="font-primative px-3 py-1 font-semibold text-lg cursor-pointer hover:bg-primative hover:text-white rounded-lg transition-all"
        >
          Kiến thức
        </NavLink>
      </div>
      <div className="button bg-primative cursor-pointer px-3 py-2 rounded-xl text-white font-bold text-xl">
        Đăng ký
      </div>
    </div>
  );
};

export default Header;
