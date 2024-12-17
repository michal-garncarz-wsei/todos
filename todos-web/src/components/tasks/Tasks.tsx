import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "../../services";
import { Task } from "./Task";

export const Tasks: React.FC = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const supabaseAuth: { user?: { id?: string } } = JSON.parse(
        localStorage.getItem("supabase.auth") ?? ""
      );

      if (!supabaseAuth.user?.id) {
        throw new Error("User not found");
      }

      return supabase
        .from("todos")
        .select()
        .order("inserted_at", { ascending: false })
        .eq("user_id", supabaseAuth.user.id);
    },
  });

  const tasksData = data?.data ?? [];

  return (
    <>
      {tasksData.map((el) => (
        <Task
          taskId={el.id}
          name={el.task}
          color={el.color}
          isCompleted={el.is_complete}
          key={el.id}
        />
      ))}
    </>
  );
};
