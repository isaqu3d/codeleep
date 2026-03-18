import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { STORAGE_KEY } from "../hooks/use-username";

interface GuestRouteProps {
  children: ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const username = localStorage.getItem(STORAGE_KEY);
  if (username) return <Navigate to="/" replace />;
  return <>{children}</>;
}
