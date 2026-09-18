"use client";

import { useForm } from "react-hook-form";
import { useLogin } from "@/services/auth";
import { InputBox } from "@/components/atoms/input-box";
import { InputWarningText } from "@/components/atoms/input-warning-text";
import { Button } from "@/components/atoms/button";
import { withInputLengthRules } from "@/lib/validation";


interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ defaultValues: { email: "", password: "" } });

  const onSubmit = (data: LoginForm) => {
    login.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-heading mb-2">
          Welcome Back
        </h1>
        <p className="text-text-secondary mb-6">
          Sign in to your account to continue
        </p>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <InputBox
              label="Email Address"
              placeholder="john.doe@example.com"
              type="email"
              {...register(
                "email",
                withInputLengthRules("email", {
                  required: "Please enter your email!",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                    message: "Invalid email format",
                  },
                })
              )}
              err={!!errors.email}
            />
            {errors.email && <InputWarningText>{errors.email.message}</InputWarningText>}
          </div>

          <div className="flex flex-col gap-2">
            <InputBox
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register(
                "password",
                withInputLengthRules("password", {
                  required: "Please enter your password!",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })
              )}
              err={!!errors.password}
            />
            {errors.password && <InputWarningText>{errors.password.message}</InputWarningText>}
          </div>

          <Button type="submit" className="w-full" disabled={login.isPending}>
            {login.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-text-secondary mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
