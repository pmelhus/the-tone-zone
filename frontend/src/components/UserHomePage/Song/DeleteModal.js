import { createUseStyles, useTheme } from "react-jss";
import { useDispatch } from "react-redux";
import { deleteOneSong } from "../../../store/songs";
import { useHistory } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "180px",
    padding: "20px",
  },
  heading: {
    fontSize: "20px",
    marginBottom: "40px",
  },
  yesAndNo: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "120px",
    height: "30px",
    "&:hover": {
      backgroundColor: theme.orangeTheme,
      color: "white",
    },
  },
}));

const DeleteModal = ({ setDeleteModal, song }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    await dispatch(deleteOneSong(song));
    await history.push("/stream");
  };

  return (
    <>
      <div className={classes.container}>
        <h4 className={classes.heading}>
          Are you sure you want to delete your song?
        </h4>
        <div className={classes.yesAndNo}>
          <button onClick={handleDelete} className={classes.button}>
            <p>Delete song</p>
          </button>
          <button
            onClick={() => setDeleteModal(false)}
            className={classes.button}
          >
            <p>Cancel</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
