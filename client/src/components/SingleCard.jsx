import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { ButtonGroup, Checkbox, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LikeContext } from "../context/likeContext";
import LikedBy from "./LikedBy";
import CommentBox from "./CommentBox";

export default function SingleCard({ post, userId }) {
  const { likes, setLikes } = useContext(LikeContext);
  const [readMore, setReadMore] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(post.likedBy.includes(userId));

  useEffect(() => {
    const fetchUser = async (userId) => {
      const response = await fetch(`/users/getUser/${userId}`);
      const json = await response.json();

      if (response.ok) {
        setUsername(json.username);
      }
    };
    fetchUser(userId);
    setLikes(post.likes);
  }, [post, setLikes]);

  const like = async (postId) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const likeResponse = await fetch(`/api/posts/${userId}/like/${postId}`);
      const json = await likeResponse.json();

      if (!likeResponse) {
        console.log(json.error);
        return false;
      }

      setChecked(true);
      setLikes((prevLikes) => prevLikes + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const unlike = async (postId) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const unlikeResponse = await fetch(
        `/api/posts/${userId}/unlike/${postId}`
      );
      const json = await unlikeResponse.json();

      if (!unlikeResponse) {
        console.log(json.error);
        return false;
      }

      setChecked(false);
      setLikes((prevLikes) => prevLikes - 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm w-[384px] bg-white border mb-5 relative border-gray-200 rounded-lg shadow">
      <div className="flex items-center gap-2 p-2">
        <img src="/icon/user.jpg" width="50" alt="user_image" />
        <div className="flex gap-5 items-center">
          {post.author}
          <button
            type="button"
            className="text-blue-700 transition duration-200 hover:opacity-80 focus:outline-none font-medium text-sm"
            value={post.author_id}
          >
            follow
          </button>
        </div>
      </div>
      <div className="flex justify-center border-t border-b h-[300px]">
        <img
          src={`http://localhost:4000/image/${post.image}`}
          alt=""
          className="max-w-full object-contain"
        />
      </div>
      <div className="p-2">
        <ButtonGroup>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite className="text-red-600" />}
            checked={checked}
            onChange={() => {
              if (!checked && !isLoading) {
                like(post._id);
              } else if (checked && !isLoading) {
                unlike(post._id);
              }
            }}
          />
          <div className="comment-section">
            <IconButton
              aria-label="comment"
              onClick={() => setShowComment(true)}
            >
              <ChatBubbleOutline />
            </IconButton>
            <CommentBox
              postComments={post.comments}
              showComment={showComment}
              setShowComment={setShowComment}
              postId={post._id}
              userId={userId}
              username={username}
            />
          </div>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </ButtonGroup>

        {/* likes section */}
        <div className="likes">
          <LikedBy usersIds={post.likedBy} likes={likes} />
        </div>

        <p className="mb-1 px-3 font-normal text-gray-700">
          {post.title}
          <span
            className={`${readMore ? "block" : "hidden"} text-gray-600 my-2`}
          >
            {post.desc}
          </span>
        </p>
        <p className="mb-3 px-3 font-normal text-gray-700">
          <span
            id="dots"
            className="cursor-pointer"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "Read less" : ""}...
          </span>
        </p>
      </div>
    </div>
  );
}
