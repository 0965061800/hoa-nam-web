import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
import Courses from "../pages/Courses";
import CoursesDetail from "../pages/CoursesDetail";
import RegisterCourse from "../pages/RegisterCourse";
import { ContextProvider } from "@/context/ContextApi";
import QuizPlayPage from "@/features/Quiz/pages/QuizPlayPage";
import QuizPage from "@/features/Quiz/pages/QuizPage";
import QuizCreatePage from "@/features/Quiz/pages/QuizCreatePage";
import SignInPage from "@/features/Auth/pages/SignInPage";
import { AuthProvider } from "@/hooks/useAuth";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route path="/courses">
          <Route
            index
            element={
              <PublicRoute>
                <Courses />
              </PublicRoute>
            }
          />
          <Route
            path="detail"
            element={
              <PublicRoute>
                <CoursesDetail />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <RegisterCourse />
              </PublicRoute>
            }
          />
        </Route>
        <Route
          path="/quiz"
          element={
            <PublicRoute>
              <ContextProvider>
                <QuizPage />
              </ContextProvider>
            </PublicRoute>
          }
        />
        <Route
          path="/quiz-play"
          element={
            <PublicRoute>
              <ContextProvider>
                <QuizPlayPage />
              </ContextProvider>
            </PublicRoute>
          }
        />
        <Route
          path="/quiz-create"
          element={
            <ContextProvider>
              <PrivateRoute>
                <QuizCreatePage />
              </PrivateRoute>
            </ContextProvider>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
