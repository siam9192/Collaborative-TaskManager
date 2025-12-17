import { Outlet } from "react-router-dom"




function App() {
  return (
    <>
    <div className="bg-gray-100 dark:bg-gray-950">
       <Outlet/>
    </div>
    </>
  )
}

export default App
