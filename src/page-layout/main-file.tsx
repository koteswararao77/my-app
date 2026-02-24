import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./side-nav";
import Profile from "../components/login/profile";

const MainFile = () => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("form-fields")) return "Form Fields";
    if (location.pathname.includes("list-rendering")) return "List Rendering";
    if (location.pathname.includes("rtk-query")) return "RTK Query";
    if (location.pathname.includes("node-Expr-data")) return "Express Node API";
    if (location.pathname.includes('chat-bot')) return 'Chat Bot';
    return "Dashboard";
  };

  return (

    <div className="min-h-screen flex bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">

        <div className="sticky top-0 z-40 px-8 py-4 shadow-sm flex justify-between items-center">
          <h1 className="text-lg font-semibold tracking-wide">
            {getTitle()}
          </h1>
          <div>
            <Profile/>
          </div>
        </div>

        <div className="p-8 bg-gray-200">
          <Outlet />
        </div>

      </div>
    </div>

  );
};

export default MainFile;
