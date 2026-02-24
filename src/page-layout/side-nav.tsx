import {
  FiHome,
  FiFileText,
  FiDatabase,
  FiServer,
  FiZap
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Button from "../common-components/button/Button";

const Sidebar = () => {
  const navItems = [
    { name: "Form Fields", path: "form-fields", icon: <FiFileText size={18} /> },
    { name: "List Rendering", path: "list-rendering", icon: <FiHome size={18} /> },
    { name: "RTK Query", path: "rtk-query", icon: <FiDatabase size={18} /> },
    { name: "Express API", path: "node-Expr-data", icon: <FiServer size={18} /> },
    { name: "Chat Bot", path: 'chat-bot', icon: <FiZap size={18} /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="w-64 fixed left-0 top-0 h-full bg-white flex flex-col p-4">

      {/* Logo / Title */}
      {/* <div className="mb-6 mt-1">
        <h1 className="text-xl font-bold opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
          Demo Workspace
        </h1>
      </div> */}
      <div className="mb-6 mt-1">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          Demo Workspace
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 bg-white">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? "bg-emerald-600 text-white shadow-md"
                : "hover:bg-slate-800 hover:text-white text-slate-400"
              }`
            }
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-6 border-t">
        <Button
          variant="danger"
          onClick={handleLogout}
          className="w-full"
        >
          Logout
        </Button>
      </div>

    </div>
  );
};

export default Sidebar;
