import { AddQuizQuestionDto } from "../interface";

export interface validQuizQuestionsReturn {
  valid:boolean,
  message: string,
}


export function validateSingleQuestion(quizQuestions: AddQuizQuestionDto[]) : validQuizQuestionsReturn {
  for (const question of quizQuestions) {
    // Check if the main question is empty
    if (!question.content.trim()) {
      return { valid: false, message: 'Please fill in the question content.' };
    }

    // Check if any choice is empty
    if (question.choices.some((choice) => !choice.content)) {
      return { valid: false, message: 'Please fill in all choices.' };
    }

  }
  return { valid: true, message:"Valid quiz questions" };
}