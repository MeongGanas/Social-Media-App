export default function PostCard({ posts }) {
  return (
    <div className="flex flex-wrap gap-0.5 p-4">
      {posts &&
        posts.map((post) => (
          <div className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] border group flex justify-center items-center cursor-pointer">
            <img
              className="max-w-full group-hover:opacity-50 object-center object-contain transition duration-200 rounded-lg"
              src={`http://localhost:4000/image/${post.image}`}
              alt=""
            />
          </div>
        ))}
    </div>
  );
}
