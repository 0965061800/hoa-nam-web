'use client';
import { useState, useEffect } from 'react';
import QuizCreateNav from '../components/quizCreate/QuizCreateNav';
import QuizCreateTitle from '../components/quizCreate/QuizCreateTitle';
import { AddQuizDto, AddQuizQuestionDto } from '../interface';
import QuizCreateQuestions from '../components/quizCreate/QuizCreateQuestion';

function QuizCreatePage() {
  const [quizQuestions, setQuizQuestions] = useState<AddQuizQuestionDto[]>([
      ]);

  const [newQuiz, setNewQuiz] = useState<AddQuizDto>({
        title: '',
        questions: quizQuestions,
      });
  useEffect(() => {
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: quizQuestions,
    }));
  }, [quizQuestions]);


  function onChangeQuizTitle(text: string) {
    setNewQuiz((prevQuiz) => ({ ...prevQuiz, title: text }));
  }


  const quizQuestionsProps = {
    quizQuestions,
    setQuizQuestions,
  };


  return (
    <div className=" relative mx-16 poppins">
      {/* <IconsComponents /> */}
      <QuizCreateNav newQuiz={newQuiz} />
      <QuizCreateTitle onChangeQuizTitle={onChangeQuizTitle} />
      <QuizCreateQuestions {...quizQuestionsProps} />
    </div>
  );
}

export default QuizCreatePage;
