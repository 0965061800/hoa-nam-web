import { ChoiceDataDto, ChoiceInfoDto, QuestionInfoDto, UserAnswer, UserChoice } from "../interface";

export interface ScoreType {
    totalRightAnswer: number;
    totalQuestion:number;
}

export default function caculateScore (questions: QuestionInfoDto[], userAnswers: UserAnswer[]) : ScoreType {
    const totalQuestion = questions.length;
    let totalRightAnswer = 0;
    questions.forEach((question) => {
        userAnswers.forEach((answer) => {
            if (answer.questionId == question.questionId) {
                const result = checkQuestionAnswer(question.choices, answer.userAnswer)
                if (result) totalRightAnswer++
            }
        })
    })
    return {
        totalRightAnswer,
        totalQuestion
    }
}

function checkQuestionAnswer(choices: ChoiceInfoDto[], answer: UserChoice[]): boolean {
    let result = true;
    if (choices.length == 1) return choices[0].choiceContent.toLowerCase() === answer[0].choiceAnswer.toLowerCase()
    //1. Ket qua nhieu dap an hon cau tra loi => false
    //2. Ket qua it dap an hon cau tra loi => false
    //3. So ket qua bang cau tra loi va ket qua giong cau tra loi => true
    const rightChoices = choices.filter(x => x.isCorrect == true);
    if (rightChoices.length !== answer.length) return false;
    rightChoices.forEach((choice) => {
        const check = answer.filter(x => x.choiceId == choice.choiceId);
        if (check.length == 0) {
            result = false;
            return;
        }
    })
    return result;
}