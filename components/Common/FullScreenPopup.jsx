import React from "react";

function FullScreenPopup({ children }) {
  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/90 md:bg-black/70 fadeIn">
      {children}
    </div>
  );
}

export default FullScreenPopup;
