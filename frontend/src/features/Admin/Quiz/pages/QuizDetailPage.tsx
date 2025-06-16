import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { QuestionDataDto, QuestionType, QuizDataDto } from "../types/interfaces";
import UpdateQuestionView from "../components/ViewQuiz/UpdateQuestionView";
import PickQuestionType from "../components/PickQuestionType";
import { handleCreatedQuestion, handleGetAdminQuizDetail, handleUpdatedQuestion } from "../services/apis/handle";

const QuizDetailPage = () => {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState<QuizDataDto | undefined>(undefined);
  console.log(quiz)
  const { token } = useAuth();

  async function fetchQuizzes() {
    const data = await handleGetAdminQuizDetail(token, quizId ?? "");
    if (data) {
      setQuiz(data); // quizzes: AdminQuiz[]
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);


//Handle Update Question
  const [mode, setMode] = useState<"update"|"create">("update");

  
  const [popUpChooseType, setPopUpChooseType] = useState<boolean>(false);
  
  const [questionUpdate, setQuestionUpdate] = useState<QuestionDataDto>();
  
  function handleEditQuestion(question: QuestionDataDto) {
    setPopUpQuestionUpdate(true);
    setQuestionUpdate(question);
    setMode("update");
  }
  function handleCancelUpdateQuestion() {
    setPopUpQuestionUpdate(false);
    setQuestionUpdate(undefined);
  }
  
  const [popUpQuestionUpdate, setPopUpQuestionUpdate] =
    useState<boolean>(false);
  function handleCreateQuestion(questionType: string) {
    setPopUpChooseType(false);
    setPopUpQuestionUpdate(true);
    setMode("create");
    const newQuestion : QuestionDataDto = {
      id : "",
      questionContent : "",
      questionType: parseInt(questionType, 10),
      choices : []
    }
    setQuestionUpdate(newQuestion);
  }


  async function handleUpdateQuestion(updatedQuestion: QuestionDataDto) {
    console.log(updatedQuestion)
    await handleUpdatedQuestion(token, updatedQuestion, quizId!);
    setPopUpQuestionUpdate(false);
    setQuestionUpdate(undefined);
    await fetchQuizzes();
  }

  async function CreateQuestion(updatedQuestion: QuestionDataDto) {
     await handleCreatedQuestion(token, updatedQuestion, quizId!);
      setPopUpQuestionUpdate(false);
      setQuestionUpdate(undefined);
      await fetchQuizzes();
  }


  return quiz == undefined ? (
    <div></div>
  ) : (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {popUpQuestionUpdate ? (
        <UpdateQuestionView
          mode = {mode}
          question={questionUpdate!}
          handleCancelUpdateQuestion={handleCancelUpdateQuestion}
          handleSaveChangeQuestion={(value) => mode == "update" ? handleUpdateQuestion(value) : CreateQuestion(value)}
        ></UpdateQuestionView>
      ) : (
        ""
      )}
      {popUpChooseType ? (
        <PickQuestionType
          handlePickQuestionType={handleCreateQuestion}
          handleCancelCreateNewQuestion={() => setPopUpChooseType(false)}
        ></PickQuestionType>
      ) : (
        ""
      )}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{quiz.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Shuffled: {quiz.isShuffled ? "Yes" : "No"}
        </p>

        {quiz.questions.map((question, index) => (
          <div
            key={question.id}
            className="border-l-4 border-blue-500 bg-gray-50 p-4 mb-6 rounded-md shadow-sm"
          >
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-lg font-semibold text-gray-800">
                Question {index + 1}: {question.questionContent}
              </h2>
              <button
                onClick={() => handleEditQuestion(question)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
            <p className="text-sm italic text-gray-600 mb-3">
              Type:{" "}
              {question.questionType == 0
                ? "Single choice"
                : question.questionType == 1
                ? "Multiple choice"
                : question.questionType == 2
                ? "Fill in blank"
                : "Text"}
            </p>
            {/* Choices */}
            {question.questionType == 0 ||
            question.questionType == QuestionType.MultipleChoice ? (
              <ul className="space-y-2">
                {question.choices.map((choice) => (
                  <li
                    key={choice.id}
                    className={`p-3 rounded-xl border flex items-center gap-2 ${
                      choice.isCorrect
                        ? "bg-green-100 border-green-400"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <span className="text-gray-700">{choice.choiceContent}</span>
                    {choice.isCorrect && (
                      <span className="text-green-600 text-xs font-bold">
                        (Correct)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}

            {question.questionType === QuestionType.FillInBlank && (
              <div className="text-gray-700">
                Correct Answer:{" "}
                <span className="font-semibold">
                  {question.choices[0]?.choiceContent}
                </span>
              </div>
            )}

            {question.questionType === QuestionType.Text && (
              <div className="text-gray-500 italic">
                (Open-ended question — no predefined answer)
              </div>
            )}
          </div>
        ))}
       <button
        onClick={() => setPopUpChooseType(true)}
        className="text-sm bg-rose-500 text-white px-3 py-1 rounded-lg hover:bg-rose-600"
      >
        New question
      </button>
      </div>
    </div>
  );
};

export default QuizDetailPage;
