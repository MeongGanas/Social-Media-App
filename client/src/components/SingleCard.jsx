import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { ButtonGroup, Checkbox, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LikeContext } from "../context/likeContext";

export default function SingleCard({ post, userId }) {
  const { likes, setLikes } = useContext(LikeContext);
  const [readMore, setReadMore] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLikes(post.likes);
    setChecked(post.likedBy.includes(userId));
  }, [post]);

  const like = async (postId) => {
    const likeResponse = await fetch(`/api/posts/${userId}/like/${postId}`);
    const json = await likeResponse.json();

    if (!likeResponse) {
      console.log(json.error);
      return false;
    }

    setChecked(true);
    setLikes(likes + 1);
  };

  const unlike = async (postId) => {
    const unlikeResponse = await fetch(`/api/posts/${userId}/unlike/${postId}`);
    const json = await unlikeResponse.json();

    if (!unlikeResponse) {
      console.log(json.error);
      return false;
    }

    setChecked(false);
    setLikes(likes - 1);
  };

  return (
    <div className="max-w-sm w-[384px] bg-white border mb-5 border-gray-200 rounded-lg shadow">
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
              if (!checked) {
                like(post._id);
              } else {
                unlike(post._id);
              }
            }}
          />
          <IconButton aria-label="comment">
            <ChatBubbleOutline />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </ButtonGroup>
        <p className="mb-1 px-3 font-normal text-gray-700">{likes} Likes</p>
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
