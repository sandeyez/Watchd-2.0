import React, { useState, useEffect, createContext, useContext } from "react";
import Head from "next/head";
import { useAuth } from "../../contexts/AuthContext";
import { getUserByUsername } from "../../config/firebase";
import Loading from "../../components/Main/Loading";
import { useRouter } from "next/router";
import moment from "moment";
import GradientButton from "../../components/Common/GradientButton";
import ProfileMovieList from "./../../components/Profile/MovieList";
import { useUserData } from "../../contexts/UserDataContext";
import SocialPopup from "../../components/Profile/SocialPopup";
import ProfileStats from "../../components/Profile/ProfileStats";
import {
  sortReviewsByCreatedAt,
  sortReviewsByRating,
} from "../../utils/reviews";

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

function Profile({ username }) {
  const [profileUser, setProfileUser] = useState();
  const [reviews, setReviews] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);

  const router = useRouter();
  const { user } = useAuth();
  const {
    getUserReviewedMovies,
    following,
    addFollowing,
    removeFollowing,
    isFollowing,
  } = useUserData();

  useEffect(() => {
    getUser();
  }, [username]);

  useEffect(() => {
    if (profileUser) {
      fetchReviews();
    }
  }, [profileUser]);

  useEffect(() => {
    if (profileUser && user) setIsCurrentUser(profileUser.uid === user.uid);
  }, [user, profileUser]);

  useEffect(() => {
    checkIfFollowing();
  }, [following, profileUser]);

  if (!profileUser) return <Loading />;

  // Get all user data from the database
  async function getUser() {
    const userData = await getUserByUsername(username);

    if (!userData) router.replace("/not-found");

    setProfileUser(userData);
  }

  async function fetchReviews() {
    await getUserReviewedMovies(profileUser.uid, profileUser.reviews).then(
      (data) => setReviews(data)
    );
  }

  async function checkIfFollowing() {
    if (profileUser) {
      await isFollowing(profileUser.uid).then((data) =>
        setAlreadyFollowing(data)
      );
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        profileUser,
        reviews,
        isCurrentUser,
        alreadyFollowing,
      }}
    >
      <div className="flex-col items-center space-y-4">
        <Head>
          <title>{profileUser.name}'s profile | Watchd.</title>
        </Head>
        <SocialPopup
          popupActive={popupActive}
          setPopupActive={setPopupActive}
        />
        <div className="flex flex-col items-center justify-center w-screen space-y-2 text-white h-96 bg-gradient-to-r from-regularBlue/0 via-regularBlue to-regularBlue/0">
          <div
            className={
              "w-40 h-40 overflow-hidden border-4 border-white rounded-full p-1"
            }
          >
            <img
              className="w-full h-full rounded-full"
              src={
                profileUser?.picture ? profileUser.picture : "/no_picture.svg"
              }
              alt=""
            />
          </div>
          <h1 className="text-3xl font-bold gradientText">
            {profileUser.name}
          </h1>
          <p>
            Watching since{" "}
            {moment(profileUser.createdAt).format("MMMM Do YYYY")}
          </p>
          <hr className="w-20 h-[1px] bg-white" />
          <ProfileStats />
          {!isCurrentUser ? (
            <div className="w-48">
              <GradientButton
                text={alreadyFollowing ? "Unfollow" : "Follow"}
                onClick={
                  alreadyFollowing
                    ? () => removeFollowing(profileUser.uid, profileUser.name)
                    : () => addFollowing(profileUser.uid, profileUser.name)
                }
              />
            </div>
          ) : (
            <div className="w-48">
              <GradientButton
                text="Add friends"
                onClick={() => setPopupActive(true)}
              />
            </div>
          )}
        </div>
        {reviews.length > 0 && (
          <div className="flex flex-col items-center space-y-8">
            <ProfileMovieList
              header="Most recently watchd"
              sortFunction={sortReviewsByCreatedAt}
              reviewedMovies={reviews}
            />
            <ProfileMovieList
              header="Highest rated movies"
              sortFunction={sortReviewsByRating}
              reviewedMovies={reviews}
            />
          </div>
        )}
        {reviews.length === 0 && (
          <div className="pt-10 space-y-2 text-white">
            <h2 className="font-bold text-center">
              {profileUser.name} has not watched any movies yet.
            </h2>
            <p className="text-center">
              Come back later to see what they have been watching.
            </p>
          </div>
        )}
      </div>
    </ProfileContext.Provider>
  );
}

export default Profile;

export function getServerSideProps(ctx) {
  const { username } = ctx.query;
  return { props: { username } };
}
