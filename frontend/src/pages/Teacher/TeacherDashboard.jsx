import React, { useEffect } from "react";
import { Users, BookOpen, CalendarCheck, Upload, UsersRound } from "lucide-react";
import { useAuth } from "../../Context/Authcontext";
import useClassApi from "../../hooks/useClassApi";

const TeacherDashboard = () => {
  const { userInfo } = useAuth();
  const { fetchTeacherClass, teacherClass } = useClassApi();

  useEffect(() => {
    fetchTeacherClass();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome, {userInfo?.username}!
        </h1>
        <p className="text-gray-600 mt-1">Here’s your teaching dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <BookOpen className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Class</p>
            <h2 className="text-lg font-semibold">{teacherClass?.classname || "No Class Assigned"}</h2>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <Users className="text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Total Students</p>
            <h2 className="text-lg font-semibold">
              {teacherClass?.students?.length || 0}
            </h2>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <CalendarCheck className="text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Class Section</p>
            <h2 className="text-lg font-semibold">
              {teacherClass?.section || "-"}
            </h2>
          </div>
        </div>
      
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        
        {teacherClass?.students && teacherClass.students.length > 0 ? (
          <>
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
        <UsersRound className="text-blue-500 w-5 me-1"/> Students in {teacherClass?.classname || "your class"}
        </h2>
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto rounded-lg shadow-lg">
              <thead className="bg-blue-100 text-blue-700 text-sm">
                <tr>
                  <th className="px-4 py-2 text-left ">Sr. No.</th>
                  <th className="px-4 py-2 text-left ">Student's Name</th>
                </tr>
              </thead>
              <tbody>
                {teacherClass.students.map((student, idx) => (
                  <tr
                    key={student.id}
                    className={`text-gray-800 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{student.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
          
        ) : (
          <p className="text-gray-600 text-center py-10">No students found in this class.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
