import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { jwtDecode } from "jwt-decode";

import AuthLayout from "@/layouts/AuthLayout";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { loginApi } from "@/features/auth/authApi";

import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/schemas/loginSchema";

import { useAppDispatch } from "@/store/hooks";

import { loginSuccess } from "@/store/slices/authSlice";

import type { JwtPayload } from "@/types/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      setServerError("");

      const response = await loginApi(data);

      const token = response.data.token;

      const decoded: JwtPayload =
        jwtDecode(token);

      dispatch(
        loginSuccess({
          token,
          permissions:
            decoded.permissions || [],
        })
      );

      navigate("/", { replace: true });

    } catch (error: any) {
      setServerError(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Enter your credentials to continue"
      pageTitle="Quiz Management System"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        
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
            ? "Logging in..."
            : "Login"}
        </Button>

        
        <p className="text-sm text-center text-muted-foreground">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-primary hover:underline"
          >
            Register
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
};

export default LoginPage;