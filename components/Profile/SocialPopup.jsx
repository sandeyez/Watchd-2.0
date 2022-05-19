import React, { useState, useEffect } from "react";
import FullScreenPopup from "../Common/FullScreenPopup";
import {
  MdClose,
  MdSearch,
  MdContentCopy,
  MdPersonAdd,
  MdPersonRemoveAlt1,
} from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { useUserData } from "../../contexts/UserDataContext";

function SocialPopup({ popupActive, setPopupActive }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultUser, setResultUser] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFollowingResultUser, setIsFollowingResultUser] = useState(false);

  const { user } = useAuth();
  const { findUser, addFollowing, removeFollowing, isFollowing } =
    useUserData();

  if (!user) return null;
  async function handleSearch(e) {
    e.preventDefault();

    if (searchTerm.length < 1) return;

    await findUser(searchTerm)
      .then((data) => {
        setResultUser(data);
        return data;
      })
      .then(async (data) => {
        const following = await isFollowing(data.uid);
        console.log("following", following);
        setIsFollowingResultUser(following);
      })
      .then(() => setHasSearched(true));
  }

  function handleCopy() {
    navigator.clipboard.writeText(user.displayName);
    toast.success("Username copied to clipboard");
  }

  function handleFollow() {
    addFollowing(resultUser.uid, resultUser.name);
    setIsFollowingResultUser(true);
  }

  function handleUnfollow() {
    removeFollowing(resultUser.uid);
    setIsFollowingResultUser(false);
  }

  return (
    <FullScreenPopup popupActive={popupActive} setPopupActive={setPopupActive}>
      <div className="absolute bottom-0 sm:bottom-auto w-screen sm:w-[500px] p-8 overflow-hidden text-white border-2 border-white bg-regularBlue rounded-2xl -z-30 slideInFromBottom sm:slideInFromTop">
        <MdClose
          className="absolute cursor-pointer right-6 top-6"
          size={25}
          onClick={() => setPopupActive(false)}
        />
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">Add your friends</h1>
          <hr className="w-1/4" />
          <h1>Find friends by their username:</h1>
          <div className="relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full h-12 px-4 py-2 pr-16 text-sm rounded-lg bg-darkBlue"
                placeholder="Enter username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <MdSearch className="absolute top-0 w-8 h-full text-white cursor-pointer right-4" />
              </button>
            </form>
          </div>
          {hasSearched && resultUser && (
            <div className="flex items-center w-full p-6 space-x-4 rounded-lg bg-darkBlue">
              <img
                src={resultUser.picture}
                className="w-16 border-4 border-white rounded-full "
              />
              <div>
                <h1 className="text-xl font-bold gradientText">
                  {resultUser.name}
                </h1>
                <h1 className="text-sm">
                  Watchd {resultUser.reviews.length} movies
                </h1>
              </div>
              <div className="flex justify-end flex-1">
                {!isFollowingResultUser ? (
                  <MdPersonAdd
                    size={32}
                    className="cursor-pointer"
                    onClick={handleFollow}
                  />
                ) : (
                  <MdPersonRemoveAlt1
                    size={32}
                    className="cursor-pointer"
                    onClick={handleUnfollow}
                  />
                )}
              </div>
            </div>
          )}
          <h1>Or send them your username:</h1>
          <div className="relative">
            <input
              type="text"
              className="w-full h-12 px-4 py-2 pr-16 text-sm rounded-lg bg-darkBlue"
              placeholder="Enter username..."
              value={user.displayName}
              disabled
            />
            <MdContentCopy
              className="absolute top-0 w-6 h-full text-white cursor-pointer right-4"
              onClick={handleCopy}
            />
          </div>
        </div>
      </div>
    </FullScreenPopup>
  );
}

export default SocialPopup;
