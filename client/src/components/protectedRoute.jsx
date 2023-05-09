import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenjjjjhjdgdjfgg");

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
