import { createComment, getAllComments } from "../../../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./WriteComment.css";
import { ValidationError } from "../../../../utils/validationError";
import ErrorMessage from "../../../ErrorMessage";
import { useHistory, useLocation } from "react-router-dom";

const WriteComment = ({ song }) => {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const userId = session?.user?.id;
  const songId = song.id;
  const history = useHistory();
  const location = useLocation();
  const [errorMessages, setErrorMessages] = useState({});

  const handleClick = async (e) => {
    if (!session.user) {
      history.push("/", { commentAttempt: true, from: location.pathname });
    } else {
      e.preventDefault();
      const payload = {
        body,
        userId,
        songId,
      };
      let createdComment;
      try {
        createdComment = await dispatch(createComment(payload))
         await dispatch(getAllComments())
         await setBody("");
         await setErrorMessages({});

      } catch (error) {
        if (error instanceof ValidationError) {
          // console.log('===================')
          setErrorMessages(error.errors);
        }

        // If error is not a ValidationError, add slice at the end to remove extra
        // "Error: "
        else setErrorMessages({ overall: error.toString().slice(7) });
      }
      //!!END

        //!!START SILENT

        //!!END
        console.log(body);
        // return dispatch(createComment(payload)).then(() => {
        //   dispatch(getAllComments());
        // });

    }
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  return (
    <>
      <ErrorMessage message={errorMessages.overall} />
      <div className="comment-textarea">
        <form onSubmit={(e) => handleClick(e)}>
          {/* <img src={session.user?.profileImageUrl}></img> */}
          {session.user?.profileImageUrl ? (
            <img
              className="comment-avatar"
              src={session.user?.profileImageUrl}
            />
          ) : (
            <img
              className="comment-avatar"
              src="https://img.myloview.com/posters/default-avatar-profile-in-trendy-style-for-social-media-user-icon-400-228654852.jpg"
            />
          )}
          <div className="comment-body-text">
            <textarea
              placeholder="Write a comment"
              onChange={updateBody}
              value={body}
            ></textarea>
          </div>
          <button>Submit</button>
        </form>
      </div>
      <ErrorMessage
        className="error-message"
        label={"Error"}
        message={errorMessages.body}
      />
    </>
  );
};

export default WriteComment;
