import { useNavigate, useParams } from "react-router-dom";

import confusedEmoji from "../../../../assets/confused-emoji.png";
import happyEmoji from "../../../../assets/happy-emoji.png";
import veryHappyEmoji from "../../../../assets/very-happy-emoji.png";
import useQuizPlayContext from "../../context/QuizPlayContext";


function ScoreComponent() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const {score} = useQuizPlayContext();
  const {totalQuestion, totalRightAnswer} = score
  function emojiIconScore() : string {
    const result =
      (totalRightAnswer /
        totalQuestion ) *
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

  function watchResult() {
    navigate(`/user/quizzes/${quizId}/view-result`);
    
  }

  return (
    <div className="flex items-center justify-center top-[-50px] absolute w-full h-[500px] bg-white">
      {/* Score */}
      <div className="border border-gray-200 rounded-md shadow-lg px-40 py-10 flex gap-4 items-center justify-center flex-col ">
        <img src={emojiIconScore()} alt="" width={100} height={100} />
        <div className="flex gap-1 flex-col">
          <span className="font-bold text-2xl">Your Score</span>
          <div className="text-[22px] text-center">
            {totalRightAnswer}/{totalQuestion}
          </div>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => tryAgainFunction()}
            className="p-2 bg-rose-700 rounded-md text-white px-6"
          >
            Try Again
          </button>
          <button
            onClick={() => watchResult()}
            className="p-2 bg-rose-700 rounded-md text-white px-6"
          >
            Wath result
          </button>
        </div>
        {/* statistics */}
        <div className="  w-full flex gap-2 flex-col mt-3">
          <div className="flex gap-1 items-center justify-center">
            {/* <Image src="/correct-answer.png" alt="" width={20} height={20} /> */}
            <span className="text-[14px]">Correct Answers: {totalRightAnswer}</span>
          </div>
          <div className="flex gap-1 items-center justify-center">
            {/* <Image src="/incorrect-answer.png" alt="" width={20} height={20} /> */}
            <span className="text-[14px]">
              Incorrect Answers:
              {totalQuestion - totalRightAnswer}
            </span>
          </div>
        </div>
        {/* <span>Or</span> */}
        <span
          onClick={() => {
            navigate("/user/quizzes");
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
