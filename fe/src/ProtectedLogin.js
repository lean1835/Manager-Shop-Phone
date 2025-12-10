import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedLogin({ children }) {
  const account = useSelector((state) => state.user.account);

  if (account) return <Navigate to="/home" replace />;

  return children;
}
