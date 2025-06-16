import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { QuestionType } from "../types/interfaces";

interface Props {
  handlePickQuestionType: (questionTypeNumber: string) => void;
  handleCancelCreateNewQuestion: () => void;
}

const PickQuestionType = ({ handlePickQuestionType, handleCancelCreateNewQuestion }: Props) => {
  return (
    <div className="slate bg-slate-100 bg-opacity-70 fixed top-0 bottom-0 left-0 right-0 z-10">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-rose-200 p-5 rounded-xl flex flex-col justify-between items-center">
          <p className="text-xl font-bold">Tạo mới question</p>
          <div className="mt-5 flex justify-between items-center gap-3">
            <div>Loại câu hỏi:</div>
            <Select onValueChange={(value) => handlePickQuestionType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="chọn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={QuestionType.MultipleChoice.toString()}>
                  Multiple Answer
                </SelectItem>
                <SelectItem value={QuestionType.SingleChoice.toString()}>
                  One Only Answer
                </SelectItem>
                <SelectItem value={QuestionType.FillInBlank.toString()}>
                  Fill In Blank
                </SelectItem>
                <SelectItem value={QuestionType.Text.toString()}>
                  Text
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            width={10}
            height={10}
            className="text-red-600 absolute top-2 right-3 cursor-pointer"
            onClick={() => handleCancelCreateNewQuestion()}
          />
        </div>
      </div>
    </div>
  );
};

export default PickQuestionType;
