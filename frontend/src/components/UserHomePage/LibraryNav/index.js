import { createUseStyles, useTheme } from "react-jss";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const useStyles = createUseStyles((theme) => ({
  playlistsSelected: {
    color: "#f50",
    textDecorationLine: "underline",
    textUnderlinePosition: "under",
    cursor: "pointer",
    padding: "10px",
    "&:hover": {
      textUnderlinePosition: "under",
      textDecorationLine: "underline",
      color: "#f50",
    },
  },
  playlistsUnselected: {
    cursor: "pointer",
    padding: "10px",
    color: "black",
    "&:hover": {
      textUnderlinePosition: "under",
      textDecorationLine: "underline",
      color: "black",
    },
  },
}));

const LibraryNav = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const { pathname } = useLocation();

  const [selected, setSelected] = useState("tracks");

  const handlePlaylistTab = () => {
    setSelected("playlists");
  };

  const handleTracksTab = () => {
    setSelected("tracks");
  };

  useEffect(() => {
    if (pathname.split("/")[3] === "playlists") {
      setSelected("playlists");
    }
    if (pathname.split("/")[3] === "tracks") {
      setSelected("tracks");
    }
  }, []);

  return (
    <>
      <nav className="library-nav">
        {/* <Link to="/you/library/overview">Overview</Link> */}
        {/* <Link to="/you/library/likes">Likes</Link> */}
        <NavLink
          onClick={handleTracksTab}
          className={
            selected === "tracks"
              ? classes.playlistsSelected
              : classes.playlistsUnselected
          }
          to="/you/library/tracks"
        >
          <div>
            <h4>Tracks</h4>
          </div>
        </NavLink>
        <NavLink to="/you/library/playlists">
          <div
            className={
              selected === "playlists"
                ? classes.playlistsSelected
                : classes.playlistsUnselected
            }
            onClick={handlePlaylistTab}
          >
            <h4>Playlists</h4>
          </div>
        </NavLink>
      </nav>
    </>
  );
};

export default LibraryNav;
