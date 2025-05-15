import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AddQuizChoiceDto, AddQuizQuestionDto } from "@/features/Quiz/interface";
import MultipleChoiceQuestion from "./MutipleChoiceQuestion";
import ChoiceForMultipleChoiceQuestion from "./ChoiceForMultipleChoiceQuestion";

interface SCQProps {
  questionIndex:number;
  question:AddQuizQuestionDto;
  quizQuestions: AddQuizQuestionDto[];
  endOfListRef: React.RefObject<HTMLDivElement | null>;
  textAreaRefs: React.RefObject<React.RefObject<HTMLTextAreaElement | null>[]>;
  setQuizQuestions: React.Dispatch<React.SetStateAction<AddQuizQuestionDto[]>>;
  deleteQuestion: (question: AddQuizQuestionDto, questionIndex:number) => void;
}

const MultipleChoiceQuestionArea = ({
  questionIndex,
  question,
  quizQuestions,
  endOfListRef,
  textAreaRefs,
  setQuizQuestions,
  deleteQuestion,
}: SCQProps) => {
  const prefixes = ["A", "B", "C", "D", "E", "F", "G"];

  function handleInputChange(questionIndex: number, text: string) {
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (questionIndex === i) {
        return { ...question, content: text };
      }
      return question;
    });
    setQuizQuestions(updatedQuestions);
  }

  function handleQuestionUpdate(updatedQuestion: AddQuizQuestionDto, questionIndex:number) {
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (questionIndex === i) {
        return updatedQuestion;
      }

      return question;
    });
    setQuizQuestions(updatedQuestions);
  }
  
useEffect(() => {
  const updateQuestion = {
    ...question,
    choices: [...question.choices], // make a copy of the array
  };
  const newChoice1: AddQuizChoiceDto = {
    content: "",
    isCorrect: false,
  };
  const newChoice2: AddQuizChoiceDto = {
      content: "",
      isCorrect: false,
    };
  updateQuestion.choices.push(newChoice1, newChoice2);
  handleQuestionUpdate(updateQuestion, questionIndex);
}, []);

  return (
      <div
        ref={quizQuestions.length - 1 === questionIndex ? endOfListRef : null}
        key={questionIndex}
        className="border ml-5 p-4 mt-4 flex-col border-rose-700 
          border-opacity-50 rounded-md flex justify-center relative "
      >
        <MultipleChoiceQuestion
          questionIndex={questionIndex}
          value={question.content}
          ref={textAreaRefs.current[questionIndex]}
          onChange={(e) => {
            handleInputChange(questionIndex, e.target.value);
          }}
        />
        <ChoiceForMultipleChoiceQuestion
          questionIndex={questionIndex}
          singleQuestion={question}
          handleQuestionUpdate = {handleQuestionUpdate}
          value={question.choices}
          prefixes={prefixes}
        />
        <FontAwesomeIcon
          icon={faXmark}
          width={10}
          height={10}
          className="text-red-600 absolute top-2 right-3 cursor-pointer"
          onClick={() => {
            deleteQuestion(question, questionIndex);
          }}
        />
      </div>
  );
}

export default MultipleChoiceQuestionArea;
