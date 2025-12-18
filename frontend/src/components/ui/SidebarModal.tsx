import { Menu, X } from "lucide-react";
import { Fragment, useState } from "react";
import Sidebar from "../shared/Sidebar";

function SidebarModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <Fragment>
      <button
        className="text-primary text-4xl p-2 focus:outline-none lg:hidden "
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={closeSidebar}></div>}

      <div
        className={`fixed top-0 left-0 h-screen w-10/12 max-w-xs bg-base-100 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
    </Fragment>
  );
}

export default SidebarModal;
