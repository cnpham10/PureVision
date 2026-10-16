import { cn } from "cn"

/**
 * The header mark, drawn as strokes on load, then settled into the solid logo.
 * People who ask for reduced motion see the finished mark immediately.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 202 261"
      width={31}
      height={40}
      className={cn("logo-mark h-10 w-auto shrink-0", className)}
      aria-hidden="true"
    >
      <g
        className="logo-strokes"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="logo-stroke logo-roof" pathLength={1} d="M 101 16 L 22 102" />
        <path className="logo-stroke logo-roof" pathLength={1} d="M 101 16 L 181 102" />
        <path className="logo-stroke logo-wall" pathLength={1} d="M 22 102 V 246" />
        <path className="logo-stroke logo-wall" pathLength={1} d="M 181 102 V 168" />
        <path className="logo-stroke logo-window" pathLength={1} d="M 83 89 H 99 V 103 H 83 Z" />
        <path className="logo-stroke logo-window" pathLength={1} d="M 107 89 H 123 V 103 H 107 Z" />
        <path className="logo-stroke logo-window" pathLength={1} d="M 83 115 H 99 V 131 H 83 Z" />
        <path className="logo-stroke logo-window" pathLength={1} d="M 107 115 H 123 V 131 H 107 Z" />
        <path className="logo-stroke logo-p" pathLength={1} d="M 34 156 H 104 V 210 H 34" />
        <path className="logo-stroke logo-v" pathLength={1} d="M 158 172 L 133 246 L 114 198" />
      </g>
      <image className="logo-fill" href="/logo.png" width="202" height="261" />
    </svg>
  )
}
