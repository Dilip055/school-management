import React, { useEffect, useState } from "react";
import useAttendanceApi from "../../hooks/useAttendenceApi";
import useClassApi from "../../hooks/useClassApi";
import { BookCopy, Users, CheckCircle, XCircle } from "lucide-react";
import Swal from "sweetalert2";

const ManageStudentAttendence = () => {
  const { markBulkAttendance } = useAttendanceApi();
  const { teacherClass, fetchTeacherClass } = useClassApi();

  const [students, setStudents] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchTeacherClass();
  }, []);

  useEffect(() => {
    if (teacherClass?.students && date) {
      const initialized = teacherClass.students.map((student) => ({
        ...student,
      }));
      setStudents(initialized);
    }
  }, [teacherClass, date]);

  const handleInput = (id, field, value) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSubmit = async () => {
    if (!date) return;
    if(students.some((s)=>!s.status)){
      Swal.fire({
        icon: "error",
        title: "Please Select student",
        text: "Something went wrong!",
      })
    }else{
      const {error, success, data} =  await markBulkAttendance(
        teacherClass.id,
        date,
        students.map((s) => ({
          studentId: s.id,
          status: s.status,
        }))
      )
      if(success){
        Swal.fire({
          icon: "success",
          text: data,
          confirmButtonText: "OK",
          confirmButtonColor: "#f97316",
      customClass: {
        popup: 'swal-small-popup',
        title: 'swal-small-title',
        text: 'swal-small-text',
        confirmButton: 'swal-small-btn',
      }
        })
      }else{
        Swal.fire({
          icon: "error",
          title: error,
          text: "Something went wrong!",
        })
      }
    }
  
    
  };

  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2">
      <div className="">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl md:text-3xl flex items-center gap-2">
                <BookCopy /> Manage Attendance
              </h2>
              <p className="text-gray-500">Track student presence efficiently</p>
            </div>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-4 md:mt-0 border border-gray-200 bg-gray-100 px-4 py-2 rounded focus:ring-indigo-500"
            />
          </div>
          {date && students.length > 0 && (
          <div className="bg-white mt-5">
            <div className="flex flex-wrap justify-between items-center text-gray-700">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Total Students: {students.length}</span>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center text-green-600 gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Present: {presentCount}</span>
                </div>
                <div className="flex items-center text-red-600 gap-2">
                  <XCircle className="w-5 h-5" />
                  <span>Absent: {absentCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>


    

 
        {date && students.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md">
            <table className="w-full text-sm table-auto">
              <thead className="bg-blue-100 text-blue-700">
                <tr>
                  <th className="text-left px-6 py-4">Sr.No.</th>
                  <th className="text-left px-6 py-4">Student Name</th>
                  <th className="text-left px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, index) => (
                  <tr
                    key={s.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 font-medium text-gray-800 text-center">
                     
                        <p className="bg-blue-100 w-10 h-10 text-center leading-10 rounded-full">{index + 1}</p>

                    </td>
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {s.username}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-3">
                        <label
                          className={`flex items-center px-3 py-1 rounded-xl cursor-pointer ${
                            s.status === "present"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`status-${s.id}`}
                            value="present"
                            checked={s.status === "present"}
                            onChange={(e) =>
                              handleInput(s.id, "status", e.target.value)
                            }
                            className="sr-only"
                          />
                          <CheckCircle className="w-4 h-4 mr-1" />
                          p
                        </label>

                        <label
                          className={`flex items-center px-3 py-1 rounded-xl cursor-pointer ${
                            s.status === "absent"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`status-${s.id}`}
                            value="absent"
                            checked={s.status === "absent"}
                            onChange={(e) =>
                              handleInput(s.id, "status", e.target.value)
                            }
                            className="sr-only"
                          />
                          <XCircle className="w-4 h-4 mr-1" />
                          A
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

  
            <div className="text-right mt-6 p-2">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white md:px-4 md:py-2 py-2 px-3 rounded cursor-pointer font-medium transition"
              >
                Submit Attendance
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white text-center p-12 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Select a Date
            </h3>
            <p className="text-gray-600">
              Please select a date to mark attendance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudentAttendence;
