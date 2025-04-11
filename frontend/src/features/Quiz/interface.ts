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