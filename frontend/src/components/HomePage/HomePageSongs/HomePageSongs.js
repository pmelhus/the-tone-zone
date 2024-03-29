import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import { getAllSongs } from "../../../store/songs";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import * as sessionActions from "../../../store/session";

const HomePageSongs = ({ setSignInToggle }) => {
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

  return (
    <>
      <h2>Hear what's trending for free in the ToneZone community</h2>
      <div className="home-search-songs">
        {songList &&
          songList.map((song) => {
            return (
              <div className="song-card-homepage">
                <a href={`/stream/${song.id}`} id="song-title">
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
                    <a href={`/stream/${song?.id}`} id="song-title">
                      {song.title}
                    </a>
                  </div>
                  <div>
                    <a href={`/${song?.User?.username}`} id="username">
                      {song.User?.username}
                    </a>
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
