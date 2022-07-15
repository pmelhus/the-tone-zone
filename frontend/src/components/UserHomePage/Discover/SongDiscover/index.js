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
            src="https://yt3.ggpht.com/Kat62xks4-8MlvT1CjkMsYqxP5sVDNOv7IMB2Kwg27n2dIcA55-obkQnA9vi6kx3Dfhay0aGIP4=s900-c-k-c0x00ffffff-no-rj"
          />
        )}
      </Link>
      <Link to={`/stream/${song.id}`}>
        <p>{song?.title}</p>
      </Link>
      <p>{song?.User?.username}</p>
    </div>
  );
};

export default SongDiscover;
