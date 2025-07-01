import React, { useState } from "react";
import useClassApi from "../../hooks/useClassApi";
import {
  BookAIcon,
  BookCopy,
  BookOpen,
  BookOpenCheck,
  Building,
  DoorClosed,
  DoorOpen,
  GraduationCap,
  GripVertical,
  House,
  School,
  Search,
  User,
  Users2,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import useUserApi from "../../hooks/useUserApi";
import FullScreenLoader from "../../components/FullScreenLoader";

const ManageClasses = () => {
  const {
    loading,
    handleAddClass,
    Classes,
    handleDelete,
    handleEditClass,
    handleAssignClassTeacher,
  } = useClassApi();
  const { users } = useUserApi();

  const [classesModel, setClassesModel] = useState(false);
  const [assignTeacherModel, setAssignTeacherModel] = useState(false);
  const [edit, setEdit] = useState(false);
  const [classId, setClassId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [formData, setFormData] = useState({
    classname: "",
    section: "",
    roomNumber: "",
  });

  const [assignTeacherData, setAssignTeacherData] = useState({
    classId: "",
    teacherId: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeacherAssignChange = (e) => {
    const { name, value } = e.target;
    setAssignTeacherData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.classname) newErrors.classname = "Class name is required";
    if (!formData.section) newErrors.section = "Section is required";
    if (!formData.roomNumber) newErrors.roomNumber = "Room number is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = classId
      ? await handleEditClass(classId, formData)
      : await handleAddClass(formData);

    if (response.success) {
      Swal.fire({
        icon: "success",
        text: response.data,
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          text: "swal-small-text",
          confirmButton: "swal-small-btn",
        },
      });
      setClassesModel(false);
      setFormData({ classname: "", section: "", roomNumber: "" });
      setEdit(false);
      setClassId(null);
    } else {
      Swal.fire({
        icon: "error",
        title: response.error,
        text: "Something went wrong!",
      });
    }
  };

  const handleClassDelete = async (id) => {
    const { success, error, data } = await handleDelete(id);
    setOpenDropdown(null);
    if (success) {
      Swal.fire({
        icon: "success",
        text: data,
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          text: "swal-small-text",
          confirmButton: "swal-small-btn",
        },
      });
    } else {
      Swal.fire({ icon: "error", title: error, text: "Something went wrong!" });
    }
  };

  const handleClassTeacher = async (e) => {
    e.preventDefault();
    const classTeacherData = new FormData();
    classTeacherData.append("classId", assignTeacherData.classId);
    classTeacherData.append("teacherId", assignTeacherData.teacherId);

    const { success, error, data } = await handleAssignClassTeacher(
      classTeacherData
    );
    if (success) {
      Swal.fire({
        icon: "success",
        text: data,
        confirmButtonColor: "#f97316",
      });
      setAssignTeacherModel(false);
      setAssignTeacherData({ classId: "", teacherId: "" });
    } else {
      Swal.fire({ icon: "error", title: error, text: "Something went wrong!" });
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-4 md:px-4 md:py-4 py-4 px-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 border-1 border-gray-200 bg-gray-100 rounded px-3 py-2 md:w-1/3 w-full">
            <Search />
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none bg-transparent w-full"
            />
          </div>
          <button
            onClick={() => {
              setClassesModel(true);
              setEdit(false);
              setFormData({ classname: "", section: "", roomNumber: "" });
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded md:w-1/3 lg:w-1/5 xl:w-1/9 w-full"
          >
            + New Class
          </button>
        </div>

        <div className="overflow-auto rounded-lg shadow bg-white">
          <table className="w-full text-sm table-auto">
            <thead className="bg-blue-100 text-blue-600 font-semibold text-center">
              <tr>
                <th className="p-3">Sr. No.</th>
                <th className="p-3">Class Name</th>
                <th className="p-3">Section</th>
                <th className="p-3">Room Number</th>
                <th className="p-3">Class Teacher</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">
                    <FullScreenLoader />
                  </td>
                </tr>
              ) : Classes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    No classes found.
                  </td>
                </tr>
              ) : (
                Classes.map((cls, i) => (
                  <tr
                    key={cls.id}
                    className="text-center hover:bg-gray-50 even:bg-gray-100 odd:bg-white"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{cls.classname}</td>
                    <td className="p-3">{cls.section}</td>
                    <td className="p-3">{cls.roomNumber}</td>
                    <td className="p-3">
                      {users.find((u) => u.id === cls.teacherId)?.username ||
                        "Not Assigned"}
                    </td>
                    <td className="relative py-3 ps-5 lg:ps-18">
                      <GripVertical
                        className="cursor-pointer w-5"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === cls.id ? null : cls.id
                          )
                        }
                      />
                      {openDropdown === cls.id && (
                        <div className="absolute right-10 lg:right-22 mt-2 w-44 bg-gray-100 rounded shadow-md z-10">
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-200"
                            onClick={() => {
                              setAssignTeacherModel(true);
                              setAssignTeacherData({
                                classId: cls.id,
                                teacherId: "",
                              });
                            }}
                          >
                            Assign Class Teacher
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-200"
                            onClick={() => {
                              setClassesModel(true);
                              setEdit(true);
                              setClassId(cls.id);
                              setFormData({
                                classname: cls.classname,
                                section: cls.section,
                                roomNumber: cls.roomNumber,
                              });
                            }}
                          >
                            Edit Class
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                            onClick={() => handleClassDelete(cls.id)}
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
      </div>

      {classesModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-3xl  w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4  bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl px-5 py-6">
              <h3 className="text-lg font-text-lg sm:text-2xl font-semibold text-white flex items-center gap-2">
                <Building />
                {edit ? "Edit Class" : "Add New Class"}
              </h3>
              <X
                className="cursor-pointer hover:bg-white/20 rounded-lg transition-colors text-white"
                onClick={() => {
                  setClassesModel(false);
                  setError({});
                }}
              />
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 p-6">
              <div>
                <label
                  htmlFor="classname"
                  className="block text-medium font-medium text-gray-700 mb-1 "
                >
                  <School className="float-left w-5 me-1 text-blue-600" /> Class
                  Name
                </label>
                <input
                  name="classname"
                  value={formData.classname}
                  onChange={handleChange}
                  placeholder="Class Name"
                  className="mb-0 w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
                {error.classname && (
                  <p className="text-red-500 text-sm">{error.classname}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="section"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <BookOpen className="float-left w-5 me-1 text-blue-600" />{" "}
                  Section
                </label>
                <input
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="Section"
                  className="mb-0 w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
                {error.section && (
                  <p className="text-red-500 text-sm">{error.section}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="roomNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <DoorOpen className="float-left w-5 me-1 text-blue-600" />{" "}
                  Room Number
                </label>
                <input
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  placeholder="Room Number"
                  className="mb-0 w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
                {error.roomNumber && (
                  <p className="text-red-500 text-sm">{error.roomNumber}</p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded hover:bg-blue-700 "
                >
                  {edit ? "Update Class" : "Create Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



{assignTeacherModel && (
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
    <div className="bg-white w-[95%] max-w-md rounded-2xl overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 flex items-center justify-between">
        <h2 className="text-white text-lg font-semibold flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Assign Class Teacher
        </h2>
        <X
          className="w-5 h-5 text-white cursor-pointer"
          onClick={() => setAssignTeacherModel(false)}
        />
      </div>

      <form
        onSubmit={handleClassTeacher}
        className="bg-white p-5 space-y-4 text-sm"
      >
        <div>
          <label className=" font-medium text-gray-700 mb-1 flex items-center gap-1">
            <BookOpenCheck className="w-4 h-4 text-purple-600" />
            Select Class
          </label>
          <select
            name="classId"
            value={assignTeacherData.classId}
            onChange={handleTeacherAssignChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">-- Select Class --</option>
            {Classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.classname}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className=" font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Users2 className="w-4 h-4 text-purple-600" />
            Select Teacher
          </label>
          <select
            name="teacherId"
            value={assignTeacherData.teacherId}
            onChange={handleTeacherAssignChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">-- Select Teacher --</option>
            {users
              .filter((u) => u.role === "teacher")
              .map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.username}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white py-2 rounded-lg font-medium transition duration-150"
        >
          Assign Teacher
        </button>
      </form>
    </div>
  </div>
)}

    </>
  );
};

export default ManageClasses;
