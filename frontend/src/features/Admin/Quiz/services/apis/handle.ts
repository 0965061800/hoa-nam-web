import axios from "axios";

import toast from "react-hot-toast";
import { AddQuizDto, QuestionDataDto, QuizDataDto, PageRequestParam, PageListData, TagDtoForList, AddTagDto } from "../../types/interfaces";
import { UpdateQuizDto } from "../../components/quizUpdate/UpdateQuizInfo";


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

export async function handleCreatedQuestion(
  token: string | null,
  question: QuestionDataDto,
  quizId: string
): Promise<void> {
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

export async function handleUpdatedQuiz(
  token: string | null,
  updateQuizDto: UpdateQuizDto,
): Promise<void> {
  try {
    await axios.post(
      `${apiUrl}/Quiz/update`,
      { ...updateQuizDto},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("The quiz has been updated successfully!");
  } catch (error:any) {
    toast.error(`Failed to update quiz!: ${error.message}`);
  }
}

export function handleGetAdminQuizzes(
  token: string | null,
  requestParams: PageRequestParam
): Promise<PageListData | undefined> {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return axios
    .get(`${apiUrl}/Quiz/admin`, { params: {...requestParams}, withCredentials: true })
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
    .get(`${apiUrl}/Quiz/QuizDetail/${quizId}`, {
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

export async function handleDeleteQuiz(
  token: string | null,
  quizId: string
): Promise<void> {
  try {
    await axios.delete(
      `${apiUrl}/Quiz/delete/${quizId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("The quiz has been deleted successfully!");
  } catch (error:any) {
    toast.error(`Failed to delete quiz!: ${error.message}`);
  }
}

export async function handleGetTags(
  token: string|null
): Promise<TagDtoForList[]> {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return axios
    .get(`${apiUrl}/Tag/get`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Failed to get tag: ${error.message}`);
      return undefined;
    });
}

export async function handleCreateTag(
  token: string | null,
  adddTagDto: AddTagDto,
): Promise<void> {
  try {
    await axios.post(
      `${apiUrl}/Tag/add`,
      { ...adddTagDto },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Create tag successfully!");
  } catch (error:any) {
    toast.error(`Failed to create tag!: ${error.response.data}`);
  }
}