import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {deleteOnePlaylist} from "../../../store/playlists"

const useStyles = createUseStyles((theme) => ({


  }))

const PlaylistDelete = ({sessionUser, playlist}) => {

  const theme = useTheme();
  const classes = useStyles({ theme });

  const history = useHistory()
  const dispatch = useDispatch()

  const handlePlaylistDelete = () => {
    dispatch(deleteOnePlaylist(playlist));
    history.push(`/you/library/playlists`);
  };

  return (
    <>
        <div onClick={(e) => handlePlaylistDelete()}>
        {sessionUser.id === sessionUser.id && (
          <p className="song-button">Delete playlist</p>
        )}
      </div>
    </>
  )
}

export default PlaylistDelete
