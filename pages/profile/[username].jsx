import React, { useState, useEffect } from "react";
import Head from "next/head";
import ProfilePicture from "./../../components/Main/Navigation Bar/ProfilePicture";
import { useAuth } from "../../contexts/AuthContext";
import { getUserByUsername } from "../../config/firebase";
import Loading from "../../components/Main/Loading";
import { useRouter } from "next/router";
import moment from "moment";
import GradientButton from "../../components/Common/GradientButton";

function Profile({ username }) {
  const [profileUser, setProfileUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  if (!profileUser) return <Loading />;

  const router = useRouter();
  const { user } = useAuth();

  const isLoggedIn = user ? profileUser.uid === user.uid : false;
  console.log(isLoggedIn);

  async function getUser() {
    const userData = await getUserByUsername(username);

    if (!userData) router.replace("/not-found");

    setProfileUser(userData);
    console.log(userData);
  }

  return (
    <div className="">
      <Head>
        <title>{profileUser.name}'s profile | Watchd.</title>
      </Head>
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
            <b>{profileUser.movies.length}</b> watchd movies
          </p>
          <p className="text-right">
            <b>{profileUser.followers.length}</b> followers
          </p>
        </div>
        {!isLoggedIn && (
          <div className="w-48">
            <GradientButton text="Follow" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

export function getServerSideProps(ctx) {
  const { username } = ctx.query;
  return { props: { username } };
}
