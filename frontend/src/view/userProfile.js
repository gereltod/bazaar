import React, { useContext } from "react";
import { UserContext } from "../component/context/userContext";
import { Redirect } from "react-router-dom";

export function UserProfile() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Redirect to="/"></Redirect>;
  } else {
    return (
      <div>
        <h2>User info</h2>
        <h3>{user.username}</h3>
      </div>
    );
  }
}
