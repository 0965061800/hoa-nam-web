import React, { useEffect, useState } from "react";
import Logo from "./../../public/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAuth } from "@/hooks/useAuth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
const Header = () => {
  const navigate = useNavigate();
  const { userName, token, logout, roles } = useAuth();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className={`header fixed top-0 w-full z-20 flex items-center justify-between bg-white ${scrolled ? "border-rose-100 border-b-2 border-solid shadow-md" :"" }`}>
      <div className={`${scrolled ? `mx-auto container max-w-[1440px] px-28 py-2 flex items-center justify-between bg-white `:'mx-auto container max-w-[1440px] px-28 py-7 flex items-center justify-between bg-white-300'} transition-all`}>
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
        {userName == undefined ? (
          <Button
            className="w-fit bg-primative text-white hover:bg-transparent hover:border-red-300 border-2 hover:text-red-300"
            onClick={() => navigate('/signin')}
          >
            Sign Up
          </Button>
        ) : (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="w-10 rounded-full cursor-pointer"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-center">{userName}</h4>
                    <p>{roles}</p>
                  </div>
                  <div className="grid gap-2">
                    <Button
                      className="w-fit mx-auto bg-white text-black hover:text-white"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
