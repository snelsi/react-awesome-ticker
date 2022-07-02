import React, { useMemo } from "react";
import { mergeRefs } from "react-merge-refs";
import { useResizeDetector } from "react-resize-detector";
import type { TickerProps } from "./Ticker.types";
import { useSyncAnimations } from "./utils";
import "./styles.css";

const Ticker = React.forwardRef<HTMLDivElement, TickerProps>(
  (
    {
      children,
      play = true,
      mode = "repeat",
      pauseOnHover = false,
      pauseOnFocus = false,
      pauseOnClick = false,
      direction = "left",
      speed = 40,
      delay = 0,
      style,
      className,
      contentWrapperProps,
      ...props
    },
    ref,
  ) => {
    // Track Container width
    const { width: containerWidth, ref: containerRef } = useResizeDetector<HTMLDivElement>({
      handleWidth: true,
      handleHeight: false,
    });
    // Track Content width
    const { width: contentWidth, ref: contentRef } = useResizeDetector<HTMLDivElement>({
      handleWidth: true,
      handleHeight: false,
    });

    // Calculate animation duration in seconds as (content width in pixels) / (speed in pixels)
    let duration = 0;
    if (contentWidth && speed) {
      duration = contentWidth / speed;
    }

    // Memoize container styles
    const containerStyle = useMemo(
      () => ({
        ...(style || {}),
        "--ticker-animation-duration": `${duration || 0}s`,
        "--ticker-animation-delay": `${delay || 0}s`,
      }),
      [style, duration, delay],
    );

    // How many times the content should be repeated
    let contentRepeats = 0;
    // In 'loop' mode the content should be repeated once
    if (mode === "loop") {
      contentRepeats = 1;
    }
    // In 'repeat' mode the content should be repeated to fill the container
    else if (mode === "repeat") {
      if (containerWidth && contentWidth) {
        contentRepeats = Math.ceil(containerWidth / contentWidth);
      }
    }

    // Repeat main content 'contentRepeats' times
    let repeats: React.ReactNode[] =
      contentRepeats > 0
        ? Array.from(Array(contentRepeats).keys()).map((i) => (
            <div aria-hidden="true" key={i}>
              {children}
            </div>
          ))
        : null;

    // There can be desynchronization of items animation, so we manually reset it on params update
    useSyncAnimations(containerRef, [contentWidth, contentRepeats, duration, speed, direction]);

    return (
      <div
        className={`react-awesome-ticker ${className}`}
        style={containerStyle}
        data-play={!!play}
        data-mode={mode}
        data-direction={direction}
        data-pause-on-hover={!!pauseOnHover}
        data-pause-on-focus={!!pauseOnFocus}
        data-pause-on-click={!!pauseOnClick}
        data-visible={!!containerWidth}
        {...props}
        ref={mergeRefs([ref, containerRef])}
      >
        <div {...(contentWrapperProps || {})} ref={contentRef}>
          {children}
        </div>

        {repeats}
      </div>
    );
  },
) as React.FC<TickerProps>;

export default Ticker;
