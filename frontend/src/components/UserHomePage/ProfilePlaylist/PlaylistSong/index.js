import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./PlaylistSong.css";
import EditPlaylistModal from "./EditPlaylistModal";
import { createCurrentSong, deleteCurrentSong } from "../../../../store/currentSong";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme, song) => ({
  relativeContainer: {
    position: "relative",
    zIndex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30px",
    height: "30px",
    marginRight: "10px",
  },
  playDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1",
    paddingTop: "2px",
  },
  pauseDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1",
    paddingTop: "2px",
  },
  noUrlImage: {
    width: "30px",
    height: "30px",
    position: "absolute",
  },
  urlImage: {
    width: "30px",
    height: "30px",
    position: "absolute",
  }
}));

const PlaylistSong = ({
  isPlaying,
  song,
  user,
  setCurrentPlaylistSong,
  currentPlaylistSong,
audio,
  audioPlayer,
  setSourceChangeSwitch,
  wavePlayer,
  setCurrentAudio,
  waveLoading
}) => {
  const theme = useTheme();
  const [localIsPlaying, setLocalIsPlaying] = useState(false);
  const classes = useStyles({ song, theme });

  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch();






useEffect(()=>{
if (currentPlaylistSong !== audio) {
setLocalIsPlaying(false)
}
},[])


  return (
    <>
      <div className="button-set-url">
        <button id="playlist-song" disabled={waveLoading ? true : false}>
          {song?.imageUrl ? (
            <div className={classes.imageContainer}>
              <div className={classes.relativeContainer}>
                {localIsPlaying ? (
                  <>
                    <>
                      <i className="fa-sharp fa-solid fa-circle-pause"></i>
                    </>
                  </>
                ) : (
                  <i
                    className="fa-solid fa-circle-play"
                  ></i>
                )}
              </div>
              <img className={classes.urlImage} src={song?.imageUrl} />
            </div>
          ) : (
            <div className={classes.imageContainer}>
              <div className={classes.relativeContainer}>
                {localIsPlaying ? (
                  <div className={classes.pauseDiv}>
                    <i className="fa-sharp fa-lg fa-solid fa-circle-pause"></i>
                  </div>
                ) : (
                  <div className={classes.playDiv}>
                    <i className={`fa-solid fa-lg fa-circle-play`}></i>
                  </div>
                )}
              </div>
              <img
                className={classes.noUrlImage}
                src="https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg"
              ></img>
            </div>
          )}
          <p>
            {song?.title} by {user?.username}
          </p>
        </button>
        <button onClick={(e) => setEditModal(true)}>Edit</button>
      </div>
      <EditPlaylistModal editModal={editModal} setEditModal={setEditModal} />
    </>
  );
};

export default PlaylistSong;
