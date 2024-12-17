import { FormItemProps as FormItemPropsAntd } from "antd/lib/form/FormItem";
import { Form } from "antd";

type FormItemProps = FormItemPropsAntd;

export const FormItem: React.FC<FormItemProps> = (props) => {
  return (
    <div className="form-item">
      <Form.Item {...props} labelAlign="left" colon={false} />
    </div>
  );
};
