import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "@/layouts/AuthLayout";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { registerApi } from "@/features/auth/authApi";

import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/schemas/registerSchema";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [serverError, setServerError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      setServerError("");
      setSuccessMessage("");

      await registerApi({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setSuccessMessage(
        "Registration successful. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error: any) {
      setServerError(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register to access the Quiz Management System"
      pageTitle="Quiz Management System"
  
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        
        <div className="space-y-2">

          <Label>Name</Label>

          <Input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}

        </div>

       
        <div className="space-y-2">

          <Label>Email</Label>

          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

        </div>

        
        <div className="space-y-2">

          <Label>Password</Label>

          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

        </div>

        
        <div className="space-y-2">

          <Label>Confirm Password</Label>

          <Input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}

        </div>

        {successMessage && (
          <p className="text-sm text-green-600">
            {successMessage}
          </p>
        )}

        
        {serverError && (
          <p className="text-sm text-red-500">
            {serverError}
          </p>
        )}

       
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Creating account..."
            : "Register"}
        </Button>

        
        <p className="text-sm text-center text-muted-foreground">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-primary hover:underline"
          >
            Login
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
};

export default RegisterPage;