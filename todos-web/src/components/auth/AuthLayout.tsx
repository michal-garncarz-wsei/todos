import { Outlet } from "react-router";

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};
