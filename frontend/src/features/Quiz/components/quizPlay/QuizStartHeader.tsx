'use client';

import React from 'react';
import { faCode, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGlobalContextProvider from '@/context/ContextApi';

interface Props {
    parentTimer: number;
}


function QuizPlayHeader({ parentTimer } : Props) {
  const { quizToStartObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  // Extracting info from the selectQuizStart

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
          <h2 className="font-bold text-xl">{selectQuizToStart ?selectQuizToStart.quizTitle : ""}</h2>
          <span className="font-light text-sm">
            {selectQuizToStart ? selectQuizToStart.quizQuestions.length : 0} Questions
          </span>
        </div>
      </div>
      {/*  */}
      {/* Timer */}
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon
          className="text-rose-700"
          width={20}
          height={20}
          icon={faStopwatch}
        />

        <span>00:00:{parentTimer}</span>
      </div>
    </div>
  );
}

export default QuizPlayHeader;
