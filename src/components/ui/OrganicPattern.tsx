import React from "react";

interface OrganicPatternProps {
  className?: string;
  opacity?: number;
  tone?: "terracotta" | "salvia" | "crema" | "tierra";
}

export default function OrganicPattern({
  className = "",
  opacity = 0.07,
  tone = "terracotta",
}: OrganicPatternProps) {
  const colorMap = {
    terracotta: "#bf692e",
    salvia: "#77806b",
    crema: "#f3e7d1",
    tierra: "#2c231c",
  };

  const fill = colorMap[tone];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <pattern
            id={`organic-pattern-${tone}`}
            width="220"
            height="220"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(12)"
          >
            {/* Luna creciente 1 */}
            <path
              d="M35 25C42 27 46 34 45 42C44 50 38 56 30 58C36 54 39 46 38 38C37 31 33 26 28 23C30 23 33 24 35 25Z"
              fill={fill}
            />
            {/* Hoja de corazón String of Hearts 1 */}
            <path
              d="M95 45C97 41 103 41 105 45C107 48 102 53 97 55C92 53 87 48 89 45C91 41 93 45 95 45Z"
              fill={fill}
            />
            {/* Enredadera curva tenue */}
            <path
              d="M96 55 C110 70, 115 90, 135 98"
              stroke={fill}
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="2 2"
            />
            {/* Hoja de corazón 2 pequeña */}
            <path
              d="M135 98C137 95 141 95 142 98C144 100 140 104 136 106C132 104 129 100 131 98Z"
              fill={fill}
            />
            {/* Puntos orgánicos salpicados (textura arcilla) */}
            <circle cx="170" cy="40" r="2.5" fill={fill} />
            <circle cx="185" cy="55" r="1.5" fill={fill} />
            <circle cx="45" cy="140" r="2" fill={fill} />
            <circle cx="75" cy="175" r="3" fill={fill} />
            <circle cx="155" cy="165" r="2" fill={fill} />

            {/* Luna creciente 2 invertida en ángulo */}
            <path
              d="M175 125C170 128 166 135 167 142C168 149 173 154 180 156C174 152 172 145 173 138C174 132 178 128 182 125C180 125 177 125 175 125Z"
              fill={fill}
            />

            {/* Par de hojitas de corazón dispersas */}
            <path
              d="M40 185C42 181 47 182 49 185C50 188 46 192 42 194C38 192 35 188 36 185Z"
              fill={fill}
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#organic-pattern-${tone})`}
        />
      </svg>
    </div>
  );
}
