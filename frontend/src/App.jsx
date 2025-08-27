
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/authComp/AuthLayout'
import Login from './pages/auth-page/Login'
import Register from './pages/auth-page/Register'
import AdminLayout from './components/adminComp/AdminLayout'
import AdminDashboard from './pages/admin-page/AdminDashboard'
import AdminProduct from './pages/admin-page/AdminProduct'
import AdminOrder from './pages/admin-page/AdminOrder'
import AdminFeature from './pages/admin-page/AdminFeature'
import ShoppingLayout from './components/shoppingComp/ShoppingLayout'
import NotFound from './pages/not-found/NotFound'
import AccountPage from './pages/shopping-page/AccountPage'
import Listingpage from './pages/shopping-page/Listingpage'
import CheckOut from './pages/shopping-page/CheckOut'
import CheckAuth from './components/common/checkauth'
import ShopHomePage from './pages/shopping-page/ShopHomePage'
import UnauthPage from './pages/unauth-page/UnAuthPage'
import { Toaster } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './Slices/auth-slice'
import { useEffect } from 'react'
import { Skeleton } from './components/ui/skeleton'
import { Navigate } from "react-router-dom";



function App() {


  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) {
    < Skeleton className='h-screen w-screen bg-slate-300' />
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/shop/home" replace />
    },
    {
      path: "/auth", element: <CheckAuth user={user} isAuthenticated={isAuthenticated} > <AuthLayout /> </CheckAuth>,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> }
      ]
    },
    {
      path: "/admin", element: <CheckAuth user={user} isAuthenticated={isAuthenticated} > <AdminLayout /> </CheckAuth>,
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "product", element: <AdminProduct /> },
        { path: "order", element: <AdminOrder /> },
        { path: "feature", element: <AdminFeature /> },
      ]
    },
    {
      path: '/shop', element: <CheckAuth user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} > <ShoppingLayout /> </CheckAuth>,
      children: [
        { path: "checkout", element: <CheckOut /> },
        { path: "listing", element: <Listingpage /> },
        { path: "account", element: <AccountPage /> },
        { path: "home", element: <ShopHomePage /> },
      ]
    },
    {
      path: '*', element: <NotFound />
    },
    {
      path: '/unauth', element: <UnauthPage />
    }

  ]
  )

  return (
    <div className='flex flex-col '>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
