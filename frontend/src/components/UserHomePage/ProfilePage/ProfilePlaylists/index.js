import { useDispatch, useSelector } from "react-redux";
import {  useEffect } from "react";
import { getAllPlaylists } from "../../../../store/playlists";
import { useHistory } from "react-router-dom";
import "./ProfilePlaylists.css";

const ProfilePlaylists = ({ proPlayLoaded, setProPlayLoaded }) => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session.user);

  const history = useHistory()

  const handleClick = (playlist) => {
history.push(`/${sessionUser.username}/playlists/${playlist.id}`)
  }
  useEffect(() => {
    setProPlayLoaded(false);
    dispatch(getAllPlaylists());
  }, [dispatch]);
  return (
    <>
      <div className="playlist-card">
        {playlists.map((playlist) => {
          if (playlist.userId === sessionUser.id)
            return (
              <div className="playlist-div">
                <h2>
                  <div
                    onClick={()=> handleClick(playlist)}
                  >
                    {playlist.title}
                  </div>
                </h2>
                <h3>{playlist.User.username}</h3>
              </div>
            );
        })}
      </div>
    </>
  );
};

export default ProfilePlaylists;
