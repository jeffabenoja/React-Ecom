import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import MainContent from "./components/MainContent"
import Product from "./components/Product"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<MainContent />} />
          <Route path='/product/:id' element={<Product />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App
