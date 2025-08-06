'use client';

import React, {useEffect, useState } from 'react';
import useGlobalContextProvider from '../../../../context/ContextApi';
import toast, { Toaster } from 'react-hot-toast';
import { QuizQuestion } from '@/features/Quiz/interface';
import ScoreComponent from './ScoreComponent';
import useQuizPlayContext from '../../context/QuizPlayContext';



function QuizStartQuestions({ onUpdateTime }) {
  const time = 300;
  const { quizToStartObject, allQuizzes, setAllQuizzes, userObject } =
    useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const { quizQuestions } = selectQuizToStart;


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number>(-1);
  const [indexOfQuizSelected, setIndexOfQuizSelected] = useState<number>(-1);
  
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  
  const [score, setScore] = useState(0);

  const [timer, setTimer] = useState(time);
  let interval : any;
// Timer set time decrease every second
  function startTimer() {
    clearInterval(interval);
    setTimer(time);

    interval = setInterval(() => {
      setTimer((currentTime) => {
        onUpdateTime(currentTime);
        if (currentTime === 0) {
          clearInterval(interval);
          return 0;
        }
        return currentTime - 1;
      });
    }, 1000);
  }

  async function saveDataIntoDB() {
    try {
      const id = selectQuizToStart ? selectQuizToStart.id : null;
      // Get the _id of the quiz
      const res = await fetch(
        `http://localhost:3000/api/quizzes?id=${id}`, // Include the id as a query parameter
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            updateQuizQuestions: allQuizzes[indexOfQuizSelected ?? 0].quizQuestions,
          }),
        },
      );
      if (!res.ok) {
        toast.error('Something went wrong while saving...');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  }, [currentQuestionIndex]);


  //logic when time is end up
  useEffect(() => {
    if (timer === 0 && !isQuizEnded) {
      // Updating the allQuizzes
      const currentQuizzes = [...allQuizzes];
      currentQuizzes[indexOfQuizSelected ?? -1].quizQuestions[
        currentQuestionIndex
      ].statistics.totalAttempts += 1;
      currentQuizzes[indexOfQuizSelected ?? -1].quizQuestions[
        currentQuestionIndex
      ].statistics.incorrectAttempts += 1;

      setAllQuizzes(currentQuizzes);
      // --------------------
      if (currentQuestionIndex !== quizQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((current) => {
            return current + 1;
          });
        }, 1000);
      } else {
        setIsQuizEnded(true);
        clearInterval(interval);
      }
    }
  }, [timer]);

  // With the useEffect every time the component is loaded up
  //we need to get the index of the quiz we selected inside
  // the allquizzes array to update it when we choose tne answer
  //
  useEffect(() => {
    if (selectQuizToStart != null) {
      const quizIndexFound = allQuizzes.findIndex(
        (quiz) => quiz.id === selectQuizToStart.id,
      );
      setIndexOfQuizSelected(quizIndexFound);
    }
  }, []);

  useEffect(() => {
    if (isQuizEnded) {
      // renitialize all answers to -1
      quizQuestions.forEach((quizQuestion: QuizQuestion) => {
        quizQuestion.answeredResult = -1;
      });
      saveDataIntoDB();
    }
  }, [isQuizEnded]);

  function selectChoiceFunction(choiceIndexClicked: number) {
    // update the selectedChoice variable state
    setSelectedChoice(choiceIndexClicked);
    //---------------------------------------

    //We update the answerResult proprety in the allQuizzes array
    const currentAllQuizzes = [...allQuizzes];

    currentAllQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].answeredResult = choiceIndexClicked;

    setAllQuizzes(currentAllQuizzes);
    //------------------------------------
  }

  function moveToTheNextQuestion() {
    // Check if the we did select the an answer by using the answerResult proprety if
    //it's still equal to -1
    if (
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult === -1
    ) {
      toast.error('please select an answer');
      return;
    }

    // Update the statistics of the question
    // ======================================
    // update the total Attemptes:
    allQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].statistics.totalAttempts += 1;

    // if the answer is incorrect
    if (
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult !==
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .correctAnswer
    ) {
      // update the incorrect attemptes
      allQuizzes[indexOfQuizSelected].quizQuestions[
        currentQuestionIndex
      ].statistics.incorrectAttempts += 1;
      toast.error('Incorrect Answer!');

      // if the answer is incorrect, go to the next question only
      // if we are not at the last question
      if (currentQuestionIndex != quizQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((current) => current + 1);
          // initialize the choice after going to the next question
          setSelectedChoice(-1);
        }, 1200);
      } else {
        // if we select the wrong choice and we are at the end of the question
        // end the quiz
        setTimer(0);
        clearInterval(interval);
        setIsQuizEnded(true);
      }

      return;
    }

    // update the correct attemptes
    allQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].statistics.correctAttempts += 1;
    // Increment the score by 1
    setScore((prevState) => prevState + 1);
    toast.success('Awesome!');
    // addExperience();

    // This will stop the timer and end the quiz when currentQuestionIndex is the last
    // and only if we select the correct otherwise the timer is still running
    if (
      currentQuestionIndex === quizQuestions.length - 1 &&
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult ===
        allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
          .correctAnswer
    ) {
      setTimer(0);
      clearInterval(interval);
      setIsQuizEnded(true);
      return;
    }

    // increment the currentQuestionIndex by 1 to go to the next question
    setTimeout(() => {
      setCurrentQuestionIndex((current) => current + 1);
      // initialize the choice after going to the next question
      setSelectedChoice(-1);
    }, 2000);
  }

  return (
    <div className="relative poppins rounded-sm m-9 w-9/12  ">
      <Toaster
        toastOptions={{
          // Define default options
          className: '',
          duration: 1500,
          style: {
            padding: '12px',
          },
        }}
      />
      {/* The Question Part */}
      <div className="flex items-center gap-2">
        <div className="bg-rose flex  justify-center items-center rounded-md w-11 h-11 text-white p-3">
          {currentQuestionIndex + 1}
        </div>
        <p>{quizQuestions[currentQuestionIndex].mainQuestion}</p>
      </div>
      {/* The Answers Part */}
      <div className="mt-7 flex flex-col gap-2">
        {quizQuestions[currentQuestionIndex].choices.map(
          (choice:number, indexChoice:number) => (
            <div
              key={indexChoice}
              onClick={() => {
                selectChoiceFunction(indexChoice);
              }}
              className={`p-3 ml-11 w-10/12 border border-rose-700 rounded-md
               hover:bg-rose-700 hover:text-white transition-all select-none ${
                 selectedChoice === indexChoice
                   ? 'bg-rose-700 text-white'
                   : 'bg-white'
               }`}
            >
              {choice}
            </div>
          ),
        )}
      </div>
      {/* Submit Button */}
      <div className="flex justify-end mt-7  ">
        <button
          onClick={() => {
            moveToTheNextQuestion();
          }}
          disabled={isQuizEnded ? true : false}
          className={`p-2 px-5 text-[15px] text-white rounded-md bg-rose-700 mr-[70px] ${
            isQuizEnded ? 'opacity-60' : 'opacity-100'
          }`}
        >
          Submit
        </button>
      </div>
      {isQuizEnded && (
        <ScoreComponent
          setIsQuizEnded={setIsQuizEnded}
          setIndexOfQuizSelected={setIndexOfQuizSelected}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          setSelectedChoice={setSelectedChoice}
          score={score}
          setScore={setScore}
      />
      )}
    </div>
  );
}

export default QuizStartQuestions;

