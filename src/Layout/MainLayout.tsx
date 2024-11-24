import SideBar from "../components/SideBar"
import MainContent from "../components/MainContent"

const MainLayout = () => {
  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='rounded w-full flex justify-between flex-wrap'>
        <MainContent />
      </div>
    </div>
  )
}

export default MainLayout
