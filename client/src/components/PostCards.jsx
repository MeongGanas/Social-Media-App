export default function PostCard({ posts }) {
  return (
    <div className="flex p-4 flex-wrap">
      {posts &&
        posts.map((post) => (
          <div
            className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] border group flex justify-center items-center cursor-pointer flex-grow flex-shrink-0 basis-[33%] md:basis-[21%]"
            key={post._id}
          >
            <img
              className="h-[150px] md:h-[250px] group-hover:opacity-50 object-contain transition duration-200"
              src={`http://localhost:4000/image/${post.image}`}
              alt=""
            />
          </div>
        ))}
    </div>
  );
}
