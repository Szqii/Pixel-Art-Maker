import React, { useMemo, useState, useRef } from "react";
import "./App.scss";
import PixelContainer from "./components/pixelContainer/pixelContainer.component";
import { HexColorPicker } from "react-colorful";
import { exportComponentAsPNG } from "react-component-export-image";

const clearPixel = {
  color: "#FFFFFF",
  state: false,
};
const defaultPixels = Array.from({ length: 60 }, () => clearPixel);

function App() {
  const [currentColor, setCurrentColor] = useState("#ec0b43");
  const [pixelArray, setPixelArray] = React.useState(defaultPixels);
  const colorHistory = useMemo(
    () => [
      ...new Set(
        pixelArray.filter((pixel) => pixel.state).map((pixel) => pixel.color)
      ),
    ],
    [pixelArray]
  );

  const panelRef = useRef();

  return (
    <div className="App">
      <div
        className="exportButton"
        data-front="Export as PNG"
        data-back="Click me!"
        onClick={() => exportComponentAsPNG(panelRef)}
      ></div>

      <div className="colorPicker">
        <HexColorPicker color={currentColor} onChange={setCurrentColor} />
        <div
          className="currentColor"
          style={{ backgroundColor: currentColor }}
        ></div>
      </div>
      <div className="colorHistory">
        {colorHistory.map((color) => (
          <div
            key={color}
            className="colorHistoryItem"
            style={{ backgroundColor: color }}
            onClick={() => setCurrentColor(color)}
          ></div>
        ))}
      </div>
      <PixelContainer
        pixelArray={pixelArray}
        setPixelArray={setPixelArray}
        currentColor={currentColor}
        clearPixel={clearPixel}
        panelRef={panelRef}
      />
    </div>
  );
}

export default App;
