import { useState, useEffect } from "react";
import {useDispatch} from "react-redux"
import "./PlaylistSong.css";
import EditPlaylistModal from "./EditPlaylistModal";
import { getCurrentSong } from "../../../../store/currentSong";

const PlaylistSong = ({playFunc, setSongId, songId, song, user, setUrl, setTitle, url, key}) => {
  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch()
  // console.log(song)
  const handleClick = (e) => {

    e.preventDefault();

    setSongId(song)
    // console.log(songId, "==============")
    dispatch(getCurrentSong(song.id))
    setUrl(song.url);
    playFunc()
  };




  return (
    <>
      <div
        className= "button-set-url"
      >
        <button id="playlist-song" onClick={handleClick}>
          <p>
            {song?.title} by {user?.username}
          </p>
        </button>
        <button onClick={(e) => setEditModal(true)}>Edit</button>
      </div>
      <EditPlaylistModal editModal={editModal} setEditModal={setEditModal} />
    </>
  );
};

export default PlaylistSong;
