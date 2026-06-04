import { useParams } from "@tanstack/react-router";
export default function WeatherPage() {
  const { slug } = useParams({ from: "/weather/$slug" });
  return (
    <div
      style={{
        color: "#1A2A1E",
        padding: "4rem 2rem",
        fontFamily: "var(--font-display)",
        fontSize: "2rem",
      }}
    >
      Weather: {slug}
    </div>
  );
}
