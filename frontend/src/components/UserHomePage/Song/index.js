import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getOneSong, deleteOneSong, getAllSongs } from "../../../store/songs";
import { getAllPlaylists } from "../../../store/playlists";
// import AudioPlayer from "react-h5-audio-player";
import { Link, useParams, useHistory } from "react-router-dom";
import EditModal from "./EditModal";
import CommentCard from "./CommentCard";
import WriteComment from "./WriteComment";
import AddToPlaylistModal from "./AddToPlaylistModal";
import { ValidationError } from "../../../utils/validationError";
import Waveform from "../../Waveform";
import Modal from "react-bootstrap/Modal";
import DeleteModal from "./DeleteModal";
import FadeIn from "react-fade-in";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "./Song.css";

import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  songImage: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
  },
  songDescription: {
    marginBottom: "10px",
    maxHeight: "200px",
  },
}));

const Song = ({
  setCurrentAudio,
  audioPlayer,
  wavePlayer,
  waveLoading,
  setWaveLoading,
  isPlaying,
  currentAudio,
  toggleIsPlaying,
  setSourceChangeSwitch,
  h5CanPlay,
  sessionUser,
}) => {
  const [signInToggle, setSignInToggle] = useState(false);
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [playModal, setPlayModal] = useState(false);
  const dispatch = useDispatch();
  const { songId } = useParams();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const song = useSelector((state) => state.songs[songId]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    dispatch(getOneSong(songId));
    if (sessionUser) {
      dispatch(getAllPlaylists(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  const playlists = useSelector((state) =>
    Object.values(state.playlists.playlists)
  );

  const handleClose = () => {
    setPlayModal(false);
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };
  const handleEditClose = () => {
    setEditModal(false);
  };

  return (
    <div className="song-content">
      {song && (
        <>
          <div
            className="audio-and-image"
            // style={{backgroundImage: `${song.imageUrl}`}}
          >
            <div className="image-relative-container">
              <img src={song?.imageUrl} className="background-image-song" />
            </div>
            <div className="song-player">
              <div className="waveform-player-single-song">
                <Waveform
                  {...{ setCurrentAudio }}
                  {...{ wavePlayer }}
                  audio={song.url}
                  {...{ waveLoading }}
                  {...{ setWaveLoading }}
                  song={song}
                  {...{ isPlaying }}
                  {...{ toggleIsPlaying }}
                  {...{ audioPlayer }}
                  {...{ currentAudio }}
                  {...{ setSourceChangeSwitch }}
                  songPage={true}
                  {...{ h5CanPlay }}
                />
              </div>
              <div className="img-div">
                {song?.imageUrl ? (
                  <img className={classes.songImage} src={song?.imageUrl} />
                ) : (
                  <img
                    className={classes.songImage}
                    src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="comment-button-section">
            <WriteComment song={song} />
            <div className="song-buttons">
              {sessionUser?.id === song?.User?.id && (
                <>
                  <button
                    className="song-button"
                    onClick={() => setEditModal(true)}
                    type="button"
                  >
                    <p>Edit</p>
                  </button>
                  <button
                    className="song-button"
                    onClick={() => setDeleteModal(true)}
                  >
                    <p>Delete</p>
                  </button>
                </>
              )}
              {/* <div className="dropdown-more">
                <button onClick={(e) => openMenu(e)}>
                  <i class="fa-solid fa-ellipsis"></i>More
                </button>
                {showMenu && (
                  <FadeIn>
                    <div
                      className="profile-dropdown"
                      onClick={(e) => openPlaylist()}
                    >
                      <a>add to playlist</a>
                    </div>
                  </FadeIn>
                )}
              </div> */}
            </div>
          </div>
          <div className="avatar-comment-description">
            <div className="song-page-avatar">
              {/* <img src={song.User?.profileImageUrl}></img> */}

              {song.User?.profileImageUrl ? (
                <>
                  <img src={song.User?.profileImageUrl} />
                  <p>{song.User.username}</p>
                </>
              ) : (
                <>
                  <img
                    className="avatar"
                    src="https://img.myloview.com/posters/default-avatar-profile-in-trendy-style-for-social-media-user-icon-400-228654852.jpg"
                  />
                  <OverlayTrigger
                    overlay={ song.User.username.length > 22 ? <Tooltip>{song.User.username}</Tooltip> : null}
                  >
                    <div style={{ cursor: "pointer" }}>
                      <p>{song.User.username}</p>
                    </div>
                  </OverlayTrigger>
                </>
              )}
            </div>
            <div className="comment-body-description">
              <div className={classes.songDescription}>
                <p>{song?.description}</p>
              </div>
              <CommentCard song={song} />

              <Modal show={playModal} onHide={handleClose}>
                <AddToPlaylistModal
                  {...{ playlists }}
                  playModal={playModal}
                  setPlayModal={setPlayModal}
                />
              </Modal>
              <Modal centered show={deleteModal} onHide={handleDeleteClose}>
                <DeleteModal {...{ song }} {...{ setDeleteModal }} />
              </Modal>
              <Modal
                centered
                size="lg"
                show={editModal}
                onHide={handleEditClose}
              >
                <Modal.Body>
                  <EditModal {...{ song }} {...{ setEditModal }} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Song;
