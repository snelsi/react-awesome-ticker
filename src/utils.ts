import React, { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Resets and synchronizes animations of items inside the Ticker  */
export const useSyncAnimations = (
  containerRef: React.MutableRefObject<HTMLDivElement>,
  dependencies: any[],
) =>
  useIsomorphicLayoutEffect(() => {
    try {
      containerRef?.current?.childNodes.forEach((node: HTMLElement) => {
        // https://stackoverflow.com/a/45036752
        node.style.animation = "none";
        // Trigger styles reflow
        // eslint-disable-next-line
        node.offsetHeight;
        node.style.animation = "";
      });
    } catch {
      // Element unmounted, probably. Ignore
    }
  }, dependencies || []);
