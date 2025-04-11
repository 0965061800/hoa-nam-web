import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
import Courses from "../pages/Courses";
import CoursesDetail from "../pages/CoursesDetail";
import RegisterCourse from "../pages/RegisterCourse";
import { ContextProvider } from "@/context/ContextApi";
import QuizBuildPage from "@/features/Quiz/pages/QuizBuildPage";
import QuizPlayPage from "@/features/Quiz/pages/QuizPlayPage";
import QuizPage from "@/features/Quiz/pages/QuizPage";

const AppRoutes = () => {
  return (
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
      <Route path="/quiz" element={
        <PublicRoute>
          <ContextProvider>
            <QuizPage/>
          </ContextProvider>
        </PublicRoute>
      } />
      <Route path="/quiz-play" element={
        <PublicRoute>
          <ContextProvider>
            <QuizPlayPage />
          </ContextProvider>
        </PublicRoute>
      } />
      <Route path="/quiz-build" element={
        <PublicRoute>
          <ContextProvider>
            <QuizBuildPage />
          </ContextProvider>
        </PublicRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;
