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

  it("Coordinates table renders correctly", () => {
    const { container } = render(<App />, root);
    expect(container.querySelector(".coordinates-table > table")).toBeTruthy();
  });

  it("Add google api key button renders correctly", () => {
    const { getByText } = render(<App />, root);
    expect(getByText("Add Google API Key").textContent).toBe(
      "Add Google API Key"
    );
  });

  it("Verify google api key insertion", () => {
    const promptSpy = jest.spyOn(window, "prompt");
    promptSpy.mockImplementation(jest.fn(() => "random-google-api-key"));

    const { getByText, container } = render(<App />, root);
    const addGoogleKeyButton = getByText("Add Google API Key");

    fireEvent.click(addGoogleKeyButton);
    expect(promptSpy.mock.results[0].value).toBe("random-google-api-key");

    expect(
      container.querySelector(".kml-file-picker:nth-child(4)").textContent
    ).toBe("GOOGLE KEY: random-google-api-key");
  });

  it("Verify coordinates button renders correctly", () => {
    const { getByText } = render(<App />, root);
    expect(getByText("Verify Coordinates").textContent).toBe(
      "Verify Coordinates"
    );
  });
});
