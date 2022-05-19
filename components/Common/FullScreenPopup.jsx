import React, { useEffect } from "react";

function FullScreenPopup({ popupActive, setPopupActive, children }) {
  useEffect(() => {
    document.addEventListener("keydown", (e) => onKeyPress(e));

    return () => {
      document.removeEventListener("keydown", (e) => onKeyPress(e));
    };
  }, []);

  function onKeyPress({ key }) {
    key === "Escape" && setPopupActive(false);
  }

  if (!popupActive) return null;

  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/90 md:bg-black/70 fadeIn">
      {children}
    </div>
  );
}

export default FullScreenPopup;
