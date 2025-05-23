'use client';

import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  forwardRef,
  useLayoutEffect,
  RefObject,
  Ref,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import Choices from './Choices';
import { QuizQuestion } from '@/features/Quiz/interface';


export interface quizQuestionsProps {
  focusProp: {
      focus: boolean;
      setFocusFirst: React.Dispatch<React.SetStateAction<boolean>>;
  };
  quizQuestions: QuizQuestion[];
  setQuizQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}

function QuizBuildQuestions({ focusProp, quizQuestions, setQuizQuestions }: quizQuestionsProps) {
  const prefixes = ['A', 'B', 'C', 'D'];
  const { focus, setFocusFirst } = focusProp;
  const endOfListRef = useRef<HTMLDivElement | null>(null);
  const textAreaRefs = useRef<RefObject<HTMLTextAreaElement | null>[]>(quizQuestions.map(() =>
    createRef<HTMLTextAreaElement>()
  ));

  //
  // Add a new question to the quizQuestions
  // ----------------------------------------
  function addNewQuestion() {
    setFocusFirst(false);
    // This code below to verify if the question field is empty or not
    // --------------------------------------------------------------
    const lastIndexQuizQuestions = quizQuestions.length - 1;
    if (
      quizQuestions[lastIndexQuizQuestions].mainQuestion.trim().length === 0
    ) {
      toast.error(`The question ${lastIndexQuizQuestions + 1} is still empty!`); //Show the error message
      const ref = textAreaRefs.current[lastIndexQuizQuestions];
      ref?.current?.focus(); //Set the focus back to the filed
      return;
    }

    // This code check out if all the previous choices input are not empty
    // --------------------------------------------------------------
    for (const choice of quizQuestions[lastIndexQuizQuestions].choices) {
      const singleChoice = choice.substring(2);
      if (singleChoice.trim().length === 0) {
        return toast.error(
          `Please ensure that all previous choices are filled out!`,
        );
      }
    }

    // This code check out if the correct answer input is not empty
    // --------------------------------------------------------------
    if (quizQuestions[lastIndexQuizQuestions].correctAnswer == 0) {
      return toast.error(`Please ensure to fill out the correct answer!`);
    }

    // -----------------------------------------------------------------

    // This code create a new question objet and add it to the quiz questions array
    // ---------------------------------------------------------------------------
    const newQuetion = {
      id: uuidv4(),
      mainQuestion: '',
      choices: prefixes.slice(0, 2).map((prefix) => prefix + ' '),
      correctAnswer: 0,
      answeredResult: -1,
      statistics: {
        totalAttempts: 0,
        correctAttempts: 0,
        incorrectAttempts: 0,
      },
    };
    setQuizQuestions([...quizQuestions, newQuetion]);
    textAreaRefs.current = [...textAreaRefs.current, createRef()];
    // ---------------------------------------------------------------------
  }

  function deleteQuestion(singleQuestion: QuizQuestion) {
    const quizQuestionsCopy = [...quizQuestions];
    const filterQuestionToDelete = quizQuestionsCopy.filter(
      (question) => singleQuestion.id !== question.id,
    );
    // Filter out the corresponding ref
    const updatedRefs = textAreaRefs.current.filter((ref, index) => {
      return quizQuestions[index].id !== singleQuestion.id;
    });

    textAreaRefs.current = updatedRefs;
    setQuizQuestions(filterQuestionToDelete);
  }

  function handleInputChange(index: number, text:string) {
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (index === i) {
        return { ...question, mainQuestion: text };
      }

      return question;
    });

    setQuizQuestions(updatedQuestions);
  }

  function updateTheChoicesArray(text:string, choiceIndex:number, questionIndex:number) {
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (questionIndex === i) {
        const updatedChoices = question.choices.map((choice, j) => {
          if (choiceIndex === j) {
            return prefixes[j] + '. ' + text;
          } else {
            return choice;
          }
        });

        return { ...question, choices: updatedChoices };
      }

      return question;
    });

    setQuizQuestions(updatedQuestions);
  }

  function updateCorrectAnswer(text:string, questionIndex:number) {
    const correctAnswersArray = ['A', 'B', 'C', 'D'];

    const questionsCopy = [...quizQuestions];
    questionsCopy[questionIndex].correctAnswer =
      correctAnswersArray.indexOf(text);
    setQuizQuestions(questionsCopy);
  }

  useLayoutEffect(() => {
    if (endOfListRef.current && focus) {
      const timer = setTimeout(() => {
        endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  
      return () => clearTimeout(timer);
    }
  }, [quizQuestions.length, focus]);

  useEffect(() => {
    // Focus the last textarea if it exists
    const lastTextAreaIndex = quizQuestions.length - 1;
    if (lastTextAreaIndex >= 0) {
      const lastTextArea = textAreaRefs.current[lastTextAreaIndex].current;
      if (lastTextArea && focus) {
        lastTextArea.focus();
      }
    }
  }, [quizQuestions.length, focus]);

  return (
    <div className="p-3 mt-6 flex justify-between border border-rose-700 rounded-md relative">
      <Toaster
        toastOptions={{
          style: {
            fontSize: '13px',
          },
        }}
      />

      <div className="flex gap-2 flex-col  w-full">
        {/* Header Area */}
        <div className="flex gap-2 items-center">
          <div className="bg-rose-700 px-4 py-2  rounded-md text-white">2</div>
          <span className="font-bold">Quiz Questions : </span>
        </div>
        {/* Questions Area */}
        {quizQuestions.map((singleQuestion, questionIndex) => (
          <div
            ref={
              quizQuestions.length - 1 === questionIndex ? endOfListRef : null
            }
            key={questionIndex}
            className="border ml-5 p-4 mt-4 flex-col  border-green-700 
        border-opacity-50 rounded-md flex justify-center relative "
          >
            <SingleQuestion
              questionIndex={questionIndex}
              value={singleQuestion.mainQuestion}
              ref={textAreaRefs.current[questionIndex]}
              onChange={(e) => {
                handleInputChange(questionIndex, e.target.value);
              }}
            />
            <Choices
              questionIndex={questionIndex}
              singleQuestion={singleQuestion}
              quizQuestions={quizQuestions}
              setQuizQuestions={setQuizQuestions}
              onChangeChoice={(text: string, choiceIndex: number, questionIndex: number) => {
                updateTheChoicesArray(text, choiceIndex, questionIndex);
              }}
              value={singleQuestion.choices}
              prefixes={prefixes}
            />
            {questionIndex !== 0 && (
              <FontAwesomeIcon
                icon={faXmark}
                width={10}
                height={10}
                className="text-red-600 absolute top-2 right-3 cursor-pointer"
                onClick={() => {
                  deleteQuestion(singleQuestion);
                }}
              />
            )}

            <CorrectAnswer
              onChangeCorrectAnswer={(text: string) => {
                updateCorrectAnswer(text, questionIndex);
              }}
              singleQuestion={singleQuestion}
            />
          </div>
        ))}

        {/* Button Area */}
        <div className="w-full flex justify-center mt-3 ">
          <button
            onClick={() => {
              addNewQuestion();
            }}
            className="p-3 bg-rose-700 rounded-md text-white w-[210px] text-[13px]"
          >
            Add a New Question
          </button>
        </div>
      </div>
    </div>
  );
}
export default QuizBuildQuestions;

interface CorrectAnswerProps {
  onChangeCorrectAnswer(value: string): void,
  singleQuestion: QuizQuestion,
}


function CorrectAnswer({onChangeCorrectAnswer, singleQuestion} : CorrectAnswerProps) {
  const [correctAnswerInput, setCorrectAnswerInput] = useState(
    singleQuestion.correctAnswer,
  );
  const prefixes = ['A', 'B', 'C', 'D'];
  function handleOnChangeInput(text: string) {
    const upperText = text.toUpperCase();
    for (const choice of singleQuestion.choices) {
      const eachChoice = choice.substring(0, 1);

      if (eachChoice === upperText || upperText === '') {
        //setCorrectAnswerInput(upperText);
        onChangeCorrectAnswer(upperText);
      }
    }
  }
  return (
    <div className=" flex  gap-1 items-center mt-3">
      <div className="text-[15px]">Correct Answer</div>
      <div className="border border-gray-200 rounded-md p-1 w-full ">
        <input
          value={prefixes[correctAnswerInput]}
          maxLength={1}
          onChange={(e) => {
            handleOnChangeInput(e.target.value);
          }}
          className="p-3 outline-none w-full text-[13px]"
          placeholder="Add the correct answer..."
        />
      </div>
    </div>
  );
}


interface SingleQuestionProps {
  questionIndex: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SingleQuestion = forwardRef(function SingleQuestion(
  { questionIndex, value, onChange } : SingleQuestionProps,
  ref:Ref<HTMLTextAreaElement>,
) {
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
          value={value}
          onChange={onChange}
          ref={ref}
        />
      </div>
    </div>
  );
});
