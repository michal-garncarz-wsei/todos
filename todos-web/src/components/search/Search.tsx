import { Input } from "antd";

export const Search: React.FC = () => {
  return (
    <Input.Search
      placeholder="Start searching here"
      size="large"
      style={{ width: "400px" }}
    />
  );
};
