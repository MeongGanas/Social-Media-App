import { NavLink } from "react-router-dom";
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState } from "react";

export default function Layout({ children }) {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={handleToggle}
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
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full ${
          active ? "translate-x-0" : ""
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li className="sm:hidden">
              <button
                className="hover:bg-gray-200 p-2 rounded-lg"
                onClick={handleToggle}
              >
                <CloseIcon />
              </button>
            </li>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => {
                  const baseClasses =
                    "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200";

                  return isActive ? `${baseClasses} bg-gray-200` : baseClasses;
                }}
              >
                <HomeIcon />
                <span className="ms-3">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/explore"}
                className={({ isActive }) => {
                  const baseClasses =
                    "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200";

                  return isActive ? `${baseClasses} bg-gray-200` : baseClasses;
                }}
              >
                <ExploreIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Explore</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profile"}
                className={({ isActive }) => {
                  const baseClasses =
                    "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200";

                  return isActive ? `${baseClasses} bg-gray-200` : baseClasses;
                }}
              >
                <PersonIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
              >
                <LogoutIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <div className="sm:ml-64">{children}</div>
    </div>
  );
}
