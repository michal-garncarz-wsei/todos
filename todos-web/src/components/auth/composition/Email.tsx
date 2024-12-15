import { Input } from "antd";
import { useController } from "react-hook-form";
import { FormItem } from "../../../components";
import type { JoinForm, LoginForm } from "../";

const FIELD = "email";

export const Email: React.FC = () => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController<JoinForm | LoginForm>({ name: FIELD });

  return (
    <FormItem
      label={"Email"}
      required={true}
      validateStatus={invalid ? "error" : undefined}
      help={invalid ? error?.message : undefined}
      htmlFor={FIELD}
    >
      <Input {...field} id={FIELD} />
    </FormItem>
  );
};
