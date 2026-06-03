"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  // On a full page (re)load, force the top of the page. The scroll-jacked
  // narrative section and the intro splash both assume a top-of-page start;
  // when the browser restores a mid-section scroll on reload, the pinned
  // layout ends up out of sync and the fixed UI (navbar) feels unclickable.
  // This effect only runs on full loads — client-side route changes keep the
  // layout mounted, so back/forward navigation is unaffected.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const toTop = () => {
      const lenis = lenisRef.current?.lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };
    toTop();
    // Some browsers restore the scroll position just after load fires —
    // re-assert on the next frame so we reliably land at the top.
    const raf = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
