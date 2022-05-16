import React from "react";
import { useState } from "react";
import { useUserData } from "../../../contexts/UserDataContext";
import { useEffect } from "react";
import Loading from "../../Main/Loading";

function FeedBody(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { following } = useUserData();

  useEffect(() => {
    if (following !== null) {
      setIsLoading(false);
    }
  }, [following]);

  if (isLoading) return <Loading />;

  if (following.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center">
        <h1 className="text-xl font-bold">There is nothing here</h1>
        <h1 className="text-sm">Follow your friends to see their activity</h1>
      </div>
    );
  }

  return <div className=""></div>;
}

export default FeedBody;
