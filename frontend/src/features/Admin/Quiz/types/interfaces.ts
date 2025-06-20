import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

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

export enum QuestionType {
    SingleChoice,
    MultipleChoice,
    FillInBlank,
    Text
}

