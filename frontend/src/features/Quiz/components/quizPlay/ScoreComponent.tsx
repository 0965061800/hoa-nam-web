import useGlobalContextProvider from "@/context/ContextApi";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import confusedEmoji from "../../../../assets/confused-emoji.png";
import happyEmoji from "../../../../assets/happy-emoji.png";
import veryHappyEmoji from "../../../../assets/very-happy-emoji.png";

interface ScoreComponentProps {
  setIsQuizEnded: React.Dispatch<React.SetStateAction<boolean>>;
  setIndexOfQuizSelected: Dispatch<SetStateAction<number>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedChoice: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

function ScoreComponent(props: ScoreComponentProps) {
  const navigate = useNavigate();
  const { quizToStartObject, allQuizzes } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const numberOfQuestions = selectQuizToStart?.quizQuestions.length;
  // const router = useRouter();
  //
  const {
    setIsQuizEnded,
    setIndexOfQuizSelected,
    setCurrentQuestionIndex,
    setSelectedChoice,
    setScore,
    score,
  } = props;


  function emojiIconScore() : string {
    const result =
      (score /
        (selectQuizToStart ? selectQuizToStart.quizQuestions.length : -1)) *
      100;

    if (result < 25) {
      return confusedEmoji;
    }

    if (result == 50) {
      return happyEmoji;
    }
    return veryHappyEmoji;
  }

  console.log("emoji", emojiIconScore());

  function tryAgainFunction() {
    setIsQuizEnded(false);
    const newQuizIndex = allQuizzes.findIndex(
      (quiz) => quiz.id === selectQuizToStart?.id
    );
    console.log(newQuizIndex);
    setIndexOfQuizSelected(newQuizIndex);
    setCurrentQuestionIndex(0);
    setSelectedChoice(-1);
    setScore(0);
  }

  return (
    <div className="flex items-center justify-center top-[-50px] absolute w-full h-[500px] bg-white">
      {/* Score */}
      <div className="border border-gray-200 rounded-md shadow-lg px-40 py-10 flex gap-4 items-center justify-center flex-col ">
        <img src={emojiIconScore()} alt="" width={100} height={100} />
        <div className="flex gap-1 flex-col">
          <span className="font-bold text-2xl">Your Score</span>
          <div className="text-[22px] text-center">
            {score}/{numberOfQuestions}
          </div>
        </div>
        <button
          onClick={() => tryAgainFunction()}
          className="p-2 bg-rose-700 rounded-md text-white px-6"
        >
          Try Again
        </button>
        {/* statistics */}
        <div className="  w-full flex gap-2 flex-col mt-3">
          <div className="flex gap-1 items-center justify-center">
            {/* <Image src="/correct-answer.png" alt="" width={20} height={20} /> */}
            <span className="text-[14px]">Correct Answers: {score}</span>
          </div>
          <div className="flex gap-1 items-center justify-center">
            {/* <Image src="/incorrect-answer.png" alt="" width={20} height={20} /> */}
            <span className="text-[14px]">
              Incorrect Answers:
              {selectQuizToStart
                ? selectQuizToStart.quizQuestions.length - score
                : 0}
            </span>
          </div>
        </div>
        {/* <span>Or</span> */}
        <span
          onClick={() => {
            navigate("/quiz");
          }}
          className="text-rose-700 select-none cursor-pointer text-sm mt-8 "
        >
          Select Another Quiz
        </span>
      </div>
    </div>
  );
}

export default ScoreComponent;
