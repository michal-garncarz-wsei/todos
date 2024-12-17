import { CheckOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Typography } from "antd";
import { supabase } from "../../services";

type TaskProps = {
  taskId: number;
  name: string | null;
  color: string;
  isCompleted: boolean | null;
};

export const Task: React.FC<TaskProps> = ({
  taskId,
  name,
  color,
  isCompleted,
}) => {
  const queryClient = useQueryClient();
  const updateTaskMutation = useMutation({
    mutationFn: async (args: { taskId: number; userId: string }) => {
      const response = await supabase
        .from("todos")
        .update({ is_complete: !Boolean(isCompleted) })
        .eq("id", args.taskId);

      return response;
    },
  });

  const handleAddTask = async () => {
    const supabaseAuth: { user?: { id?: string } } = JSON.parse(
      localStorage.getItem("supabase.auth") ?? ""
    );

    if (!supabaseAuth.user?.id) {
      throw new Error("User not found");
    }

    const response = await updateTaskMutation.mutateAsync({
      taskId: taskId,
      userId: supabaseAuth.user.id,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return (
    <div className="task" style={{ borderTop: `3px solid ${color}` }}>
      <Typography.Text strong>{name}</Typography.Text>
      <Button
        size="large"
        shape="circle"
        icon={<CheckOutlined />}
        style={{
          border: `${isCompleted ? "none" : "1px solid #c9c9c9"}`,
          background: `${isCompleted ? "#52c41a" : "#fff"}`,
          color: `${isCompleted ? "#fff" : "#c9c9c9"}`,
        }}
        onClick={handleAddTask}
        loading={updateTaskMutation.isPending}
      />
    </div>
  );
};
