import React, { RefObject } from "react";
import { AddQuizQuestionDto, QuestionType } from "@/features/Quiz/interface";
import SingleChoiceQuestionArea from "../../question/SingleChoiceQuestion/SingleChoiceQuestionArea";
import MultipleChoiceQuestionArea from "../../question/MultipleChoiceQuestion/MultipleChoiceQuestionArea";
import FillInBlankQuestionArea from "../../question/FillInBlankQuestion/FillInBlankQuestionArea";


interface Props {
  quizQuestions: AddQuizQuestionDto[];
  textAreaRefs: React.MutableRefObject<RefObject<HTMLTextAreaElement | null>[]>;
  endOfListRef: RefObject<HTMLDivElement | null>;
  setQuizQuestions: React.Dispatch<React.SetStateAction<AddQuizQuestionDto[]>>;
  deleteQuestion: (question: AddQuizQuestionDto, index: number) => void;
}

const QuestionList = ({
  quizQuestions,
  textAreaRefs,
  endOfListRef,
  setQuizQuestions,
  deleteQuestion,
}: Props) => {
  const commonProps = {
    quizQuestions,
    textAreaRefs,
    endOfListRef,
    setQuizQuestions,
    deleteQuestion,
  };
  return (
    <>
      {quizQuestions.map((question, questionIndex) => {
        switch (question.questionType) {
          case QuestionType.SingleChoice:
            return (
              <SingleChoiceQuestionArea
                {...commonProps}
                questionIndex={questionIndex}
                question={question}
              />
            );
          case QuestionType.MultipleChoice:
            return (
              <MultipleChoiceQuestionArea
                {...commonProps}
                questionIndex={questionIndex}
                question={question}
              />
            );
          case QuestionType.FillInBlank:
            return (
              <FillInBlankQuestionArea
                {...commonProps}
                questionIndex={questionIndex}
                question={question}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default QuestionList;
