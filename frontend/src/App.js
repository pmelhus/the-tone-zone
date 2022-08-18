import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import UserHomePage from "./components/UserHomePage/index";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector((state) => state.session.user);

  const [signInToggle, setSignInToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage {...{signUpToggle}} {...{setSignUpToggle}} {...{signInToggle}} {...{setSignInToggle}}/>
        </Route>
        <>
          <Navigation isLoaded={isLoaded} sessionUser={sessionUser} {...{signUpToggle}} {...{setSignUpToggle}} {...{signInToggle}} {...{setSignInToggle}} />
          <UserHomePage sessionUser={sessionUser} />

        </>
      </Switch>
    </>
  );
}

export default App;
