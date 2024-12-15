import { useEffect, useState } from "react";
import { Button } from "antd";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FormItem } from "../..";
import { supabase } from "../../../services";
import { useNavigate } from "../../../hooks";
import type { LoginForm } from "..";

export const LoginFormActions: React.FC = () => {
  const [isError, setIsError] = useState(false);
  const methods = useFormContext<LoginForm>();
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: async (args: { email: string; password: string }) => {
      return await supabase.auth.signInWithPassword({
        email: args.email,
        password: args.password,
      });
    },
  });

  const onClick = () => {
    const handleSubmitFn = async (formData: LoginForm) => {
      const signUpResponse = await signInMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      const userId = signUpResponse.data.user?.id;
      const errorMessage = signUpResponse.error?.message;

      if (!userId || errorMessage) {
        setIsError(true);
        throw new Error(errorMessage);
      }

      navigate("/");
    };

    methods.handleSubmit(handleSubmitFn, console.error)();
  };

  useEffect(() => {
    if (isError) {
      throw new Error("Failed to sign in");
    }
  }, [isError]);

  const loading = signInMutation.isPending;

  return (
    <FormItem label={null}>
      <Button onClick={onClick} type="primary" loading={loading}>
        Sign in
      </Button>
    </FormItem>
  );
};
