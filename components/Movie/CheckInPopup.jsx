import React, { useState, useEffect } from "react";
import { useMovie } from "../../pages/movies/[id]";
import FullScreenPopup from "../Common/FullScreenPopup";
import { MdClose } from "react-icons/md";
import {
  getMoviePoster,
  getMovieBackdrop,
  getReleaseYear,
} from "../../utils/movie";
import GradientButton from "./../Common/GradientButton";
import { useUserData } from "../../contexts/UserDataContext";
import toast from "react-hot-toast";
import styles from "../../styles/styles.module.css";

function CheckInPopup({ popupActive, setPopupActive }) {
  const [rating, setRating] = useState(50);
  const [description, setDescription] = useState("");
  const [changedRating, setChangedRating] = useState(false);

  const { movie } = useMovie();
  const { addUserReview } = useUserData();

  if (!popupActive) return null;

  async function onSubmit() {
    await addUserReview(movie.id, description, changedRating ? rating : null)
      .then(toast.success("Review added!"))
      .then(() => setPopupActive(false));
  }

  return (
    <FullScreenPopup popupActive={popupActive} setPopupActive={setPopupActive}>
      <div className="absolute w-screen sm:w-[600px] h-[600px] bg-regularBlue rounded-2xl border-2 border-white text-white -z-30 overflow-hidden slideInFromTop">
        <MdClose
          className="absolute cursor-pointer right-6 top-6"
          size={25}
          onClick={() => setPopupActive(false)}
        />
        <img
          src={getMovieBackdrop(movie.backdrop_path)}
          alt=""
          className="absolute object-cover w-full h-64 -z-20"
        />
        <div className="absolute w-full h-64 -z-10 bg-gradient-to-b from-regularBlue/60 to-regularBlue/100"></div>
        <div className="flex flex-col p-8 space-y-4">
          <div className="flex space-x-4">
            <img
              src={getMoviePoster(movie.poster_path)}
              alt=""
              className="w-32"
            />
            <div className="flex flex-col justify-end">
              <h1 className="text-2xl font-bold gradientText">{movie.title}</h1>
              <h1 className="text-sm font-light">
                {getReleaseYear(movie.release_date)}
              </h1>
            </div>
          </div>
          <div>
            <h1 className="font-bold">How did you like the movie?</h1>
            <div className="flex mt-1 space-x-2">
              <div className="flex items-center justify-center w-12 h-12 p-4 rounded-lg bg-darkBlue">
                <h1 className="text-lg font-bold">
                  {changedRating ? rating / 10 : "-"}
                </h1>
              </div>
              <input
                type="range"
                className={`${styles.checkInSlider} w-full`}
                min="10"
                max="100"
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                  setChangedRating(true);
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h1 className="font-bold">Describe your rating:</h1>
              <h1
                className={`text-sm ${
                  description.length < 1000 ? "text-grey" : "text-red-500"
                } cursor-default`}
                title="Review must be less than 1000 characters"
              >
                {1000 - description.length}
              </h1>
            </div>
            <textarea
              className="w-full h-32 p-2 mt-1 text-sm rounded-lg resize-none bg-darkBlue noScrollbar"
              name="description"
              cols="10"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What did you think of the movie?"
            />
          </div>
          <div className="mx-24">
            <GradientButton
              text="Check-in"
              onClick={onSubmit}
              disabled={description.length > 1000}
            />
          </div>
        </div>
      </div>
    </FullScreenPopup>
  );
}

export default CheckInPopup;
