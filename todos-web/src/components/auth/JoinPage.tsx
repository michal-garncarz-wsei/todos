import { Form, Typography } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Email, JoinFormActions, Name, Password } from "./composition";

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type JoinForm = z.infer<typeof schema>;

export const JoinPage: React.FC = () => {
  const methods = useForm<JoinForm>({
    resolver: zodResolver(schema),
  });

  return (
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
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Name />
        <Email />
        <Password />
        <JoinFormActions />
      </Form>
    </FormProvider>
  );
};
