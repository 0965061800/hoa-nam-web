import React, { useEffect, useState } from "react";
import useQuizPlayContext from "../context/QuizPlayContext";
import { ChoiceInfoDto, QuestionType } from "../interface";

const QuizResultPage = () => {
  const { quizInfo, answerOfUser, score } = useQuizPlayContext();
  console.log(answerOfUser);
  function checkAnswer(questionId: string, choice: ChoiceInfoDto): string {
    let result = "unPick";
    const answerQuestion = answerOfUser.filter(
      (x) => x.questionId == questionId
    );
    if (answerQuestion.length == 0) return result;
    const checkingChoicePick = answerQuestion[0].userAnswer.filter(
      (x) => x.choiceId == choice.choiceId
    );
    if (checkingChoicePick.length == 0) return result;
    if (choice.isCorrect == false) result = "wrong";
    if (choice.isCorrect == true) result = "true";
    return result;
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          {quizInfo.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Shuffled: {quizInfo.isShuffled ? "Yes" : "No"}
        </p>
        {quizInfo.questions.map((question, index) => (
          <div
            key={question.questionId}
            className="border-l-4 border-blue-500 bg-gray-50 p-4 mb-6 rounded-md shadow-sm"
          >
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-lg font-semibold text-gray-800">
                Question {index + 1}: {question.questionContent}
              </h2>
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
                {question.choices.map((choice) => {
                  const result = checkAnswer(question.questionId, choice);
                  console.log(result);
                  return (
                    <li
                      key={choice.choiceId}
                      className={`p-3 rounded-xl border flex items-center gap-2 ${
                        result === "true"
                          ? "bg-green-100 border-green-400"
                          : result === "wrong"
                          ? "bg-rose-300 border-gray-300"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <span className="text-gray-700">
                        {choice.choiceContent}
                      </span>
                      {choice.isCorrect && (
                        <span className="text-green-600 text-xs font-bold">
                          (Correct)
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {question.questionType === QuestionType.FillInBlank && (
              <>
                <div className="text-gray-700">
                  Your answer:{" "} 
                  <span className="font-semibold">
                    {answerOfUser.filter(x => x.questionId == question.questionId)[0].userAnswer[0].choiceAnswer}
                  </span>
                </div>
                <div className="text-gray-700">
                  Correct Answer:{" "} 
                  <span className="font-semibold">
                    {question.choices[0]?.choiceContent}
                  </span>
                </div>
              </>
            )}

            {question.questionType === QuestionType.Text && (
              <div className="text-gray-500 italic">
                (Open-ended question — no predefined answer)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResultPage;
