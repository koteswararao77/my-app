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

    <div className="app-shell min-h-screen flex overflow-hidden">
      <Sidebar />
      <div className="app-main flex-1 ml-64 flex flex-col">

        <div className="app-topbar sticky top-0 z-40 px-8 flex justify-between items-center">
          <div>
            <p className="app-eyebrow">Workspace</p>
            <h1 className="text-xl font-bold tracking-tight">
            {getTitle()}
            </h1>
          </div>
          <div>
            <Profile/>
          </div>
        </div>

        <main className="app-content p-8">
          <Outlet />
        </main>

      </div>
    </div>

  );
};

export default MainFile;
