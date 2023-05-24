import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteOnePlaylist,
  getAllSongsPlaylist,
} from "../../../store/playlists";

import "./ProfilePlaylist.css";
import PlaylistWaveform from "../../Waveform/PlaylistWaveform";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  songImage: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
  },
}));

const ProfilePlaylist = ({
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
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [signInToggle, setSignInToggle] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[3]);
  const playlist = useSelector((state) => state.playlists.playlists[id]);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const songs = useSelector((state) =>
    Object.values(state?.playlists.playlistSongs)
  );
  const [title, setTitle] = useState(songs?.title);

  const [showSelected, setShowSelected] = useState(false);

  const allSongs = useSelector((state) => state.songs);



  const openPlaylist = (e) => {
    setEditModal(!editModal);
  };

  const openMenu = (e) => {
    setShowMenu(!showMenu);
    if (!showMenu) return;
  };
  const [playlistLoaded, setPlaylistLoaded] = useState(false)
  const [url, setUrl] = useState()

useEffect(()=> {
if (playlist) {
  setPlaylistLoaded(true)
  setUrl(playlist?.Songs[0].url)
}
}, [playlist])

  return (
    <>
      <div className="audio-and-image">
        <div className="image-relative-container">
          {playlist?.imageUrl ? (
            <>
              <img src={playlist?.imageUrl} className="background-image-song" />
            </>
          ) : (
            <>
              <img
                src="https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg"
                className="background-image-song"
              />
            </>
          )}
        </div>
        <div className="song-player">
          <div className="waveform-player-single-song">
            {playlistLoaded && (
              <PlaylistWaveform
                audio={url}
                {...{ setCurrentAudio }}
                {...{ wavePlayer }}
                {...{ playlist }}
                {...{ waveLoading }}
                {...{ setWaveLoading }}
                {...{ audioPlayer }}
                {...{ isPlaying }}
                {...{ toggleIsPlaying }}
                {...{ currentAudio }}
                {...{ setShowSelected }}
                {...{ showSelected }}
                {...{ setUrl }}
                {...{ setTitle }}
                {...{ sessionUser }}
                {...{ playlist }}
                {...{ setSourceChangeSwitch }}
                {...{ h5CanPlay }}
              />
            )}
          </div>

          <div className="img-div">
            {playlist?.imageUrl ? (
              <img className={classes.songImage} src={playlist?.imageUrl}></img>
            ) : (
              <img
                className={classes.songImage}
                src="https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg"
              ></img>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default ProfilePlaylist;
