import { ColorPicker, Input as InputAntd } from "antd";
import { useController } from "react-hook-form";
import { TaskForm } from "../AddTask";
import { useEffect } from "react";

export const COLOR = "#D3D3D3";

export const TaskInput: React.FC = () => {
  const { field: nameField } = useController<TaskForm>({ name: "name" });
  const { field: colorField } = useController<TaskForm>({ name: "color" });

  useEffect(() => {
    colorField.onChange(COLOR);
  }, []);

  return (
    <InputAntd
      size="large"
      placeholder="Add a task"
      style={{ marginRight: "10px" }}
      addonAfter={
        <ColorPicker
          {...colorField}
          onChange={(_, rgb) => colorField.onChange(rgb)}
          format="hex"
          defaultValue={COLOR}
          disabledAlpha={true}
        />
      }
      {...nameField}
    />
  );
};
