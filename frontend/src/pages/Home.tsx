import React, { useEffect } from 'react';
import '../styles/UserHomePageStyles.css'
import Globe from "../../public/thumnail.png";
import Logo from "../../public/Logo2.png";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {userName} = useAuth()
  


  return (
    <div>
      <div className='header-title flex items-center gap-1'>
        <div className="logo w-16 h-16">
            <img src={Logo} className="w-full h-full object-cover"></img>
          </div>
          <div className="name text-2xl font-bold font-logo font-thin text-red-600">
            Hoa Nam
        </div>
      </div>
      <canvas id="gradient-canvas" className='absolute'></canvas>
      <div className='w-full absolute flex gap-10 top-1/2 -translate-y-1/2 justify-center items-center'>
        <div className="w-80 h-80 animate-slow-spin">
            <img src={Globe} className="w-full h-full object-cover"></img>
        </div>
        <div className="h-fit flex flex-col ">
          <p className="title2">
            Play Quiz 
          </p>
          <p className="text-3xl font-primative font-semibold mb-10"> To Enhance Your Knowledge</p>
          <a href="/signup" className="popup-button popup-button-1 text-sm text-white font-semibold">Get Started</a>
          <a href="/signin" className="popup-button popup-button-2 text-sm text-white font-semibold">I Already Have An Account</a>
        </div>
      </div>
    </div>
  );
};

export default Home;