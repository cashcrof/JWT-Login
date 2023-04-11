import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export default function Profile() {
  const { user, updateToken } = useContext(AuthContext);
  if (user) {
  return (
    <>
      <h1>Profile: {user?.displayName}</h1>
      <p>Email: {user?.email}</p>
      <img src={user?.profileImage} alt="" />

      <button onClick={() => updateToken("")}>Log Out</button>
    </>
  );
  } else {
    return <p>Not logged in</p>
  }
}