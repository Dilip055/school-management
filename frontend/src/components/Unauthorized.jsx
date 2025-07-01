

import React from 'react';
import { Link } from 'react-router';
import { LockKeyhole } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <LockKeyhole className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Access Denied</h1>
      <p className="text-gray-600 mb-6">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
