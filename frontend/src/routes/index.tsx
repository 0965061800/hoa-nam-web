import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
import Courses from "../pages/Courses";
import CoursesDetail from "../pages/CoursesDetail";
import QuizCreatePage from "@/features/Quiz/pages/QuizCreatePage";
import SignInPage from "@/features/Auth/pages/SignInPage";
import { AuthProvider } from "@/hooks/useAuth";
import PrivateRoute from "./PrivateRoute";
import QuizViewPage from "@/features/Quiz/pages/QuizViewPage";
import QuizDetailPage from "@/features/Quiz/pages/QuizDetailPage";
import SignUpPage from "@/features/Auth/pages/SignUpPage";
import RoleBasedRoute from "./RoleBaseRoute";
import Layout from "@/layout/Layout";
import QuizPage from "@/features/Quiz/pages/QuizPage";
import QuizPlayPage from "@/features/Quiz/pages/QuizPlayPage";
import { QuizPlayContextProvider } from "@/features/Quiz/context/QuizPlayContext";
import QuizResultPage from "@/features/Quiz/pages/QuizResultPage";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route*/}
        <Route element={<PublicRoute />}>
          <Route element={<Layout></Layout>}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses></Courses>} />
            <Route
              path="courses/detail"
              element={<CoursesDetail></CoursesDetail>}
            />
            <Route path="/signin" element={<SignInPage role="User" />} />
            <Route path="/signup" element={<SignUpPage role="User" />} />
            <Route path="/admin/signin" element={<SignInPage role="Admin" />} />
            <Route path="/admin/signup" element={<SignUpPage role="Admin" />} />
          </Route>
        </Route>
        {/* User Route */}
        <Route element={<PrivateRoute role="User" />}>
          <Route element={<RoleBasedRoute allowedRole="User" />}>
            <Route path="/user" element={<Layout></Layout>}>
              <Route path="home" element={<Home></Home>} />
              <Route path="quizzes">
                <Route index element={<QuizPage />} />

                <Route path=":quizId" element={<QuizPlayContextProvider />}>
                  <Route path="play" element={<QuizPlayPage />} />
                  <Route path="view-result" element={<QuizResultPage />} />
                </Route>
              </Route>
            </Route>
            <Route element={<Layout></Layout>}></Route>
          </Route>
        </Route>
        <Route element={<Layout />}></Route>
        {/* Admin Route */}
        <Route element={<PrivateRoute role="Admin" />}>
          <Route element={<RoleBasedRoute allowedRole="Admin" />}>
            <Route path="/admin" element={<Layout></Layout>}>
              <Route path="quizzes" element={<QuizViewPage></QuizViewPage>} />
              <Route path="quiz">
                <Route
                  path=":quizId"
                  element={<QuizDetailPage></QuizDetailPage>}
                ></Route>
                <Route
                  path="create"
                  element={<QuizCreatePage></QuizCreatePage>}
                ></Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* <Route
          path="/quiz"
          element={
            <PublicRoute>
              <ContextProvider>
                <QuizPage />
              </ContextProvider>
            </PublicRoute>
          }
        /> */}
        {/* <Route
          path="/quiz-play"
          element={
            <PublicRoute>
              <ContextProvider>
                <QuizPlayPage />
              </ContextProvider>
            </PublicRoute>
          }
        /> */}
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
