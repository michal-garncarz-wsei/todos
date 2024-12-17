import { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FormItem } from "../../../components";
import { useNavigate } from "../../../hooks";
import { supabase } from "../../../services";
import type { JoinForm } from "../";

export const JoinFormActions: React.FC = () => {
  const [isError, setIsError] = useState(false);
  const methods = useFormContext<JoinForm>();
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: async (args: { email: string; password: string }) => {
      return await supabase.auth.signUp({
        email: args.email,
        password: args.password,
      });
    },
  });

  const upsertNameMutation = useMutation({
    mutationFn: async (args: { userId: string; username: string }) => {
      return await supabase
        .from("profiles")
        .upsert([{ user_id: args.userId, username: args.username }])
        .select();
    },
  });

  const onClick = () => {
    const handleSubmitFn = async (formData: JoinForm) => {
      const signUpResponse = await signUpMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      const signUpError = signUpResponse.error;
      const user = signUpResponse.data.user;

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      if (!user) {
        throw new Error("Failed to sign up");
      }

      const upsertNameResponse = await upsertNameMutation.mutateAsync({
        userId: user.id,
        username: formData.name,
      });

      const upsertNameError = upsertNameResponse.error;

      if (upsertNameError) {
        setIsError(true);
        throw new Error(upsertNameError.message);
      }

      notification.info({
        message:
          "Please remember to verify your email address before signing in",
      });
      navigate("/");
    };

    methods.handleSubmit(handleSubmitFn, console.error)();
  };

  useEffect(() => {
    if (isError) {
      throw new Error("Failed to sign up");
    }
  }, [isError]);

  const loading = signUpMutation.isPending || upsertNameMutation.isPending;

  return (
    <FormItem label={null} style={{ textAlign: "center" }}>
      <Button onClick={onClick} type="primary" loading={loading}>
        Sign in
      </Button>
    </FormItem>
  );
};
