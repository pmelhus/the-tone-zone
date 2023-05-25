import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {  Route } from "react-router-dom";
import {getAllSongs} from "../../../store/songs"
import "./Library.css";
// import Overview from "./Overview";
// import Likes from "./Likes";
import Playlists from "./Playlists";
import Tracks from "./Tracks"

const Library = () => {
  const dispatch = useDispatch()

//   useEffect(()=> {
// dispatch(getAllSongs)
//   },[])
  return (
    <>
        {/* <Route path="/you/library/overview">
          <Overview />
        </Route> */}
        {/* <Route path="/you/library/likes">
          <Likes />
        </Route> */}
        <Route path="/you/library/playlists">
          <Playlists />
        </Route>
        <Route path="/you/library/tracks">
          <Tracks />

        </Route>
    </>
  );
};

export default Library;
