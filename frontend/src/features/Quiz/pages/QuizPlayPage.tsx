'use client';

import { useEffect, useState } from 'react';
import QuizStartHeader from '@/features/Quiz/components/quizPlay/QuizStartHeader';
import QuizStartQuestions from '@/features/Quiz/components/quizPlay/QuizStartQuestions';
import ErrorIcon from '../../../assets/errorIcon.png'
import { useNavigate } from 'react-router-dom';
import useGlobalContextProvider from '@/context/ContextApi';




function QuizPlayPage() {
  const { quizToStartObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const [parentTimer, setParentTimer] = useState(0);
  const navigate = useNavigate();

  function onUpdateTime(currentTime: any) {
    setParentTimer(currentTime);
  }

  useEffect(() => {
    if (selectQuizToStart === null) {
      navigate('/quiz');
    }
  }, []);

  return (
    <div className="relative poppins flex flex-col px-24 mt-[35px] ">
      {selectQuizToStart === null ? (
        <div className="  h-svh flex flex-col gap-2 items-center justify-center">
          <img src={ErrorIcon} alt="" width={180} height={180} /> 
          <h2 className="text-xl font-bold">
            Please Select your quiz first...
          </h2>
          <span className="font-light">
            You will be redirected to the home page
          </span>
        </div>
      ) : (
        <div className="mx-auto container max-w-[1440px] font-primative">
          <QuizStartHeader parentTimer={parentTimer} />
          <div className="mt-10 flex items-center justify-center">
            <QuizStartQuestions onUpdateTime={onUpdateTime} />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPlayPage;
