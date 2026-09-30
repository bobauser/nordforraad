interface LoadingSpinnerProps {
  size?: number; // px
  color?: string; // CSS-farge
  label?: string;
}

export default function LoadingSpinner({
  size = 32,
  color = "#2563eb",
  label = "Laster...",
}: LoadingSpinnerProps) {
  return (
    <div role="status" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          border: `${Math.max(2, size / 8)}px solid rgba(0,0,0,0.15)`,
          borderTopColor: color,
          borderRadius: "50%",
          display: "inline-block",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
        {label}
      </span>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          span[aria-hidden] { animation: none; }
        }
      `}</style>
    </div>
  );
}