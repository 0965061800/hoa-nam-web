"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPenToSquare,
  faPlay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { UserQuizData } from "../../types/interfaces";
import { Badge } from "@/components/ui/badge";

interface Props {
  singleQuiz: UserQuizData;
}

function UserQuizCard({ singleQuiz }: Props) {
  const navigate = useNavigate();

  const { title, numberOfQuestion, numberOfAttempt, averageSuccessRate } =
    singleQuiz;

  function viewQuiz(quiz: UserQuizData) {
    navigate(`/quiz-admin/${quiz.quizId}`);
  }

  function playQuiz(quiz: UserQuizData) {
    navigate(`/user/quizzes/${quiz.quizId}/play`);
  }
  return (
    <div className="min-w-[300px] w-1/4 rounded-[10px] flex flex-col items-stretch relative gap-2 border border-gray-300 bg-white p-4 pb-10">
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
      </div>
      {/* Title Area */}
      <h3 className="font-bold ">{title}</h3>
      {/* Questions */}
      <div className="flex gap-10">
        <div>
          <p className="text-sm font-light">{numberOfQuestion} question(s)</p>
          <p className="text-sm font-light">{numberOfAttempt} attempt(s)</p>
        </div>
        <div>
          <p className="text-sm font-light">
            success rate:{" "}
            {numberOfAttempt > 0 ? Math.floor(averageSuccessRate * 100) : 0} %
          </p>
          <p className="text-sm font-light">
            time: {Math.floor(singleQuiz.timeToPlay / 60)}:
            {singleQuiz.timeToPlay % 60 > 10
              ? singleQuiz.timeToPlay % 60
              : `0${singleQuiz.timeToPlay % 60}`}
          </p>
        </div>
      </div>
      <div className="w-full">
        {singleQuiz.tagNames.map((tag) => (
          <Badge
            variant={"secondary"}
            key={tag}
            className="border border-indigo-600 mr-1 mb-1"
          >
            #{tag}
          </Badge>
        ))}
      </div>
      {/* Footer Area */}
      <div className="absolute bottom-5 right-5 flex gap-3 justify-end">
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
            icon={faStar}
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
