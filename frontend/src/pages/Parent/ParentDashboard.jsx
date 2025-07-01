import React from 'react';
import { useAuth } from '../../Context/Authcontext';


const ParentDashboard = () => {
    const {userInfo} = useAuth()
  

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">

 
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {userInfo.username}</h1>
          <p className="text-gray-500">Here's what's happening with your child(ren).</p>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
        </div>

      </div>
    </div>
  );
};

export default ParentDashboard;
