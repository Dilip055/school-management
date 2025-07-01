import React, { useEffect } from "react";
import { CalendarCheck, CalendarSync, CreditCard } from "lucide-react";
import {useAuth} from '../../Context/Authcontext'
import useEventApi from "../../hooks/useEventApi";
import useInvoiceApi from "../../hooks/useInvoiceApi";
import useStudyMeterialApi from "../../hooks/useStudyMeterialApi";
const StudentDashboard = () => {
  const today = new Date().toLocaleDateString();
  const {userInfo} = useAuth()
  const {Events} = useEventApi()
  const {studentClassMeterial} = useStudyMeterialApi()

  const { getStudentInvoices, invoice } = useInvoiceApi();
 useEffect(()=>{
  if(userInfo?.id){
    getStudentInvoices(userInfo?.id)
  }

 },[])
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome, {userInfo?.username || "Student"}
        </h2>
        <p className="text-gray-600">Here's what's happening today: {today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-5 flex items-center">
          <CalendarCheck className="text-green-600 mr-4" size={32} />
          <div>
            <p className="text-sm text-gray-500">Study Meterial</p>
            <p className="text-xl font-bold text-gray-800">{studentClassMeterial.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center">
          <CalendarSync className="text-blue-600 mr-4" size={32} />
          <div>
            <p className="text-sm text-gray-500">New Events</p>
            <p className="text-xl font-bold text-gray-800">{Events.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center">
          <CreditCard className="text-yellow-600 mr-4" size={32} />
          <div>
            <p className="text-sm text-gray-500">Fee Due</p>
            <p className="text-xl font-bold text-gray-800">{invoice?.invoices?.map(inv => inv.status || "No Fee Assigned") }</p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default StudentDashboard;
