import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPlaylists } from "../../../../../store/playlists";
import { useHistory } from "react-router-dom";
import "./Playlist.css";

const Playlist = ({ playlist }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${playlist.User?.username}/playlists/${playlist?.id}`);
  };
  return (
    <div className="playlist-card">
      <div style={{ cursor: "pointer" }} onClick={handleClick}>
        {playlist.imageUrl ? (
          <img className="playlist-image" src={playlist.imageUrl}></img>
        ) : (
          <img
            className="playlist-image"
            src="https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg"
          ></img>
        )}
      </div>
      <div className="username-title-playlistCard">
        <p style={{ cursor: "pointer" }} onClick={handleClick}>
          {playlist?.title}
        </p>
        <p>{playlist.User?.username}</p>
      </div>
    </div>
  );
};

export default Playlist;
