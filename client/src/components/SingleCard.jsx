import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { ButtonGroup, Checkbox, IconButton } from "@mui/material";
import { useState } from "react";

export default function SingleCard({ post }) {
  const [likes, setLikes] = useState(0);
  return (
    <div className="max-w-sm bg-white border mb-5 border-gray-200 rounded-lg shadow">
      <div className="flex items-center gap-2 p-2">
        <img src="/icon/user.jpg" width="50" alt="user_image" />
        <div className="flex gap-5 items-center">
          {post.author}
          <button
            type="button"
            className="text-blue-700 transition duration-200 hover:opacity-80 focus:outline-none font-medium text-sm "
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
          />
          <IconButton aria-label="comment">
            <ChatBubbleOutline />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </ButtonGroup>
        <p className="mb-1 px-3 font-normal text-gray-700 ">{likes} Likes</p>
        <p className="mb-3 px-3 font-normal text-gray-700 ">{post.desc}</p>
      </div>
    </div>
  );
}
