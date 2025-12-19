import { Clipboard } from "lucide-react";
import Container from "../ui/Container";
import NotificationBar from "../ui/NotificationBar";
import SidebarModal from "../ui/SidebarModal";
import ThemeSwitchButton from "../ui/ThemeSwitchButton";


function Header() {
  return (
    <header className="bg-base-100  dark:bg-base-200 lg:py-2  ">
      <Container>
        <div className="p-2 md:p-3 flex justify-between items-center">
          <SidebarModal />
          {/* Left: Logo / App Title */}
          <div className="flex items-center gap-2">
            <Clipboard size={28} className="text-blue-600 dark:text-blue-400" />
            <h1 className="font-semibold text-lg md:text-xl text-base-content">Task Manager</h1>
          </div>

          {/* Right: Theme Switch */}
          <div className="flex items-center gap-4">
            <NotificationBar />
            <ThemeSwitchButton />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
