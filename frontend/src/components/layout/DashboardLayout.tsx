
import { Outlet } from 'react-router-dom'
import Sidebar from '../shared/Sidebar'
import Header from '../shared/Header'

function DashboardLayout() {
  return (
     <div>
        <div className=' h-screen
        flex  overflow-hidden'>
          <div className=' max-w-64 h-full hidden lg:block'>
           <Sidebar/>
          </div>

          <div className='lg:grow h-full'>
            <Header/>
          <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default DashboardLayout