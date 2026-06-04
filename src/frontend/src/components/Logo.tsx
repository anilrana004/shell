import logoSrc from "@/assets/logo.png";

type LogoProps = {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkLight?: boolean;
};

export function Logo({
  size = 36,
  className = "",
  showWordmark = false,
  wordmarkLight = false,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 min-w-0 ${className}`}>
      <img
        src={logoSrc}
        alt=""
        width={size}
        height={size}
        className="object-contain flex-shrink-0 rounded-full"
        decoding="async"
      />
      {showWordmark && (
        <span
          className="font-semibold tracking-widest uppercase truncate"
          style={{ fontFamily: "var(--font-display)" }}
          aria-label="Shail Hikers"
        >
          <span style={{ color: wordmarkLight ? "#FFFFFF" : "#1A2A1E" }}>
            Shail{" "}
          </span>
          <span style={{ color: wordmarkLight ? "#FFFFFF" : "#2E7D4F" }}>
            Hikers
          </span>
        </span>
      )}
    </span>
  );
}
