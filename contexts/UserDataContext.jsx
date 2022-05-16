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
  const [following, setFollowing] = useState(null);

  const { user } = useAuth();

  // Fill watchlist and reviews from server on login and make sure it dissapears on log out
  useEffect(() => {
    console.log("Reset watchlist");
    if (user) {
      getWatchlist();
      getReviews();
      getFollowing();
    } else {
      setWatchlist([]);
      setReviews([]);
      setFollowing([]);
    }
  }, [user]);

  async function getWatchlist() {
    const serverWatchlist = await getUserField("watchlist", user.uid);
    setWatchlist(serverWatchlist);
  }

  async function getReviews() {
    const serverReviews = await getUserField("reviews", user.uid);
    setReviews(serverReviews);
  }

  async function getFollowing() {
    const serverFollowing = await getUserField("following", user.uid);
    setFollowing(serverFollowing);
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
    await addReview(user.uid, description, id, parseInt(rating));
    reviews?.length > 0 ? setReviews([...reviews, id]) : setReviews([id]);
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

  async function getUserReview(uid, movieId) {
    const reviews = await queryDatabase("Reviews", "uid", "==", uid);
    const userReview = reviews.find((review) => review.movieId === movieId);

    return userReview;
  }

  async function getUserReviews(uid, movieIds) {
    const reviews = await Promise.all(
      movieIds.map((id) => getUserReview(uid, id))
    );

    return reviews;
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
    following,
    followUser,
    unfollowUser,
    getUserReviews,
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
