import { UserOutlined } from "@ant-design/icons";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Avatar, Dropdown, Typography } from "antd";
import { supabase } from "../../services";
import { useNavigate } from "../../hooks";

export const User: React.FC = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["auth.getUsername"],
    queryFn: async () => {
      const supabaseAuth: { user?: { id?: string } } = JSON.parse(
        localStorage.getItem("supabase.auth") ?? ""
      );

      if (!supabaseAuth.user?.id) {
        throw new Error("User not found");
      }

      return supabase
        .from("profiles")
        .select("username")
        .eq("user_id", supabaseAuth.user.id);
    },
    staleTime: 0,
    gcTime: 0,
  });

  const navigate = useNavigate();
  const signOutMutation = useMutation({
    mutationFn: () => supabase.auth.signOut(),
  });

  const handleSignOut = async () => {
    const signOutResponse = await signOutMutation.mutateAsync();

    if (!signOutResponse.error) {
      navigate("/login");
      return;
    }

    throw new Error(signOutResponse.error.message);
  };

  const username = data.data?.[0]?.username;

  return (
    <Dropdown
      placement="bottomCenter"
      menu={{
        items: [
          {
            key: "signOut",
            label: "Sign out",
            onClick: handleSignOut,
          },
        ],
      }}
    >
      <div style={{ cursor: "pointer" }}>
        <Typography.Text strong={true} style={{ marginRight: "10px" }}>
          {username}
        </Typography.Text>
        <Avatar
          size="large"
          icon={<UserOutlined />}
          style={{ background: "#f5f5f5", color: "#141414" }}
        />
      </div>
    </Dropdown>
  );
};
