import {
  addReview,
  addValueToUserArray,
  deleteValueFromUserArray,
  getUserField,
  queryDatabase,
  followUser,
  unfollowUser,
  doesDocExist,
} from "../config/firebase";
import { getMovie } from "../providers/apiProvider";
import { useState, useEffect, useContext, createContext } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const [watchlist, setWatchlist] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const { user } = useAuth();

  // Fill watchlist and reviews from server on login and make sure it dissapears on log out
  useEffect(() => {
    console.log("Reset watchlist");
    if (user) {
      getWatchlist();
      getUserReviews();
      getUserFollowers();
      getUserFollowing();
    } else {
      setWatchlist([]);
      setReviews([]);
      setFollowers([]);
      setFollowing([]);
    }
  }, [user]);

  async function getWatchlist() {
    const serverWatchlist = await getUserField("watchlist", user.uid);
    setWatchlist(serverWatchlist);
  }

  async function getReviews(uid) {
    const serverReviews = await getUserField("reviews", uid);
    return serverReviews;
  }

  async function getUserReviews() {
    await getReviews(user.uid).then((data) => setReviews(data));
  }

  async function getFollowing(uid) {
    if (!uid) return [];
    const serverFollowing = await queryDatabase(
      "Friends",
      "follower",
      "==",
      uid
    );

    return serverFollowing.map((friend) => friend.followee);
  }

  async function getFollowers(uid) {
    if (!uid) return [];

    const serverFollowers = await queryDatabase(
      "Friends",
      "followee",
      "==",
      uid
    );
    return serverFollowers.map((friend) => friend.follower);
  }

  async function getUserFollowers() {
    await getFollowers(user.uid).then((data) =>
      data.length > 0 ? setFollowers(data) : setFollowers([])
    );
  }

  async function getUserFollowing() {
    await getFollowing(user.uid).then((data) =>
      data.length > 0 ? setFollowing(data) : setFollowing([])
    );
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
    await addReview(
      user.uid,
      user.displayName,
      description,
      id,
      parseInt(rating)
    );
    reviews?.length > 0 ? setReviews([...reviews, id]) : setReviews([id]);
  }

  // Check if the current user has a review of a movie
  function hasReview(id) {
    return reviews.some((element) => element.movieId === id);
  }

  // Find a user by their username
  async function findUser(username) {
    const users = await queryDatabase(
      "Users",
      "username",
      "==",
      username.toLowerCase()
    );
    return users[0];
  }

  // Follow the user with the given uid
  async function addFollowing(followUid, followName) {
    await followUser(user.uid, followUid).then(() =>
      setFollowing([...following, followUid])
    );
    toast.success("You are now following " + followName);
  }

  // Unfollow the user with the given uid
  async function removeFollowing(followUid, followName) {
    await unfollowUser(user.uid, followUid).then(() =>
      setFollowing([...following].filter((elem) => elem !== followUid))
    );
    toast.error("You no longer follow " + followName);
  }

  // Check if the current user is following the user with the given uid
  async function isFollowing(followeeUid) {
    return await doesDocExist("Friends", user.uid + followeeUid).then(
      (result) => {
        return result;
      }
    );
  }

  async function getUserReview(uid, movieId) {
    const reviews = await queryDatabase("Reviews", "uid", "==", uid);
    const userReview = reviews.find((review) => review.movieId === movieId);

    return userReview;
  }

  async function getUserReviewedMovies(uid, movieIds) {
    if (!movieIds) return [];
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
    getReviews,
    addUserReview,
    reviews,
    hasReview,
    following,
    followers,
    addFollowing,
    removeFollowing,
    getFollowers,
    getFollowing,
    getUserReviewedMovies,
    findUser,
    isFollowing,
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
