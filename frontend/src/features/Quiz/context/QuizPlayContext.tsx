import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AttemptRequestDto, QuizInfoDto, UserAnswer, UserChoice } from "../interface";
import { handleGetQuizInfo, handleSendResultToServer } from "../services/handle";
import caculateScore, { ScoreType } from "../services/calculateScore";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface QuizPlayContextType {
    quizInfo: QuizInfoDto
    answerOfUser: UserAnswer[]
    setAnswerOfUser:React.Dispatch<React.SetStateAction<UserAnswer[]>>
    result: AttemptRequestDto
    getQuizData: (quizId: string, bearerToken: string) => Promise<void>
    score: ScoreType
    postResultToServer(): Promise<void>
}

export const QuizPlayContextValue = createContext<QuizPlayContextType>({} as QuizPlayContextType)


export function QuizPlayContextProvider()
{
    const {token} = useAuth();
    const [quizInfo, setQuizInfo] = useState<QuizInfoDto>({
        isShuffled: true,
        quizId:"",
       title:"",
       questions:[] 
    });
    const [answerOfUser, setAnswerOfUser] = useState<UserAnswer[]>([{
        questionId: "",
        userAnswer: []
    }]);
    const [result, setResult] = useState<AttemptRequestDto>({
        quizId:"",
        totalQuestion:0,
        totalRightAnswer:0
    });
    const [score, setScore] = useState<ScoreType>({
        totalQuestion: 0,
        totalRightAnswer:0
    });

    async function postResultToServer() {
        const result : AttemptRequestDto =  {
            quizId: quizInfo.quizId,
            totalQuestion: quizInfo.questions.length,
            totalRightAnswer: score.totalRightAnswer
        }
        await handleSendResultToServer(token, result)
    }

    useEffect(() => {
        const count  = caculateScore(quizInfo.questions, answerOfUser);
        setScore(count);
    },[answerOfUser])

    const getQuizData = async function (quizId: string, bearerToken: string) {
        const quizInfoData = await handleGetQuizInfo(bearerToken, quizId);
        if (quizInfoData != undefined) setQuizInfo(quizInfoData);
    }
    return (
        <QuizPlayContextValue.Provider
        value={{quizInfo, answerOfUser, setAnswerOfUser, result, getQuizData, score, postResultToServer}}
        ><Outlet /></QuizPlayContextValue.Provider>
    )
}

export default function useQuizPlayContext() {
    return useContext(QuizPlayContextValue);
}