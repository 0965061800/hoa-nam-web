'use client';
import React from 'react';
import { QuizDataDto } from '../../types/interfaces';
import PlaceHolder from './PlaceHolder';
import AdminQuizCard from './AdminQuizCard';
import { useNavigate } from 'react-router-dom';


interface Props {
  quizzes: QuizDataDto[];
}

function AdminQuizzesArea({quizzes}: Props) {
  const navigate = useNavigate();
  return (
    <div className="poppins mt-5">
      <div>
            {quizzes.length === 0 ? (
              <PlaceHolder />
            ) : (
              <div>
                {/* <DropDown /> */}
                <h2 className="text-xl font-bold">My Quizzes</h2>
                <div className="w-full mt-6 flex gap-6 flex-wrap ">
                    {quizzes.map((singleQuiz: QuizDataDto, quizIndex:number) => (
                        <div key={quizIndex}>
                        <AdminQuizCard singleQuiz={singleQuiz} />
                        </div>
                    ))}
                  <div
                    onClick={() => navigate('/admin/quiz/create')}
                    className=" cursor-pointer justify-center items-center rounded-[10px]
                   w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
                  >
                    {/* <Image
                      src={'/add-quiz.png'}
                      width={160}
                      height={160}
                      alt=""
                    /> */}
                    <span className="select-none opacity-40">
                      Add a new Quiz
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
      </div>
  );
}

export default AdminQuizzesArea;
