import { createUseStyles, useTheme } from "react-jss";
import { useSelector } from "react-redux";
import SongDiscover from "../../Discover/SongDiscover";
import { useHistory } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
  tracksHeading: {
    paddingLeft: "20px",
    fontSize: "14px",
    color: "#999",
    width: "100%",
  },
  song: {
    width: "228px",
  },
  emptyTracks: {
    margin: "20px",
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  upload: {
    display: 'flex'
  },
  link: {
    marginTop: '10px'
  }
}));

const Tracks = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const history = useHistory();

  const allSongs = useSelector((state) => Object.values(state.songs));

  const user = useSelector((state) => state.session.user);

  const userSongs = allSongs?.filter((song) => song.userId === user.id);

  // pushes history to "/upload"

  const handleLink = () => {
    history.push('/upload')
  }

  return (
    <div>
      <p className={classes.tracksHeading}>Hear your own tracks:</p>
        {!userSongs?.length && (
          <>
            <div className={classes.emptyTracks}>
              <p className="fs-6"> Looks like you don't have any tracks!</p>
              <span className={classes.upload}>
                <a className={classes.link} onClick ={handleLink}>Upload a song</a>
              </span>
            </div>
          </>
        )}
      <ul className="playlist-cards">
        {userSongs.map((song) => {
          return (
            <>
              <li className={classes.song}>
                <SongDiscover key={song.id} {...{ song }} />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Tracks;
