import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { Menu } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '@/Slices/auth-slice'



const AdminHeader = ({ open, setOpen }) => {
    const dispatch = useDispatch()

  const handleLogOut = ()=>{
   dispatch(logout())
  }

  return (
    <div className="h-16 bg-gray-100 shadow-sm flex items-center justify-between px-4">
      <Button
        onClick={() => setOpen(true)}
        className="md:hidden bg-black h-10 w-12   text-white p-2 rounded-lg shadow hover:bg-gray-800 transition-all duration-200"
      >
        <Menu className="h-6 w-6" stroke="white"  strokeWidth={3}/>
      </Button>
      <Button onClick={handleLogOut} className="text-white bg-black hover:bg-gray-900 hover:opacity-90  flex items-center gap-2 rounded-xl">
        <LogOut className="h-5 w-5 " />
        Logout
      </Button>
    </div>
  )
}

export default AdminHeader