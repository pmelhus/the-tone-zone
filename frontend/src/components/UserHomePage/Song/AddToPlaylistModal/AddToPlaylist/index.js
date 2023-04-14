import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getAllPlaylists,
  addSongToPlaylist,
} from "../../../../../store/playlists";
import PlaylistButton from "./PlaylistButton";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({



}));


const AddToPlaylist = ({
  showPlaylist,
  setShowForm,
  setShowPlaylist,
  setShowTooltip,
  showTooltip,
  showForm,
  setSelected,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
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

  useEffect(()=> {
if (!myPlaylists.length) {
  setShowTooltip(true)
}

  },[myPlaylists])

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
            <p>No playlists</p>
          </>
        )}
      </div>
    </>
  );
};

export default AddToPlaylist;
