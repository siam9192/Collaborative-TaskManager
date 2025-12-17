
import { Outlet } from 'react-router-dom'
import Sidebar from '../shared/Sidebar'
import Header from '../shared/Header'

function DashboardLayout() {
  return (
    <div className="flex min-h-screen lg:h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:block lg:w-64 h-full sticky top-0 bg-base-200 border-r border-base-300">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}



export default DashboardLayout