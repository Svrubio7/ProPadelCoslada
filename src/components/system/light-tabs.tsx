"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { TextFlip } from "@/components/animations/text-flip";

/**
 * "Light Tabs" — a dark glassy pill bar whose active item lights up with a
 * radial glow, a top highlight edge and an underline light bar that slides
 * between tabs ("light switch" feel).
 *
 * Recreated from the Framer University "Light Tabs Navigation" component
 * (framer.link/QnH61CS · demo: light-tabs.learnframer.site) — same dark
 * gradient pill, white light mask, top-edge highlight and underline light —
 * rebuilt as native React using the project's framer-motion + TextFlip.
 *
 * Exports:
 *  - <LightTabs>   segmented navigation; the tab matching the current route is lit.
 *  - <LightButton> a single lit pill, for CTAs across the site.
 */

const SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

// The recessed dark track that holds the tabs.
const TRACK_STYLE: CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(30,32,33,0.85) 0%, rgba(11,11,12,0.85) 100%)",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow:
    "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 10px 30px -16px rgba(0,0,0,0.9)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
};

// The raised, lit pill behind the active item.
const LIT_PILL_STYLE: CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 100%)",
  boxShadow:
    "0 -1px 2px 1px rgba(255,255,255,0.28), inset 0 1px 0 0 rgba(255,255,255,0.28), inset 0 0 0 1px rgba(255,255,255,0.06)",
};

const LIGHT_MASK_STYLE: CSSProperties = {
  background:
    "radial-gradient(62% 100% at 50% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 45%, transparent 72%)",
};

const UNDERLINE_STYLE: CSSProperties = {
  background:
    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)",
  boxShadow: "0 0 9px 1px rgba(255,255,255,0.55)",
};

/** The stacked glow layers of a lit pill (light mask + underline light bar). */
function LitLayers() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={LIGHT_MASK_STYLE}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px left-1/2 h-px w-2/3 -translate-x-1/2"
        style={UNDERLINE_STYLE}
      />
    </>
  );
}

export interface LightTab {
  href: string;
  label: string;
}

export function LightTabs({
  tabs,
  className = "",
}: {
  tabs: readonly LightTab[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav
      className={`relative flex items-center gap-1 rounded-full p-1 ${className}`}
      style={TRACK_STYLE}
      aria-label="Navegación principal"
    >
      {tabs.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            data-cursor="pointer"
            aria-current={active ? "page" : undefined}
            className={[
              "relative rounded-full px-4 py-1.5 text-sm font-light transition-colors duration-300 lg:px-5",
              active ? "text-white" : "text-white/55 hover:text-white/90",
            ].join(" ")}
          >
            {active && (
              <motion.span
                layoutId="light-tab-indicator"
                transition={SPRING}
                className="absolute inset-0 rounded-full"
                style={LIT_PILL_STYLE}
              >
                <LitLayers />
              </motion.span>
            )}
            <span className="relative z-10">
              <TextFlip>{label}</TextFlip>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export interface LightButtonProps {
  href: string;
  children: string;
  /** Opens in a new tab with rel=noopener. */
  external?: boolean;
  /** Trailing arrow "→" that nudges on hover. */
  arrow?: boolean;
  /** "solid" is lit at rest (primary CTA); "ghost" is muted and lights on hover. */
  variant?: "solid" | "ghost";
  size?: "sm" | "md";
  className?: string;
}

/**
 * A single light-tab styled pill, for CTAs. `solid` is lit at rest and
 * brightens on hover; `ghost` sits in the dark track and lights up on hover.
 */
export function LightButton({
  href,
  children,
  external = false,
  arrow = false,
  variant = "solid",
  size = "md",
  className = "",
}: LightButtonProps) {
  // ~40% larger than the original sizing.
  const sizing =
    size === "sm"
      ? "gap-2 px-6 py-2.5 text-sm"
      : "gap-2.5 px-7 py-3.5 text-base sm:px-8 sm:py-4";

  const base = [
    "group/lb relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors duration-300",
    variant === "solid" ? "text-white" : "text-white/70 hover:text-white",
    sizing,
    className,
  ].join(" ");

  const inner = (
    <>
      {/* Track / resting surface */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={variant === "solid" ? LIT_PILL_STYLE : TRACK_STYLE}
      />
      {/* Lit glow — always on for solid, fades in on hover for ghost */}
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300",
          variant === "ghost"
            ? "opacity-0 group-hover/lb:opacity-100"
            : "opacity-100",
        ].join(" ")}
        style={variant === "ghost" ? LIT_PILL_STYLE : undefined}
      >
        <LitLayers />
      </span>
      {/* Extra brighten on hover for solid */}
      {variant === "solid" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/lb:opacity-100"
          style={{
            background:
              "radial-gradient(70% 120% at 50% 0%, rgba(255,255,255,0.18), transparent 70%)",
          }}
        />
      )}
      <span className="relative z-10">
        <TextFlip>{children}</TextFlip>
      </span>
      {arrow && (
        <span className="relative z-10 transition-transform duration-300 group-hover/lb:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="pointer"
        className={base}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} data-cursor="pointer" className={base}>
      {inner}
    </Link>
  );
}
