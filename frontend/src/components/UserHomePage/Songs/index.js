import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { getAllSongs, deleteOneSong } from "../../../store/songs";
import AudioPlayer from "react-h5-audio-player";
import { Link, useHistory } from "react-router-dom";
// import CommentCard from "./CommentCard";
import "./Songs.css";
import { createCurrentSong } from "../../../store/currentSong";
import Waveform from "../../Waveform";

const Songs = ({
  sessionUser,
  waveLoading,
  setWaveLoading,
  wavePlayer,
  audioPlayer,
  currentAudio,
  isPlaying,
  toggleIsPlaying,
  setCurrentAudio,
}) => {
  const dispatch = useDispatch();
  const songList = useSelector((state) => Object.values(state.songs));
  const dateNow = new Date();

  const history = useHistory();

  const songDate = (date) => {
    return new Date(date);
  };

  const songListSorted = songList.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  const handleSubmit = async (e, song) => {
    e.preventDefault();
    await dispatch(deleteOneSong(song));
  };

  const handleImageClick = (song) => {
    history.push(`/stream/${song.id}`);
  };

  return (
    <div className="songs-content">
      <p id="hear-latest">Hear the latest posts in the community:</p>
      {songList &&
        songList.map((song) => {

          return (
            <div className="song-card">
              <div className="text-content">
                {song.User.profileImageUrl ? (
                  <img
                    href={`/${song?.User?.username}`}
                    src={song.User?.profileImageUrl}
                  />
                ) : (
                  <img
                    href={`/${song?.User?.username}`}
                    src="https://img.myloview.com/posters/default-avatar-profile-in-trendy-style-for-social-media-user-icon-400-228654852.jpg"
                  />
                )}
                <a href={`/${song?.User?.username}`}>{song.User?.username}</a>

                <p id="time">
                  &nbsp;posted a track at{" "}
                  {songDate(song.createdAt)
                    .toLocaleTimeString()
                    .split(" ")[0]
                    .split(":")
                    .splice(0, 2)
                    .join(":") +
                    " " +
                    songDate(song.createdAt)
                      .toLocaleTimeString()
                      .split(" ")[1]}{" "}
                  on {songDate(song.createdAt).toLocaleDateString()}{" "}
                </p>
              </div>
              <div className="audio-content">
                <div className="image-content">
                  {song?.imageUrl ? (
                    <div
                      className="image-content"
                      onClick={() => handleImageClick(song)}
                    >
                      <img src={song?.imageUrl} />
                    </div>
                  ) : (
                    <div
                      className="image-content"
                      onClick={() => handleImageClick(song)}
                    >
                      <img src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg" />
                    </div>
                  )}
                </div>
                <div className="audio-player-div">
                  {/* <div className="title-div">
                    <div>
                      <a href={`/${song?.User?.username}`} id="username">
                        {song.User?.username}
                      </a>
                    </div>
                    <div>
                      <a href={`/stream/${song.id}`} id="song-title">
                        {song.title}
                      </a>
                    </div>
                  </div> */}
                  <div className="waveform-player">
                    <Waveform
                      {...{ wavePlayer }}
                      {...{ setCurrentAudio }}
                      audio={song.url}
                      {...{ waveLoading }}
                      {...{ setWaveLoading }}
                      song={song}
                      {...{ currentAudio }}
                      {...{ isPlaying }}
                      {...{ toggleIsPlaying }}
         
                      {...{ audioPlayer }}
                    />
                  </div>
                  <div className="buttons">
                    {sessionUser && (
                      <form
                        className="delete-button"
                        onSubmit={(e) => {
                          handleSubmit(e, song);
                        }}
                      >
                        {/* <button>Delete</button> */}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Songs;
