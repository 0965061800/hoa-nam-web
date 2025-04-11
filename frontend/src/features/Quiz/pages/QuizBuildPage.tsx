'use client';

import useGlobalContextProvider from '@/context/ContextApi';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IconsComponents from '../components/quizBuild/IconsComponents';
import QuizBuildNav from '../components/quizBuild/QuizBuildNav';
import QuizBuildTitle from '../components/quizBuild/QuizBuildTitle';
import QuizBuildQuestions from '../components/quizBuild/QuizBuildQuestions';

function QuizBuildPage() {
  const prefixes = ['A', 'B', 'C', 'D'];
  const { selectedIconObject } = useGlobalContextProvider();
  const { selectedIcon } = selectedIconObject;
  const [focusFirst, setFocusFirst] = useState(true);

  const [quizQuestions, setQuizQuestions] = useState([
        {
          id: uuidv4(),
          mainQuestion: '',
          choices: prefixes.slice(0, 2).map((prefix) => prefix + '. '),
          correctAnswer: 0,
          answeredResult: -1,
          statistics: {
            totalAttempts: 0,
            correctAttempts: 0,
            incorrectAttempts: 0,
          },
        },
      ]);

  const [newQuiz, setNewQuiz] = useState({
        id: '',
        icon: selectedIcon.faIcon,
        quizTitle: '',
        quizQuestions: quizQuestions,
      });


  useEffect(() => {
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      icon: selectedIcon.faIcon,
      quizQuestions: quizQuestions,
    }));
  }, [quizQuestions, selectedIcon.faIcon]);

  function onChangeQuizTitle(text: string) {
    setNewQuiz((prevQuiz) => ({ ...prevQuiz, quizTitle: text }));
  }

  const quizNavBarProps = {
    quizQuestions,
    newQuiz,
    setNewQuiz,
  };

  const quizTitleProps = {
    focusProp: { focus: focusFirst, setFocusFirst },
    onChangeQuizTitle,
  };

  const quizQuestionsProps = {
    focusProp: { focus: !focusFirst, setFocusFirst },
    quizQuestions,
    setQuizQuestions,
  };

  return (
    <div className=" relative mx-16 poppins">
      <IconsComponents />
      <QuizBuildNav {...quizNavBarProps} />
      <QuizBuildTitle {...quizTitleProps} />
      <QuizBuildQuestions {...quizQuestionsProps} />
    </div>
  );
}

export default QuizBuildPage;
