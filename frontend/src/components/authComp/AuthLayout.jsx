import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
       <div className='flex flex-col md:flex-row w-full min-h-screen gap-5'>

  <div className='w-full md:w-1/2 flex justify-center items-center bg-black p-4 '>
    <h1 className='text-3xl md:text-4xl text-white text-center'>
      Welcome to Ecommerce Shopping
    </h1>
  </div>

  <div className='w-full md:w-1/2 flex justify-center items-center p-4 '>
    <Outlet />
  </div>
</div>

    )
}

export default AuthLayout