"use client";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useQuizPlayContext from "../../context/QuizPlayContext";
import { useEffect, useState } from "react";

interface Props {
  initialTime: number;
  onComplete?: () => void;
  quizEnded: boolean;
}

function QuizPlayHeader({ initialTime, onComplete, quizEnded }: Props) {
  const { quizInfo } = useQuizPlayContext();

  const [timeLeft, setTimeLeft] = useState(initialTime);

    
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    if (quizEnded) clearInterval(timerId);
    return () => clearInterval(timerId);
  }, [timeLeft, onComplete, quizEnded]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex justify-between">
      {/* The Quiz name */}
      <div className="flex gap-2 justify-center">
        <div className="bg-rose-700 w-12 h-12 flex items-center justify-center p-2 rounded-md">
          <FontAwesomeIcon
            className="text-white"
            width={25}
            height={25}
            icon={faCode}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-xl">
            {quizInfo ? quizInfo.title : ""}
          </h2>
          <span className="font-light text-sm">
            {quizInfo ? quizInfo.questions.length : 0} Questions
          </span>
        </div>
      </div>
      {/*  */}
      {/* Timer */}
      <div className="flex gap-2 items-center">
        <span>⏳ {formatTime(timeLeft)}</span>
      </div>
    </div>
  );
}

export default QuizPlayHeader;
