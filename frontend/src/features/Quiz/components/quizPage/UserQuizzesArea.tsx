'use client';
import React from 'react';
import { QuizDataDto, UserQuizData } from '../../interface';
import UserQuizCard from './UserQuizCard';
import PlaceHolder from '@/features/Admin/Quiz/components/ViewQuiz/PlaceHolder';

interface Props {
  quizzes: UserQuizData[];
}

function UserQuizzesArea({quizzes}: Props) {
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
                        <UserQuizCard singleQuiz={singleQuiz} />
                        </div>
                    ))}
                  <div
                    // onClick={() => router.push('/quiz-build')}
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
        
        {/* (
          <div className="  h-96 flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-5xl">
              Learn 10x <span className="text-primative">Faster!</span>
            </h2>
            <span className="text-xl font-light">
              Unlock Your Potential with Personalized Quizzes
            </span>
            <button
              onClick={() => {
                setUser((prevUser) => ({ ...prevUser, isLogged: true }));
              }}
              className="p-4 bg-primative text-white rounded-md"
            >
              Get Started Now!
            </button>
          </div>
        )} */}
      </div>
  );
}

export default UserQuizzesArea;
