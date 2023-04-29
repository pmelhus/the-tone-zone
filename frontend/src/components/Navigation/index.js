import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginModal from "../HomePage/SignIn/LoginModal";
import SignUpModal from "../HomePage/SignUp/SignUpModal";
import SearchBarNav from "./SearchBarNav";

function Navigation({ isLoaded }) {
  // const sessionUser = useSelector((st ate) => state.session.user);
  const [signInToggle2, setSignInToggle2] = useState(false);
  const [signUpToggle2, setSignUpToggle2] = useState(false);
  const location = useLocation();
  const streamUrl = location.pathname.split("/")[1];
  const sessionUser = useSelector((state) => state.session.user);

  const handleSignIn = (e) => {
    setSignInToggle2(true);
  };

  const handleSignUp = (e) => {
    setSignUpToggle2(true);
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton {...{ setSignInToggle2 }} user={sessionUser} />
    );
  }

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
              <NavLink to="/upload">
                <p style={{ margin: "0" }}>Upload</p>
              </NavLink>
            ) : (
              <>
                <a onClick={handleSignIn}>
                  <li className="ul-nav-items">
                    <p>Sign In</p>
                  </li>
                </a>
                <a onClick={handleSignUp}>
                  <li className="ul-nav-items">
                    <p>Sign Up</p>
                  </li>
                </a>
              </>
            )}
            {isLoaded && sessionLinks}
          </div>
        </nav>
        <LoginModal
          setSignInToggle={setSignInToggle2}
          signInToggle={signInToggle2}
          setSignUpToggle={setSignUpToggle2}
          signUpToggle={signUpToggle2}
        />
        <SignUpModal
          setSignInToggle={setSignInToggle2}
          signInToggle={signInToggle2}
          setSignUpToggle={setSignUpToggle2}
          signUpToggle={signUpToggle2}
        />
      </div>
    </header>
  );
}

export default Navigation;
