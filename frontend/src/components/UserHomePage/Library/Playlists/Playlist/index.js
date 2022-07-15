import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPlaylists } from "../../../../../store/playlists";
import { Link } from "react-router-dom";
import "./Playlist.css";

const Playlist = ({ playlist }) => {
  return (
    <div className="playlist-card">
      <Link to={`/${playlist.User?.username}/playlists/${playlist?.id}`}>
      <img className="playlist-image" src={playlist.imageUrl}></img>
        <p>{playlist?.title}</p>
      </Link>
      <p>{playlist.User?.username}</p>
    </div>
  );
};

export default Playlist;
