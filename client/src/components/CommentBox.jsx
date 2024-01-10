import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function CommentBox({ showComment, setShowComment }) {
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
      <div className="px-3 py-2 h-full">
        <h1>Comment</h1>
      </div>
      <div>
        <input
          type="text"
          id="default-input"
          placeholder="Comment here"
          className="bg-gray-50 absolute bottom-0 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-3"
        />
      </div>
    </div>
  );
}
