import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
const AdminProductView = ({product ,setOpenProduct, setFormData ,setCurrentEditId ,handleDelete}) => {

  
  
  return (
    <Card className="max-w-sm w-full shadow-lg rounded-2xl overflow-hidden border">
  <div className="flex flex-col">
    <div className="w-full h-64 overflow-hidden">
      <img
        src={product?.image}
        alt={product?.title}
        className="w-full h-full object-cover"
      />
    </div>

    <CardContent className="p-4 space-y-2">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{product?.title}</h2>
      <div className="flex items-center gap-3">
        <span className={`text-lg font-medium ${product?.salePrice > 0 ? 'line-through text-gray-500' : 'text-black'}`}>
          ₹{product?.price}
        </span>
        {product?.salePrice > 0 && (
          <span className="text-lg font-semibold text-green-600">
            ₹{product?.salePrice}
          </span>
        )}
      </div>
    </CardContent>

    <CardFooter className="flex justify-between px-4 pb-4">
      <Button className="bg-black text-white hover:bg-gray-800 transition rounded-xl" onClick={()=>{
        setOpenProduct(true)
        setCurrentEditId(product._id)
        setFormData(product)
      }}>Edit</Button>
      <Button className="bg-black text-white hover:bg-gray-800 transition rounded-xl"
        onClick={()=>{
          handleDelete(product?._id)
        }}      
      >Delete</Button>
    </CardFooter>
  </div>
</Card>

  )
}

export default AdminProductView