import SideBar from "../components/SideBar"
import TopSellers from "../components/TopSellers"

import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className='flex h-screen'>
      <SideBar />
      <Outlet />

      <div>
        <TopSellers />
      </div>
    </div>
  )
}

export default MainLayout
