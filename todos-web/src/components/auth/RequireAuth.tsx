import { PropsWithChildren, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "../../hooks";
import { supabase } from "../../services";

export const RequireAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  const { data } = useSuspenseQuery({
    queryKey: ["auth.getSession"],
    queryFn: () => supabase.auth.getSession(),
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (!user) {
      if (data.data.session) {
        setUser(data.data.session.user);
      } else {
        navigate("/login");
      }
    }
  }, [user, data]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
