import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";

describe("KML Extractor test", () => {
  const root = document.createElement("div");

  it("Renders without crashing", () => {
    ReactDOM.render(<App />, root);
    ReactDOM.unmountComponentAtNode(root);
  });

  it("Add google api key button renders correctly", () => {
    ReactDOM.render(<App />, root);
    expect(root.querySelectorAll("button:first-child")[0].textContent).toBe(
      "Add Google API Key"
    );
    ReactDOM.unmountComponentAtNode(root);
  });

  it("Verify coordinates button renders correctly", () => {
    ReactDOM.render(<App />, root);
    expect(root.querySelectorAll("button:last-child")[0].textContent).toBe(
      "Verify Coordinates"
    );
    ReactDOM.unmountComponentAtNode(root);
  });
});
