import "./Upload.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ValidationError } from "../../../utils/validationError";
import ErrorMessage from "../../ErrorMessage";
import * as songActions from "../../../store/songs";

const Upload = (sessionUser) => {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(sessionUser.sessionUser.sessionUser.id)

    const payload = {
      userId,
      title,
      description,
      audio,
      image,
      files: [audio, image],
    };
    // console.log(files)
    let createdSong;
    try {
      createdSong = await dispatch(songActions.createSong(payload))
        .then(() => history.push(`/stream`))
        .then(() => dispatch(songActions.getAllSongs()));
    } catch (error) {

      if (error instanceof ValidationError) {
        // console.log('===================')
        setErrorMessages(error.errors);
      }

      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else {
        console.log(error)
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
      setAudio(null);
      history.push(`/stream`);
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
    // console.log(e.target.files, "FILE HEREEEE");
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
            onChange={updateTitle}
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
            onChange={updateDescription}
            required
          ></textarea>
        </div>
        <ErrorMessage
          label={"description"}
          message={errorMessages.description}
        />
        <div>
          <label className="upload-song-input">
            Upload your song
            <input
              type="file"
              // name="song-upload"
              accept="audio/*"
              onChange={updateAudio}

            ></input>
          </label>
        </div>
        <div>
          <label className="upload-song-input">
            Upload song cover
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

export default Upload;
