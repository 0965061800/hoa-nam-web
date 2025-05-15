'use client';

import React, {
  useRef,
  createRef,
  useLayoutEffect,
  RefObject,
  useState,
} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AddQuizQuestionDto, QuestionType, } from '@/features/Quiz/interface';
import SingleChoiceQuestionArea from '../question/SingleChoiceQuestion/SingleChoiceQuestionArea';
import PickQuestionType from '../popups/PickQuestionType';
import MultipleChoiceQuestionArea from '../question/MultipleChoiceQuestion/MultipleChoiceQuestionArea';
import FillInBlankQuestionArea from '../question/FillInBlankQuestion/FillInBlankQuestionArea';


export interface quizQuestionsProps {
  quizQuestions: AddQuizQuestionDto[];
  setQuizQuestions: React.Dispatch<React.SetStateAction<AddQuizQuestionDto[]>>;
}

function QuizCreateQuestions({quizQuestions, setQuizQuestions }: quizQuestionsProps) {
  const endOfListRef = useRef<HTMLDivElement | null>(null);
  const textAreaRefs = useRef<RefObject<HTMLTextAreaElement | null>[]>(quizQuestions.map(() =>
    createRef<HTMLTextAreaElement>()
  ));
  const [pickQuestionType, setPickQuestionType] = useState<boolean>(false)
  // Add a new question to the quizQuestions
  function addNewQuestion(questionType: number) {
    // This code below to verify if the question field is empty or not
    const lastIndexQuizQuestions = quizQuestions.length - 1;
    if (lastIndexQuizQuestions >= 0) {
      if (
        quizQuestions[lastIndexQuizQuestions].content.trim().length === 0
      ) {
        toast.error(`The question ${lastIndexQuizQuestions + 1} is still empty!`); 
        const ref = textAreaRefs.current[lastIndexQuizQuestions];
        ref?.current?.focus(); //Set the focus back to the filed
        return;
      }
  
      // This code check out if all the previous choices input are not empty
      for (const choice of quizQuestions[lastIndexQuizQuestions].choices) {
        if (choice.content.trim().length === 0) {
          return toast.error(
            `Please ensure that all previous choices are filled out!`,
          );
        }
      }
    }
    // This code create a new question objet and add it to the quiz questions array
     const newQuestion: AddQuizQuestionDto = {
        content: '',
        questionType: questionType,
        choices: []
      };

    setQuizQuestions([...quizQuestions, newQuestion]);
    textAreaRefs.current = [...textAreaRefs.current, createRef()];
  }

  function deleteQuestion(singleQuestion: AddQuizQuestionDto, questionIndex: number) {
    const quizQuestionsCopy = [...quizQuestions];
    const filterQuestionToDelete = quizQuestionsCopy.filter(
      (question, index) => index != questionIndex
    );
    // Filter out the corresponding ref
    const updatedRefs = textAreaRefs.current.filter((ref, index) => {
      return quizQuestions[index].content !== singleQuestion.content;
    });

    textAreaRefs.current = updatedRefs;
    setQuizQuestions(filterQuestionToDelete);
  }


  //Scroll to view of last question
  useLayoutEffect(() => {
    if (endOfListRef.current) {
      const timer = setTimeout(() => {
        endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  
      return () => clearTimeout(timer);
    }
  }, [quizQuestions.length]);


  const handlePickQuestionType = (value: string) => {
    setPickQuestionType(false);
    addNewQuestion(parseInt(value, 10));
  }
  return (
    <>
      {pickQuestionType ? <PickQuestionType handlePickQuestionType={handlePickQuestionType} handleCancelCreateNewQuestion ={() => setPickQuestionType(false)}></PickQuestionType>:""}
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
          {
            quizQuestions.map((question, questionIndex) => 
              question.questionType == QuestionType.SingleChoice ? <SingleChoiceQuestionArea
              questionIndex={questionIndex}
              question={question}
              quizQuestions = {quizQuestions}
              endOfListRef = {endOfListRef}
              textAreaRefs = {textAreaRefs}
              setQuizQuestions = {setQuizQuestions}
              deleteQuestion = {deleteQuestion}
              /> : question.questionType == QuestionType.MultipleChoice ? <MultipleChoiceQuestionArea
              questionIndex={questionIndex}
              question={question}
              quizQuestions = {quizQuestions}
              endOfListRef = {endOfListRef}
              textAreaRefs = {textAreaRefs}
              setQuizQuestions = {setQuizQuestions}
              deleteQuestion = {deleteQuestion}
              /> : question.questionType == QuestionType.FillInBlank ? <FillInBlankQuestionArea
              questionIndex={questionIndex}
              question={question}
              quizQuestions = {quizQuestions}
              endOfListRef = {endOfListRef}
              textAreaRefs = {textAreaRefs}
              setQuizQuestions = {setQuizQuestions}
              deleteQuestion = {deleteQuestion}
              /> : ""
            )
          }

          {/* Button Area */}
          <div className="w-full flex justify-center mt-3 ">
            <button
              onClick={() => {
                setPickQuestionType(true)
              }}
              className="p-3 bg-rose-700 rounded-md text-white w-[210px] text-[13px]"
            >
              Add a New Question
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default QuizCreateQuestions;
