import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getAllPlaylists,
  addSongToPlaylist,
} from "../../../../../store/playlists";
import PlaylistButton from "./PlaylistButton";

const AddToPlaylist = ({
  showPlaylist,
  setShowForm,
  setShowPlaylist,
  showForm,
  setSelected,
}) => {
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [addedToPlaylist, setAddedToPlaylist] = useState(false);



  useEffect(() => {
    dispatch(getAllPlaylists());
  }, [dispatch]);

  const myPlaylists = playlists.filter((playlist) => {
    return playlist.userId === sessionUser.id;
  });



  const [noPlaylists, setNoPlaylists] = useState(false);

  if (!showPlaylist && showForm) return null;

  return (
    <>
      <div className="playlist-card">
        {myPlaylists.map((playlist) => {
          return (
            <>
              <PlaylistButton {...{ playlist }} />
            </>
          );
        })}
      </div>
      <div>
        {!myPlaylists.length && (
          <>
            <h3>No playlists</h3>
            <button
              onClick={(e) => {
                setShowForm(!showForm);
                setShowPlaylist(!showPlaylist);
                setSelected(true);
              }}
            >
              Create playlist
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AddToPlaylist;
