import React from "react";
import "./Features.css";

function Features({
  buttonText = "FEATURES",
  mainHeading = "Feature packed to make",
  subHeading = "It more flexiable Editable and Shareble ",
  description = "Experience Intelligent Features to optimize your time and afforts."
}) {
  return (
    <div className="grid grid-flow-col grid-cols-6 mt-40">
      <div className="mt-27">
        <div className="line-gradientleft"></div>
      </div>
      <div className="col-span-4 flex flex-col items-center justify-center text-center">
        <button
          className="border-[1px] px-5 py-2 text-sm border-[#2d3748] rounded-2xl"
          style={{ fontSize: "11px", background: "rgba(255, 255, 255, 0.07)" }}
        >
          {buttonText}
        </button>
        <div className="mt-10">
          <span className="text-4xl mt-4">{mainHeading}</span>
          <br />
          <p className="text-4xl text-gradient">{subHeading}</p>
        </div>
        <span className="mt-7 z-1">{description}</span>
        <div className="mt-[-150px]">
        <img src="/Ellipse 9.png" alt="" className="z-0" />
      </div>
      </div>
      <div className="mt-27">
        <div className="line-gradientRight"></div>
      </div>
    </div>
  );
}

export default Features;
