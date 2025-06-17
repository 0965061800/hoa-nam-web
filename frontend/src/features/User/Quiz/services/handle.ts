import axios from "axios";
import { AddQuizDto, AttemptRequestDto, QuestionDataDto, QuizDataDto, QuizInfoDto, UserQuizData } from "../interface";
import toast from "react-hot-toast";


const apiUrl = import.meta.env.VITE_APP_BASE_URL;


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