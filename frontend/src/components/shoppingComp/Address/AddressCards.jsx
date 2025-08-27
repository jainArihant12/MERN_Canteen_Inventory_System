import { CardContent,Card } from '@/components/ui/card'
import { deleteAddress } from '@/Slices/shop/address-slice';
import { Label } from '@radix-ui/react-label'
import React from 'react'

const AddressCards = ({ addressInfo ,handleDelete,handleEdit }) => {


  
  return (
    <Card className="w-full bg-white border border-gray-200 shadow-md rounded-xl mb-4">
  <CardContent className="p-4 space-y-4 text-sm text-gray-800">
    {[
      { label: "Address", value: addressInfo?.address },
      { label: "City", value: addressInfo?.city },
      { label: "Pincode", value: addressInfo?.pincode },
      { label: "Phone", value: addressInfo?.phone },
      { label: "Notes", value: addressInfo?.notes || "N/A" },
    ].map((item, index) => (
      <div key={index} className="flex flex-col sm:flex-row sm:items-center">
        <Label className=" font-bold w-full sm:w-28 text-gray-700 mb-1 sm:mb-0">
          {item.label}:
        </Label>
        <span className="text-gray-900">{item.value}</span>
      </div>
    ))}
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
      <div className="flex space-x-2">
        <button 
          className="px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-700 transition"
          onClick={() => handleEdit(addressInfo)}
        >
          Edit
        </button>
        <button 
          className="px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-700 transition"
          onClick={() => handleDelete(addressInfo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  </CardContent>
</Card>


  );
};


export default AddressCards