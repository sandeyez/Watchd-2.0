import React from "react";
import FullScreenPopup from "../Common/FullScreenPopup";

function SocialPopup({ popupActive, setPopupActive }) {
  if (!popupActive) return null;

  return (
    <FullScreenPopup
      popupActive={popupActive}
      setPopupActive={setPopupActive}
      Component={() => (
        <div className="absolute w-[600px] h-[600px] bg-regularBlue rounded-2xl border-2 border-white text-white -z-30 overflow-hidden slideInFromTop"></div>
      )}
    />
  );
}

export default SocialPopup;
