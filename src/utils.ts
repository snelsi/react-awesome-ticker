import React, { useEffect, useLayoutEffect } from "react";

/** Refs:
 *  https://github.com/gregberge/react-merge-refs
 */
export const mergeRefs =
  <T = any>(refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>): React.RefCallback<T> =>
  (value) =>
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });

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
