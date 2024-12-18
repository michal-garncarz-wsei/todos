import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Button, Typography } from "antd";
import { supabase } from "../../services";

type TaskProps = {
  taskId: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TaskModal: React.FC<TaskProps> = ({ taskId, setIsModalOpen }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const supabaseAuth: { user?: { id?: string } } = JSON.parse(
        localStorage.getItem("supabase.auth") ?? ""
      );

      if (!supabaseAuth.user?.id) {
        throw new Error("User not found");
      }

      const { data, error } = await supabase
        .from("todos")
        .select()
        .eq("id", taskId)
        .eq("user_id", supabaseAuth.user.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  const { is_complete: isCompleted, task: name, color } = data;

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

  const handleCheckTask = async () => {
    const response = await updateTaskMutation.mutateAsync({
      taskId: taskId,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
  };

  const handleDeleteTask = async () => {
    const response = await deleteTaskMutation.mutateAsync({
      taskId: taskId,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    setIsModalOpen(false);
  };

  return (
    <div className="task-modal" style={{ borderTop: `3px solid ${color}` }}>
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
          onClick={handleCheckTask}
          loading={updateTaskMutation.isPending}
        />
      </div>
    </div>
  );
};
