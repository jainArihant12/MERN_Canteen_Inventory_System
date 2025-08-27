import Addresses from '@/components/shoppingComp/Address/Addresses'
import UserOrder from '@/components/shoppingComp/UserOrder'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React from 'react'

const AccountPage = () => {
  return (
    <div>
      <div>

      </div>
      <div>
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-xl">
          <Tabs defaultValue="order" className="w-full">
            <TabsList className="flex justify-start gap-2 border-b border-gray-200 pb-2">
              <TabsTrigger
                value="order"
                className="px-4 py-2 rounded-md text-sm font-medium transition 
                   data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black
                   data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-black"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="px-4 py-2 rounded-md text-sm font-medium transition 
                   data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black
                   data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-black"
              >
                Address
              </TabsTrigger>
            </TabsList>

            <TabsContent value="order" className="mt-4">
              <UserOrder />
            </TabsContent>

            <TabsContent value="address" className="mt-4">
              <Addresses />
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  )
}

export default AccountPage