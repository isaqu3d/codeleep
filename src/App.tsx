import { Navigate, Route, Routes } from "react-router-dom";
import GuestRoute from "./components/guest-route";
import ProtectedRoute from "./components/protected-route";
import LoginPage from "./pages/login-page";
import MainPage from "./pages/main-page";

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
