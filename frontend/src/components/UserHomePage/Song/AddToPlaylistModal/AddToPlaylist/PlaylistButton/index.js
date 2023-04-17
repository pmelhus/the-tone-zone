import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getAllPlaylists,
  addSongToPlaylist,
  getAllSongsPlaylist,
  deleteOneSong,
} from "../../../../../../store/playlists";
import { useParams } from "react-router-dom";
import "./PlaylistButton.css";

const PlaylistButton = ({ playlist }) => {
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);
  const { songId } = useParams();
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const song = useSelector((state) => state.songs[songId]);
  const [songInPlaylist, setSongInPlaylist] = useState();
  const songsInPlaylist = useSelector((state) =>
    Object.values(state.playlists.playlistSongs)
  );

  const songIsInPlaylist = songsInPlaylist.find(playlistSong => playlistSong.songId === song.id && playlistSong.playlistId === playlist.id)

  console.log(songIsInPlaylist, 'PAJSIDFJAPD')

  const addSongPlaylist = async (playlist) => {
    const payload = { song, playlist };
    await dispatch(addSongToPlaylist(payload));
    // await dispatch(getAllSongsPlaylist(playlist.id));
    // await setAddedToPlaylist(true);
  };

  const deletePlaylistSong = async () => {
    const payload = { song, playlist };
    await dispatch(deleteOneSong(payload));
    // await dispatch(getAllSongsPlaylist(playlist.id));
  };

  useEffect( () => {
    dispatch(getAllSongsPlaylist(playlist.id));
  }, [dispatch]);



  //   useEffect(() => {
  // if (playlists.find(playlist2 => playlist2.Songs[song.id] === song.id))
  //  setAddedToPlaylist(true)
  //   }, [addedToPlaylist])
  return (
    <div className="playlist-card-button">
      <div className="playlist-image-title">
        <img className="avatar-playlist" src={playlist.imageUrl}></img>
        <p>{playlist.title}</p>
      </div>
      {songIsInPlaylist ? (
        <>
          <button className='added-song' onClick={deletePlaylistSong}>Added</button>
        </>
      ) : (
        <>
          <button  onClick={(e) => addSongPlaylist(playlist)}>
            Add to playlist
          </button>
        </>
      )}
    </div>
  );
};

export default PlaylistButton;
