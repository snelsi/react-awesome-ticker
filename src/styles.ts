import styled, { keyframes } from "styled-components";

/* Animation from Right To Left ⬅️ */
const rightToLeft = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;

/* Animation from Left To Right ➡️ */
const leftToRight = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
`;

/* Base styles for the ticker wrapper */
export const ReactAwesomeTicker = styled.div`
  --ticker-play-state: paused;
  --ticker-direction: normal;
  --ticker-iteration-count: infinite;
  --ticker-animation-delay: 0s;

  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0;
  overflow-x: hidden;
  padding: 0;
  position: relative;
  width: 100%;

  /* Base styles for the ticker item */
  & > div {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: inherit;
    flex: 0 0 auto;
    flex-direction: row;
    margin: 0;
    padding: 0;
    width: fit-content;
    will-change: transform;

    animation-delay: var(--ticker-animation-delay, 0s);
    animation-timing-function: linear;
    animation-play-state: var(--ticker-play-state, paused);
    animation-duration: var(--ticker-animation-duration, 0s);
    animation-direction: var(--ticker-direction, normal);
    animation-iteration-count: var(--ticker-iteration-count, infinite);
  }

  /* Pause animation if 'data-play' is false */
  &[data-play="true"] {
    --ticker-play-state: running;
  }

  /* Pause animation on hover/focus/click */
  &[data-pause-on-hover="true"]:hover,
  &[data-pause-on-focus="true"]:focus-within,
  &[data-pause-on-click="true"]:active {
    --ticker-play-state: paused;
  }

  /* Hide ticker's content on the first render until container's width is calculated */
  &[data-visible="false"] * {
    opacity: 0;
  }

  /* In 'loop' mode content should take at least 100% of container's width */
  &[data-mode="loop"] > div {
    min-width: 100%;
  }

  /* Directions */
  &[data-direction="left"] {
    justify-content: flex-start;
    & > div {
      animation-name: ${rightToLeft};
    }
  }
  &[data-direction="right"] {
    justify-content: flex-end;
    & > div {
      animation-name: ${leftToRight};
    }
  }
`;
