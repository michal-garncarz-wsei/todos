import { Button, Typography } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Email, LoginFormActions, Password } from "./composition";
import { useNavigate } from "../../hooks";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export type LoginForm = z.infer<typeof schema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="login-panel">
      <FormProvider {...methods}>
        <Typography.Title
          level={2}
          style={{ marginBottom: "24px", textAlign: "center" }}
        >
          Sign in to{" "}
          <Typography.Text
            italic={true}
            style={{ fontSize: "inherit", marginLeft: "3px" }}
          >
            todos
          </Typography.Text>
        </Typography.Title>
        <form style={{ width: "300px" }}>
          <Email />
          <Password />
          <LoginFormActions />
        </form>
      </FormProvider>
      <Button type="link" onClick={() => navigate("/join")}>
        Sign up
      </Button>
    </div>
  );
};
