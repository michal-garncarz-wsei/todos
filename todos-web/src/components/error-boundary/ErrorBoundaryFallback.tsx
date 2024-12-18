import { Button, Result } from "antd";

export const ErrorBoundaryFallback: React.FC = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#f6f6f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        status="error"
        title={"Oh no, something went wrong!"}
        subTitle={"Please refresh to try again."}
        extra={
          <Button type="primary" onClick={handleClick}>
            Refresh
          </Button>
        }
      />
    </div>
  );
};
