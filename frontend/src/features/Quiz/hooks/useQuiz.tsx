import { createContext } from "react";
import { AddQuizDto, QuestionType } from "../interface";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface QuizContextType {
  quizDto: AddQuizDto;
  setQuizDto: Dispatch<SetStateAction<AddQuizDto>>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export function QuizContextProvider({ children }: QuizProviderProps) {
  const [quizDto, setQuizDto] = useState<AddQuizDto>({
    title: "",
    questions: [
      {
        content: "",
        questionType: QuestionType.MultipleChoice,
        choices: [
          {
            content: "",
            isCorrect: false,
          },
        ],
      },
    ],
  });

  const updateQuiz = (newTitle: string) => {
    setQuizDto({ ...quizDto, title: newTitle });
  };

  const updateQuestionContent = (index: number, newContent: string) => {
    const updatedQuestions = quizDto.questions.map((question, i) => {
      if (i === index) {
        return { ...question, content: newContent };
      }
      return question;
    });
    setQuizDto({
      ...quizDto,
      questions: updatedQuestions,
    });
  };

  const value = useMemo(
    () => ({
      quizDto,
      setQuizDto
    }),
    [quizDto]
  );

  return (
    <QuizContext.Provider value={value}> {children} </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
