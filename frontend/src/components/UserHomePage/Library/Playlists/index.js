import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Playlist from "./Playlist";
import { getAllPlaylists } from "../../../../store/playlists";
import "./Playlists.css";

const Playlists = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists.playlists));
  const sessionUser = useSelector((state) => state.session.user);
  // const playlistList = useSelector()
  // useEffect(() => {
  //   dispatch(getAllPlaylists());
  // }, [dispatch]);
console.log(playlists, "playlists")
  return (
    <div className="playlists-container">
      <p>Hear your own playlists:</p>

        <ul className="playlist-cards">
          {playlists &&
            playlists.map((playlist) => {
              if (playlist.userId === sessionUser?.id)
                return (
                  <>
                    <li>
                      <Playlist playlist={playlist} />
                    </li>
                  </>
                );
            })}
        </ul>

    </div>
  );
};

export default Playlists;
