'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { ChoiceDataDto, QuestionDataDto } from '@/features/Quiz/interface';

interface ChoicesProps {
  singleQuestion: QuestionDataDto,
  handleQuestionUpdate: (updatedQuestion: QuestionDataDto) => void
}

function UpdateSingleChoice({
  singleQuestion,
  handleQuestionUpdate
}: ChoicesProps) {
  const { choices } = singleQuestion;
  const alphabets = ['A', 'B', 'C', 'D', 'E', 'F'];
  const positions = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'];
  function addAnewChoice() {
    // Check first if all the previous choices are not empty
    // -----------------------------------------------------
    const lastChoicesPosition = singleQuestion.choices.length;

    for (let i = lastChoicesPosition - 1; i >= 0; i--) {
      const eachInput =
        singleQuestion.choices[i].choiceContent;
      if (eachInput.trim().length === 0) {
        return toast.error(
          `Please ensure that all previous choices are filled out!`,
        );
      }
    }

    if (lastChoicesPosition < 6) {
      const newChoice:ChoiceDataDto = {
        id :"",
        choiceContent : "",
        isCorrect : false,
      };
      singleQuestion.choices.push(newChoice);
      handleQuestionUpdate(singleQuestion);
    }
  }

  function deleteChoice(choiceIndex: number) {
    singleQuestion.choices.splice(choiceIndex, 1);
    handleQuestionUpdate(singleQuestion);
  }

  function updateTheChoicesContent(text:string, choiceIndex:number) {
   singleQuestion.choices[choiceIndex].choiceContent = text;
   handleQuestionUpdate(singleQuestion);
  }

  function onCorrectAnswerChange(choiceIndex:number) {
    singleQuestion.choices.forEach((choice, index) => {
      choice.isCorrect = index === choiceIndex; 
    })
    handleQuestionUpdate(singleQuestion);
  }

  return (
    <div className=" flex gap-[39px] items-center mt-3">
      <div className="text-[15px]">Choices</div>
      <div className="border border-gray-200 rounded-md p-4 w-full ">
        {/* Choices Area */}
        {choices.map((singleChoice, choiceIndex) => (
          <div
            key={choiceIndex}
            className="flex gap-2 items-center mt-3 relative"
          >
            <input
            type="radio"
            name={`correctAnswer-${singleQuestion.id}`}
            checked={singleChoice.isCorrect}
            onChange={() => onCorrectAnswerChange(choiceIndex)}
            className="mr-2 accent-red-500"
          />
            <span>{alphabets[choiceIndex]}:</span>
            <input
              value={singleChoice.choiceContent}
              name = {`choice-${choiceIndex}`}
              onChange={(e) => {
                updateTheChoicesContent(
                  e.target.value,
                  choiceIndex,
                );
              }}
              className="border text-[13px]  border-gray-200 p-2 w-full rounded-md outline-none pr-10"
              placeholder={`Add Your ${positions[choiceIndex]} Choice`}
            />
            {choiceIndex >= 2 && (
              <FontAwesomeIcon
                icon={faXmark}
                width={10}
                height={10}
                className="text-red-600 absolute top-2 right-3 cursor-pointer"
                onClick={() => {
                  deleteChoice(choiceIndex);
                }}
              />
            )}
          </div>
        ))}

        {/* Button Area */}
        <div className="w-full flex justify-center mt-3 ">
          <button
            onClick={() => {
              addAnewChoice();
            }}
            className="p-3 bg-rose-700 rounded-md text-white w-[210px] text-[13px]"
          >
            Add a New Choice
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateSingleChoice;
