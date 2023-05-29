import "./SignUp.css";
import { useState, useEffect } from "react";
import SignUpModal from "./SignUpModal";
import { createUseStyles, useTheme } from "react-jss";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const useStyles = createUseStyles((theme) => ({
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
    width: "340px",
  },
  loginButton: {
    backgroundColor: theme.orangeTheme,
    color: "white",
    borderRadius: "4px",
    marginTop: "20px",
    width: "100%",
  },
  stockImage: {
    width: "80px",
    height: "80px",
    borderRadius: "100%",
  },
  errors: {
    padding: "0",
  },
  signInButton: {
    width: "100%",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "13px",
    padding: "0",
  },
}));

const SignUp = ({
  signInToggle,
  setSignInToggle,
  signUpToggle,
  setSignUpToggle,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // if (sessionUser) return <Redirect to="/discover" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let newErrors = [];

    if (password === confirmPassword) {
      dispatch(sessionActions.signup({ email, username, password, image }))
        .then(() => {
          setUsername("");
          setEmail("");
          setPassword("");
          setImage(null);
          history.push("/discover");
          setLoading(false);
          setSignUpToggle(false);
        })
        .catch(async (res) => {
          const data = await res.json();

          if (data && data.errors) {
            newErrors = data.errors;
            setErrors(newErrors);
          }
        });
    } else {
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setSignUpToggle(false);
    setSignInToggle(true);
    setErrors([])
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleClose = () => setSignUpToggle(false);

  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [preview, setPreview] = useState();

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleImageInput = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="sign-up-container">
      <button
        onClick={() => setSignUpToggle(!signUpToggle)}
        className="sign-up"
        type="button"
      >
        Sign Up
      </button>
      <Modal size="lg" centered show={signUpToggle} onHide={handleClose}>
        <div className={classes.modalSignUp}>
          <div
            onClick={(e) => {
              handleClose();
            }}
            className={classes.exit}
          >
            <i className="fa-regular fa-xl fa-xmark"></i>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <ul className={classes.errors}>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="username-div">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="username-div">
                <label>Username</label>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="username-div">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="username-div">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="username-div">
              {/* preview for image */}
              <div>
                {isImageLoaded ? (
                  image ? (
                    <img
                      className={classes.stockImage}
                      src={preview}
                      alt="uploaded"
                    />
                  ) : (
                    <img
                      className={classes.stockImage}
                      src="https://img.myloview.com/posters/default-avatar-profile-in-trendy-style-for-social-media-user-icon-400-228654852.jpg"
                    />
                  )
                ) : (
                  <img
                    className={classes.stockImage}
                    src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                    alt="loading"
                  />
                )}
              </div>
              <label id="profile-avatar-label">
                Upload profile avatar
                <input
                  id="profile-avatar-upload"
                  placeholder="Upload your image"
                  type="file"
                  accept="image/*"
                  name="image-upload"
                  onChange={updateImage}
                ></input>
              </label>
            </div>

            {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}

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
                Sign Up
              </button>
            )}

            <p
              style={{ padding: "0", marginTop: "20px", marginBottom: "10px" }}
            >
              Already have an account?
            </p>
            <button className={classes.submitButton} onClick={handleSignIn}>
              Sign in
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;
