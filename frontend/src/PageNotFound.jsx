import React from 'react';
import { Link } from 'react-router';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-purple-700 via-indigo-800 to-blue-900 px-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-10 max-w-md w-full text-center shadow-lg">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 select-none">
          404
        </h1>
        <h2 className="mt-6 text-4xl font-bold text-white">
          Oops! Page Not Found
        </h2>
        <p className="mt-4 text-lg text-purple-200">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;

