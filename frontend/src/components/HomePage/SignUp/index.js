import "./SignUp.css";
import { useState } from "react";
import SignUpModal from "./SignUpModal";
import { createUseStyles, useTheme } from "react-jss";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

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

const SignUp = ({
  signInToggle,
  setSignInToggle,
  signUpToggle,
  setSignUpToggle,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);

  // if (sessionUser) return <Redirect to="/discover" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];

    if (password === confirmPassword) {
      dispatch(sessionActions.signup({ email, username, password, image }))
        .then(() => {
          setUsername("");
          setEmail("");
          setPassword("");
          setImage(null);
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
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleClose = () => setSignUpToggle(false);

  return (
    <div className="sign-up-container">
      <button
        onClick={() => setSignUpToggle(!signUpToggle)}
        className="sign-up"
        type="button"
      >
        Sign Up
      </button>
      <Modal show={signUpToggle} onHide={handleClose}>
        <div
          onClick={(e) => {
            handleClose();
          }}
          className={classes.exit}
        >
          <i className="fa-regular fa-xl fa-xmark"></i>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label
            style={{ marginTop: "12px", padding: "8px" }}
            id="profile-avatar-label"
          >
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

          {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
          <button style={{ marginTop: "12px" }} type="submit">
            Sign Up
          </button>

          <p style={{ padding: "0" }}>Already have an account?</p>
          <button style={{ margin: "0" }} onClick={handleSignIn}>
            Sign in
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SignUp;
