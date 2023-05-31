import "./SignIn.css";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import Spinner from "react-bootstrap/Spinner";

const useStyles = createUseStyles((theme) => ({
  loginButton: {
    backgroundColor: theme.orangeTheme,
    color: "white",
    borderRadius: "4px",
  },
  exit: {
    position: "absolute",
    right: "20px",
    top: "10px",
    width: "20px",
    height: "20px",
    // padding: "10px",
    cursor: "pointer",
  },
  modalSignUp: {
    padding: "40px",

  },
  submitButton: {
    backgroundColor: theme.orangeTheme,
    color: "white",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "white",
      color: theme.orangeTheme,
    },
    width: "100%",
    marginTop: '10px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "13px",
    padding: "0",
  },
  noAccount: {
    marginTop: '20px',
  }
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
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setLoading(true);
    await e.preventDefault();
    setErrors([]);
    const user = await dispatch(
      sessionActions.login({ credential, password })
    ).catch(async (res) => {
      const data = await res.json();

      if (data && data.errors) {
        await setErrors(data.errors);
        await setLoading(false);
        await setDemoLoading(false);
      }
      if (!errors) {
        await setSignInToggle(false);

        await history.push("/discover");
      }
    });
  };
  const [pleaseLoginMsg, setPleaseLoginMsg] = useState(false);

  const handleSignUp = (e) => {

    e.preventDefault();
    if (history.location.state?.pleaseLogin && !sessionUser) {
      setPleaseLoginMsg(true);
    }
    setSignInToggle(false);
    setSignUpToggle(true);
    setErrors([])
  };

  const demo = async (e) => {
    const credential = "DemoUser";
    const password = "password";

    e.preventDefault();
    await setDemoLoading(true);

    const user = await dispatch(
      sessionActions.login({ credential, password })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        await setErrors(data.errors);
        await setLoading(false);
        await setDemoLoading(false);
      }
    });
    if (user) {
      await setSignInToggle(false);
      await history.push("/discover");
      await setDemoLoading(false);
    }
    // return <Redirect to="/discover"/>
  };

  const handleClose = () => {
    setPleaseLoginMsg(false);
    setSignInToggle(false);
    history.push({
      state: {
        pleaseLogin: false,
      },
    });
  };

  // check the state of history to see if login was prompted by song click or not

  useEffect(() => {
    if (history.location.state?.pleaseLogin) {
      setPleaseLoginMsg(true);
    }
  }, [history.location.state?.pleaseLogin]);
  // console.log(history.location.state, "STATE");
  // useEffect(()=> {
  // },[])

  return (
    <div className="sign-in-container">
      <button
        onClick={() => setSignInToggle(!signInToggle)}
        className="sign-in"
        type="button"
      >
        Sign In
      </button>
      <Modal size='sm' centered show={signInToggle} onHide={handleClose}>
        <form className={classes.modalSignUp} onSubmit={handleSubmit}>
          <div
            onClick={(e) => {
              handleClose();
            }}
            className={classes.exit}
          >
            <i className="fa-regular fa-xl fa-xmark"></i>
          </div>
          {pleaseLoginMsg && <p>Please sign in or sign up to play a song!</p>}
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

          {loading ? (
            <button disabled className={classes.submitButton}>
              {" "}
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </button>
          ) : (
            <button className={classes.submitButton} type="submit">
              Sign In
            </button>
          )}

          {demoLoading ? (
            <button disabled className={classes.submitButton}>
              {" "}
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </button>
          ) : (
            <button className={classes.submitButton} onClick={demo}>
              Demo Sign In
            </button>
          )}

          <p className={classes.noAccount}>Don't have an account?</p>
          <button onClick={handleSignUp} className={classes.submitButton}>
            Sign Up
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SignIn;
