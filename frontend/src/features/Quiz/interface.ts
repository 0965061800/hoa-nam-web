import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

export interface Statistic {
    totalAttempts: number,
    correctAttempts: number,
    incorrectAttempts: number,
}


export interface QuizQuestion {
    id: string,
    mainQuestion: string,
    choices: Array<string>,
    correctAnswer: number,
    answeredResult: number,
    statistics: Statistic
}

export interface QuizData {
    id: string,
    icon: IconDefinition,
    quizTitle: string,
    quizQuestions: Array<QuizQuestion>
}


export interface AddQuizDto {
    title: string
    questions: Array<AddQuizQuestionDto>
}

export interface AddQuizQuestionDto {
    content: string,
    questionType: QuestionType,
    choices: Array<AddQuizChoiceDto>
}

export interface AddQuizChoiceDto {
    content: string,
    isCorrect: boolean,
}

export enum QuestionType {
    SingleChoice,
    MultipleChoice,
    FillInBlank,
    Text
}