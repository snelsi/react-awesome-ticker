import React from "react";

export interface TickerProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Whether to play or pause the ticker
   */
  play?: boolean;
  /**
   * `repeat` - Repeat content until it fits in the container's width.
   * `loop` - Content will loop from one side to another infinitely.
   */
  mode?: "repeat" | "loop";
  /**
   * Whether to pause the ticker when hovered
   */
  pauseOnHover?: boolean;
  /**
   * Whether to pause the ticker when focused
   */
  pauseOnFocus?: boolean;
  /**
   * Whether to pause the ticker when clicked
   */
  pauseOnClick?: boolean;
  /**
   * The direction the ticker is sliding
   */
  direction?: "left" | "right";
  /**
   * Speed calculated as pixels/second
   */
  speed?: number;
  /**
   * Duration to delay the animation after render, in seconds
   */
  delay?: number;
  /**
   * Extra props to pass directly to content wrapper
   */
  contentWrapperProps?: React.HTMLProps<HTMLDivElement>;
  /**
   * Polymorhic prop that configures the rendering tag of the Wrapper
   * https://styled-components.com/docs/api#as-polymorphic-prop
   * */
  as?: any;
}
