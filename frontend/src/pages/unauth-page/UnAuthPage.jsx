import React from 'react';
import { Link } from 'react-router-dom';

const UnauthPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
      <p className="text-gray-700 text-lg mb-6">
        You don't have permission to view this page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default UnauthPage;
