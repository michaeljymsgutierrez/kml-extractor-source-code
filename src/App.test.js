import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

describe("KML Extractor test", () => {
  const root = document.createElement("div");

  it("Renders without crashing", () => {
    const { container } = render(<App />, root);
    expect(container).toBeTruthy();
  });

  it("Add google api key button renders correctly", () => {
    const { getByText } = render(<App />, root);
    expect(getByText("Add Google API Key").textContent).toBe(
      "Add Google API Key"
    );
  });

  it("Verify coordinates button renders correctly", () => {
    const { getByText } = render(<App />, root);
    expect(getByText("Verify Coordinates").textContent).toBe(
      "Verify Coordinates"
    );
  });
});
