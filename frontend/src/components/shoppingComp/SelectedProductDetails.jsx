import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const SelectedProductDetails = ({open ,setOpen , productDetail}) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="bg-white p-4 sm:p-6 w-full max-w-sm sm:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl">
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img 
          src={productDetail?.image} 
          alt={productDetail?.title} 
          className="w-full max-w-xs rounded-xl object-cover" 
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-2">
            {productDetail?.title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            {productDetail?.description}
          </p>
        </div>

        {/* Price Section */}
        <div>
          <span className="text-green-600 font-bold text-base sm:text-lg">
            ₹{productDetail?.price}
          </span>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>

    </>
  )
}

export default SelectedProductDetails