import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../../store/session";
import "./SignUpModal.css";

function SignupFormPage({ signUpToggle, setSignUpToggle, setSignInToggle }) {
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

  const backgroundClick = () => {
    setSignUpToggle(!signUpToggle);
  };
  if (!signUpToggle) return null;

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div
      className="background-modal"
      onClick={(e) => {
        backgroundClick();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">

        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
