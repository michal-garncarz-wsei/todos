import { createClient } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { Database } from "../types";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  { auth: { storageKey: "supabase.auth" } }
);

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
});
