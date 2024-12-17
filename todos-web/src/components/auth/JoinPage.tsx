import { Button, Typography } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Email, JoinFormActions, Name, Password } from "./composition";
import { useNavigate } from "../../hooks";

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type JoinForm = z.infer<typeof schema>;

export const JoinPage: React.FC = () => {
  const navigate = useNavigate();

  const methods = useForm<JoinForm>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="login-panel">
      <FormProvider {...methods}>
        <Typography.Title level={2} style={{ marginBottom: "24px" }}>
          Sign up to{" "}
          <Typography.Text
            italic={true}
            style={{ fontSize: "inherit", marginLeft: "3px" }}
          >
            todos
          </Typography.Text>
        </Typography.Title>
        <form style={{ width: "300px" }}>
          <Name />
          <Email />
          <Password />
          <JoinFormActions />
        </form>
        <Button type="link" onClick={() => navigate("/login")}>
          Sign in
        </Button>
      </FormProvider>
    </div>
  );
};
