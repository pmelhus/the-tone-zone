import ImageSlides from "./ImageSlides";
import TopLogo from "./TopLogo";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SearchSongs from "./SearchSongs/SearchSongs";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import { useState } from "react";
import * as sessionActions from "../../store/session";
import Footer from "../Footer"

const HomePage = ({
  signInToggle,
  setSignInToggle,
  signUpToggle,
  setSignUpToggle,
}) => {
  const sessionUser = useSelector((state) => state.session.user);
  // if (sessionUser) {
  //   return <Redirect to="/discover" />;
  // } else {
  // if (!sessionUser) return <Redirect to='/' />
  return (
    <>
      <div className="container">
        <div className="main-content">
          <div className="top-images-container">
            <div className="top-half">
              <TopLogo />
              {!sessionUser ? (
                <>
                  <SignIn
                    {...{ signInToggle }}
                    {...{ setSignInToggle }}
                    {...{ signUpToggle }}
                    {...{ setSignUpToggle }}
                  />
                  <SignUp
                    {...{ signInToggle }}
                    {...{ setSignInToggle }}
                    {...{ signUpToggle }}
                    {...{ setSignUpToggle }}
                  />
                </>
              ) : (
                <div className="sign-up-container">
                  <Link to="/discover">
                    <button className="sign-up">Home</button>
                  </Link>
                </div>
              )}
              <ImageSlides />
              <SearchSongs

                {...{ signInToggle }}
                {...{ setSignInToggle }}
                {...{ signUpToggle }}
                {...{ setSignUpToggle }}
              />
            </div>
            <div className="footer-half">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
