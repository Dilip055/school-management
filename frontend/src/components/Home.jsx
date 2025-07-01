import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden">
    
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
       
        <Navbar />

       
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 md:p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
