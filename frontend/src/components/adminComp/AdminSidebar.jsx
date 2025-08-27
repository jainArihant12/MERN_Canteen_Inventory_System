import React from 'react'
import { ChartNoAxesCombined } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingBasket, ShoppingBag } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'

const adminSideBarContent = [
  {
    id: "dashboard",
    label: "DashBoard",
    icon: <LayoutDashboard />,
    path: "/admin/dashboard"
  },
  {
    id: "product",
    label: "Product",
    icon: <ShoppingBasket />,
    path: "/admin/product"
  },
  {
    id: "order",
    label: "Order",
    icon: <ShoppingBag />,
    path: "/admin/order"
  }
]




const SideBarMenu = () => {

  const navigate = useNavigate()
  return (
    <div>
      {adminSideBarContent.map((field) => (
        <div key={field.path} className='p-2 m-4 cursor-pointer' onClick={() => { navigate(field.path) }}>
          <h3 className='flex items-center gap-3 text-black '>{field.icon} {field.label}</h3>
        </div>

      ))
      }
    </div>
  )
}

const AdminSidebar = ({ open, setOpen }) => {

  const navigate = useNavigate()

  return (
    <>
      <div className='hidden md:flex w-60 bg-gray-100 shadow-md h-screen'>
        <aside className='p-5 flex flex-col h-full'>
          <div
            onClick={() => navigate('/admin/dashboard')}
            className='cursor-pointer mb-6 flex items-center gap-3 text-2xl font-bold'
          >
            Admin Panel <ChartNoAxesCombined />
          </div>
          <SideBarMenu />
        </aside>
      </div>
      <div className='md:hidden'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side='left' className="bg-white w-[300px]">
            <aside className='p-5 flex flex-col h-full'>
              <div
                onClick={() => {
                  navigate('/admin/dashboard');
                  setOpen(false);
                }}
                className='cursor-pointer mb-6 flex items-center gap-3 text-2xl font-bold'
              >
                Admin Panel <ChartNoAxesCombined />
              </div>
              <SideBarMenu />
            </aside>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );

}

export default AdminSidebar