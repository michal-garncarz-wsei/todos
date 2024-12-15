import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { FormItem } from "../../../components";
import { useNavigate } from "../../../hooks";
import { supabase } from "../../../services";
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

      const error = signUpResponse.error;

      if (error?.code === "email_not_confirmed") {
        methods.reset();
        message.warning("Please confirm your email address to sign in");
        navigate("/login");
        return;
      }

      if (error) {
        setIsError(true);
        throw new Error(error.message);
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
