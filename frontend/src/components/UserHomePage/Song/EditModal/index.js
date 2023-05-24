import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./EditModal.css";
import { updateSong, getOneSong } from "../../../../store/songs";
import { ValidationError } from "../../../../utils/validationError";
import ErrorMessage from "../../../ErrorMessage";

const EditModal = ({ propTitle, propDescription }) => {
  const [title, setTitle] = useState(propTitle);
  const [description, setDescription] = useState(propDescription);
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});

  let history = useHistory();
  const dispatch = useDispatch();
  const { songId } = useParams();
  const [preview, setPreview] = useState();
  const handleCancelClick = (e) => {
    e.preventDefault();
    //!!START SILENT
    setErrorMessages({});
    //!!END
    history.goBack();
  };
  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);

  };
  const [image, setImage] = useState(null);

  // const updateTitle = (e) => {setTitle(e.target.value)}
  // const updateDescription = (e) => {setDescription(e.target.value)}

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      songId,
      title,
      description,
    };

    let editedSong;
    try {
      editedSong = await dispatch(updateSong(payload)).then(() =>
        dispatch(getOneSong(songId))
      );
    } catch (error) {
      if (error instanceof ValidationError) {

        setErrorMessages(error.errors);
      }

      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) });
    }
    //!!END
    if (editedSong) {
      //!!START SILENT
      setErrorMessages({});
      dispatch(getOneSong(songId));

    }
  };

  return (

    <div className="upload-content">

      <ErrorMessage message={errorMessages.overall} />
      <form className="upload-form" onSubmit={onSubmit}>
        <img className="image-preview" src={preview}></img>
        <div>

          <label for="song-name">Title</label>
          <br></br>
          <input
            name="song-name"
            placeholder="Name your track"
            value={title}
            onChange={setTitle}
            type="text"
            min={2}
            required
          ></input>
        </div>
        <ErrorMessage label={"title"} message={errorMessages.title} />
        <div>
          <label for="song-description">Description</label>
          <br></br>
          <textarea
            type="text"
            placeholder="Describe your track"
            name="song-description"
            value={description}
            onChange={setDescription}
            required
          ></textarea>
        </div>
        <ErrorMessage
          label={"description"}
          message={errorMessages.description}
        />
        <div>
          <label className="upload-song-input">
            Upload image
            <input
              placeholder="Upload your image"
              type="file"
              accept="image/*"
              name="image-upload"
              onChange={updateImage}
            ></input>
          </label>
        </div>


        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
        <button>Save</button>
      </form>
    </div>

  );
};

export default EditModal;
