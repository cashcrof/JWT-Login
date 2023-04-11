import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Navbar = ({ onPageChange }) => {
  const { user } = useContext(AuthContext);
  return (
    <nav className="nav-bar">
      <span onClick={() => onPageChange("home")} to="/">
        Home
      </span>
      {!user ? (
        <>
          <span onClick={() => onPageChange("login")} to="/login">
            Login
          </span>
          <span onClick={() => onPageChange("signup")} to="/signup">
            Sign Up
          </span>
        </>
      ) : (
        <span onClick={() => onPageChange("logout")} to="/logout">
          Log Out: {user.displayName}
        </span>
      )}
      <span onClick={() => onPageChange("profile")} to="/profile">
        Profile
      </span>
    </nav>
  );
};

export default Navbar;