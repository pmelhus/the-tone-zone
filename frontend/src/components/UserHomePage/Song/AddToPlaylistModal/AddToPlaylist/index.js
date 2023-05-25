import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getAllPlaylists,
  addSongToPlaylist,
} from "../../../../../store/playlists";
import PlaylistButton from "./PlaylistButton";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
playlistsContainer: {
  height: '400px',
  padding: '20px',
  overflowY: 'scroll'
}

}));


const AddToPlaylist = ({
  showPlaylist,
  setShowForm,
  setShowPlaylist,
  setShowTooltip,
  showTooltip,
  showForm,
  setSelected,
  playlists
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [addedToPlaylist, setAddedToPlaylist] = useState(false);






  useEffect(()=> {
if (!playlists.length) {
  setShowTooltip(true)
}

  },[playlists])

  const [noPlaylists, setNoPlaylists] = useState(false);




  return (
    <>
      <div className={classes.playlistsContainer}>
        {playlists.map((playlist) => {
          return (
            <>
              <PlaylistButton {...{ playlist }} />
            </>
          );
        })}
      </div>
      <div>

      </div>
    </>
  );
};

export default AddToPlaylist;
