import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { useNotificationContext } from "../../store/notificatinContext";

function Comments(props) {
  const { eventId } = props;
  const { showNotification } = useNotificationContext();

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();
  const [isFetchingComments, setIsFetchingComment] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    if (showComments) {
      setIsFetchingComment(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComment(false);
        });
    }
  }, [showComments]);

  function addCommentHandler(commentData) {
    // send data to API
    showNotification({
      title: "Sending Comment...",
      message: "Your comment is adding...",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong.");
        });
      })
      .then((data) => {
        showNotification({
          title: "Success",
          message: "Your comment is added successfully.",
          status: "success",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Error!",
          text: err.message || "Faild to registered for newsletters.",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading....</p>}
    </section>
  );
}

export default Comments;
