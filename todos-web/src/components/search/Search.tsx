import { Modal, Select, Skeleton } from "antd";
import { Suspense, useState } from "react";
import { supabase } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { TaskModal } from "../tasks/TaskModal";

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [results, setResults] = useState<
    Array<{ label: string; value: number }>
  >([]);
  const [value, setValue] = useState<{ label: string; value: number }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalOpenState = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const { isPending } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm) {
        setResults([]);
        return Promise.reject();
        return;
      }

      const response = await supabase
        .from("todos")
        .select("*")
        .ilike("task", `%${searchTerm}%`);

      if (response.error) {
        throw new Error(response.error.message);
      }

      const resultsStash = response.data.map((task) => ({
        label: task.task ?? "",
        value: task.id,
      }));
      setResults(resultsStash);
      return response;
    },
    staleTime: 0,
    gcTime: 0,
  });

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
  };

  const handleChange = (task: { label: string; value: number }) => {
    setValue(task);
    setIsModalOpen(true);
  };

  return (
    <>
      <Select
        style={{ width: "400px" }}
        options={results}
        value={null}
        onChange={(_, task) => {
          if (task && !Array.isArray(task)) {
            handleChange(task);
          }
          return;
        }}
        allowClear={true}
        placeholder="Search for tasks"
        showSearch={true}
        searchValue={searchTerm}
        onSearch={(value) => handleSearch(value)}
        filterOption={false}
        loading={isPending}
        size="large"
      />

      <Modal
        open={isModalOpen}
        centered={true}
        onCancel={toggleModalOpenState}
        destroyOnClose={true}
        closeIcon={null}
        footer={null}
        onClose={() => setIsModalOpen(false)}
      >
        <Suspense fallback={<Skeleton />}>
          {value ? (
            <TaskModal taskId={value?.value} setIsModalOpen={setIsModalOpen} />
          ) : null}
        </Suspense>
      </Modal>
    </>
  );
};
