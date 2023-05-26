import "./Upload.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ValidationError } from "../../../utils/validationError";
import ErrorMessage from "../../ErrorMessage";
import * as songActions from "../../../store/songs";
import { createUseStyles, useTheme } from "react-jss";
import Spinner from 'react-bootstrap/Spinner';

const useStyles = createUseStyles((theme) => ({
  submitButton: {
    backgroundColor: theme.orangeTheme,
    color: "white",
    borderRadius: "4px",
    '&:hover': {
      backgroundColor: 'white',
      color: theme.orangeTheme
    },
    width: '90px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '13px',
    padding: '0'
  },
  buttonDiv: {
    display: 'flex',
    padding: '10px'
  },
  inputField: {
    padding: '10px'
  },
  fileInput: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: '10px'
  },
  input: {
    width: '100%',
    padding: '10px'
  }
}));

const Upload = (sessionUser) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);
  const userId = useSelector((state) => state.session?.user?.id);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const [preview, setPreview] = useState();

  // set load state for uploading song
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    const payload = {
      userId,
      title,
      description,
      audio,
      image,
      files: [audio, image],
    };

    let createdSong;
    try {
      createdSong = await dispatch(songActions.createSong(payload))
        .then(() => history.push(`/stream`))
        .then(() => dispatch(songActions.getAllSongs()));
    } catch (error) {

      if (error instanceof ValidationError) {

        setErrorMessages(error.errors);
      }

      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else {

        setErrorMessages({ overall:"Please upload a valid audio file"});
      }
    }
    //!!END
    if (createdSong) {
      //!!START SILENT
      setErrorMessages({});
      //!!END
      setTitle("");
      setDescription("");
      setAudio(null)

      history.push(`/stream`);
      setIsLoading(false)
      dispatch(songActions.getAllSongs());
    }
  };

  //!!END

  const updateAudio = (e) => {
    const file = e.target.files[0];

    if (file) setAudio(file);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);

  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    //!!START SILENT
    setErrorMessages({});
    //!!END
    history.goBack();
  };

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  // const fileInput = useRef()

  // creating state for indication of song uploaded to input

  const [songInInput, setSongInInput] =useState(false)
  const handleSongUpload = () => {
setSongInInput(true)
  }

  return (
    <div className="upload-content">

      <ErrorMessage message={errorMessages.overall} />
      <form className="upload-form" onSubmit={onSubmit}>
        <img className="image-preview" src={preview}></img>
        <div className={classes.inputField}>

          <label for="song-name">Title</label>
          <br></br>
          <input
            name="song-name"
            placeholder="Name your track"
            value={title}
            onChange={updateTitle}
            type="text"
            min={2}
            required
          ></input>
        </div>
        <ErrorMessage label={"title"} message={errorMessages.title} />
        <div className={classes.inputField}>
          <label for="song-description">Description</label>
          <br></br>
          <textarea
            type="text"
            placeholder="Describe your track"
            name="song-description"
            value={description}
            onChange={updateDescription}
            required
          ></textarea>
        </div>
        <ErrorMessage
          label={"description"}
          message={errorMessages.description}
        />

          <div className={classes.fileInput}>


<label  className="upload-song-input">

            Upload your song
</label>
            <input
              type="file"
              // name="song-upload"
              accept="audio/*"
              onChange={updateAudio}
              className={classes.input}
            ></input>
          </div>



        <div className={classes.fileInput}>
          <label className="upload-song-input">
            Upload song cover
          </label>
            <input
            className={classes.input}
              placeholder="Upload your image"
              type="file"
              accept="image/*"
              name="image-upload"
              onChange={updateImage}
            ></input>
        </div>

<div className={classes.buttonDiv}>


        <button className={classes.submitButton} type="button" onClick={handleCancelClick}>
          Cancel
        </button>
        {isLoading ?
          <button disabled className={classes.submitButton}>      <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...</button>
        :

        <button className={classes.submitButton}>Save</button>
        }
</div>
      </form>
    </div>
  );
};

export default Upload;
