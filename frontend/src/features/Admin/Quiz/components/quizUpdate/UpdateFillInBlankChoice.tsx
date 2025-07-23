"use client";
import { ChoiceDataDto, QuestionDataDto } from "@/features/Quiz/interface";
import { useEffect, useState } from "react";

interface ChoicesProps {
  mode: "update" | "create";
  singleQuestion: QuestionDataDto;
  handleQuestionUpdate: (updatedQuestion: QuestionDataDto) => void;
}

function UpdateFillInBlankChoice({
  mode,
  singleQuestion,
  handleQuestionUpdate,
}: ChoicesProps) {


  function updateTheChoicesContent(text: string) {
      singleQuestion.choices[0].choiceContent = text;
      handleQuestionUpdate(singleQuestion);
  }

  
  useEffect(() => {
    if (mode == "create") {
      const newChoice: ChoiceDataDto = {
        id: "",
        choiceContent: "",
        isCorrect: true,
      };
      if (singleQuestion.choices.length == 0) {
        singleQuestion.choices.push(newChoice);
        handleQuestionUpdate(singleQuestion);
      }
    }
  },[])

  return (
    <div className="flex gap-[39px] items-center mt-3">
      <div className="text-[15px]">Answer</div>
      <textarea
        className="border border-gray-200 rounded-md p-3 ml-3 w-full h-[50px] resize-none 
            text-[13px] outline-none"
        value={singleQuestion.choices[0]?.choiceContent ?? ""}
        onChange={(e) => {
          updateTheChoicesContent(e.target.value);
        }}
        placeholder={`Add Your answer`}
      />
    </div>
  );
}

export default UpdateFillInBlankChoice;
