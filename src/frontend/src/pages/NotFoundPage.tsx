import { Link } from "@tanstack/react-router";
export default function NotFoundPage() {
  return (
    <div
      style={{
        color: "#1A2A1E",
        padding: "6rem 2rem",
        textAlign: "center",
        background: "#EDF7F2",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "6rem",
          color: "#E8541A",
          lineHeight: 1,
        }}
      >
        404
      </p>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          marginTop: "1rem",
        }}
      >
        Page not found
      </p>
      <p style={{ color: "#4A5E52", marginTop: "0.5rem", fontSize: "0.9rem" }}>
        The trail you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "0.75rem 2rem",
          background: "#E8541A", color: "#FFFFFF",
          borderRadius: "0.5rem",
          fontWeight: 600,
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
