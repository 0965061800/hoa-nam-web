import React from 'react';
import Video from './../../public/video_call.png'
import Zalo from './../../public/Icon_of_Zalo.svg.png'

const CoursesDetail = () => {
    return (
        <div className="mx-auto container max-w-[1240px] font-primative mb-10">
            <div className="">
                <div className="p-5 flex gap-10 rounded-lg shadow-lg">
                    <div className="w-[500px]">
                        <img src={Video} className='w-full h-full object-cover'></img>   
                    </div>
                    <div className="course_general_information flex flex-col gap-3">
                        <p className="font-bold text-2xl">Tiếng Trung cho trẻ em</p>
                        <p>Số lượng buổi học: <span className="font-bold ">20 buổi</span></p>
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
                        </div>
                    </div>
                </div>
                <div>
                    <p className='font-bold text-3xl mt-10'>Nội dung khóa học:</p>
                    <p>
                    - Khóa học tiếng Trung bao gồm các kĩ năng: Nghe, nói, đọc, viết  
                    <br/>- Khóa học phù hợp với các bạn học sinh tiểu học - trung học cơ sở ( 6 -14 tuổi). 
                    <br/>- Khóa học tạo nền tảng, hỗ trợ học sinh phát triển khả năng sử dụng tiếng Trung trong học tập và cuộc sống hàng ngày. 
                    <br/>- Khóa học được cung cấp đầy đủ file PDF giáo trình, bài tập và tập viết.
                    <br/>- Khóa học được đào tạo bài bản, chuyên nghiệp với cô giáo Thạc sĩ chuyên ngành Giáo dục Hán ngữ Quốc tế ở Trùng Khánh, Trung Quốc.
                    </p>

                    <p className='font-bold text-3xl mt-10'>Nội dung khóa học:</p>
                    <p>
                    Lộ trình bài bản, rõ ràng sẽ giúp bạn học đạt được các kỹ năng, kiến thức mà bạn mong muốn.
                    </p>

                    <p className='font-bold text-3xl mt-10'>Khóa học này dành cho ai</p>
                    <p>
                    Khóa học phù hợp với các bạn chưa từng học Hán ngữ, các bạn muốn bổ sung kiến thức đã quên hoặc các bạn muốn nâng cao trình độ.
                    </p>
                </div>
                <div className="bg-[#211904] mt-20 py-10 rounded-xl">
                    <p className='font-semibold text-center text-3xl text-white'>Nếu bạn có thắc mắc! Hãy liên hệ</p>
                    <p className='text-center text-white mt-5'>Hãy để lại số điện thoại của bạn hoặc nhắn tin qua Zalo, <br/> chúng tôi sẽ liên hệ ngay cho bạn để giải đáp mọi thắc mắc</p>
                    <div className="w-fit mx-auto mt-5 flex">
                        <input className='w-64 pl-5 rounded-l-xl outline-none' placeholder='Nhập số điện thoại của bạn'>
                        </input>
                        <button className="bg-primative w-fit cursor-pointer px-3 py-2 rounded-xl rounded-l-none text-white font-bold hover:bg-red-500 hover:scale-110 transition-all">
                                Liên hệ ngay!
                        </button>
                    </div>
                    <a className='flex justify-center mt-5 gap-5' href='https://zalo.me/0965061800'>
                        <p className='text-center text-white mt-5 block'>Liên hệ qua Zalo</p>
                        <img src={Zalo} className='block'></img>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CoursesDetail;