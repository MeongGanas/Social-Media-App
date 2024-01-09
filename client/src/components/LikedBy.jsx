import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import Loading from "./Loading";

export default function LikedBy({ usersIds, likes }) {
  const [showLikes, setShowLikes] = useState(false);
  const [usersLike, setUsersLike] = useState([]);
  const [loadUser, setLoadUser] = useState(true);

  const findUserData = async (userIds) => {
    setLoadUser(true);
    const userData = [];
    for (const id of userIds) {
      const response = await fetch(`/users/getUser/${id}`);
      const json = await response.json();
      if (response.ok) {
        userData.push(json);
      }
    }
    setUsersLike(userData);
    setLoadUser(false);
  };

  return (
    <div>
      <p
        className="mb-1 px-3 font-normal text-gray-700"
        onClick={() => {
          setShowLikes(true);
          findUserData(usersIds);
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
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg flex items-center gap-3">
          <IconButton onClick={() => setShowLikes(false)}>
            <ArrowBack />
          </IconButton>
          <h3 className="font-semibold text-gray-900">Liked by</h3>
        </div>
        <div className="px-3 py-2 h-full">
          {loadUser && (
            <div className="flex justify-center items-center w-full h-full">
              <Loading />
            </div>
          )}
          {usersLike.length === 0 && !loadUser && (
            <h1 className="text-slate-400 text-center text-lg">
              No user like this post
            </h1>
          )}
          {usersLike.length > 0 && !loadUser && (
            <ul className="likedBy">
              {usersLike &&
                usersLike.map((user) => (
                  <li
                    key={user._id}
                    className="flex items-center justify-between px-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={user.profile ? user.profile : "/icon/user.jpg"}
                        width="50"
                        alt="user_image"
                      />
                      {user.username}
                    </div>
                    <button
                      type="button"
                      className="text-blue-700 transition duration-200 hover:opacity-80 focus:outline-none font-medium text-sm"
                      value={user._id}
                    >
                      follow
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
