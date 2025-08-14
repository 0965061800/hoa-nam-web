"use client";

import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import ScoreComponent from "./ScoreComponent";
import useQuizPlayContext from "../../context/QuizPlayContext";
import { QuestionType, UserAnswer, UserChoice } from "../../types/interfaces";
import shuffleArray from "../../services/shuffleQuestion";

interface Props {
  timeUp: boolean;
  onQuizEnded: () => void;
}

function QuizPlayQuestions({ timeUp, onQuizEnded }: Props) {
  const { quizInfo, setAnswerOfUser, postResultToServer } = useQuizPlayContext();
  //const { questions } = quizInfo;
  const [questions, setQuestions] = useState(quizInfo.questions);

  const generalAnswerOfUser = useRef<UserAnswer[]>([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestionId = useRef("");
  const questionType = useRef(QuestionType.SingleChoice);
  const [selectedChoice, setSelectedChoice] = useState<string[]>([]);
  const [isQuizEnded, setQuizEnded] = useState<boolean>(false);

  useEffect(() => {
    currentQuestionId.current = questions[currentQuestionIndex].questionId;
    questionType.current = questions[currentQuestionIndex].questionType;
    setSelectedChoice([]);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if(quizInfo.isShuffled) {
      const shuffled = shuffleArray(questions);
      setQuestions(shuffled);
    }
  },[quizInfo])

  function submitAnswer() {
    if (selectedChoice.length == 0) {
      toast.error("please select an answer");
      return;
    }
    setQuizEnded(true);
  }

  useEffect(() => {
    if (isQuizEnded == true) {
      onQuizEnded();
      addToGeneralAnswer();
      postToServer();
    }
  }, [isQuizEnded]);

  async function postToServer() {
    setAnswerOfUser(generalAnswerOfUser.current);
  }
  function addToGeneralAnswer() {
    if (questionType.current == QuestionType.SingleChoice) {
      const userChoice: UserChoice = {
        choiceId: selectedChoice[0],
        choiceAnswer: "",
      };
      const newUserAnswer: UserAnswer = {
        questionId: currentQuestionId.current,
        userAnswer: [userChoice],
      };
      generalAnswerOfUser.current.push(newUserAnswer);
    }

    if (questionType.current == QuestionType.MultipleChoice) {
      const userChoice: UserChoice[] = selectedChoice.map((choice) => ({
        choiceId: choice,
        choiceAnswer: "",
      }));

      const newUserAnswer: UserAnswer = {
        questionId: currentQuestionId.current,
        userAnswer: userChoice,
      };
      generalAnswerOfUser.current.push(newUserAnswer);
    }

    if (questionType.current == QuestionType.FillInBlank) {
       const userChoice: UserChoice = {
         choiceId: questions[currentQuestionIndex].choices[0].choiceId,
        choiceAnswer: selectedChoice[0],
      };

      const newUserAnswer: UserAnswer = {
        questionId: currentQuestionId.current,
        userAnswer: [userChoice],
      };
      generalAnswerOfUser.current.push(newUserAnswer);
    }
  }

  //logic when time is end up
  useEffect(() => {
    if (timeUp) {
      setQuizEnded(true);
    }
  }, [timeUp]);

  function selectChoiceFunction(choiceId: string) {
    if (questionType.current == QuestionType.MultipleChoice) {
      if (!selectedChoice.includes(choiceId))
        setSelectedChoice([...selectedChoice, choiceId]);
      else setSelectedChoice(selectedChoice.filter((x) => x != choiceId));
    }
    if (questionType.current == QuestionType.SingleChoice) {
      if (!selectedChoice.includes(choiceId)) setSelectedChoice([choiceId]);
    }
    if (questionType.current == QuestionType.FillInBlank) {
      setSelectedChoice([choiceId]);
    }
  }

  function moveToTheNextQuestion() {
    if (selectedChoice.length == 0) {
      toast.error("please select an answer");
      return;
    }
    addToGeneralAnswer();
    setCurrentQuestionIndex((previous) => previous + 1);
  }

  return (
    <div className="relative poppins rounded-sm m-9 w-9/12  ">
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 1500,
          style: {
            padding: "12px",
          },
        }}
      />
      {/* The Question Part */}
      <div className="flex items-center gap-2">
        <div className="bg-rose-600 flex  justify-center items-center rounded-md w-11 h-11 text-white p-3">
          {currentQuestionIndex + 1}
        </div>
        <p className="font-semibold text-xl">
          {questions[currentQuestionIndex].questionContent}
        </p>
      </div>
      <div>
        <p className="text-gray-800 mt-3">{`❗ ${
          questionType.current == QuestionType.MultipleChoice
            ? "This question can have more than one answer"
            : questionType.current == QuestionType.SingleChoice
            ? "Just pick one answer"
            : "Write the answer"
        }`}</p>
      </div>
      {/* The Answers Part */}

      {questionType.current == QuestionType.MultipleChoice ||
      questionType.current == QuestionType.SingleChoice ? (
        <div className="mt-7 flex flex-col gap-2">
          {questions[currentQuestionIndex].choices.map(
            (choice, indexChoice) => (
              <div
                key={indexChoice}
                onClick={() => {
                  selectChoiceFunction(choice.choiceId);
                }}
                className={`p-3 ml-11 w-10/12 border border-rose-700 rounded-md
               hover:bg-rose-700 hover:text-white transition-all select-none ${
                 selectedChoice.includes(choice.choiceId)
                   ? "bg-rose-700 text-white"
                   : "bg-white"
               }`}
              >
                {choice.choiceContent}
              </div>
            )
          )}
        </div>
      ) : (
        <div className="mt-7 flex flex-col gap-2">
          <div className="flex gap-2 text-[15px] border-gray-200">
            <span>Answer</span>
          </div>
          <textarea
            className="border border-gray-200 rounded-md p-3 ml-3 w-full h-[50px] resize-none 
                    text-[13px] outline-none"
            placeholder="Type your answer here"
            value={selectedChoice[0]}
            onChange={(e) => selectChoiceFunction(e.target.value)}
          />
        </div>
      )}

      {currentQuestionIndex !== questions.length - 1 ? (
        <div className="flex justify-end mt-7  ">
          <button
            onClick={() => {
              moveToTheNextQuestion();
            }}
            className={`p-2 px-5 text-[15px] text-white rounded-md bg-rose-700 mr-[70px]`}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="flex justify-end mt-7  ">
          <button
            onClick={() => {
              submitAnswer();
            }}
            className={`p-2 px-5 text-[15px] text-white rounded-md bg-rose-700 mr-[70px]`}
          >
            Submit
          </button>
        </div>
      )}

      {isQuizEnded && <ScoreComponent />}
    </div>
  );
}

export default QuizPlayQuestions;
