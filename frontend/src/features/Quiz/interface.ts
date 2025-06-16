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



export interface QuizDataDto {
    id: string,
    title: string,
    isShuffled: boolean,
    questions: QuestionDataDto[]
}

export interface QuestionDataDto {
    id: string,
    questionContent: string,
    questionType: QuestionType
    choices: ChoiceDataDto[]
}

export interface ChoiceDataDto {
    id: string,
    choiceContent: string,
    isCorrect: boolean
}

export interface UserQuizData {
    quizId: string,
    title: string,
    numberOfQuestion: number,
    numberOfAttempt: number,
    avarageSuccessRate: number,
}



//Quiz Info
export interface QuizInfoDto
{
    quizId: string,
    title: string,
    isShuffled: boolean,
    questions: QuestionInfoDto[]
}

export interface QuestionInfoDto
{
    questionId: string,
    questionContent: string,
    questionType: QuestionType,
    choices: ChoiceInfoDto[]
}

export interface ChoiceInfoDto
{
    choiceId: string,
    choiceContent: string,
    isCorrect: boolean
}

export interface AttemptRequestDto
{
    quizId: string,
    totalQuestion: number,
    totalRightAnswer: number
}

export interface UserAnswer {
    questionId: string,
    userAnswer: UserChoice[]
}

export interface UserChoice {
    choiceId: string
    choiceAnswer: string
}