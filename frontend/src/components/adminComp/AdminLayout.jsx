import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { useState } from 'react'

const AdminLayout = () => {

  const [openSide , setSide] = useState(false);

  return (
    <div className="flex h-screen">
  {/* Sidebar on the left */}
  <AdminSidebar open = {openSide} setOpen={setSide}/>

  {/* Main content area */}
  <div className="flex flex-col flex-1">
    {/* Header on top */}
    <AdminHeader open = {openSide} setOpen={setSide} />
    
    {/* Page content */}
    <main className="flex-1 overflow-y-auto p-4">
      <Outlet />
    </main>
  </div>
</div>
  )
}

export default AdminLayout