import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
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
    mutationFn: async (args: { taskId: number }) => {
      const response = await supabase
        .from("todos")
        .update({ is_complete: !Boolean(isCompleted) })
        .eq("id", args.taskId);

      return response;
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (args: { taskId: number }) => {
      const response = await supabase
        .from("todos")
        .delete()
        .eq("id", args.taskId);
      return response;
    },
  });

  const handleAddTask = async () => {
    const response = await updateTaskMutation.mutateAsync({
      taskId: taskId,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const handleDeleteTask = async () => {
    const response = await deleteTaskMutation.mutateAsync({
      taskId: taskId,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return (
    <div className="task" style={{ borderTop: `3px solid ${color}` }}>
      <Typography.Text strong>{name}</Typography.Text>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Button
          className="button"
          type="text"
          icon={<DeleteOutlined />}
          style={{ color: "#c9c9c9" }}
          shape="circle"
          size="large"
          onClick={handleDeleteTask}
          loading={deleteTaskMutation.isPending}
        />
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
    </div>
  );
};
