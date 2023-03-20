import "./LoginModal.css";
import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginModal.css";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  loginButton: {
    backgroundColor: theme.orangeTheme,
    color: "white",
    borderRadius: "4px",
  },
  exit: {
    position: "absolute",
    right: "0",
    top: "0",
    width: "20px",
    height: "20px",
    padding: "10px",
    cursor: 'pointer'
  },

}));

const LoginModal = ({ setSignInToggle, signInToggle, setSignUpToggle }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [exited, setExited] = useState(false);

  let history = useHistory();
  // if (sessionUser) return <Redirect to="/discover" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        // console.log(data)
        if (data && data.errors) {
          setErrors(data.errors);
        }
        if (!errors) return history.push("/discover");
      }
    );
    // console.log(dispatch(sessionActions.login({ credential, password })))
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setSignInToggle(false);
    setSignUpToggle(true);
  };

  const demo = (e) => {
    const credential = "FakeUser2";
    const password = "password3";

    dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    return history.push("/discover");
    // return <Redirect to="/discover"/>
  };

  const backgroundClick = () => {
    setSignInToggle(!signInToggle);
    history.replace("/", { commentAttempt: false });
    setExited(true);
  };
  if (!signInToggle) return null;

  return (
    <div
      className="background-modal"
      onClick={(e) => {
        backgroundClick();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div
            onClick={(e) => {
              backgroundClick();
            }}
            className={classes.exit}
          >
            <i className="fa-regular fa-xl fa-xmark"></i>
          </div>
          {/* <div className="fang-buttons">
            <div className="fb-button"></div>
            <button type="button">Continue with Facebook</button>
            <div className="google-button"></div>
            <button>Continue with Google</button>
            <div className="apple-button"></div>
            <button>Continue with Apple</button>
            <div className="auth-separator">
              <span className="or-span">or</span>
            </div>
          </div> */}
          {history.location.state?.commentAttempt && !exited && (
            <p>Please log in or sign up to comment on a song!</p>
          )}
          <form className="signin-form" onSubmit={handleSubmit}>
            <ul>
              {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="username-div">
              <label>Username or Email</label>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
            <div className="password-div">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={classes.loginButton} type="submit">
              Log In
            </button>
            <button className={classes.loginButton} onClick={demo}>
              Demo Login
            </button>

            <p>Don't have an account?</p>
            <button onClick={handleSignUp}>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
