import { ArrowBack, Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CommentContext } from "../context/commentContext";

export default function CommentBox({
  postComments,
  showComment,
  setShowComment,
  postId,
  userId,
  username,
}) {
  const [comment, setComment] = useState(null);
  const { comments, setComments } = useContext(CommentContext);

  useEffect(() => {
    setComments(postComments);
  }, [postComments, setComments]);

  const handleComment = async (e) => {
    e.preventDefault();

    if (comment) {
      const newComment = { comment, userId, username };

      const response = await fetch(`/api/posts/comment/${postId}`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setComments((prev) => [...prev, newComment]);
        setComment("");
      }
    }
  };

  return (
    <div
      data-popover
      id="popover-default"
      role="tooltip"
      className={`absolute z-10 top-0 right-0 inline-block w-full h-full text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm ${
        showComment ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg flex items-center gap-3">
        <IconButton onClick={() => setShowComment(false)}>
          <ArrowBack />
        </IconButton>
        <h3 className="font-semibold text-gray-900">Comments</h3>
      </div>
      <div className="h-full">
        {!comments && <h1>No User Comment this post</h1>}
        <ul className="overflow-y-auto h-3/4 px-3 py-2">
          {comments &&
            comments.map((c, i) => (
              <li
                key={i}
                className="flex items-center justify-between px-2 mb-1"
              >
                <div className="flex items-center gap-2">
                  <img src={"/icon/user.jpg"} width="50" alt="user_image" />
                  <div>
                    <h4 className="text-sm">{c.username}</h4>
                    <h2>{c.comment}</h2>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <form className="absolute bottom-0 w-full">
        <div className="relative">
          <input
            type="text"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Comment here..."
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-1.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2"
            onClick={handleComment}
          >
            <Send sx={{ color: "gray" }} />
          </button>
        </div>
      </form>
    </div>
  );
}
