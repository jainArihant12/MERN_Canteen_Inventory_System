import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { House, SquareMenu, ShoppingCart, UserRound, LogOut } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { shoppingViewHeaderMenuItems } from '@/config'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/Slices/auth-slice'
import { useState } from 'react'
import ShopCartSheet from './ShopCartSheet'
import { fetchCartItems } from '@/Slices/shop/cart-slice'


const MenuItems = () => {

  const navigate = useNavigate()

  const handleNavigate = (menuItem) => {
  if (!menuItem.path) return;

  // Remove old filters
  sessionStorage.removeItem('filters');

  if (menuItem.id && menuItem.id !== 'home') {
    // Also store category in sessionStorage if you still need it elsewhere
    sessionStorage.setItem(
      'filters',
      JSON.stringify({ category: [menuItem.id] })
    );

    // Navigate with category in query string
    navigate(`${menuItem.path}?category=${encodeURIComponent(menuItem.id)}`);
  } else {
    navigate(menuItem.path);
  }
};



  return (
    <nav className="flex flex-col gap-4 p-4 lg:flex-row lg:gap-6">
      {shoppingViewHeaderMenuItems.map(menuItem => (
        <Button
          key={menuItem.id}
          onClick={() => { handleNavigate(menuItem) }}
          className="p-0 text-sm font-medium text-gray-700 hover:text-black transition-colors"
        >
          {menuItem.label}
        </Button>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {

  const [openCart, setOpenCart] = useState(false)
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shopCart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  },
    [dispatch])

  return (
    <div className="flex items-center gap-4">
      {/* Shopping Cart Button */}
      <Sheet open={openCart} onOpenChange={() => { setOpenCart(false) }}>
        <Button
          className="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="User Cart"
          onClick={() => setOpenCart(true)}
        >
          <ShoppingCart className="h-6 w-6 text-black" />
          <span className="sr-only">User Cart</span>
        </Button>
        <ShopCartSheet cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} setOpenCart={setOpenCart} />
      </Sheet>

      {/* User Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-green-600 cursor-pointer hover:opacity-90 transition-opacity">
            <AvatarFallback className="text-white font-bold">
              {user?.userName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          className="w-60 bg-white rounded-lg shadow-lg border p-2 flex flex-col gap-1 z-50"
        >
          <DropdownMenuLabel className="text-sm text-gray-700 px-3 py-1.5">
            Logged in as <span className="font-medium">{user.userName}</span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate('/shop/account')}
            className="cursor-pointer px-3 py-2 flex items-center gap-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            <UserRound className="h-5 w-5 text-gray-700" />
            <span className="text-sm">Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>

      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {




  return (
    <header className="w-full h-14 z-40 bg-white border-b shadow-sm flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/shop/home" className="flex items-center gap-2 text-xl font-semibold text-black">
          <House className="h-6 w-6" />
          <span>Canteen</span>
        </Link>

        {/* Mobile Menu (hidden on large screens) */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="flex items-center rounded-lg">
                <SquareMenu className="h-5 w-5" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-white">
              <MenuItems />
              <HeaderRightContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;

