import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Playlist from "../Library/Playlists/Playlist";
import { getAllPlaylists } from "../../../store/playlists";
import { getAllSongs } from "../../../store/songs";
import "./Discover.css";
import { useLocation } from "react-router-dom";
import SongDiscover from "./SongDiscover";

const Discover = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session?.user);
  const songs = useSelector((state) => Object.values(state?.songs));
  const sortedLatest = useSelector((state) => Object.values(state.songs));
  const { pathname } = useLocation();
  sortedLatest.sort((a, b) => {
    return b.Comments?.length - a.Comments?.length;
  });

  // useEffect(() => {
  //   dispatch(getAllPlaylists());
  //   dispatch(getAllSongs());
  //   // setIsLoaded(true);
  // }, [dispatch]);

  useEffect(() => {
    sortedLatest.sort((a, b) => {
      return b.Comments?.length - a.Comments?.length;
    });
  }, [dispatch, pathname]);

  useEffect(() => {
    sortedLatest.sort((a, b) => {
      return b.Comments?.length - a.Comments?.length;
    });
  }, []);

  return (
    <div className="discover-container">
      {/* <div className="playlists-container">
      <p>Hear the latest tones:</p>
        <ul className="playlist-cards">
          {sortedLatest &&
            sortedLatest.map((song) => {
                return (
                  <>
                    <li>
                      <SongDiscover song={song} />
                    </li>
                  </>
                );
            })}
        </ul>
      </div> */}

      <div className="playlists-container">
        <p>Hear the songs with the most comments:</p>
        <ul className="playlist-cards">
          {isLoaded &&
            sortedLatest.map((song) => {
              return (
                <>
                  <li>
                    <SongDiscover song={song} />
                  </li>
                </>
              );
            })}
        </ul>
      </div>

      <div className="playlists-container">
        <p>Hear your own playlists:</p>
        <ul className="playlist-cards">
          {playlists &&
            playlists.map((playlist) => {
              if (playlist?.userId === sessionUser?.id)
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
    </div>
  );
};

export default Discover;
