import axios from "axios";
import { AddQuizDto } from "../interface";
import toast from "react-hot-toast";

export function handleCreateQuiz(newQuiz: AddQuizDto, token: string|null) {
    const apiUrl = import.meta.env.VITE_APP_BASE_URL;
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    })
    axios.post(`${apiUrl}/Quiz/add`,newQuiz, {withCredentials: true})
      .then(() => {
          toast.success('The quiz has been created successfully!');
      })
      .catch(error => {
         toast.error(`Failed to create a new quiz!: ${error.message}`);
          return;
      });
}
