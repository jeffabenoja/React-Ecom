import SideBar from "../components/SideBar"

import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className='flex h-screen'>
      <SideBar />

      <Outlet />
    </div>
  )
}

export default MainLayout
