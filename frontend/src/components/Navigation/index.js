import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginModal from "../HomePage/SignIn/LoginModal";
import SignUpModal from "../HomePage/SignUp/SignUpModal";
import SearchBarNav from "./SearchBarNav";
import SignIn2 from "./SignIn2";
import SignUp2 from "./SignUp2";

function Navigation({ isLoaded }) {
  // const sessionUser = useSelector((st ate) => state.session.user);

  const location = useLocation();
  const streamUrl = location.pathname.split("/")[1];
  const sessionUser = useSelector((state) => state.session.user);


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
            {sessionUser && (
              <NavLink
                className={
                  location.pathname === "/discover" ? "nav-div-selected" : null
                }
                to="/discover"
              >
                <li className="ul-nav-items">
                  <p>Home</p>
                </li>
              </NavLink>
            )}

            <NavLink
              className={streamUrl === "stream" && "nav-div-selected"}
              to="/stream"
            >
              <li className="ul-nav-items">
                <p>Stream</p>
              </li>
            </NavLink>
            {sessionUser && (
              <NavLink
                className={
                  (location.pathname === "/you/library/playlists" ||
                    location.pathname === "/you/library/tracks") &&
                  "nav-div-selected"
                }
                to="/you/library/tracks"
              >
                <li className="ul-nav-items">
                  <p>Library</p>
                </li>
              </NavLink>
            )}
          </ul>
          {/* <div className="search-bar-nav"> */}
          <SearchBarNav />
          {/* </div> */}
          <div className={sessionUser ? "profile-button" : "signin-signup-div"}>
            {sessionUser ? (
              <div className="upload-div">
                <NavLink to="/upload">
                  <p>Upload</p>
                </NavLink>
                <ProfileButton/>
              </div>
            ) : (
              <>
                <li className="ul-nav-items">
                  <SignIn2 />
                </li>

                <li className="ul-nav-items">
                  <SignUp2 />
                </li>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
