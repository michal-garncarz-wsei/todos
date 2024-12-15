import { Input } from "antd";
import { useController } from "react-hook-form";
import { FormItem } from "../../../components";
import type { JoinForm, LoginForm } from "../";

const FIELD = "password";

export const Password: React.FC = () => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController<JoinForm | LoginForm>({ name: FIELD });

  return (
    <FormItem
      label={"Password"}
      required={true}
      validateStatus={invalid ? "error" : undefined}
      help={invalid ? error?.message : undefined}
      htmlFor={FIELD}
    >
      <Input.Password {...field} id={FIELD} />
    </FormItem>
  );
};
