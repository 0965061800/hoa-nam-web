import useDebounce from "@/hooks/useDebounce";
import { forwardRef, Ref, useEffect, useState } from "react";

interface SingleQuestionProps {
  questionIndex: number;
  onChangeContent: (value: string) => void;
}

const MultipleChoiceQuestion = forwardRef(function SingleQuestion(
  { questionIndex, onChangeContent } : SingleQuestionProps,
  ref:Ref<HTMLTextAreaElement>,
) {
  const [content, setContent] = useState('')
  const debounceContent = useDebounce(content, 600);

  useEffect(() => {
    onChangeContent(debounceContent);
  }, [debounceContent])

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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default MultipleChoiceQuestion;