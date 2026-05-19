import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "@/layouts/MainLayout"

import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import DashboardPage from "@/pages/DashboardPage"
import UnauthorizedPage from "@/pages/UnauthorizedPage"

import QuestionListPage from "@/pages/questions/QuestionListPage"
import CreateQuestionPage from "@/pages/questions/CreateQuestionPage"

import QuizListPage from "@/pages/quizzes/QuizListPage"
import CreateQuizPage from "@/pages/quizzes/CreateQuizPage"
import AttemptQuizPage from "@/pages/quizzes/AttemptQuizPage"

import AttemptHistoryPage from "@/pages/attempts/AttemptHistoryPage"
import AttemptDetailsPage from "@/pages/attempts/AttemptDetailsPage"

import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"
import PermissionRoute from "./PermissionRoute"

import { PERMISSIONS } from "@/utils/constants"
import EditQuestionPage from "@/pages/questions/EditQuestionPage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />

            <Route
              path="/questions"
              element={
                <PermissionRoute permission={PERMISSIONS.QUESTION_CREATE}>
                  <QuestionListPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/questions/create"
              element={
                <PermissionRoute permission={PERMISSIONS.QUESTION_CREATE}>
                  <CreateQuestionPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/questions/:questionUuid/edit"
              element={
                <PermissionRoute permission={PERMISSIONS.QUESTION_EDIT}>
                  <EditQuestionPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/quizzes"
              element={
                <PermissionRoute permission={PERMISSIONS.QUIZ_ATTEMPT}>
                  <QuizListPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/quizzes/create"
              element={
                <PermissionRoute permission={PERMISSIONS.QUIZ_CREATE}>
                  <CreateQuizPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/quizzes/:quizUuid/attempt"
              element={
                <PermissionRoute permission={PERMISSIONS.QUIZ_ATTEMPT}>
                  <AttemptQuizPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/attempts"
              element={
                <PermissionRoute permission={PERMISSIONS.ATTEMPT_VIEW_OWN}>
                  <AttemptHistoryPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/attempts/:attemptUuid"
              element={
                <PermissionRoute permission={PERMISSIONS.ATTEMPT_VIEW_OWN}>
                  <AttemptDetailsPage />
                </PermissionRoute>
              }
            />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
