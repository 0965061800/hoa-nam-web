import axios from "axios";
import { AddQuizDto, AttemptRequestDto, QuestionDataDto, QuizDataDto, QuizInfoDto, UserQuizData } from "../interface";
import toast from "react-hot-toast";
import { UserInfo } from "os";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;

export function handleCreateQuiz(newQuiz: AddQuizDto, token: string | null) {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  axios
    .post(`${apiUrl}/Quiz/add`, newQuiz, { withCredentials: true })
    .then(() => {
      toast.success("The quiz has been created successfully!");
    })
    .catch((error) => {
      toast.error(`Failed to create a new quiz!: ${error.message}`);
      return;
    });
}

export function handleGetAdminQuizzes(
  token: string | null
): Promise<QuizDataDto[] | undefined> {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return axios
    .get(`${apiUrl}/Quiz`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Failed to get admin's quizzes: ${error.message}`);
      return undefined;
    });
}

export function handleGetAdminQuizDetail(
  token: string | null,
  quizId: string,
): Promise<QuizDataDto | undefined> {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return axios
    .get(`${apiUrl}/Quiz/quizId=${quizId}`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Failed to get admin's quizzes: ${error.message}`);
      return undefined;
    });
}

export async function handleUpdatedQuestion(
  token: string | null,
  question: QuestionDataDto,
  quizId: string
): Promise<void> {
  try {
    await axios.post(
      `${apiUrl}/Question/update`,
      { ...question, quizId },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("The question has been updated successfully!");
  } catch (error:any) {
    toast.error(`Failed to update question!: ${error.message}`);
  }
}

export async function handleCreatedQuestion(
  token: string | null,
  question: QuestionDataDto,
  quizId: string
): Promise<void> {
  console.log(1);
  try {
    await axios.post(
      `${apiUrl}/Question/add`,
      { ...question, quizId },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("The question has been created successfully!");
  } catch (error:any) {
    toast.error(`Failed to update question!: ${error.message}`);
  }
}

export function handleGetQuizzes(
  token: string | null
): Promise<UserQuizData[] | undefined> {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return axios
    .get(`${apiUrl}/AttemptQuery`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Failed to get quizzes: ${error.message}`);
      return undefined;
    });
}

export function handleGetQuizInfo(
  token: string | null,
  quizId: string
) : Promise<QuizInfoDto | undefined> {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
   return axios
    .get(`${apiUrl}/AttemptQuery/QuizInfo/${quizId}`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Failed to get quizzes: ${error.message}`);
      return undefined;
    });
}

export async function handleSendResultToServer(
  token: string | null,
  result: AttemptRequestDto
): Promise<void> {
  console.log(1);
  try {
    await axios.post(
      `${apiUrl}/Attempt`,
      {result},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("The question has been created successfully!");
  } catch (error:any) {
    toast.error(`Failed to update question!: ${error.message}`);
  }
}