'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';;
import useGlobalContextProvider from '../../../../context/ContextApi';
import convertToFaIcons from '../../utils/converToFaIcon';
import useDebounce from '@/hooks/useDebounce';

export interface quizTitleProps {
  onChangeQuizTitle: (text: string) => void;
}

function QuizCreateTitle({onChangeQuizTitle }:quizTitleProps) {
  const { openBoxToggle, selectedIconObject } =
    useGlobalContextProvider();
  const quizTitleRef = useRef(null);

  const { setOpenIconBox } = openBoxToggle;
  const { selectedIcon, setSelectedIcon } = selectedIconObject;

  const [title, setTitle] = useState('');
  const debouncedInputValue = useDebounce(title, 500);

  useEffect(() => {
    onChangeQuizTitle(debouncedInputValue);
  }, [debouncedInputValue]);

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
            setTitle(e.target.value);
          }}
          value={title}
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

export default QuizCreateTitle;
