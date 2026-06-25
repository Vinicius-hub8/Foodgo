import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function PrivateRoute({ children }) {
  const { token } = useAuth();

  // Se não estiver logado, redireciona para login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza o componente filho
  return children;
}