import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navigation({ isLoaded, sessionUser }) {
  // const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  }

  const location = useLocation();

  const streamUrl = location.pathname.split("/")[1];

  return (
    <header>
      <div className="nav-div">
        <nav className="nav-main">
          <ul className="ul-nav">
            <NavLink to="/">
              <img
                alt="site icon"
                src="https://res.cloudinary.com/dmtap2h65/image/upload/v1657853171/Tone_Zone_logo_m442ls.png"
              ></img>
            </NavLink>

            <NavLink
              className={
                location.pathname === "/discover" && "nav-div-selected"
              }
              to="/discover"
            >
              <li className="ul-nav-items">
                <p>Home</p>
              </li>
            </NavLink>
            <NavLink
              className={streamUrl === "stream" && "nav-div-selected"}
              to="/stream"
            >
              <li className="ul-nav-items">
                <p>Stream</p>
              </li>
            </NavLink>
            <NavLink
              className={
                location.pathname === "/you/library/playlists" && "nav-div-selected"
              }
              to="/you/library/playlists"
            >
              <li className="ul-nav-items">
                <p>Library</p>
              </li>
            </NavLink>
          </ul>
          <div className="profile-button">
            <NavLink to="/upload">
              <p>Upload</p>
            </NavLink>
            {isLoaded && sessionLinks}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
