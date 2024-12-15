import { Form, Typography } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Email, LoginFormActions, Password } from "./composition";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export type LoginForm = z.infer<typeof schema>;

export const LoginPage: React.FC = () => {
  const methods = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Typography.Title level={2} style={{ marginBottom: "24px" }}>
        Sign in to{" "}
        <Typography.Text
          italic={true}
          style={{ fontSize: "inherit", marginLeft: "3px" }}
        >
          todos
        </Typography.Text>
      </Typography.Title>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Email />
        <Password />
        <LoginFormActions />
      </Form>
    </FormProvider>
  );
};
