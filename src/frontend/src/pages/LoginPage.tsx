import { createActor } from "@/backend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function LoginPage() {
  const { login, loginStatus, isAuthenticated, identity } =
    useInternetIdentity();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && actor && identity) {
      actor
        .createOrUpdateProfile("", "", "", "")
        .catch(() => null)
        .finally(() => {
          navigate({ to: "/dashboard" });
        });
    }
  }, [isAuthenticated, actor, identity, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "#FFFFFF" }}
      data-ocid="login.page"
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: "#EDF7F2",
          border: "1px solid rgba(232,84,26,0.25)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format"
          alt="Himalayan mountain peak at golden hour"
          className="w-full object-cover"
          style={{ height: 220 }}
        />
        <div className="p-8">
          <h1
            className="text-4xl font-semibold mb-2"
            style={{ fontFamily: "var(--font-display)", color: "#1A2A1E" }}
          >
            Welcome Back
          </h1>
          <p
            className="text-sm mb-8"
            style={{ color: "#4A5E52", fontFamily: "var(--font-body)" }}
          >
            Sign in to manage your trek bookings
          </p>
          <button
            type="button"
            onClick={() => login()}
            disabled={
              loginStatus === "logging-in" || loginStatus === "initializing"
            }
            className="w-full py-4 rounded-xl text-lg font-semibold transition-all flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-70"
            style={{
              background: "#E8541A",
              color: "#fff",
              fontFamily: "var(--font-body)",
            }}
            data-ocid="login.submit_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <span
                  className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin flex-shrink-0"
                  style={{ borderColor: "#fff", borderTopColor: "transparent" }}
                />
                Signing in...
              </>
            ) : (
              "Sign in with Internet Identity"
            )}
          </button>
          <p
            className="mt-6 text-sm text-center leading-relaxed"
            style={{ color: "#2E7D4F" }}
          >
            Internet Identity is a secure, passwordless login — no passwords or
            personal data shared.
          </p>
        </div>
      </div>
    </div>
  );
}
