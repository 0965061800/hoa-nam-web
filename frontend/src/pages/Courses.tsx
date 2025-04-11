import React from "react";
import Banner from "./../../public/Group 19.png";
import Children from "./../../public/chinese-1.webp";
import { useNavigate } from "react-router-dom";

const Courses = () => {
    const navigate = useNavigate();
  return (
    <div className="mx-auto container max-w-[1440px] font-primative">
      <div className="banner relative">
        <div className="image w-fit mx-auto">
          <img src={Banner} />
        </div>
        <div className="absolute z-10 top-20 left-60 ">
          <p className="text-3xl font-bold">
            Hè đến! Hoa Nam giảm giá <br />
            toàn bộ các khóa học 30%
          </p>
          <p>Chương trình bắt đầu từ ngày 30/5 đến hết 30/8</p>
          <button className="button block mx-auto mt-10 bg-primative w-fit cursor-pointer px-3 py-2 rounded-xl text-white font-bold text-2xl  "
          onClick={() => navigate('/courses/register')}
          >
            Đăng ký ngay!
          </button>
        </div>
      </div>
      <div className="p-10">
        <p className="text-center font-bold text-3xl">Danh sách các khóa học</p>
        <div className="mt-10 flex flex-col gap-10">
          <div className="flex gap-32 items-center p-5 border-2 border-solid border-rose-600 rounded-lg shadow-xl hover:bg-rose-100 transition-all hover:border-white hover:shadow-2xl">
            <div className="w-80 h-80">
              <img src={Children} />
            </div>
            <div className="">
              <p className="text-2xl font-bold">
                Khóa YCT1 - Tiếng Trung cho trẻ em
              </p>
              <div className="flex flex-col gap-3 mt-5">
                <p>
                  Số lượng buổi học: <span className="font-bold ">20 buổi</span>
                </p>
                <p>
                  Thời gian mỗi buổi: <span className="font-bold">1 tiếng</span>
                </p>
                <p>
                  Giáo viên:{" "}
                  <span className="font-bold">Cô Hoàng Bảo Trân</span>
                </p>
                <p>
                  Số lượng học viên:{" "}
                  <span className="font-bold">6 bạn hoặc 12 bạn</span>
                </p>
                <p>
                  Giá{" "}
                  <span className="font-bold">
                    1.060.000VND đến 1.600.000VND
                  </span>
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <button className="bg-primative w-fit cursor-pointer px-3 py-2 rounded-xl text-white font-bold hover:bg-red-500 hover:scale-110 transition-all">
                    Đăng ký ngay!
                  </button>
                  <p className="text-red-500 cursor-pointer hover:translate-x-5 transition-all" onClick={() => navigate("/courses/detail")}>
                    Xem chi tiết -->
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-32 items-center p-5 border-2 border-solid border-rose-600 rounded-lg shadow-xl hover:bg-rose-100 transition-all hover:border-white hover:shadow-2xl">
            <div className="">
              <p className="text-2xl font-bold">
                Khóa HSK1
              </p>
              <div className="flex flex-col gap-3 mt-5">
                <p>
                  Số lượng buổi học: <span className="font-bold ">25 buổi</span>
                </p>
                <p>
                  Thời gian mỗi buổi: <span className="font-bold">1 tiếng 30 phút</span>
                </p>
                <p>
                  Giáo viên:{" "}
                  <span className="font-bold">Cô Hoàng Bảo Trân</span>
                </p>
                <p>
                  Số lượng học viên:{" "}
                  <span className="font-bold">6 bạn hoặc 12 bạn</span>
                </p>
                <p>
                  Giá{" "}
                  <span className="font-bold">
                    1.300.000VND đến 2.000.000VND
                  </span>
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <button className="bg-primative w-fit cursor-pointer px-3 py-2 rounded-xl text-white font-bold hover:bg-red-500 hover:scale-110 transition-all">
                    Đăng ký ngay!
                  </button>
                  <p className="text-red-500 cursor-pointer hover:translate-x-5 transition-all">
                    Xem chi tiết -->
                  </p>
                </div>
              </div>
            </div>
            <div className="w-80 h-80">
              <img src={Children} />
            </div>
          </div>

          <div className="flex gap-32 items-center p-5 border-2 border-solid border-rose-600 rounded-lg shadow-xl hover:bg-rose-100 transition-all hover:border-white hover:shadow-2xl">
            <div className="w-80 h-80">
              <img src={Children} />
            </div>
            <div className="">
              <p className="text-2xl font-bold">
                Khóa HSK2
              </p>
              <div className="flex flex-col gap-3 mt-5">
                <p>
                  Số lượng buổi học: <span className="font-bold ">25 buổi</span>
                </p>
                <p>
                  Thời gian mỗi buổi: <span className="font-bold">1 tiếng 30 phút</span>
                </p>
                <p>
                  Giáo viên:{" "}
                  <span className="font-bold">Cô Hoàng Bảo Trân</span>
                </p>
                <p>
                  Số lượng học viên:{" "}
                  <span className="font-bold">6 bạn hoặc 12 bạn</span>
                </p>
                <p>
                  Giá{" "}
                  <span className="font-bold">
                    1.600.000VND đến 2.500.000VND
                  </span>
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <button className="bg-primative w-fit cursor-pointer px-3 py-2 rounded-xl text-white font-bold hover:bg-red-500 hover:scale-110 transition-all">
                    Đăng ký ngay!
                  </button>
                  <p className="text-red-500 cursor-pointer hover:translate-x-5 transition-all">
                    Xem chi tiết -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
