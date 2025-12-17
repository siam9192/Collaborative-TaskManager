
import {
  Home,
  ListChecks,
  ClipboardList,
  AlertTriangle,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "My Tasks", icon: ListChecks, path: "/tasks" },
    { label: "Assigned", icon: ClipboardList, path: "/tasks/assigned" },
    { label: "Overdue", icon: AlertTriangle, path: "/tasks/overdue" },
    { label: "Teams", icon: Users, path: "/teams" },
  ];

  return (
    <aside className="bg-base-200 border-r border-base-300 flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-base-300">
        <h2 className="text-lg font-semibold">Welcome 👋</h2>
        <p className="text-sm opacity-70">Task Dashboard</p>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-2">
        <ul className="menu menu-md bg-base-200 rounded-box w-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <a className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-base-300 space-y-2">
        <button className="btn btn-ghost btn-sm w-full justify-start gap-3">
          <Settings size={18} />
          Settings
        </button>
        <button className="btn btn-ghost btn-sm w-full justify-start gap-3 text-error">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
