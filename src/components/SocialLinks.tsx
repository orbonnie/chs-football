"use client";

import { useHoverReset } from "@/hooks/useHoverReset";

export default function SocialLink({ label, href  }: { label: string, href: string }) {
  const hover = useHoverReset();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
      className={`transition-colors font-bold ${
        hover.hovered ? 'text-royal-500' : 'text-white'
      }`}
    >
      {label}
    </a>
  );
}
