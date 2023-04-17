import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import {
  createPlaylist,
  getAllPlaylists,
} from "../../../../../store/playlists";
import "./CreatePlaylistForm.css";
import { ValidationError } from "../../../../../utils/validationError";
import ErrorMessage from "../../../../ErrorMessage";

const CreatePlaylistForm = ({ setShowForm, showForm, showPlaylist }) => {
  const { songId } = useParams();
  const [title, setTitle] = useState();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs[songId]);
  const user = useSelector((state) => state.session.user);
  const [errorMessages, setErrorMessages] = useState({});
  const [afterCreation, setAfterCreation] = useState(false)
const [newlyCreatedPlaylist, setNewlyCreatedPlaylist] = useState(null)


const history = useHistory()
  if (!showForm) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      song,
      user,
    };

    let createdPlaylist;
    try {
      createdPlaylist = await dispatch(createPlaylist(payload));


    } catch (error) {
      if (error instanceof ValidationError) {
        setErrorMessages(error.errors);
      }

      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) });
    } finally {

        //!!START SILENT
        await setErrorMessages({});
        //!!END
        await setTitle("");
        await dispatch(getAllPlaylists(user.id));
await setNewlyCreatedPlaylist(createdPlaylist.id)
await setAfterCreation(true)
    }
    //!!END
  };

  const goToPlaylist =() => {
// history.push(`/`)
  }

  return (
    <>
    {afterCreation ? (
<>
<div className="create-submit-container">
  <button onClick={goToPlaylist}>
    Go to playlist
  </button>
</div>
</>
    ): (
<>
      <div className="create-submit-container">
        <form onSubmit={handleSubmit}>
          <div className="title-div-playlist">
            <ErrorMessage message={errorMessages.overall} />
            <div className="input-flex">
              <label>
                <p>Playlist title</p>
              </label>
              <div className="button-row">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="real-button-row">
                <button type="submit">Save</button>
              </div>
            </div>
          </div>
          <ErrorMessage label={"Error"} message={errorMessages.title} />
          <p>Add song to playlist:</p>
          <div className="song-create-playlist">
            {song?.imageUrl ? (
              <img className="avatar" src={song?.imageUrl} />
            ) : (
              <img
                className="avatar"
                src="https://yt3.ggpht.com/Kat62xks4-8MlvT1CjkMsYqxP5sVDNOv7IMB2Kwg27n2dIcA55-obkQnA9vi6kx3Dfhay0aGIP4=s900-c-k-c0x00ffffff-no-rj"
              />
            )}

            <p>
              {song?.User.username} - {song?.title}
            </p>
          </div>
        </form>
      </div>
      </>
    )}
    </>
  );
};

export default CreatePlaylistForm;
