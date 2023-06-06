import React from "react";
import "./styles.css";
import { RadialProgress } from 'react-radial-progress-indicator';
const index = ({ value, color, size }) => {
  return (

    <RadialProgress
      backgroundColour="#dff0d8"
      backgroundTransparent
      width={size || 80}
      height={size || 80}
      fontRatio={6}
      ringBgColour="#E3E3E3"
      ringFgColour={color ? color : "#00823B"}
      ringIntermediateColour="#59648D"
      showIntermediateProgress
      step={value / 10}
      steps={10}
      text={function text(proportion) {
        return "".concat(Math.floor(value), "%");
      }}
    />

  );
};

export default index;
