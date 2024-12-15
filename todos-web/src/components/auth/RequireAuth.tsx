import { PropsWithChildren, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "../../services";
import { useNavigate } from "../../hooks";

export const RequireAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery({
    queryKey: ["auth.getUser"],
    queryFn: async () => supabase.auth.getUser(),
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (!data.data.user) {
      navigate("/login");
    }
  }, [data]);

  return <>{children}</>;
};
