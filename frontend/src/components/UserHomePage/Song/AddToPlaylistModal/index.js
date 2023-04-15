import "./AddToPlaylistModal.css";
import {  useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CreatePlaylistForm from "./CreatePlaylistForm";
import AddToPlaylist from "./AddToPlaylist";
import { createUseStyles, useTheme } from "react-jss";
import Modal from "react-bootstrap/Modal";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from 'react-bootstrap/Overlay';

const useStyles = createUseStyles((theme) => ({
  playlistNav: {
    display: "flex",
    borderRadius: '8px'
  },


}));

const AddToPlaylistModal = ({ playModal, setPlayModal }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [errors, setErrors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const history = useHistory();
  const [selected, setSelected] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipTarget = useRef(null)
  const playlists = useSelector((state) => Object.values(state.playlists));


  const goToPlaylist = () => {
    history.push("/you/library/playlists");
  };



  return (
    <>
      <nav className={classes.playlistNav}>
        <div
          onClick={(e) => {
            setShowPlaylist(!showPlaylist);
            setShowForm(!showForm);
            setSelected(false);
          }}
          disabled={showPlaylist}
          className={!selected ? "playlist-nav-selected" : "playlist-nav-unselected"}
        >
          <h4 className={classes.addToPlaylist}>Add to playlist</h4>
        </div>

        <div
          onClick={(e) => {
            setShowForm(!showForm);
            setShowPlaylist(!showPlaylist);
            setSelected(true);
          }}
          disabled={showForm}
          className={selected ? "playlist-nav-selected" : "playlist-nav-unselected"}
        >
          <h4 ref={tooltipTarget}>Create a playlist</h4>
        </div>
      </nav>
      <AddToPlaylist
        setShowPlaylist={setShowPlaylist}
        showPlaylist={showPlaylist}
        showForm={showForm}
        setShowForm={setShowForm}
        {...{setShowTooltip}}
        {...{showTooltip}}
        {...{playlists}}
      />
      <CreatePlaylistForm
        showForm={showForm}
        setShowForm={setShowForm}
        setShowPlaylist={setShowPlaylist}
        showPlaylist={showPlaylist}
      />
    </>
  );
};

export default AddToPlaylistModal;
