import { createUseStyles, useTheme } from "react-jss";

import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const useStyles = createUseStyles((theme) => ({
  form: {
    padding: "50px",
  },
  stockImage: {
    width: "100px",
    height: "100px",
    borderRadius: "100%",
    backgroundImage: `url("https://img.myloview.com/posters/default-avatar-profile-in-trendy-style-for-social-media-user-icon-400-228654852.jpg")`,
    backgroundSize: "cover",
    objectFit: "cover",
    margin: "10px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  imageInputDiv: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  submitButton: {
    backgroundColor: theme.orangeTheme,
    color: "white",
    borderRadius: "4px",
    '&:hover': {
      backgroundColor: 'white',
      color: theme.orangeTheme
    },
    width: '100%'

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
}));

const MyAccount = ({ setAccountModal }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);

  // loading state for updating information
  const [isLoading, setIsLoading] = useState(false);

  // change the state of username
  const [username, setUsername] = useState(sessionUser.username);
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

// close the account modal

const handleClose = () => {
  setAccountModal(false)
}

  // change the state of the image
  const [image, setImage] = useState(sessionUser.profileImageUrl);

  const [preview, setPreview] = useState(sessionUser.profileImageUrl);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // handles the submission of edited account information

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    setIsLoading(true);
    dispatch(
      sessionActions.updateUser({ username, image, userId: sessionUser.id })
    )
      .then(() => {
        setUsername("");

        setImage(null);

        setAccountModal(false);
      })
      .then(() => {
        dispatch(sessionActions.restoreUser());
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors);
        }
      });
  };

  // sets the preview state of the new image in the image input
  useEffect(() => {
    // only changes image state to url if image is a file and not a string
    if (image && typeof image !== "string") {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      return;
    }
  }, [image]);

  return (
    <Form onSubmit={handleSubmit} className={classes.form}>
               <div
            onClick={(e) => {
              handleClose();
            }}
            className={classes.exit}
          >
            <i className="fa-regular fa-xl fa-xmark"></i>
          </div>
      <h4>Edit your account information</h4>
      <div className={classes.imageContainer}>
        <img className={classes.stockImage} src={preview} />
      </div>
      <Form.Group controlId="imageInput">
        <div className={classes.imageInputDiv}>
          <label id="profile-avatar-label">
            Upload profile avatar
            <input
              id="profile-avatar-upload"
              placeholder="Upload your image"
              type="file"
              accept="image/*"
              name="image-upload"
              onChange={handleImage}
            ></input>
          </label>
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          onChange={handleUsername}
          value={username}
          required
        />
      </Form.Group>

      {isLoading ? (
        <button className={classes.submitButton} disabled>
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
          Update
        </button>
      )}
    </Form>
  );
};

export default MyAccount;
