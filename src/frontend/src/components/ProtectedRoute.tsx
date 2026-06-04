import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loginStatus, isAuthenticated } = useInternetIdentity();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loginStatus === "initializing" || loginStatus === "logging-in") return;
    const timer = setTimeout(() => {
      setChecked(true);
      if (!isAuthenticated) {
        sessionStorage.setItem(
          "redirectAfterLogin",
          window.location.pathname + window.location.search,
        );
        navigate({ to: "/auth/login" });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [loginStatus, isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#EDF7F2" }}
      >
        <div
          className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#E8541A", borderTopColor: "transparent" }}
          aria-label="Checking authentication..."
        />
      </div>
    );
  }

  return null;
}
