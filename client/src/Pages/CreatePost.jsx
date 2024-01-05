import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/layout";
import { useState } from "react";
import { useSecureData } from "../hooks/isLogged";
import swal from "sweetalert2";

export default function CreatePost({ token }) {
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState(null);
  const { data, loading, error } = useSecureData(token);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("desc", desc);

    try {
      if (!loading && !error && data) {
        const response = await fetch(`/api/posts/${data.id}/create`, {
          method: "POST",
          body: formData,
        });

        const json = await response.json();

        if (!response.ok) {
          console.log(json.error);
          return false;
        }

        swal
          .fire({
            title: "Success!",
            text: "Post created successfuly!",
            icon: "success",
            confirmButtonText: "Close",
            timer: 1000,
          })
          .then(() => {
            navigate("/profile");
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const render = new FileReader();
      render.onloadend = () => {
        document.getElementById("image-preview").src = render.result;
      };
      render.readAsDataURL(file);
      setImage(file);
    }
  };

  return (
    <Layout>
      <div className="p-5">
        <form className="max-w-sm mx-auto">
          <h1 className="text-2xl font-bold mb-5">Create a new Post</h1>
          <div className="upload mb-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
            >
              <div
                className="flex flex-col items-center justify-center pt-5 pb-6"
                id="up-icon"
              >
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
                <h1 className="mt-4">Preview: </h1>
                <img id="image-preview" className="mt-2 max-w-full" />
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  handleUpload(e);
                }}
              />
            </label>
          </div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Description..."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-5 gap-5">
            <Link
              type="button"
              to="/profile"
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
