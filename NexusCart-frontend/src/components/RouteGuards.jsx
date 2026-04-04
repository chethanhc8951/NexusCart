import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || !isAdmin()) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
}

export function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
}
