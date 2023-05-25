import { createUseStyles, useTheme } from "react-jss";
import { useSelector } from "react-redux";
import SongDiscover from "../../Discover/SongDiscover"

const useStyles = createUseStyles((theme) => ({
  tracksHeading: {
    paddingLeft: "20px",
    fontSize: "14px",
    color: "#999",
    width: "100%",
  },
}));

const Tracks = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const allSongs = useSelector((state) => Object.values(state.songs));

  const user = useSelector((state) => state.session.user);

  const userSongs = allSongs?.filter((song) => song.userId === user.id);

  return (
    <div>
      <p className={classes.tracksHeading}>Hear your own tracks:</p>
      <ul className="playlist-cards">
        {userSongs.map((song) => {
          return (
            <>
              <li>
                <SongDiscover key={song.id} {...{song}}/>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Tracks;
