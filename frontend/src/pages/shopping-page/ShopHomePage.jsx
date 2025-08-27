import HomeSlider from '@/components/shoppingComp/HomeSlider'
import React, { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
  import { Coffee, Pizza,Soup, IceCream, Leaf } from "lucide-react";
  import { PieChart, Star } from "lucide-react";
import UserProductView from '@/components/shoppingComp/UserProductView'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredProduct } from '@/Slices/shop/product-slice'
import { addToCart,fetchCartItems } from '@/Slices/shop/cart-slice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ShopHomePage = () => {

  const {productList} = useSelector(state=>state.shopProducts)
  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  


  const handleNavigateUsingCard = (getCurrentItem ,section)=>{
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section] : [getCurrentItem.id]
    }

    
    sessionStorage.setItem("filters" , JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }

  const handleAddToCart = (getProductId) => {
    
      dispatch(
        addToCart({ userId: user?.id, productId: getProductId, quantity: 1 })
      ).then((data) => {
       
        if (data?.payload?.success) {
          toast.success('Product added to cart');
          dispatch(fetchCartItems(user?.id));
        } else {
          toast.error('Failed to add product');
        }
      })
    };


  useEffect(()=>{
    dispatch(fetchFilteredProduct({filterParams:{},sortParams:'price_low_high'}))
  },[dispatch])
 


const category = [
  {
    id: "beverages",
    label: "Beverages",
    icon: <Coffee/>
  },
  {
    id: "snacks",
    label: "Snacks",
    icon: <Pizza /> 
  },
  {
    id: "main-course",
    label: "Main Course",
    icon:<Soup />
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: <IceCream/>
  },
  {
    id: "salads",
    label: "Salads",
    icon: <Leaf/>
  }
];


  const food = [
  { label: "Coca-Cola", id: "coca-cola", icon: <Coffee /> },
  { label: "Samosa", id: "samosa", icon: <Pizza/> },
  { label: "Paneer Butter Masala", id: "paneer-butter-masala", icon: <Soup /> },
  { label: "Gulab Jamun", id: "gulab-jamun", icon: <IceCream /> },
  { label: "Caesar Salad", id: "caesar-salad", icon: <Leaf /> },
  { label: "Masala Dosa", id: "masala-dosa", icon: <Star /> },
];

  return (
    <div className='bg-gray-200'>
      <div>
        <HomeSlider />
      </div>
      <div className='mt-8'>
        <div className='m-2 mt-4'>
          <h1 className='text-center text-2xl mb-3 font-semibold'>Shop By Category</h1>
          <div className="m-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" >
            {category.map((item) => (
              <Card
              onClick={()=>{handleNavigateUsingCard(item , 'category')}}
                key={item.id}
                className="bg-white flex-col items-center justify-center p-4 hover:shadow-lg transition cursor-pointer"
                style={{ 'borderRadius': '7px' }}
              >
                <CardContent className="flex flex-col items-center space-y-2 p-0">
                  <div className="text-3xl sm:text-4xl">{item.icon}</div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-700">
                    {item.label}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
         <div className='m-2 mt-4'>
          <h1 className='text-center text-2xl mb-3 font-semibold'>Shop By Food</h1>
          <div className="m-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" >
            {food.map((item) => (
              <Card
              onClick={()=>{handleNavigateUsingCard(item , 'food')}}
                key={item.id}
                className="bg-white flex flex-col items-center justify-center p-4 hover:shadow-lg transition cursor-pointer"
                style={{ 'borderRadius': '7px' }}
              >
                <CardContent className="flex flex-col items-center space-y-2 p-0">
                  <div className="text-3xl sm:text-4xl">{item.icon}</div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-700">
                    {item.label}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div>
          <h2 className='text-center text-2xl mb-3 font-semibold'>Feature Products</h2>
          <div className='m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
              productList && productList.length >0 ? productList.map(productItem => <UserProductView product={productItem} key={productItem._id} handleAddToCart={handleAddToCart}/> ):null
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default ShopHomePage