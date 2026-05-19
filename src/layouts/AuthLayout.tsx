import type { AuthLayoutProps } from "@/types/layout";

import { Link } from "react-router-dom";

import { Layers, ArrowLeft } from "lucide-react";

const AuthLayout = ({
  title,
  subtitle,
  pageTitle,
  children,
  backTo,
  backLabel = "Go back",
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">

      <div className="flex flex-col items-center mb-6">

        <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
          <Layers className="text-white w-7 h-7" />
        </div>

        <h1 className="text-2xl font-semibold text-primary mt-3">
          QuizFlow
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          {pageTitle}
        </p>

      </div>

     
      <div className="w-full max-w-md bg-card rounded-2xl shadow-md border p-6">

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm text-muted-foreground mt-2">
            {subtitle}
          </p>
        )}

        <div className="mt-6">
          {children}
        </div>

      </div>

      {backTo && (
        <Link
          to={backTo}
          className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
      )}
    </div>
  );
};

export default AuthLayout;