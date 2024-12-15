import { useEffect, useState } from "react";
import { Button } from "antd";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FormItem } from "../../../components";
import { supabase } from "../../../services";
import { useNavigate } from "../../../hooks";
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

  // const signInMutation = useMutation({
  //   mutationFn: async (args: { email: string; password: string }) => {
  //     return await supabase.auth.signInWithPassword({
  //       email: args.email,
  //       password: args.password,
  //     });
  //   },
  // });

  const onClick = () => {
    const handleSubmitFn = async (formData: JoinForm) => {
      const signUpResponse = await signUpMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      const userId = signUpResponse.data.user?.id;
      const errorMessage = signUpResponse.error?.message;

      if (!userId || errorMessage) {
        setIsError(true);
        throw new Error(errorMessage);
      }

      const upsertNameResponse = await upsertNameMutation.mutateAsync({
        userId,
        username: formData.name,
      });

      const upsertNameErrorMessage = upsertNameResponse.error?.message;

      if (upsertNameErrorMessage) {
        setIsError(true);
        throw new Error(upsertNameErrorMessage);
      }

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
    <FormItem label={null}>
      <Button onClick={onClick} type="primary" loading={loading}>
        Sign in
      </Button>
    </FormItem>
  );
};
