import {
  addReview,
  addValueToUserArray,
  deleteValueFromUserArray,
  getUserField,
  queryDatabase,
} from "../config/firebase";
import { getMovie } from "../providers/apiProvider";
import { useState, useEffect, useContext, createContext } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const [watchlist, setWatchlist] = useState(null);
  const [reviews, setReviews] = useState(null);

  const { user } = useAuth();

  // Fill watchlist from server on login and make sure it dissapears on log out
  useEffect(() => {
    console.log("Reset watchlist");
    if (user) {
      getWatchlist();
    } else {
      setWatchlist([]);
    }
  }, [user]);

  async function getWatchlist() {
    const serverWatchlist = await getUserField("watchlist", user.uid);
    setWatchlist(serverWatchlist);
  }

  // Fill reviews from server on login and make sure it dissapears on log out
  useEffect(() => {
    if (user) {
      getReviews();
    } else setReviews([]);
  }, [user]);

  async function getReviews() {
    const serverReviews = await queryDatabase("Reviews", "uid", "==", user.uid);
    setReviews(serverReviews);
  }

  // Add a movie to the watchlist of the currently logged in user
  function addToWatchlist(id) {
    addValueToUserArray("watchlist", user.uid, id);
    watchlist?.length > 0
      ? setWatchlist([...watchlist, id])
      : setWatchlist([id]);
    toast.success("Added to watchlist", {
      style: {
        fontSize: "14px",
      },
    });
  }

  // Remove a movie from the watchlist of the currently logged in user
  function removeFromWatchlist(id) {
    deleteValueFromUserArray("watchlist", user.uid, id);
    setWatchlist([...watchlist].filter((elem) => elem !== id));
    toast.error("Removed from watchlist", {
      style: {
        fontSize: "14px",
      },
    });
  }

  // Check if the current user's watchlist includes a certain movie
  function watchlistContains(id) {
    if (watchlist && watchlist.length > 0) return watchlist.includes(id);
    else return false;
  }

  async function fetchWatchlistMovies() {
    if (watchlist) {
      const watchlistMovies = await Promise.all(
        watchlist.map((id) => getMovie(id))
      );
      return watchlistMovies;
    } else return [];
  }

  // Add a review for the current user
  async function addUserReview(id, description, rating) {
    const newReview = await addReview(user.uid, description, id, rating);
    setReviews((reviews) => [...reviews, newReview]);
  }

  // Check if the current user has a review of a movie
  function hasReview(id) {
    return reviews.some((element) => element.movieId === id);
  }

  // Follow the user with the given uid
  function followUser(uid) {
    addValueToUserArray("following", user.uid, uid);
    addValueToUserArray("followers", uid, user.uid);
  }

  // Unfollow the user with the given uid
  function unfollowUser(uid) {
    deleteValueFromUserArray("following", user.uid, uid);
    deleteValueFromUserArray("followers", uid, user.uid);
  }

  const value = {
    addToWatchlist,
    removeFromWatchlist,
    watchlistContains,
    watchlist,
    fetchWatchlistMovies,
    addUserReview,
    reviews,
    hasReview,
    followUser,
    unfollowUser,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}
