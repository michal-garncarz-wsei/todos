import { Input } from "antd";
import { useController } from "react-hook-form";
import { FormItem } from "../../../components";
import type { JoinForm } from "../";

const FIELD = "name";

export const Name: React.FC = () => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController<JoinForm>({ name: FIELD });

  return (
    <FormItem
      label={"Name"}
      required={true}
      validateStatus={invalid ? "error" : undefined}
      help={invalid ? error?.message : undefined}
      htmlFor={FIELD}
    >
      <Input {...field} id={FIELD} />
    </FormItem>
  );
};
