import "./AddToPlaylistModal.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreatePlaylistForm from "./CreatePlaylistForm";
import AddToPlaylist from "./AddToPlaylist";
import { createUseStyles, useTheme } from "react-jss";
import Modal from "react-bootstrap/Modal";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import { getAllSongsPlaylist } from "../../../../store/playlists";

const useStyles = createUseStyles((theme) => ({
  playlistNav: {
    display: "flex",
    borderRadius: "8px",
  },
}));

const AddToPlaylistModal = ({ playlists, playModal, setPlayModal }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [errors, setErrors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const history = useHistory();
  const [selected, setSelected] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTarget = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (playlists.length > 0) {
      setSelected("add-to-playlist");
    } else {
      setSelected("create-a-playlist");
    }
  }, []);
  const goToPlaylist = () => {
    history.push("/you/library/playlists");
  };

  return (
    <>
      <nav className={classes.playlistNav}>
        {playlists.length > 0 && (
          <div
            onClick={(e) => {
              setShowPlaylist(true);
              setShowForm(false);
              setSelected("add-to-playlist");
            }}
            className={
              selected === "add-to-playlist"
                ? "playlist-nav-selected"
                : "playlist-nav-unselected"
            }
          >
            <h4 className={classes.addToPlaylist}>Add to playlist</h4>
          </div>
        )}

        <div
          onClick={(e) => {
            setShowForm(true);
            setShowPlaylist(false);
            setSelected("create-a-playlist");
          }}
          className={
            selected === "create-a-playlist"
              ? "playlist-nav-selected"
              : "playlist-nav-unselected"
          }
        >
          <h4 ref={tooltipTarget}>Create a playlist</h4>
        </div>
      </nav>
      {showPlaylist && (
        <AddToPlaylist
          setShowPlaylist={setShowPlaylist}
          showPlaylist={showPlaylist}
          showForm={showForm}
          {...{ playlists }}
          setShowForm={setShowForm}
          {...{ setShowTooltip }}
          {...{ showTooltip }}
          {...{ playlists }}
        />
      )}
      {showForm && (
        <CreatePlaylistForm
          showForm={showForm}
          setShowForm={setShowForm}
          setShowPlaylist={setShowPlaylist}
          showPlaylist={showPlaylist}
        />
      )}
    </>
  );
};

export default AddToPlaylistModal;
