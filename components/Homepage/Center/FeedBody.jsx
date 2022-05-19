import React from "react";
import Loading from "../../Main/Loading";
import FriendPost from "./FriendPost";

function FeedBody({ data, loading }) {
  if (loading) return <Loading />;

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center">
        <h1 className="text-xl font-bold">There is nothing to see here...</h1>
        <h1 className="text-sm">Follow your friends to see their activity!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 overflow-y-scroll">
      {data.map((review, index) => {
        return <FriendPost post={review} key={index} />;
      })}
    </div>
  );
}

export default FeedBody;
