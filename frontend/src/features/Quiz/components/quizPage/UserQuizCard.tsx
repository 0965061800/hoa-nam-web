"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPenToSquare,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { UserQuizData } from "@/features/Quiz/interface";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Props {
  singleQuiz: UserQuizData;
}

function UserQuizCard({ singleQuiz }: Props) {
  const navigate = useNavigate();

  const { title, numberOfQuestion, numberOfAttempt, avarageSuccessRate } =
    singleQuiz;

  function viewQuiz(quiz: UserQuizData) {
    navigate(`/quiz-admin/${quiz.quizId}`);
  }

  function playQuiz(quiz: UserQuizData) {
    navigate(`/user/quizzes/${quiz.quizId}/play`)
  }

  return (
    <div className="min-w-[300px] rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
      {/* Image Container */}
      <div className="relative bg-rose-300 w-full aspect-[5/4] flex justify-center items-center  rounded-md ">
        {/* More Options Icon */}
        <div className="absolute cursor-pointer top-3 right-3">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <FontAwesomeIcon
                className="text-white"
                height={13}
                width={13}
                icon={faEllipsis}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit -translate-x-10">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
      <p className="text-sm font-light">{numberOfQuestion} question(s)</p>
      <p className="text-sm font-light">{numberOfAttempt} attempt(s)</p>
      {numberOfAttempt > 0 ? (
        <p className="text-sm font-light">
          success rate: {avarageSuccessRate}{" "}
        </p>
      ) : (
        ""
      )}
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
            playQuiz(singleQuiz);
          }}
          className="rounded-lg w-10 h-7 bg-rose-500 flex items-center justify-center cursor-pointer"
        >
          <FontAwesomeIcon
            className="text-white"
            width={15}
            height={15}
            icon={faPlay}
          />
        </div>
      </div>
    </div>
  );
}

export default UserQuizCard;
