import React from "react";
import Ticker from "./Ticker";

export default {
  title: "Ticker",
};

export const WithText = () => (
  <Ticker>
    <h3>Title 1</h3>
    <h3>Title 2</h3>
    <h3>Title 3</h3>
    <h3>Title 4</h3>
    <h3>Title 5</h3>
  </Ticker>
);
