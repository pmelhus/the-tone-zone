import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./EditModal.css";
import { updateSong, getOneSong } from "../../../../store/songs";
import { ValidationError } from "../../../../utils/validationError";
import ErrorMessage from "../../../ErrorMessage";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  editContent: {},
}));

const EditModal = ({ setEditModal }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  let history = useHistory();
  const dispatch = useDispatch();

  // extract songId from url
  const { songId } = useParams();
  // turn string songId into integer
  const songIdInt = parseInt(songId);

  // image preview for edit

  // grab song state from redux and use songIdInt to get the right song
  const song = useSelector((state) => state.songs)[songIdInt];

  const [preview, setPreview] = useState(song.imageUrl);

  const handleCancelClick = (e) => {
    e.preventDefault();
    //!!START SILENT
    setErrorMessages({});
    //!!END
    setEditModal(false);
  };
  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    console.log(file);
  };
  const [image, setImage] = useState(null);

  // const updateTitle = (e) => {setTitle(e.target.value)}
  // const updateDescription = (e) => {setDescription(e.target.value)}

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      songId: songIdInt,
      title,
      description,
      image,
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
      setEditModal(false);
    }
  };

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  // set state for title
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  // set state for description
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className={classes.editContent}>
      <ErrorMessage message={errorMessages.overall} />
      <form className="upload-form" onSubmit={onSubmit}>
        <img className="image-preview" src={preview}></img>
        <div>
          <label for="song-name">Title</label>
          <br></br>
          <input
            name="song-name"
            placeholder={song?.title}
            value={title}
            onChange={handleTitle}
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
            placeholder={song?.description}
            name="song-description"
            value={description}
            onChange={handleDescription}
            required
          ></textarea>
        </div>
        <ErrorMessage
          label={"description"}
          message={errorMessages.description}
        />
        <div>
          <label className="upload-song-input">
            Edit current image
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
