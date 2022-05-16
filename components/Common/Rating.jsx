import React from "react";

function Rating({ rating }) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-b from-darkBlue to-regularBlue">
      <div className="text-2xl font-bold text-white">{rating / 10}</div>
    </div>
  );
}

export default Rating;
