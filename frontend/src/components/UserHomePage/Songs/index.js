import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllSongs, deleteOneSong } from "../../../store/songs";
import AudioPlayer from "react-h5-audio-player";
import { Link } from "react-router-dom";
// import CommentCard from "./CommentCard";
import "./Songs.css";

const Songs = ({ sessionUser }) => {
  const dispatch = useDispatch();
  const songList = useSelector((state) => Object.values(state.songs));
  const dateNow = new Date();

  const songDate = (date) => {
    return new Date(date);
  };

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  const handleSubmit = async (e, song) => {
    e.preventDefault();
    await dispatch(deleteOneSong(song));
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
                  <img src={song?.imageUrl} />
                </div>
                <div className="audio-player-div">
                  <div className="title-div">
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
                  </div>
                  <AudioPlayer
                    className="audio-player"
                    id="songs-audio-player"
                    src={song.url}
                    onPlay={(e) => console.log("onPlay")}
                    // other props here
                  />
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
