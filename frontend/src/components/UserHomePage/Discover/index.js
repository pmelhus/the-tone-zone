import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Playlist from "../Library/Playlists/Playlist";
import { getAllPlaylists } from "../../../store/playlists";
import { getAllSongs } from "../../../store/songs";
import "./Discover.css";
import { useLocation, useHistory } from "react-router-dom";
import SongDiscover from "./SongDiscover";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
songDiscoverItem: {
width: '228px',
"@media (min-width: 768px)": {
  width: "182px",
  height: "182px"
},
"@media (min-height: 2500px)": {
  width: "280px",
  height: "280px",
  margin: '40px'
}
},
emptyTracks: {
  margin: "20px",
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

const Discover = ({ isLoaded }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const history = useHistory()
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session?.user);
  const songs = useSelector((state) => Object.values(state?.songs));
  const sortedLatest = useSelector((state) => Object.values(state.songs));
  const { pathname } = useLocation();
  const yourSongs = songs.filter((song)=> {
  return  song.userId === sessionUser?.id
  })

  sortedLatest.sort((a, b) => {
    return b.id - a.id
  });
  yourSongs.sort((a, b) => {
    return b.id - a.id
  });

  // useEffect(() => {
  //   dispatch(getAllPlaylists());
  //   dispatch(getAllSongs());
  //   // setIsLoaded(true);
  // }, [dispatch]);


  const handleLink = () => {
    history.push('/upload')
  }


  return (
    <div className="discover-container">
      {/* <div className="playlists-container">
      <p>Hear the latest tones:</p>
        <ul className="playlist-cards">
          {sortedLatest &&
            sortedLatest.map((song) => {
                return (
                  <>
                    <li>
                      <SongDiscover song={song} />
                    </li>
                  </>
                );
            })}
        </ul>
      </div> */}

      <div className="playlists-container">
        <p>Hear the most recent uploads in our community:</p>
        <ul className="playlist-cards">
          {isLoaded &&
            sortedLatest.map((song) => {
              return (
                <>
                  <li className={classes.songDiscoverItem}>
                    <SongDiscover song={song} />
                  </li>
                </>
              );
            })}
        </ul>
      </div>

      <div className="playlists-container">
        <p>Hear your own tracks:</p>

        {!yourSongs?.length && (
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
        {isLoaded &&
            yourSongs.map((song) => {
              return (
                <>
                  <li className={classes.songDiscoverItem}>
                    <SongDiscover song={song} />
                  </li>
                </>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Discover;
