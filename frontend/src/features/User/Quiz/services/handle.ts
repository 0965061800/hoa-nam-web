import axios from "axios";
import toast from "react-hot-toast";
import { AttemptRequestDto, PageListData, PageRequestParam, QuizInfoDto } from "../types/interfaces";


const apiUrl = import.meta.env.VITE_APP_BASE_URL;


export function handleGetQuizzes(
  token: string | null,
  pageRequest:PageRequestParam
): Promise<PageListData | undefined> {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return axios
    .get(`${apiUrl}/AttemptQuery`, { params: {...pageRequest}, withCredentials: true})
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
  try {
    await axios.post(
      `${apiUrl}/Attempt`,
      {...result},
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

