import { GripVertical, Mail, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import FullScreenLoader from "../components/FullScreenLoader";

const StudentTable = ({
  students,
  Classes,
  loading,
  openDropdown,
  setOpenDropdown,
  setParentModel,
  setParentFromData,
  setOpen,
  setFormData,
  setEdit,
  profile,
  setAvatar,
  setId,
  handleDelete,
}) => {
  const studentList = students.filter((student) => student.role === "student");
  return (
    <div className="w-full h-[calc(100vh-180px)] overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-max w-full table-auto text-sm border-collapse bg-white">
        <thead className="bg-blue-100 text-left text-blue-600 font-semibold">
          <tr className="text-center">
            <th className="p-3 md:p-3">SR. No.</th>
            <th className="p-3 ">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Student ID</th>
            <th className="p-3">Class</th>
            <th className="p-3">Father Name</th>
            <th className="p-3">Mother Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">DOB</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Address</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Contact</th>
            <th className="p-3 rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={14}>
                <FullScreenLoader />
              </td>
            </tr>
          ) : studentList.length == 0 ? (
            <tr>
              <td colSpan={14} className="text-center p-12 text-gray-500">
                No students found.
              </td>
            </tr>
          ) : (
            studentList.map((student, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white text-center"
              >
                <td className="p-3 font-medium text-center">{idx + 1}.</td>
                <td className="p-2 w-20">
                  <img
                    src={`http://localhost:2000/${student.profilePicture}`}
                    alt="avatar"
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-3 font-medium">{student.username}</td>
                <td className="p-3 text-orange-500 font-semibold">
                  {student.admissionNumber || "N/A"}
                </td>
                <td className="p-3">
                  {Classes.find((c) => c.id === student.classId)?.classname ||
                    "N/A"}
                </td>
                <td className="p-3">
                  {student.Parents?.[0]?.username || "N/A"}
                </td>
                <td className="p-3">
                  {student.Parents?.[0]?.motherName || "N/A"}
                </td>
                <td className="p-3 truncate max-w-[150px]">{student.email}</td>
                <td className="p-3">
                  {student.dateOfBirth
                    ? new Date(student.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-3">{student.gender || "N/A"}</td>
                <td className="p-3 truncate max-w-[150px]">
                  {student.address || "N/A"}
                </td>
                <td className="p-3">{student.phone || "N/A"}</td>
                <td className="p-3">
                  <div className="flex gap-3 justify-center text-blue-600">
                    {student.phone && (
                      <a href={`tel:${student.phone}`} title="Call">
                        <Phone className="cursor-pointer hover:text-orange-500 transition w-4" />
                      </a>
                    )}
                    {student.email && (
                      <a href={`mailto:${student.email}`} title="Email">
                        <Mail className="cursor-pointer hover:text-orange-500 transition w-4" />
                      </a>
                    )}
                  </div>
                </td>

                <td className="py-3 px-6 relative">
                  <GripVertical
                    className="cursor-pointer w-5"
                    aria-label="More actions"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === student.id ? null : student.id,
                      )
                    }
                  />
                  {openDropdown === student.id && (
                    <div className="absolute right-10 mt-2 w-40 bg-gray-100 border-2 border-gray-200 rounded shadow-md z-10">
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-300 cursor-pointer"
                        onClick={() => {
                          setParentModel(true);
                          setParentFromData((prev) => ({
                            ...prev,
                            studentId: student.id,
                          }));
                          setOpenDropdown(null);
                        }}
                      >
                        Add Parent
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-300 cursor-pointer">
                        <Link
                          to={`/admin/student/list/${student.id}`}
                          className="text-decoration-none"
                        >
                          View
                        </Link>
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-300 cursor-pointer"
                        onClick={() => {
                          setId(student.id);
                          setOpen(true);
                          setFormData({
                            username: student.username,
                            email: student.email,
                            phone: student.phone,
                            gender: student.gender,
                            dateOfBirth: student.dateOfBirth,
                            bloodGroup: student.bloodGroup,
                            classId: student.classId,
                            address: student.address,
                            profilePicture: profile,
                          });
                          setEdit(true);
                          setAvatar(
                            student.profilePicture
                              ? `http://localhost:2000/${student.profilePicture}`
                              : null,
                          );
                          setOpenDropdown(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-300 cursor-pointer"
                        onClick={() => {
                          handleDelete(student.id);
                          setOpenDropdown(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
