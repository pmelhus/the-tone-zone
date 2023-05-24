import "./SignIn.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  loginButton: {
    backgroundColor: theme.orangeTheme,
    color: "white",
    borderRadius: "4px",
  },
  exit: {
    position: "absolute",
    right: "30px",
    top: "-10px",
    width: "20px",
    height: "20px",
    // padding: "10px",
    cursor: "pointer",
  },
}));

const SignIn = ({
  signInToggle,
  setSignInToggle,
  signUpToggle,
  setSignUpToggle,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [exited, setExited] = useState(false);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const user = await dispatch(
      sessionActions.login({ credential, password })
    ).catch(async (res) => {
      const data = await res.json();

      if (data && data.errors) {
        setErrors(data.errors);
      }
      await setSignInToggle(false);
      if (!errors) {
        await history.push("/discover");
      }
    });

  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setSignInToggle(false);
    setSignUpToggle(true);
  };

  const demo = async (e) => {
    const credential = "FakeUser2";
    const password = "password3";

    const user = await dispatch(
      sessionActions.login({ credential, password })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    await setSignInToggle(false);
    await history.push("/discover");
    // return <Redirect to="/discover"/>
  };

  const handleClose = () => setSignInToggle(false);

  return (
    <div className="sign-in-container">
      <button
        onClick={() => setSignInToggle(!signInToggle)}
        className="sign-in"
        type="button"
      >
        Sign In
      </button>
      <Modal size='lg' centered show={signInToggle} onHide={handleClose}>
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
      </Modal>
    </div>
  );
};

export default SignIn;
