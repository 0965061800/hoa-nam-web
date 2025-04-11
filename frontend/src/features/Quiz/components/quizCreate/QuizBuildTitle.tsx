'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';;
import useGlobalContextProvider from '../../../../context/ContextApi';
import convertToFaIcons from '../../utils/converToFaIcon';

export interface quizTitleProps {
  focusProp: {
      focus: boolean;
      setFocusFirst: React.Dispatch<React.SetStateAction<boolean>>;
  };
  onChangeQuizTitle: (text: string) => void;
}

function QuizBuildTitle({onChangeQuizTitle }:quizTitleProps) {
  const { openBoxToggle, selectedIconObject, selectedQuizObject } =
    useGlobalContextProvider();
  const { selectedQuiz } = selectedQuizObject;
  const [quizTitle, setQuizTitle] = useState(() => {
    return selectedQuiz ? selectedQuiz.quizTitle : '';
  });
  const quizTitleRef = useRef(null);

  const { setOpenIconBox } = openBoxToggle;
  const { selectedIcon, setSelectedIcon } = selectedIconObject;

  function handleTextInputChange(text: string) {
    setQuizTitle(text);
    onChangeQuizTitle(text);
  }

  useEffect(() => {
    if (typeof selectedIcon.faIcon === 'string') {
      const newFaIcon = convertToFaIcons(selectedIcon.faIcon);
      const copySelectedIcon = { ...selectedIcon };
      copySelectedIcon.faIcon = newFaIcon;
      setSelectedIcon(copySelectedIcon);
    }
  }, []);

  return (
    <div className="p-3 flex justify-between border border-rose-700 rounded-md">
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <div className="bg-rose-700 px-4 py-1 rounded-md text-white">1</div>
          <span className="font-bold">Quiz Name : </span>
        </div>
        <input
          onChange={(e) => {
            handleTextInputChange(e.target.value);
          }}
          value={quizTitle}
          ref={quizTitleRef}
          className="outline-none border-b-2 pt-1 w-[300px] text-[13px]"
          placeholder="Enter the Name Of The Quiz..."
        />
      </div>
      <FontAwesomeIcon
        onClick={() => {
          setOpenIconBox(true);
        }}
        icon={selectedIcon.faIcon}
        height={40}
        width={40}
        className="text-white p-2 rounded-md bg-rose-700 cursor-pointer"
      />
    </div>
  );
}

export default QuizBuildTitle;
