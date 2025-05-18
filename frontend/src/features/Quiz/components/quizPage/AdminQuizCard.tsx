'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
// import convertToFaIcons from '../convertToFaIcons';
import {QuizDataDto } from '@/features/Quiz/interface';
import { Link, useNavigate } from 'react-router-dom';


interface Props {
    singleQuiz: QuizDataDto
}

function AdminQuizCard({singleQuiz} : Props) {
  const navigate = useNavigate()

  const { title, questions } = singleQuiz;

  const totalQuestions = questions.length;

  function viewQuiz(quiz: QuizDataDto) {
    navigate(`/quiz-admin/${quiz.id}`)
  }

  function deleteQuiz(quiz: QuizDataDto) {
    console.log(quiz);
  }

  //

//   function openDropDownMenu(event: any) {
//     const xPos = event.clientX;
//     const yPos = event.clientY;
//     setThreeDotsPositions({ x: xPos, y: yPos });
//     if (event) {
//       event.stopPropagation();
//     }
//     setDropDownToggle(true);
//     setSelectedQuiz(singleQuiz);
//   }

  return (
    <div className="min-w-[300px] rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
      {/* Image Container */}
      <div className="relative bg-rose-300 w-full aspect-[5/4] flex justify-center items-center  rounded-md ">
        {/* More Options Icon */}
        <div className="absolute cursor-pointer top-3 right-3">
          {/* <FontAwesomeIcon
            className="text-white"
            height={13}
            width={13}
            icon={faEllipsis}
            onClick={openDropDownMenu}
          /> */}
        </div>
        {/* Quiz Icon */}
        {/* <FontAwesomeIcon
          className="text-white text-3xl"
          width={120}
          height={120}
            icon={convertToFaIcons(icon)}
        /> */}
      </div>
      {/* Title Area */}
      <h3 className="font-bold ">{title}</h3>
      {/* Questions */}
      <p className="text-sm font-light">{totalQuestions} question(s)</p>
      {/* Footer Area */}
      <div className="flex gap-3 justify-end">
         <div
          onClick={() => {
            viewQuiz(singleQuiz);
          }}
          className="rounded-lg w-10 h-7 bg-rose-500 flex items-center justify-center cursor-pointer"
        >
            <FontAwesomeIcon
              className="text-white"
              width={15}
              height={15}
              icon={faPenToSquare}
            />
        </div>
        <div
          onClick={() => {
            deleteQuiz(singleQuiz);
          }}
          className="rounded-lg w-10 h-7 bg-rose-500 flex items-center justify-center cursor-pointer"
        >
            <FontAwesomeIcon
              className="text-white"
              width={15}
              height={15}
              icon={faTrashCan}
            />
        </div>
      </div>
    </div>
  );
}

export default AdminQuizCard;
