# MERN_Canteen_Inventory_System
A canteen webapp where admin can CRUD food items and manage order of user and User can also add to cart and place order . full Authentication and routing

A web-based application for managing a canteen, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).  
It allows admins to manage products and users to place orders efficiently.

## Screenshots
 ![HomepageUser](Screenshots/User_Front_Page.png)

 For full website Screenshots , [Visit Here](Screenshots/Readme.md)

## Video


## Features
- User Authentication (Sign up / Login)
- Admin Panel
  - Add, edit, delete products (CRUD)
  - View orders placed by users
- User Panel
  - Browse menu items
  - Place and track orders
- Inventory Management
  - Automatic stock update on order placement

## Tech Stack
- Frontend: React.js, HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB , Mongo Atlas
- Authentication: JWT
- Photo Storage: Cloudinary

## Project SetUp 

### 1. Clone the repository  
```bash
git clone https://github.com/jainArihant12/MERN_Canteen_Inventory_System.git
cd your-repo
```

### 2. Install dependencies
#### For Frontend
```bash
cd frontend
npm install
```
- Create .env file inside frontend folder
```bash
VITE_BACKEND_API_URL = Your own Backend Url
```
#### For Backend
```
cd server
npm install
```
- Create .env file inside server folder
```bash
MONGO_URI=Your_MongoDB_URL
PORT=Your_Port
FRONTEND_URL=Your_Frontend_URL
CLOUDINARY_CLOUD_NAME=Your_Cloudinary_Name
CLOUDINARY_API_KEY=Your_Cloudinary_API_Key
CLOUDINARY_API_SECRET=Your_Cloudinary_Secret_Key
```
### Run Project
#### Frontend
```bash
cd frontend
npm run dev
```
#### Backend
```
cd server
npx nodemon server
```
