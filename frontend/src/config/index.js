import React from "react";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormControls = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter Product Title",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter product description",
    componentType: "textarea",
    required: true,
  },
  {
  name: "category",
  label: "Category",
  componentType: "select",
  options: [
    { label: "Beverages", value: "beverages" },
    { label: "Snacks", value: "snacks" },
    { label: "Main Course", value: "main-course" },
    { label: "Desserts", value: "desserts" },
    { label: "Salads", value: "salads" },
  ],
  placeholder: "Select a category",
  required: true,
},
{
  name: "food",
  label: "Food",
  componentType: "select",
  options: [
    { label: "Coca-Cola", value: "coca-cola" },
    { label: "Samosa", value: "samosa" },
    { label: "Paneer Butter Masala", value: "paneer-butter-masala" },
    { label: "Chicken Biryani", value: "chicken-biryani" },
    { label: "Gulab Jamun", value: "gulab-jamun" },
    { label: "Caesar Salad", value: "caesar-salad" },
    { label: "Masala Dosa", value: "masala-dosa" },
  ],
  placeholder: "Select a food item",
  required: true,
},
  {
    name: "price",
    label: "Price",
    type: "decimal",
    placeholder: "Enter your price",
    componentType: "input",
    required: true,
  },
  {
    name: "salePrice",
    label: "Sale Price",
    type: "decimal",
    placeholder: "Enter sale price",
    componentType: "input",
    required: true,
  },
  {
    name: "totalStock",
    label: "Total Stock",
    type: "number",
    placeholder: "Enter total stock quantity",
    componentType: "input",
    required: true,
  },
];

export const shoppingViewHeaderMenuItems = [
  {
  id: "home",
  label: "Home",
  path: "/shop/home",
},
{
  id: "beverages",
  label: "Beverages",
  path: "/shop/listing",
},
{
  id: "snacks",
  label: "Snacks",
  path: "/shop/listing",
},
{
  id: "main-course",
  label: "Main Course",
  path: "/shop/listing",
},
{
  id: "desserts",
  label: "Desserts",
  path: "/shop/listing",
},
{
  id: "salads",
  label: "Salads",
  path: "/shop/listing",
}

];

export const filterOptions = {
  category: [
    { id: "beverages", label: "Beverages" },
    { id: "snacks", label: "Snacks" },
    { id: "main-course", label: "Main Course" },
    { id: "desserts", label: "Desserts" },
    { id: "salads", label: "Salads" },
  ],
  food: [
    { label: "Coca-Cola", id: "coca-cola" },
    { label: "Samosa", id: "samosa" },
    { label: "Paneer Butter Masala", id: "paneer-butter-masala" },
    { label: "Chicken Biryani", id: "chicken-biryani" },
    { label: "Gulab Jamun", id: "gulab-jamun" },
    { label: "Caesar Salad", id: "caesar-salad" },
    { label: "Masala Dosa", id: "masala-dosa" },
  ]
};

export const sortOptions = [
  { id: 'price_low_high', label: 'Price: Low to High' },
  { id: 'price_high_low', label: 'Price: High to Low' },
  { id: 'name_asc', label: 'Name: A to Z' },
  { id: 'name_desc', label: 'Name: Z to A' }
]


export const formControlsShopAddress = [
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    placeholder: 'Enter your address',
    componentType: 'input',  // Can be 'input', 'textarea', etc.
    required: true
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter your city',
    componentType: 'input',
    required: true
  },
  {
    name: 'pincode',
    label: 'Pincode',
    type: 'text',
    placeholder: 'Enter your pincode',
    componentType: 'input',
    required: true
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'number',
    placeholder: 'Enter your phone number',
    componentType: 'input',
    required: true
  },
  {
    name: 'notes',
    label: 'Notes',
    type: 'text',
    placeholder: 'Any additional notes',
    componentType: 'textarea',
    required: false
  }
];


export const formControlForStatus = [
  {
    name: "status",
    label: "Status",
    componentType: "select",
    options: [
      { label: "Pending", value: "pending" },
      { label: "In Process", value: "inProcess" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
      { label: "Cancelled", value: "cancelled" },
    ],
    placeholder: "Select order status",
    required: true,
  }
];
