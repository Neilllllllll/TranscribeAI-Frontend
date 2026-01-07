import { createBrowserRouter, Navigate } from "react-router-dom";
import { transcriptionRoutes } from "./modules/TranscriptionBatch/routes.tsx";
import { diarizationRoutes } from "./modules/Diarization/routes.tsx"
import { ProtectedRoute } from "./modules/Shared/components/ProtectedRoute.tsx";
import HomePage from "./modules/Home/HomePage.tsx";
import AuthPage from "./modules/Auth/AuthPage.tsx";
import MainLayout from "./modules/Shared/layouts/MainLayout.tsx";
import NotFoundPage from "./modules/Shared/pages/NotFoundPage.tsx";

export const router = createBrowserRouter([
  // 1. Redirection initiale
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },

  // 2. Page d'authentification
  {
    path: "/auth",
    element: <AuthPage />,
  },

  // 3. La partie Application (Protégée)
  {
    element: <ProtectedRoute />, 
    children: [
      { path: "/home", index: true, element: <HomePage /> },
      {
        path: "/app",
        element: <MainLayout />,
        children: [
          ...transcriptionRoutes,
          ...diarizationRoutes,
        ],
      },
    ],
  },

  // 4. Page de capture d'erreur (404)
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);