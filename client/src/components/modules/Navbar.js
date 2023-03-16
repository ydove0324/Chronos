import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1049307798941-3nuj3nndfu8520n1151qdiahodkpdgpe.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
/**
 *
 * @param {*} props
 * @UserId
 * @handleLogout
 * @handleLogin
 */
const NavBar = (props) => {
  // console.log(props);
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Chronos</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {props.userId && (
          <Link to={`/profile/${props.userId}`} className="NavBar-link">
            Profile
          </Link>
        )}
        <Link to="/timemanage" className="NavBar-link">
          TimeManage
        </Link>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {props.userId ? (
            <button
              onClick={() => {
                googleLogout();
                props.handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
          )}
        </GoogleOAuthProvider>
      </div>
    </nav>
  );
};

export default NavBar;
