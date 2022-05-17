import React, { useState, useEffect } from "react";
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

function Profile({ username }) {
  const [profileUser, setProfileUser] = useState();
  const [reviews, setReviews] = useState([]);
  const [popupActive, setPopupActive] = useState(false);

  const { getUserReviews } = useUserData();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (profileUser) {
      fetchReviews();
    }
  }, [profileUser]);

  const router = useRouter();
  const { user } = useAuth();

  if (!profileUser) return <Loading />;

  const isCurrentUser = user ? profileUser.uid === user.uid : false;

  // Get all user data from the database
  async function getUser() {
    const userData = await getUserByUsername(username);

    if (!userData) router.replace("/not-found");

    setProfileUser(userData);
  }

  async function fetchReviews() {
    await getUserReviews(profileUser.uid, profileUser.reviews).then((data) =>
      setReviews(data)
    );
  }

  function sortByRating(a, b) {
    if (isNaN(a.rating) && isNaN(b.rating)) {
      return 0;
    }
    if (isNaN(a.rating)) {
      return 1;
    }
    if (isNaN(b.rating)) {
      return -1;
    }

    return b.rating - a.rating;
  }

  function sortByCreatedAt(a, b) {
    return b.createdAt.seconds - a.createdAt.seconds;
  }

  return (
    <div className="flex-col items-center space-y-4">
      <Head>
        <title>{profileUser.name}'s profile | Watchd.</title>
      </Head>
      <SocialPopup popupActive={popupActive} setPopupActive={setPopupActive} />
      <div className="flex flex-col items-center justify-center w-screen space-y-2 text-white h-96 bg-gradient-to-r from-regularBlue/0 via-regularBlue to-regularBlue/0">
        <div
          className={
            "w-40 h-40 overflow-hidden border-4 border-white rounded-full p-1"
          }
        >
          <img
            className="w-full h-full rounded-full"
            src={profileUser?.picture ? profileUser.picture : "/no_picture.svg"}
            alt=""
          />
        </div>
        <h1 className="text-3xl font-bold gradientText">{profileUser.name}</h1>
        <p>
          Watching since {moment(profileUser.createdAt).format("MMMM Do YYYY")}
        </p>
        <hr className="w-20 h-[1px] bg-white" />
        <div className="grid grid-cols-3">
          <p>
            <b>{profileUser.following.length}</b> following
          </p>
          <p className="text-center">
            <b>{profileUser.reviews?.length || 0}</b> watchd movies
          </p>
          <p className="text-right">
            <b>{profileUser.followers.length}</b> followers
          </p>
        </div>
        {!isCurrentUser ? (
          <div className="w-48">
            <GradientButton text="Follow" />
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
      <div className="flex flex-col items-center space-y-4">
        <ProfileMovieList
          header="Most recently watchd"
          sortFunction={sortByCreatedAt}
          reviewedMovies={reviews}
        />
        <ProfileMovieList
          header="Highest rated movies"
          sortFunction={sortByRating}
          reviewedMovies={reviews}
        />
      </div>
    </div>
  );
}

export default Profile;

export function getServerSideProps(ctx) {
  const { username } = ctx.query;
  return { props: { username } };
}
