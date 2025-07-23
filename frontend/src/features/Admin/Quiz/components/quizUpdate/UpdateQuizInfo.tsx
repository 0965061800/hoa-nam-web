import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { QuizDataDto } from "../../types/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { handleUpdatedQuiz } from "../../services/apis/handle";

interface Props {
  quiz: QuizDataDto;
  handleCancelUpdateQuestion: () => void,
  closePopUp: () => void
}

export interface UpdateQuizDto {
    id: string,
    title: string,
    isShuffled: boolean
}


const UpdateQuizInfo = ({ quiz, handleCancelUpdateQuestion, closePopUp }: Props) => {
    const {token} = useAuth();
    const [title, setTitle] = useState(quiz.title)
    const [shuffleable, setShuffleable] = useState(quiz.isShuffled) 

    async function SaveChange() {
        const quizInfo: UpdateQuizDto = {
            id: quiz.id,
            title: title.trim(),
            isShuffled: shuffleable
        }
        await handleUpdatedQuiz(token, quizInfo);
        closePopUp();
    }

  return (
    <div className="slate bg-slate-100 bg-opacity-70 fixed top-0 bottom-0 left-0 right-0 z-10">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="min-w-[800px] bg-white px-7 pt-5 pb-16 rounded-xl border border-red-300 flex flex-col justify-between">
          <input type="text" className="text-3xl font-bold text-blue-700 mb-2 outline-none" value={title} autoFocus={true} onChange={(e) => setTitle(e.target.value)}/>
          <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Shuffled</Label>
            <Switch id="airplane-mode" color="orange" checked={shuffleable} className="data-[state=checked]:bg-rose-600" onCheckedChange={() => setShuffleable(!shuffleable)} />
          </div>
          <FontAwesomeIcon
                icon={faXmark}
                width={10}
                height={10}
                className="text-red-600 absolute top-2 right-3 cursor-pointer"
                onClick={() => handleCancelUpdateQuestion()}
            />
            <button
                onClick={() => SaveChange()}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-900 absolute bottom-4 right-4 cursor-pointer"
            >
                Save
            </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuizInfo;
