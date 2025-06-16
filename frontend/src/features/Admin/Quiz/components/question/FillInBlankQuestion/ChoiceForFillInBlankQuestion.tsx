"use client";
import {
  AddQuizChoiceDto,
  AddQuizQuestionDto,
} from "@/features/Quiz/interface";

interface ChoicesProps {
  questionIndex: number;
  singleQuestion: AddQuizQuestionDto;
  handleQuestionUpdate: (
    updatedQuestion: AddQuizQuestionDto,
    qIndex: number
  ) => void;
  value: AddQuizChoiceDto[];
}

function ChoiceForFillInBlankQuestion({
  singleQuestion,
  questionIndex,
  handleQuestionUpdate,
}: ChoicesProps) {
  const { choices } = singleQuestion;

  function updateTheChoicesContent(text: string, choiceIndex: number) {
    singleQuestion.choices[choiceIndex].content = text;
    handleQuestionUpdate(singleQuestion, questionIndex);
  }

 const singleChoice = choices[0];
  if (!choices || choices.length === 0) return null;
  return (
    <div className=" flex gap-[39px] items-center mt-3">
      <div className="text-[15px]">Answer</div>
        {/* Choices Area */}
          <textarea
          className="border border-gray-200 rounded-md p-3 ml-3 w-full h-[50px] resize-none 
            text-[13px] outline-none"
          value={singleChoice.content}
          onChange={(e) => {
              updateTheChoicesContent(e.target.value, 0);
            }}
          placeholder={`Add Your answer`}
        />
    </div>
  );
}

export default ChoiceForFillInBlankQuestion;
