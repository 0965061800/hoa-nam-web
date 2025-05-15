'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { faQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { QuizData } from '@/features/Quiz/interface';
import { quizzesData } from '@/features/Quiz/QuizData';

// ===== TYPE DEFINITIONS =====

interface User {
  name?: string;
  isLogged?: boolean;
  experience?: number;
  [key: string]: any;
}

interface SelectedIcon {
  faIcon: IconDefinition;
}

interface Position {
  x: number;
  y: number;
}

interface GlobalContextType {
  allQuizzes: QuizData[];
  setAllQuizzes: Dispatch<SetStateAction<QuizData[]>>;
  quizToStartObject: {
    selectQuizToStart: QuizData | null;
    setSelectQuizToStart: Dispatch<SetStateAction<QuizData | null>>;
  };
  userObject: {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
  };
  openBoxToggle: {
    openIconBox: boolean;
    setOpenIconBox: Dispatch<SetStateAction<boolean>>;
  };
  selectedIconObject: {
    selectedIcon: SelectedIcon;
    setSelectedIcon: Dispatch<SetStateAction<SelectedIcon>>;
  };
  dropDownToggleObject: {
    dropDownToggle: boolean;
    setDropDownToggle: Dispatch<SetStateAction<boolean>>;
  };
  threeDotsPositionsObject: {
    threeDotsPositions: Position;
    setThreeDotsPositions: Dispatch<SetStateAction<Position>>;
  };
  selectedQuizObject: {
    selectedQuiz: QuizData | null;
    setSelectedQuiz: Dispatch<SetStateAction<QuizData | null>>;
  };
  userXpObject: {
    userXP: number;
    setUserXP: Dispatch<SetStateAction<number>>;
  };
  isLoadingObject: {
    isLoading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}

// ===== CREATE CONTEXT =====

export const GlobalContextValue = createContext<GlobalContextType>({} as GlobalContextType);

// ===== CONTEXT PROVIDER =====

interface ProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ProviderProps) {
  const [allQuizzes, setAllQuizzes] = useState<QuizData[]>(quizzesData);
  const [selectQuizToStart, setSelectQuizToStart] = useState<QuizData | null>(null);
  const [user, setUser] = useState<User>({});
  const [openIconBox, setOpenIconBox] = useState<boolean>(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<SelectedIcon>({ faIcon: faQuestion });
  const [dropDownToggle, setDropDownToggle] = useState<boolean>(false);
  const [threeDotsPositions, setThreeDotsPositions] = useState<Position>({ x: 0, y: 0 });
  const [isLoading, setLoading] = useState<boolean>(true);

  // ===== FETCH QUIZZES =====
  // useEffect(() => {
  //   const fetchAllQuizzes = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('', {
  //         cache: 'no-cache',
  //       });

  //       if (!response.ok) {
  //         toast.error('Something went wrong...');
  //         throw new Error('fetching failed...');
  //       }

  //       const quizzesData = await response.json();
  //       setAllQuizzes(quizzesData.quizzes);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAllQuizzes();
  // }, []);

  return (
    <GlobalContextValue.Provider
      value={{
        allQuizzes,
        setAllQuizzes,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
        userObject: { user, setUser },
        openBoxToggle: { openIconBox, setOpenIconBox },
        selectedIconObject: { selectedIcon, setSelectedIcon },
        dropDownToggleObject: { dropDownToggle, setDropDownToggle },
        threeDotsPositionsObject: { threeDotsPositions, setThreeDotsPositions },
        selectedQuizObject: { selectedQuiz, setSelectedQuiz },
        isLoadingObject: { isLoading, setLoading },
      }}
    >
      {children}
    </GlobalContextValue.Provider>
  );
}

// ===== USE CONTEXT HOOK =====

export default function useGlobalContextProvider() {
  return useContext(GlobalContextValue);
}
