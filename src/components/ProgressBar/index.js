import React from "react";
import "./styles.css";
import { RadialProgress } from 'react-radial-progress-indicator';
const index = ({ value }) => {
    return (
        <div className="progressLow">

            <RadialProgress
                backgroundColour="#dff0d8"
                backgroundTransparent
                duration={3000}
                fontRatio={4}
                height="100%"
                ringBgColour="#E3E3E3"
                ringFgColour="#00823B"
                ringIntermediateColour="#59648D"
                ringThickness={0.4}
                segmented
                showIntermediateProgress
                startStep={0}
                step={value / 10}
                steps={10}
                text={function text(steps, proportion) { return "".concat(Math.floor(100 * proportion), "%") }}
                width="100%"
            />
        </div >

    );
};

export default index;
