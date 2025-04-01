import React from "react";
import "./Loading.css"; // Import the CSS file for styles

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="bicycle">
        <div className="wheel front-wheel"></div>
        <div className="front-fork">
          <div className="tube"></div>
        </div>
        <div className="handlebars"></div>
        <div className="crossbar"></div>
        <div className="frame-1"></div>
        <div className="frame-2"></div>
        <div className="seat-tube">
          <div className="seat"></div>
        </div>
        <div className="crank"></div>
        <div className="chain"></div>
        <div className="pedals"></div>
        <div className="back-fork"></div>
        <div className="wheel back-wheel"></div>
      </div>
    </div>
  );
};

export default Loading;
