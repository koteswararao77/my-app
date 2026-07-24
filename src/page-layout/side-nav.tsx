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
    window.location.href =
    window.location.hostname === "localhost"
        ? "/login"
        : "/my-app-fe/#/login";
  };

  return (
    <aside className="app-sidebar w-64 fixed left-0 top-0 h-full flex flex-col p-4">

      {/* Logo / Title */}
      {/* <div className="mb-6 mt-1">
        <h1 className="text-xl font-bold opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
          Demo Workspace
        </h1>
      </div> */}
      <div className="mb-9 mt-2 px-2 flex items-center gap-3">
        <div className="brand-mark">D</div>
        <div>
          <h1 className="text-base font-bold text-slate-900">Demo Workspace</h1>
          <p className="text-xs text-slate-400 mt-0.5">Admin console</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200
              ${isActive
                ? "nav-item-active text-white shadow-sm"
                : "text-slate-500"
              }`
            }
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-5 border-t border-slate-100">
        <Button
          variant="danger"
          onClick={handleLogout}
          className="w-full"
        >
          Logout
        </Button>
      </div>

    </aside>
  );
};

export default Sidebar;
