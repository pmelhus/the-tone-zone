import "./AddToPlaylistModal.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllPlaylists } from "../../../../store/playlists";
import CreatePlaylistForm from "./CreatePlaylistForm";
import AddToPlaylist from "./AddToPlaylist";
import { createUseStyles, useTheme } from "react-jss";
import Modal from "react-bootstrap/Modal";

const useStyles = createUseStyles((theme) => ({}));

const AddToPlaylistModal = ({ playModal, setPlayModal }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [errors, setErrors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const history = useHistory();
  const [selected, setSelected] = useState(false);

  if (!playModal) return null;
  const backgroundClick = () => {
    setPlayModal(!playModal);
  };

  const goToPlaylist = () => {
    history.push("/you/library/playlists");
  };

  return (
    <div
      className="modal"
      id="playlist-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <nav>
        <h3>
          <button
            onClick={(e) => {
              setShowPlaylist(!showPlaylist);
              setShowForm(!showForm);
              setSelected(false);
            }}
            disabled={showPlaylist}
            className={!selected ? "playlist-nav-selected" : ""}
          >
            Add to playlist
          </button>
        </h3>
        <h3>
          <button
            onClick={(e) => {
              setShowForm(!showForm);
              setShowPlaylist(!showPlaylist);
              setSelected(true);
            }}
            disabled={showForm}
            className={selected ? "playlist-nav-selected" : ""}
          >
            Create a playlist
          </button>
        </h3>
      </nav>
      <AddToPlaylist
        setShowPlaylist={setShowPlaylist}
        showPlaylist={showPlaylist}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <CreatePlaylistForm
        showForm={showForm}
        setShowForm={setShowForm}
        setShowPlaylist={setShowPlaylist}
        showPlaylist={showPlaylist}
      />
    </div>
  );
};

export default AddToPlaylistModal;
