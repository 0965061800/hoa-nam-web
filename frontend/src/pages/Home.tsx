import React from "react";
import Kid from "./../../public/kid.png";
import Decor1 from "./../../public/decor_1.png";
import Decor2 from "./../../public/decor_2.png";
import Kid2 from "./../../public/Kid2.png";
import Teacher from "./../../public/teacher.png";
import Income from "./../../public/income.png";
import Book from "./../../public/book.png";
import VideoCall from "./../../public/video_call.png";
import Avarta1 from "./../../public/avatar1.png";
import Avatar2 from "./../../public/avatar2.png";
import Avatar3 from "./../../public/avatar3.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto container max-w-[1440px] font-primative">
      <div className="banner bg-rose-50 px-18 flex justify-center pt-10 gap-10">
        <div className="banner_content w-2/4 font-primative flex flex-col justify-between py-10">
          <div className="">
            <p className="text-4xl">Kết nối tri thức</p>
            <p className="text-4xl font-bold">Mở rộng cánh cửa tới tương lai</p>
          </div>
          <p>
            Nền tảng học trực tuyến online giúp học viên dễ dàng tiếp cận tri
            thức
            <br /> và mở rộng cơ hội tương lai
            <br />
            Bắt đầu ngay với lộ trình học bài bản của Hoa Nam giúp bạn trở thành
            những
            <br />
            học viên ưu tú
          </p>
          <button className="button bg-primative w-fit cursor-pointer px-3 py-2 rounded-xl text-white font-bold text-2xl" onClick={() => navigate("/courses")}>
            Bắt đầu ngay!
          </button>
        </div>
        <div className="banner_picture_group relative">
          <div className="w-80 relative z-10">
            <img src={Kid} className="w-full h-full object-cover"></img>
          </div>
          <div className="w-96 absolute bottom-0 z-0">
            <img src={Decor2} className="w-full h-full object-cover"></img>
          </div>
          <div className="w-96 absolute -top-10 z-0">
            <img src={Decor1} className="w-full h-full object-cover"></img>
          </div>
        </div>
      </div>
      <div className="p-20 flex flex-col bg-gray-50">
        <p className="text-3xl font-bold text-center">
          Các khóa học luôn bảo đảm tốt các kỹ năng
        </p>
        <p className="text-center mt-5">
          Các khóa học luôn giúp bạn đạt được các kỹ năng một cách tốt nhất,
          được biên soạn bởi đội ngũ giáo <br />
          viên chất lượng, để bạn có thể yên tâm học tập
        </p>
        <div className="flex justify-center gap-20 mt-10">
          <div className="w-fit bg-white flex justify-center items-center px-10 py-4 rounded-lg shadow-lg">
            <p>🧏 Nghe</p>
          </div>
          <div className="w-fit bg-white flex justify-center items-center px-10 py-4 rounded-lg shadow-lg">
            <p>📢 Nói</p>
          </div>
          <div className="w-fit bg-white flex justify-center items-center px-10 py-4 rounded-lg shadow-lg">
            <p>📖 Đọc</p>
          </div>
          <div className="w-fit bg-white flex justify-center items-center px-10 py-4 rounded-lg shadow-lg">
            <p>✍️ Viết</p>
          </div>
        </div>
      </div>
      <div className="flex bg-rose-50 justify-center gap-10">
        <div className="w-[600px]">
          <img src={Kid2} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col w-[500px] justify-center items-center">
          <p className="text-3xl font-bold">
            Học tại Hoa Nam có đặc điểm gì đặc biệt?
          </p>
          <ul className="mt-10 flex flex-col gap-2">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                className="size-6 inline-block"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clip-rule="evenodd"
                />
              </svg>{" "}
              Chương trình học được biên soạn bài bản theo các giáo trình nước
              ngoài đạt chuẩn
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                className="size-6 inline-block"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clip-rule="evenodd"
                />
              </svg>{" "}
              Học trực tuyến với giáo viên, không cần phải di chuyển, học ở bất
              kỳ đâu
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                className="size-6 inline-block"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clip-rule="evenodd"
                />
              </svg>{" "}
              Luôn được giáo viên theo dõi và đánh giá sau các buổi học
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                className="size-6 inline-block"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clip-rule="evenodd"
                />
              </svg>{" "}
              Học phí phù hợp với mọi trình độ, tạo điều kiện tốt nhất cho các
              bạn đến với kiến thức
            </li>
          </ul>
        </div>
      </div>
      <div className="py-20 flex flex-col gap-10 bg-gray-100 relative">
        <div className="w-full h-80 absolute bottom-0 z-0 bg-rose-100"></div>
        <p className="text-center text-4xl font-bold">
          Tại sao bạn nên chọn Hoa Nam?
        </p>
        <div className="flex justify-center gap-10 top-10 relative z-10">
          <div className="reason_card w-80 flex flex-col bg-white rounded-xl shadow-xl">
            <div className="w-full h-44">
              <img src={Teacher} className="w-full h-full object-cover"></img>
            </div>
            <div className="flex flex-col gap-5 py-14 px-10">
              <p className="font-bold text-center text-lg">
                Giáo viên giàu kinh nghiệm
              </p>
              <p className="text-center">
                Các giáo viên đều là thạc sĩ, giáo viên lâu năm, có nhiều kinh
                nghiệm trong giảng dạy tiếng trung với phương pháp học hiệu quả
                giúp học sinh tiến bộ nhanh chóng
              </p>
            </div>
          </div>
          <div className="reason_card w-80 flex flex-col bg-white shadow-xl rounded-xl">
            <div className="w-full h-44">
              <img src={Book} className="w-full h-full object-cover"></img>
            </div>
            <div className="flex flex-col gap-5 py-14 px-10">
              <p className="font-bold text-center text-lg">
                Chương trình học bài bản
              </p>
              <p className="text-center">
                Các chương trình học đạt chuẩn giúp học viên an tâm trong việc
                học, đảm bảo lộ trình của học viên luôn đạt được kết quả tốt
                nhất{" "}
              </p>
            </div>
          </div>
          <div className="reason_card w-80 flex flex-col bg-white shadow-xl rounded-xl">
            <div className="w-full h-44">
              <img src={Income} className="w-full h-full object-cover"></img>
            </div>
            <div className="flex flex-col gap-5 py-14 px-10">
              <p className="font-bold text-center text-lg">Chi phí hợp lý</p>
              <p className="text-center">
                Hoa Nam mang tới những cơ hội học tập với chi phí rẻ nhất, giúp
                mọi người dễ dàng tiếp cận hơn với tiếng Trung, từ mọi lứa tuổi
                và với những mục tiêu khác nhau
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-20 bg-gray-100 relative">
          <p className="text-center text-4xl font-bold">
            Có gì trong các buổi học tại Hoa Nam?
          </p>
          <p className="max-w-[60%] mx-auto mt-5 text-center">
            Lớp học online trực tiếp với giáo viên, nếu có chỗ nào không hiểu
            học viên có thể hỏi trực tiếp và nhận câu trả lời nhanh chóng. Cuối
            mỗi buổi học, bài giảng có thể được lưu lại cho học viên ôn tập
          </p>
          <button className="button block mx-auto mt-10 bg-primative w-fit cursor-pointer px-3 py-2 rounded-xl text-white font-bold text-2xl">
            Học thử ngay!
          </button>
          <div className="w-3/5 mx-auto mt-10">
            <img src={VideoCall} className="w-full h-full object-cover"></img>
          </div>
          <div className="flex justify-center gap-20 mt-10">
            <div className="w-fit bg-white flex justify-center items-center px-10 py-4 rounded-lg shadow-lg">
              <p>🧏 Lớp học trực tuyến</p>
            </div>
            <div className="w-fit bg-white flex justify-center items-center px-10 py-4 rounded-lg shadow-lg">
              <p>📥 Ghi lại buổi học</p>
            </div>
            <div className="w-fit bg-white flex justify-center items-center px-10 py-4 rounded-lg shadow-lg">
              <p>📖 Bài tập tiện ích</p>
            </div>
          </div>
        </div>
        <div className="py-20 bg-rose-50 relative">
          <p className="text-center text-4xl font-bold">
            Học viên đánh giá gì về Hoa Nam?
          </p>
          <div className="flex justify-center gap-20 mt-10">
            <div className="flex flex-col p-5 bg-white shadow-lg rounded-lg max-w-80">
              <div className="w-10 h-10 mx-auto">
                <img src={Avarta1} className="w-full h-full object-cover"></img>
              </div>
              <div className="text-center font-bold">Văn An</div>
              <div className="text-center">⭐⭐⭐⭐⭐</div>
              <div className="text-center mt-3">
                Mình cảm thấy đã cải thiện giao tiếp rất nhiều sau khóa học. Cảm
                ơn cô Trân đã rất tận tâm ak
              </div>
            </div>
            <div className="flex flex-col p-5 bg-white shadow-lg rounded-lg max-w-80">
              <div className="w-10 h-10 mx-auto">
                <img src={Avatar2} className="w-full h-full object-cover"></img>
              </div>
              <div className="text-center font-bold">Văn An</div>
              <div className="text-center">⭐⭐⭐⭐⭐</div>
              <div className="text-center mt-3">
                Mình cảm thấy đã cải thiện giao tiếp rất nhiều sau khóa học. Cảm
                ơn cô Trân đã rất tận tâm ak
              </div>
            </div>
            <div className="flex flex-col p-5 bg-white shadow-lg rounded-lg max-w-80">
              <div className="w-10 h-10 mx-auto">
                <img src={Avatar3} className="w-full h-full object-cover"></img>
              </div>
              <div className="text-center font-bold">Văn An</div>
              <div className="text-center">⭐⭐⭐⭐⭐</div>
              <div className="text-center mt-3">
                Mình cảm thấy đã cải thiện giao tiếp rất nhiều sau khóa học. Cảm
                ơn cô Trân đã rất tận tâm ak
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
