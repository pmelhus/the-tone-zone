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
  setSong,
  setPressPlay,
  song,
  user,
  setCurrentPlaylistSong,
  currentPlaylistSong,
  setUrl,
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



  const handlePlayButton = async () => {
    // if there is a currentSong in DB, then play/pause h5 audio player
    await setCurrentPlaylistSong(song);
    const payload = { user, song };

    if (audioPlayer.current.audio.current.src === song?.url) {
      if (audioPlayer.current.isPlaying()) {
        await setSourceChangeSwitch(false);
        await audioPlayer.current.audio.current.pause();
        await setLocalIsPlaying(false);
      } else {
        await setSourceChangeSwitch(false);
        await audioPlayer.current.audio.current.play();
        await setLocalIsPlaying(true);
      }
    } else {
      // replace the currentsong in DB with the new song.
      const replaceCurrentSong = async () => {
        await dispatch(deleteCurrentSong());
        await dispatch(createCurrentSong(payload));
      };

      await audioPlayer?.current?.audio?.current?.pause();

      if (!wavePlayer.current?.isPlaying()) {
        await wavePlayer.current?.seekTo(0);
      }
      if (wavePlayer.current?.isPlaying()) {
        await wavePlayer.current?.stop();
      }

      // if (wavePlayer.current) {
      //   wavePlayer.current.seekTo(0);
      // }

      await setSourceChangeSwitch(true);
      await replaceCurrentSong();
      await setCurrentAudio(song);

      // wavePlayer.current = currentWavePlayer;
      // await audioPlayer?.current?.audio.current.play();

      await wavePlayer.current.play(0);
      await setLocalIsPlaying(true);
    }
  };

  useEffect(() => {
    if (currentPlaylistSong?.id === song.id && isPlaying) {
      setLocalIsPlaying(true);
    } else {
      setLocalIsPlaying(false);
    }
  }, [currentPlaylistSong, isPlaying]);

  return (
    <>
      <div className="button-set-url">
        <button id="playlist-song" disabled={waveLoading ? true : false} onClick={handlePlayButton}>
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
                    className={`fa-solid fa-circle-play ${classes.playIcon} `}
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
