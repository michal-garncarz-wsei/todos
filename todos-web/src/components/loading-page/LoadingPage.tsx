import { Spin } from "antd";

export const LoadingPage: React.FC = () => {
  return (
    <div className="loading-layout">
      <Spin size="large" />
    </div>
  );
};
