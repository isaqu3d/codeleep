import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { STORAGE_KEY } from "../hooks/use-username";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const username = localStorage.getItem(STORAGE_KEY);
  if (!username) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
