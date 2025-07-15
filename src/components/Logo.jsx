export default function Logo({ size = "md", variant = "default" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colors = variant === "dark" 
    ? { base: "#FFFFFF", mid: "#FFFFFF", light: "#FFFFFF" }
    : { base: "#5E4DB4", mid: "#6C5CE7", light: "#B8A6FF" };

  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* First chevron (left, smallest) */}
        <path
          d="M8 32L16 24L8 16"
          stroke={colors.base}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
        />
        
        {/* Second chevron (middle) */}
        <path
          d="M16 32L24 24L16 16"
          stroke={colors.mid}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
        />
        
        {/* Third chevron (right, tallest) */}
        <path
          d="M24 36L32 24L24 12"
          stroke={colors.light}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
          style={{
            filter: "drop-shadow(0 0 4px rgba(184, 166, 255, 0.3))"
          }}
        />
      </svg>
    </div>
  );
}