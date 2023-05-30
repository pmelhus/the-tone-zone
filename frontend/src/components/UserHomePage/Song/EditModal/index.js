import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./EditModal.css";
import { updateSong, getOneSong } from "../../../../store/songs";
import { ValidationError } from "../../../../utils/validationError";
import ErrorMessage from "../../../ErrorMessage";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  editContent: {
    display: "flex",
    justifyContent: 'center',
    flexDirection: 'column',

  },
container: {
  margin: "0 auto"
},
image: {
width: '260px',
height: '260px',
backgroundImage: "linear-gradient(135deg,#846170,#70929c)"
},
imgContainer: {
display: 'flex',
justifyContent: 'center'
},
  submitButton: {
    backgroundColor: theme.orangeTheme,
    color: "white",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "white",
      color: theme.orangeTheme,
    },
    width: "100%",
    marginTop: '10px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "13px",
    padding: "0",
  },
  formInput: {
width: "100%",
margin: '10px 0'
  },
  upload: {
    margin: '0 auto',
    marginTop: "20px"
  }
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
    <div className={classes.container}>
      <ErrorMessage message={errorMessages.overall} />
      <form  className={classes.editContent} onSubmit={onSubmit}>
        <div className={classes.imgContainer}>

        <img className={classes.image} src={preview}></img>
        </div>
               <div className={classes.upload}>
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
        <div className={classes.formInput}>
          <label for="song-name">Title</label>
          <br></br>
          <input
          className={classes.formInput}
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
          className={classes.formInput}
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


        <button type="button" className={classes.submitButton} onClick={handleCancelClick}>
          Cancel
        </button>
        <button className={classes.submitButton} >Save</button>
      </form>
    </div>
  );
};

export default EditModal;
