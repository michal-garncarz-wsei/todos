import { Input } from "antd";

export const Search: React.FC = () => {
  return (
    <Input.Search
      placeholder="Search for tasks"
      size="large"
      style={{ width: "400px" }}
    />
  );
};
