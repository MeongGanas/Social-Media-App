export default function LikedBy({ users }) {
  return (
    <ul className="likedBy">
      {users.map((user) => (
        <li key={user._id} className="flex items-center justify-between px-2">
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
  );
}
