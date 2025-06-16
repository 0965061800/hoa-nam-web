'use client';
import toast from 'react-hot-toast';
import { AddQuizDto} from '@/features/Quiz/interface';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import QuizBuildIcon from '../../../../../assets/quiz-builder-icon.png'
import { useAuth } from '@/hooks/useAuth';
import { handleCreateQuiz } from '../../services/apis/handle';
import { validateSingleQuestion } from '../../services/validateQuestion';


interface Props {
  newQuiz: AddQuizDto
}

function QuizCreateNav({ newQuiz }: Props) {
  const {token} = useAuth()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function saveQuiz() {
    if (newQuiz.title.trim().length === 0) {
      return toast.error('Please add a name for the quiz!');
    }
    const isValid = validateSingleQuestion(newQuiz.questions);
    if (isValid.valid === false) {
      toast.error(isValid.message);
      return;
    }
    setIsLoading(true);
    handleCreateQuiz(newQuiz, token);
    setIsLoading(false);
    navigate('/quiz');
  }

  return (
    <div className="poppins my-12 flex justify-between items-center ">
      <div className="flex gap-2 items-center">
        <img src={QuizBuildIcon} alt="" height={50} width={50} />
        <span className="text-2xl">
          Quiz <span className="text-rose-700 font-bold">Builder</span>
        </span>
      </div>
      <button
        onClick={() => {
          saveQuiz();
        }}
        className="p-2 px-4 bg-rose-700 rounded-md text-white"
      >
        {isLoading ? 'Loading...' : 'Save'}
      </button>
    </div>
  );
}

export default QuizCreateNav;
