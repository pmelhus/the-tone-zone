import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Switch,
  Link,
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOnePlaylist,
  getAllSongsPlaylist,
  getAllPlaylists,
  deleteOnePlaylist,
} from "../../../store/playlists";
import PlaylistSong from "./PlaylistSong";
import AudioPlayer from "react-h5-audio-player";
import "./ProfilePlaylist.css";
import Waveform from "../../Waveform";

const ProfilePlaylist = ({
  pauseFunc,
  playFunc,
  proPlayLoaded,
  setProPlayLoaded,

}) => {
  const [signInToggle, setSignInToggle] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlists[id]);
  const sessionUser = useSelector((state) => state?.session.user);

  const user = useSelector((state) => state?.playlists[id]?.User);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const songs = useSelector((state) => state?.playlists[id]?.Songs);
  const [title, setTitle] = useState(songs?.title);
  const [url, setUrl] = useState(songs?.url);
  const [showSelected, setShowSelected] = useState(false);
  const [songId, setSongId] = useState(null);
  const selectedSong = useSelector((state) => state.songs[songId]);

  // console.log(id, 'ID HERE')

  // console.log(playlist?.Songs, "==================");
  // const songs = Object.values(pSongs)
  // console.log(pSongs.Songs, "===========?!?!?!?!?");
  useEffect(() => {
    setProPlayLoaded(true);
    // dispatch(getAllPlaylists());
    dispatch(getOnePlaylist(id));
    // setTitle(playlist?.Songs?.title);
    setIsLoaded(true);
    // dispatch(getAllSongsPlaylist(id));
  }, [dispatch]);
  if (!playlist) return null;

  const handlePlaylistDelete = () => {
    // console.log(playlist)
    dispatch(deleteOnePlaylist(playlist));
    history.push(`/you/library/playlists`);
  };

  const openPlaylist = (e) => {
    // console.log("==============");
    // if (playModal) return
    setEditModal(!editModal);
    // console.log(playModal);
  };

  const openMenu = (e) => {
    // e.stopPropagation();
    setShowMenu(!showMenu);
    if (!showMenu) return;
  };
  // console.log(url, 'URL')

  return (
    <>
      <div className="audio-and-image">
        <div className="song-player">
          <div className="title-song-player-rel">
            <div className="title-song-player">
              <p id="title-p">{playlist?.title}</p>
              <p id="username-p">{playlist?.User?.username}</p>
            </div>
            <div className="playlist-waveform">
              <Waveform
    
                song={selectedSong}
                {...{ pauseFunc }}
                {...{ playFunc }}
                audio={url}
              />
            </div>
          </div>

          {/* <AudioPlayer
            className="audio-player"
            src={url}
            onPlay={(e) => console.log("onPlay")}
            style={{ backgroundImage: `url("${playlist.imageUrl}")` }}
          /> */}

          <div className="img-div">
            <img src={playlist?.imageUrl}></img>
          </div>
        </div>
      </div>
      <div className="song-buttons">
        {user.id === playlist.User.id && (
          <button onClick={(e) => handlePlaylistDelete()}>
            Delete playlist
          </button>
        )}
      </div>
      {/* <div className="song-content">
        <div className="song-player">
          <div className="relative">
            <div className="playlist-title-username-song">
              <p>{playlist && playlist?.title}</p>
              <p>{playlist && playlist?.User?.username}</p>
            </div>
          </div>

          <AudioPlayer
            className="audio-player"
            id="playlist-player"
            src={url}
            onPlay={(e) => console.log("onPlay")}
            style={{ backgroundImage: `url("${playlist.imageUrl}")` }}
            // other props here
          />
          <div className="img-div" >
            <img id='playlist-img' src={playlist?.imageUrl}></img>
          </div>
        </div>
        <button onClick={(e) => openMenu()}>More</button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>
              <button onClick={(e) => handlePlaylistDelete()}>
                Delete Playlist
              </button>
            </li>
          </ul>
        )}
      </div>
      <div> */}

      {isLoaded &&
        playlist?.Songs?.map((song) => {
          return (
            <>
              <PlaylistSong
              {...{playFunc}}
              {...{pauseFunc}}
                key={id}
                {...{ setSongId }}
                url={url}
                song={song}
                user={user}
                setUrl={setUrl}
                setTitle={setTitle}
                {...{ setShowSelected }}
                {...{ showSelected }}
              />
            </>
          );
        })}
    </>
  );
};

export default ProfilePlaylist;
