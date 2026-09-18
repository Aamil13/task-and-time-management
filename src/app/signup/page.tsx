"use client";

import { useForm } from "react-hook-form";
import { useRegister } from "@/services/auth";
import { InputBox } from "@/components/atoms/input-box";
import { InputWarningText } from "@/components/atoms/input-warning-text";
import { Button } from "@/components/atoms/button";
import { withInputLengthRules } from "@/lib/validation";


interface SignupForm {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {

  const registerUser = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupForm>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }

    registerUser.mutate({
      userName: data.userName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-heading mb-2">Create Account</h1>
        <p className="text-text-secondary mb-6">
          Sign up to get started with TaskFlow
        </p>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <InputBox
              label="Username"
              placeholder="Enter your username"
              type="text"
              {...register(
                "userName",
                withInputLengthRules("userName", {
                  required: "Please enter your username!",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })
              )}
              err={!!errors.userName}
            />
            {errors.userName && <InputWarningText>{errors.userName.message}</InputWarningText>}
          </div>

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
              placeholder="Create a password"
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

          <div className="flex flex-col gap-2">
            <InputBox
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              {...register(
                "confirmPassword",
                withInputLengthRules("confirmPassword", {
                  required: "Please confirm your password!",
                })
              )}
              err={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <InputWarningText>{errors.confirmPassword.message}</InputWarningText>}
          </div>

          <Button type="submit" className="w-full" disabled={registerUser.isPending}>
            {registerUser.isPending ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-text-secondary mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
