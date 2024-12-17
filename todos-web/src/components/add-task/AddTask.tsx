import { PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { TaskInput } from "./composition/Input";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../services";

const schema = z.object({
  name: z.string().max(255),
  color: z.string().length(7),
});

export type TaskForm = z.infer<typeof schema>;

export const AddTask: React.FC = () => {
  const methods = useForm<TaskForm>({
    resolver: zodResolver(schema),
  });

  const addTaskMutation = useMutation({
    mutationFn: async (args: {
      task: string;
      userId: string;
      color: string;
    }) => {
      const response = await supabase
        .from("todos")
        .insert({ task: args.task, color: args.color, user_id: args.userId })
        .select()
        .single();

      return response;
    },
  });

  const handleAddTask = () => {
    const asyncFn = async (formData: TaskForm) => {
      const supabaseAuth: { user?: { id?: string } } = JSON.parse(
        localStorage.getItem("supabase.auth") ?? ""
      );

      if (!supabaseAuth.user?.id) {
        throw new Error("User not found");
      }

      const response = await addTaskMutation.mutateAsync({
        task: formData.name,
        color: formData.color,
        userId: supabaseAuth.user.id,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      methods.reset();
    };

    methods.handleSubmit(asyncFn, console.error)();
  };

  return (
    <div className="add-task">
      <FormProvider {...methods}>
        <TaskInput />
        <Button
          icon={<PlusOutlined />}
          shape="circle"
          size="large"
          type="primary"
          onClick={handleAddTask}
          loading={addTaskMutation.isPending}
        />
      </FormProvider>
    </div>
  );
};
