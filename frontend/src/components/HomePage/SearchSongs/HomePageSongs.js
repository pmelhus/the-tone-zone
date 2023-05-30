import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import { getAllSongs } from "../../../store/songs";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import * as sessionActions from "../../../store/session";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  songCard: {
    width: "240px",
    height: "240px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: '25px',
    "@media (min-width: 768px)": {
      width: "110px",
      height: "110px"
    },
    "@media (min-height: 2500px)": {
      width: "210px",
      height: "210px",
      margin: '50px 40px'
    }
  },
}));

const HomePageSongs = ({ setSignInToggle }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const dispatch = useDispatch();
  const songList = useSelector((state) => Object.values(state.songs));
  const dateNow = new Date();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const songDate = (date) => {
    return new Date(date);
  };

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);


  useEffect(() => {
    if (history.location.state?.commentAttempt && !sessionUser) {
      setSignInToggle(true);
    }
  }, [history]);

  const handleClick = (song) => {
    if (!sessionUser) {
      history.push({state: {
        pleaseLogin: true
      }})
      setSignInToggle(true);
    } else {
      history.push(`/stream/${song?.id}`);
    }
  };

  return (
    <>
      <h2>Hear what's trending for free in the ToneZone community</h2>
      <div className="home-search-songs">
        {songList &&
          songList.map((song) => {
            return (
              <div className={classes.songCard}>
                <a onClick={() => handleClick(song)} id="song-title">
                  <div className="image-content">
                    {song?.imageUrl ? (
                      <img className="playlist-image" src={song?.imageUrl} />
                    ) : (
                      <img
                        className="playlist-image"
                        src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg"
                      />
                    )}
                  </div>
                </a>

                <div className="title-div-homepage">
                  <div>
                    <a onClick={() => handleClick(song)} id="song-title">{song.title}</a>
                  </div>
                  <div>
                    <p id="username">
                      {song.User?.username}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomePageSongs;
