import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute — wraps pages that require authentication.
 * If the user is NOT logged in, redirect to /login.
 */
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * PublicRoute — wraps pages that should NOT be accessible when logged in
 * (login, signup). If the user IS logged in, redirect to their dashboard.
 * Using `replace` ensures the back button won't return to these pages.
 */
export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      const parsed = JSON.parse(user);
      if (parsed.role === "Recruiter") {
        return <Navigate to="/recrutter_dashboard" replace />;
      }
      return <Navigate to="/dashboard" replace />;
    } catch {
      // If parsing fails, clear and let them through
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  return children;
};
