import { forwardRef, Ref } from "react";

interface SingleQuestionProps {
  questionIndex: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SingleChoiceQuestion = forwardRef(function SingleQuestion(
  { questionIndex, value, onChange } : SingleQuestionProps,
  ref:Ref<HTMLTextAreaElement>,
) {
  return (
    <div className="w-full  mr-5 mt-3">
      <div className="flex items-center gap-3">
        <div className="flex gap-2 text-[15px] border-gray-200">
          <span>Question</span>
          <span>{questionIndex + 1}</span>
        </div>
        <textarea
          className="border border-gray-200 rounded-md p-3 ml-3 w-full h-[50px] resize-none 
            text-[13px] outline-none"
          placeholder="Your Question Here..."
          value={value}
          onChange={onChange}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default SingleChoiceQuestion;