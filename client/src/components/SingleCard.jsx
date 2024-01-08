import {
  ArrowBack,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { ButtonGroup, Checkbox, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LikeContext } from "../context/likeContext";
import LikedBy from "./LikedBy";

export default function SingleCard({ post, userId }) {
  const { likes, setLikes } = useContext(LikeContext);
  const [readMore, setReadMore] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usersLike, setUsersLike] = useState([]);
  const [checked, setChecked] = useState(post.likedBy.includes(userId));

  useEffect(() => {
    setLikes(post.likes);
  }, [post, setLikes]);

  const like = async (postId) => {
    if (isLoading) return;
    setIsLoading(true);

    const likeResponse = await fetch(`/api/posts/${userId}/like/${postId}`);
    const json = await likeResponse.json();

    if (!likeResponse) {
      console.log(json.error);
      return false;
    }

    setChecked(true);
    setLikes(likes + 1);
    setIsLoading(false);
  };

  const unlike = async (postId) => {
    if (isLoading) return;
    setIsLoading(true);

    const unlikeResponse = await fetch(`/api/posts/${userId}/unlike/${postId}`);
    const json = await unlikeResponse.json();

    if (!unlikeResponse) {
      console.log(json.error);
      return false;
    }

    setChecked(false);
    setLikes(likes - 1);
    setIsLoading(false);
  };

  const findUserData = async (userIds) => {
    const usernames = [];
    for (const id of userIds) {
      const userData = await fetch(`/users/getUser/${id}`);
      const json = await userData.json();
      if (userData.ok) {
        usernames.push(json);
      }
    }
    setUsersLike(usernames);
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
          <IconButton aria-label="comment">
            <ChatBubbleOutline />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </ButtonGroup>
        <div className="likes">
          <p
            className="mb-1 px-3 font-normal text-gray-700"
            onClick={() => {
              setShowLikes(true);
              findUserData(post.likedBy);
            }}
          >
            {likes} <span className="cursor-pointer">Likes</span>
          </p>
          <div
            data-popover
            id="popover-default"
            role="tooltip"
            className={`absolute z-10 top-0 right-0 inline-block w-full h-full text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm ${
              showLikes ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg flex items-center">
              <IconButton onClick={() => setShowLikes(false)}>
                <ArrowBack />
              </IconButton>
              <h3 className="font-semibold text-gray-900">Liked by</h3>
            </div>
            <div className="px-3 py-2">
              <LikedBy users={usersLike} />
              {usersLike.length < 1 ? (
                <h1 className="text-slate-400 text-center text-lg">
                  No user liked this post
                </h1>
              ) : (
                ""
              )}
            </div>
            <div data-popper-arrow></div>
          </div>
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
