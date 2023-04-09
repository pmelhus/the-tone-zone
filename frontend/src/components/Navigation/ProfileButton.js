import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import "./ProfileButton.css";
import Dropdown from "react-bootstrap/Dropdown";


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
  className='custom-toggle'
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </div>
));

function ProfileButton({ setSignInToggle2 }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  let history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    setIsLoaded(true);
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    setSignInToggle2(false);
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <div className="button-div">
          {user.profileImageUrl ? (
            <img className="avatar" src={isLoaded && user?.profileImageUrl} />
          ) : (
            <img
              className="avatar"
              src="https://img.myloview.com/posters/default-avatar-profile-in-trendy-style-for-social-media-user-icon-400-228654852.jpg"
            />
          )}
          <p className="username">{user.username}</p>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileButton;
