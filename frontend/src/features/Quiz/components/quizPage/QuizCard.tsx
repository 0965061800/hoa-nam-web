'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import useGlobalContextProvider from '../../../../context/ContextApi';
// import convertToFaIcons from '../convertToFaIcons';
import { QuizData } from '@/features/Quiz/interface';
import { Link } from 'react-router-dom';

function successRate(singleQuiz: QuizData) {
  let correctQuestions = 0;
  let totalAttemptes = 0;
  let successRate = 0;

  singleQuiz.quizQuestions.forEach((question) => {
    totalAttemptes += question.statistics.totalAttempts;
    correctQuestions += question.statistics.correctAttempts;
  });

  successRate = Math.ceil((correctQuestions / totalAttemptes) * 100);
  return successRate;
}

interface Props {
    singleQuiz: QuizData
}

function QuizCard({singleQuiz} : Props) {
  const {
    quizToStartObject,
    dropDownToggleObject,
    threeDotsPositionsObject,
    selectedQuizObject,
  } = useGlobalContextProvider();
  const { setDropDownToggle } = dropDownToggleObject;
  //
  const { setSelectQuizToStart } = quizToStartObject;
  const { setThreeDotsPositions } = threeDotsPositionsObject;
  const { setSelectedQuiz } = selectedQuizObject;
  //
  const { quizTitle, quizQuestions, icon } = singleQuiz;

  const totalQuestions = quizQuestions.length;
  const globalSuccessRate = successRate(singleQuiz);
  //

  function openDropDownMenu(event: any) {
    const xPos = event.clientX;
    const yPos = event.clientY;

    setThreeDotsPositions({ x: xPos, y: yPos });

    if (event) {
      event.stopPropagation();
    }

    setDropDownToggle(true);
    setSelectedQuiz(singleQuiz);
  }

  return (
    <div className="min-w-[300px] rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
      {/* Image Container */}
      <div className="relative bg-rose-300 w-full aspect-[5/4] flex justify-center items-center  rounded-md ">
        {/* More Options Icon */}
        <div className="absolute cursor-pointer top-3 right-3">
          <FontAwesomeIcon
            className="text-white"
            height={13}
            width={13}
            icon={faEllipsis}
            onClick={openDropDownMenu}
          />
        </div>
        {/* Quiz Icon */}
        <FontAwesomeIcon
          className="text-white text-3xl"
          width={120}
          height={120}
        //   icon={convertToFaIcons(icon)}
        />
      </div>
      {/* Title Area */}
      <h3 className="font-bold ">{quizTitle}</h3>
      {/* Questions */}
      <p className="text-sm font-light">{totalQuestions} question(s)</p>
      {/* Footer Area */}
      <div className="flex gap-3">
        {/* success rate area */}
        <div className="flex gap-1 items-center">
          {/* <Image src="/target-777.png" width={20} height={10} alt="" /> */}
          <span className=" text-[12px]">
            Success rate: {globalSuccessRate}%
          </span>
        </div>
        <div
          onClick={() => {
            setSelectQuizToStart(singleQuiz);
          }}
          className="rounded-full w-7 h-7 bg-rose-700 flex items-center justify-center cursor-pointer"
        >
          <Link to={"/quiz-play"}>
            <FontAwesomeIcon
              className="text-white"
              width={15}
              height={15}
              icon={faPlay}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
