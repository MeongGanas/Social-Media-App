import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

export default function Layout({ children }) {
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <HomeIcon />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/explore"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <ExploreIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Explore</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/profile"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <PersonIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                <LogoutIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">{children}</div>
    </div>
  );
}