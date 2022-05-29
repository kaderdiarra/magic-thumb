import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export const RequireAuth = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
