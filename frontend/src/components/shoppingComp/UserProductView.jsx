import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from 'lucide-react'
import { Button } from '../ui/button'


const UserProductView = ({ product , handleGetProductDetails ,handleAddToCart}) => {

  
  const calculateDiscount = () => {
    if (product?.salePrice && product?.salePrice < product?.price) {
      const discount = ((product.price - product.salePrice) / product.price) * 100;
      return Math.round(discount); // rounded percentage
    }
    return null;
  };

 
  const discount = calculateDiscount();

   const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
   <Card className="bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg">
  <div className="flex flex-col gap-4 p-4">
    
    {/* Image Section Clickable */}
    <div
      onClick={() => handleGetProductDetails(product?._id)}
      className="w-full relative cursor-pointer"
    >
      <img
        src={product?.image}
        alt={product?.title}
        className="w-full h-64 object-cover rounded-xl"
      />
      {discount && (
        <div className="absolute top-2 left-2">
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-xl">
            {discount}% OFF
          </span>
        </div>
      )}
    </div>

    {/* Content Section */}
    <div className="w-full flex flex-col justify-between">
      <CardContent className="p-0 space-y-2">
        {/* Title Clickable */}
        <h2
          onClick={() => handleGetProductDetails(product?._id)}
          className="text-xl font-semibold cursor-pointer hover:text-blue-600"
        >
          {product?.title}
        </h2>

        <div className="text-gray-500 text-sm space-x-4 flex justify-between">
          <span>{capitalizeFirst(product?.category)}</span>
          <span>{capitalizeFirst(product?.brand)}</span>
        </div>

        <div className="flex items-center space-x-3 mt-2">
          {product?.salePrice > 0 ? (
            <>
              <span className="text-lg font-bold text-green-600">
                ₹{product?.salePrice}
              </span>
              <span className="line-through text-gray-400">
                ₹{product?.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">₹{product?.price}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-4 p-0">
        <Button
          onClick={(e) => {
            e.stopPropagation(); // prevent accidental card click
            handleAddToCart(product._id); // your add to cart logic
          }}
          className="w-full md:w-auto bg-gray-900 hover:bg-gray-700 text-white"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </div>
  </div>
</Card>

  );
}

export default UserProductView