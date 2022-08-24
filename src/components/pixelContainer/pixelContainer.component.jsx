import React from "react";
import "./pixelContainer.style.scss";

const PixelContainer = ({
  currentColor,
  pixelArray,
  setPixelArray,
  clearPixel,
  panelRef,
}) => {
  const updatePixel = (i, defaultState) => (e) => {
    // Default state is clearPixel object
    e.preventDefault();
    setPixelArray(
      pixelArray.map((pixel, pixelIndex) => {
        if (pixelIndex === i) {
          if (defaultState) return defaultState; // Clear the pixel
          return {
            color: currentColor,
            state: true,
          };
        }
        return pixel;
      })
    );
  };
  return (
    <div className="pixel-container" ref={panelRef}>
      {pixelArray.map((pixel, index) => (
        <div
          key={index}
          className="pixel"
          style={{ backgroundColor: pixel.state ? pixel.color : "#FFFFFF" }}
          onClick={updatePixel(index)}
          onContextMenu={updatePixel(index, clearPixel)} // Clear the pixel on right click
        ></div>
      ))}
    </div>
  );
};

export default PixelContainer;
