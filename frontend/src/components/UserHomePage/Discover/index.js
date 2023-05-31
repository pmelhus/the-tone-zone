import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Playlist from "../Library/Playlists/Playlist";
import { getAllPlaylists } from "../../../store/playlists";
import { getAllSongs } from "../../../store/songs";
import "./Discover.css";
import { useLocation, useHistory } from "react-router-dom";
import SongDiscover from "./SongDiscover";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  songDiscoverItem: {

    "@media (min-width: 768px ) and (max-width: 1030px)": {
      width: "150px",
      height: "150px",
      margin: "14px",
    },

    "@media (min-height: 2500px) and (min-width: 1170px)": {
      width: "260px",
      height: "260px",
      margin: "4px",
    },
    "@media (min-width: 1030px) and (max-width: 2000px) and (max-height: 1080px)": {
      width: "260px",
      height: "260px",
      margin: "9px"
    },

    "@media (min-width: 2001px) and (max-width: 2539px)": {
      width: "280px",
      height: "280px",
      margin: "4px"
    },

    "@media (min-width: 2540px) and  (max-width: 2999px)": {
      width: "304px",
      height: "304px",
      margin: "4px"
    },

    "@media (min-width: 3501px) and (max-width: 4500px)": {
      width: "500px",
      height: "500px",
      margin: "34px",
    },
  },
  emptyTracks: {
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  upload: {
    display: "flex",
  },
  link: {
    marginTop: "10px",
  },
}));

const Discover = ({ isLoaded }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const history = useHistory();
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session?.user);
  const songs = useSelector((state) => Object.values(state?.songs));
  const sortedLatest = useSelector((state) => Object.values(state.songs));
  const { pathname } = useLocation();
  const yourSongs = songs.filter((song) => {
    return song.userId === sessionUser?.id;
  });

  sortedLatest.sort((a, b) => {
    return b.id - a.id;
  });
  yourSongs.sort((a, b) => {
    return b.id - a.id;
  });

  // useEffect(() => {
  //   dispatch(getAllPlaylists());
  //   dispatch(getAllSongs());
  //   // setIsLoaded(true);
  // }, [dispatch]);

  const handleLink = () => {
    history.push("/upload");
  };

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
        <p>Hear the most recent uploads in our community:</p>
        <ul className="playlist-cards">
          {isLoaded &&
            sortedLatest.map((song) => {
              return (
                <>
                  <li className={classes.songDiscoverItem}>
                    <SongDiscover song={song} />
                  </li>
                </>
              );
            })}
        </ul>
      </div>

      <div className="playlists-container">
        <p>Hear your own tracks:</p>

        {!yourSongs?.length && (
          <>
            <div className={classes.emptyTracks}>
              <p className="fs-6"> Looks like you don't have any tracks!</p>
              <span className={classes.upload}>
                <a className={classes.link} onClick={handleLink}>
                  Upload a song
                </a>
              </span>
            </div>
          </>
        )}
        <ul className="playlist-cards">
          {isLoaded &&
            yourSongs.map((song) => {
              return (
                <>
                  <li className={classes.songDiscoverItem}>
                    <SongDiscover song={song} />
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
