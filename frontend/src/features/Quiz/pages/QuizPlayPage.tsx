"use client";

import { useEffect, useState } from "react";
import QuizStartHeader from "@/features/Quiz/components/quizPlay/QuizStartHeader";
import ErrorIcon from "../../../assets/errorIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import useQuizPlayContext from "../context/QuizPlayContext";
import { useAuth } from "@/hooks/useAuth";
import QuizPlayQuestions from "../components/quizPlay/QuizPlayQuestions";

function QuizPlayPage() {
  const { quizInfo, getQuizData } = useQuizPlayContext();
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [quizEnded, setQuizEnded] = useState<boolean>(false); 
  const { quizId } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    if (quizId && token) {
      getQuizData(quizId, token);
    }
  }, []);

  const handleTimeUp = () => setTimeUp(true)

  return (
    <div className="relative poppins flex flex-col px-24 mt-[35px] ">
      {quizInfo.quizId === "" ? (
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
          <QuizStartHeader initialTime={30} onComplete={handleTimeUp} quizEnded={quizEnded} />
          <div className="mt-10 flex items-center justify-center">
            <QuizPlayQuestions timeUp={timeUp} onQuizEnded={() => setQuizEnded(true)}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPlayPage;
