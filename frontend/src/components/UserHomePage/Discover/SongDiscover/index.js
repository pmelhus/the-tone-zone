import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllSongs } from "../../../../store/songs";
import { Link } from "react-router-dom";
import "./SongDiscover.css";

const SongDiscover = ({ song }) => {
  return (
    <div className="playlist-card">
      <Link to={`/stream/${song.id}`}>
        {song?.imageUrl ? (
          <img className="playlist-image" src={song?.imageUrl} />
        ) : (
          <img
            className="playlist-image"
            src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg"
          />
        )}
      </Link>
      <div className='username-title-playlistCard'>
        <Link to={`/stream/${song.id}`}>
          <p>{song?.title}</p>
        </Link>
        <p>{song?.User?.username}</p>
      </div>
    </div>
  );
};

export default SongDiscover;
