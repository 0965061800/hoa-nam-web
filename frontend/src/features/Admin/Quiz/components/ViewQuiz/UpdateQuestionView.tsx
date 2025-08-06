import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { QuestionDataDto, QuestionType } from "../../types/interfaces";
import UpdateMultipleChoice from "../quizUpdate/UpdateMultipleChoice";
import UpdateSingleChoice from "../quizUpdate/UpdateSingleChoice";
import UpdateFillInBlankChoice from "../quizUpdate/UpdateFillInBlankChoice";

interface Props {
  mode: "update" | "create";
  question: QuestionDataDto;
  handleCancelUpdateQuestion: () => void;
  handleSaveChangeQuestion: (updatedQuestion: QuestionDataDto) => void;
}
const UpdateQuestionView = ({
  mode,
  question,
  handleCancelUpdateQuestion,
  handleSaveChangeQuestion,
}: Props) => {
  const [updatedQuestion, setUpdatedQuestion] = useState<QuestionDataDto>({
    ...question,
  });
  
  function ChangeQuestionContent(text: string) {
    setUpdatedQuestion({ ...updatedQuestion, questionContent: text });
  }

  function handleQuestionUpdateFromChoice(
    updatedQuestionfromChoice: QuestionDataDto
  ) {
    setUpdatedQuestion({ ...updatedQuestionfromChoice });
  }

  function handleSaveChange () {
    if (question.questionType == QuestionType.FillInBlank) {
      handleSaveChangeQuestion(updatedQuestion);
      return;
    };
    const lastChoicesPosition = updatedQuestion.choices.length;
    const eachInput =
      updatedQuestion.choices[lastChoicesPosition - 1].choiceContent;
    if (eachInput.trim().length === 0) {
      toast.error(
        `Please ensure that all previous choices are filled out!`
      );
    } else {
      handleSaveChangeQuestion(updatedQuestion);
    }
  }

  return (
    <div className="slate bg-slate-100 bg-opacity-70 fixed top-0 bottom-0 left-0 right-0 z-10">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="min-w-[800px] bg-white px-7 pt-5 pb-16 rounded-xl border border-red-300 flex flex-col justify-between">
          <p className="text-xl font-semibold text-center">{`${mode == "create" ? "Create New Question" : "Update Question"}`}</p>
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex items-center gap-3 w-full">
              <div className="flex gap-2 text-[15px] border-gray-200">
                <span>Question</span>
                <span>1</span>
              </div>
              <textarea
                className="border border-gray-200 rounded-md p-3 ml-3 w-full h-[50px] resize-none 
                    text-[13px] outline-none"
                placeholder="Your Question Here..."
                value={updatedQuestion.questionContent}
                onChange={(e) => ChangeQuestionContent(e.target.value)}
              />
            </div>
            <div>
              {question.questionType == QuestionType.MultipleChoice ? (
                <UpdateMultipleChoice
                  singleQuestion={updatedQuestion}
                  handleQuestionUpdate={handleQuestionUpdateFromChoice}
                ></UpdateMultipleChoice>
              ) : question.questionType == QuestionType.SingleChoice ? (
                <UpdateSingleChoice
                  singleQuestion={updatedQuestion}
                  handleQuestionUpdate={handleQuestionUpdateFromChoice}
                ></UpdateSingleChoice>
              ) : (
                <UpdateFillInBlankChoice
                  mode={mode}
                  singleQuestion={updatedQuestion}
                  handleQuestionUpdate={handleQuestionUpdateFromChoice}
                ></UpdateFillInBlankChoice>
              )}
            </div>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            width={10}
            height={10}
            className="text-red-600 absolute top-2 right-3 cursor-pointer"
            onClick={() => handleCancelUpdateQuestion()}
          />
          <button
            onClick={() => handleSaveChange()}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-900 absolute bottom-4 right-4 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestionView;
