import { Typography } from "antd";

export const Logo: React.FC = () => {
  return (
    <Typography.Title level={2} style={{ margin: 0 }}>
      <Typography.Text
        italic={true}
        style={{ fontSize: "inherit", letterSpacing: "1px" }}
      >
        todos
      </Typography.Text>
    </Typography.Title>
  );
};
