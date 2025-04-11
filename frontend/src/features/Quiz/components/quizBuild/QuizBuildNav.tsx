'use client';
import React, { useState } from 'react';
import useGlobalContextProvider from '../../../../context/ContextApi';
import toast from 'react-hot-toast';
import convertFromFaToText from '../../utils/convertFromFaToText';
import { QuizData, QuizQuestion } from '@/features/Quiz/interface';
import QuizBuildIcon from '../../../../assets/quiz-builder-icon.png'
import { useNavigate } from 'react-router-dom';


export interface validQuizQuestionsReturn {
  valid:boolean,
  message: string,
}

const apiUrl = process.env.REACT_APP_API_URL;

function validateQuizQuestions(quizQuestions: QuizQuestion[]) : validQuizQuestionsReturn {
  for (const question of quizQuestions) {
    // Check if the main question is empty
    if (!question.mainQuestion.trim()) {
      return { valid: false, message: 'Please fill in the main question.' };
    }

    // Check if any choice is empty
    if (question.choices.some((choice) => !choice.trim().substring(2))) {
      return { valid: false, message: 'Please fill in all choices.' };
    }

    // Check if the correct answer is empty
    if (question.correctAnswer === 0) {
      return { valid: false, message: 'Please specify the correct answer.' };
    }
  }
  return { valid: true, message:"Valid quiz questions" };
}

interface Props {
  newQuiz: QuizData, 
  setNewQuiz: React.Dispatch<React.SetStateAction<QuizData>>

}

function QuizBuildNav({ newQuiz }: Props) {
  const { allQuizzes, setAllQuizzes, selectedQuizObject } =
    useGlobalContextProvider();

  const { selectedQuiz } = selectedQuizObject;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function createNewQuiz() {
    try {
      setIsLoading(true);
      const textIcon = convertFromFaToText(newQuiz.icon);
      const quizWithTextIcon = {
        ...newQuiz,
        icon: textIcon,
      };
      
      const res = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(quizWithTextIcon), // Adding the new quiz to the db
      });

      if (!res.ok) {
        toast.error('Failed to create a new quiz!');
        setIsLoading(false);
        return;
      }

      const { id } = await res.json();
      console.log(id);
      // Update the _id property of the newQuiz object
      const updatedQuiz = { ...newQuiz, _id: id, icon: newQuiz.icon };

      setAllQuizzes([...allQuizzes, updatedQuiz]);

      toast.success('The quiz has been created successfully!');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveQuiz() {
    if (newQuiz.quizTitle.trim().length === 0) {
      return toast.error('Please add a name for the quiz!');
    }

    const isValid = validateQuizQuestions(newQuiz.quizQuestions);
    if (isValid.valid === false) {
      toast.error(isValid.message);
      return;
    }

    if (selectedQuiz) {
      const updatedQuiz = [...allQuizzes]; // Assuming allQuizzes contains the current state of quizzes
      const findIndexQuiz = updatedQuiz.findIndex(
        (quiz) => quiz.id === newQuiz.id,
      );

      if (findIndexQuiz !== -1) {
        updatedQuiz[findIndexQuiz] = newQuiz;
      }
      const id = updatedQuiz[findIndexQuiz].id;
      //
      const convertIconText = convertFromFaToText(
        updatedQuiz[findIndexQuiz].icon,
      );
      
      const updateDbQuiz = {
        ...updatedQuiz[findIndexQuiz],
        icon:  convertIconText
      }
      try {
        const res = await fetch(`${apiUrl}/users`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            updateQuiz: updateDbQuiz,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to update quiz');
        }

        toast.success('The quiz has been saved successfully.');
        setAllQuizzes(updatedQuiz);
      } catch (error) {
        toast.error(`The quiz has been saved successfully. ${error}`);
      }
    } else {
      createNewQuiz();
      navigate('/quiz'); // Navigate to main page
    }
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

export default QuizBuildNav;
