
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
      <p className="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
