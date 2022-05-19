import React, { useState, useEffect } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useProfile } from "../../pages/profile/[username]";

function ProfileStats({}) {
  const [followerCount, setFollowerCount] = useState(null);
  const [followingCount, setFollowingCount] = useState(null);

  const { profileUser, isCurrentUser, alreadyFollowing } = useProfile();
  const { getFollowers, getFollowing, followers, following } = useUserData();

  useEffect(() => {
    fetchData();
  }, [profileUser, alreadyFollowing, following, followers]);

  async function fetchData() {
    if (isCurrentUser) {
      setFollowerCount(followers.length);
      setFollowingCount(following.length);
    } else {
      await getFollowers(profileUser.uid).then((data) =>
        setFollowerCount(data.length)
      );
      await getFollowing(profileUser.uid).then((data) =>
        setFollowingCount(data.length)
      );
    }
  }

  if (followerCount === null || followingCount === null) return null;

  return (
    <div className="grid grid-cols-3">
      <p>
        <b>{followingCount}</b> following
      </p>
      <p className="text-center">
        <b>{profileUser.reviews?.length || 0}</b> watchd movies
      </p>
      <p className="text-right">
        <b>{followerCount}</b> followers
      </p>
    </div>
  );
}

export default ProfileStats;
