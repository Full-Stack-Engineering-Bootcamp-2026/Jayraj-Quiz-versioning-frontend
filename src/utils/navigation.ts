import { PERMISSIONS } from "./constants";

export const navItems = [
  {
    label: "Questions",
    path: "/questions",
    permission: PERMISSIONS.QUESTION_CREATE,
  },

  {
    label: "Create Quiz",
    path: "/quizzes/create",
    permission: PERMISSIONS.QUIZ_CREATE,
  },

  {
    label: "Quizzes",
    path: "/quizzes",
    permission: PERMISSIONS.QUIZ_ATTEMPT,
  },

  {
    label: "My Attempts",
    path: "/attempts",
    permission: PERMISSIONS.ATTEMPT_VIEW_OWN,
  },
];