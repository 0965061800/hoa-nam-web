'use client';
import { useState, useEffect } from 'react';
import QuizCreateNav from '../components/quizCreate/QuizCreateNav';
import QuizCreateTitle from '../components/quizCreate/QuizCreateTitle';
import QuizCreateQuestions from '../components/quizCreate/QuizCreateQuestion';
import { AddQuizDto, AddQuizQuestionDto } from '../types/interfaces';

function QuizCreatePage() {
  const [quizQuestions, setQuizQuestions] = useState<AddQuizQuestionDto[]>([
      ]);

  const [newQuiz, setNewQuiz] = useState<AddQuizDto>({
        title: '',
        isShuffled: true,
        timeToPlay: 300,
        questions: quizQuestions,
      });
  useEffect(() => {
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: quizQuestions,
    }));
  }, [quizQuestions]);


  function onChangeQuizInfo(title: string, isShuffled: boolean, timeToPlay:number) {
    setNewQuiz((prevQuiz) => ({ ...prevQuiz, title: title, isShuffled: isShuffled, timeToPlay: timeToPlay }));
  }



  const quizQuestionsProps = {
    quizQuestions,
    setQuizQuestions,
  };


  return (
    <div className=" relative mx-16 poppins">
      {/* <IconsComponents /> */}
      <QuizCreateNav newQuiz={newQuiz} />
      <QuizCreateTitle onChangeQuizInfo={onChangeQuizInfo} />
      <QuizCreateQuestions {...quizQuestionsProps} />
    </div>
  );
}

export default QuizCreatePage;
