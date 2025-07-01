import React, { useMemo, useState } from 'react';
import TeacherFormModal from '../../components/TeacherFromModal';
import useUserApi from '../../hooks/useUserApi';
import useSubjectApi from '../../hooks/useSubjectApi';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
import { GripVertical, Search } from 'lucide-react';
import FullScreenLoader from '../../components/FullScreenLoader';

const ManageTeacher = () => {
  const { users, loading, handleAddTeacher, handleEditUser, handleDelete, credentials } = useUserApi();
  const { subjects } = useSubjectApi();

  const [teacherModel, setTeacherModel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [teacherInfo, setTeacherInfo] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherAvatar, setTeacherAvatar] = useState(null);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState({});

  const [teacherData, setTeacherData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    qualification: "",
    subjectsTaught: [],
    joiningDate: "",
    salary: "",
    profilePicture: null,
  });

  const closeTeacherModal = () => {
    setTeacherModel(false);
  };

  const handleTeacherDataChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeacherFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeacherAvatar(URL.createObjectURL(file));
      setTeacherProfile(file);
      setTeacherData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleTeacherSelectedDataChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setTeacherData({ ...teacherData, subjectsTaught: selectedValues });
  };

  const validateTeacherForm = () => {
    const newErrors = {};
    if (teacherData.username.trim().length < 3) newErrors.teacherNameErr = "Name must be at least 3 characters.";
    if (teacherData.qualification.trim().length < 3) newErrors.qualificationErr = "Qualification is required.";
    if (!teacherData.subjectsTaught.length) newErrors.subjectsTaughtErr = "Please select at least one subject.";
    if (teacherData.joiningDate.trim().length < 3) newErrors.joiningDateErr = "Joining Date is required.";
    if (!teacherData.salary) newErrors.salaryErr = "Salary is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacherData.email)) newErrors.teacherEmailErr = "Invalid email.";
    if (!/^[0-9]{10}$/.test(teacherData.phone)) newErrors.teacherPhoneErr = "Invalid phone number.";
    if (!teacherData.address) newErrors.teacherAddressErr = "Address is required.";
    if (!isEditMode && !teacherData.profilePicture) newErrors.teacherFileErr = "Please upload a profile picture.";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditTeacher = (teacher) => {
    setIsEditMode(true);
    setTeacherId(teacher.id);
    setTeacherModel(true);

    if (teacher.profilePicture) {
      setTeacherAvatar(`http://localhost:2000/${teacher.profilePicture}`);
    }

    setTeacherData({
      username: teacher.username || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      qualification: teacher.qualification || "",
      subjectsTaught: teacher.subjectsTaught?.split(",") || [],
      joiningDate: teacher.joiningDate || "",
      salary: teacher.salary || "",
      address: teacher.address || "",
      profilePicture: teacher.profilePicture || null,
    });

    setOpenDropdown(null);
  };

const handleSubmitTeacher = async (e) => {
  e.preventDefault();

  if (!validateTeacherForm()) {
    
    return;
  }

  try {
    const formData = new FormData();
    formData.append("profilePicture", teacherProfile);
    formData.append("username", teacherData.username);
    formData.append("email", teacherData.email);
    formData.append("phone", teacherData.phone);
    formData.append("address", teacherData.address);
    formData.append("qualification", teacherData.qualification);
    formData.append("subjectsTaught", teacherData.subjectsTaught.join(","));
    formData.append("joiningDate", teacherData.joiningDate);
    formData.append("salary", teacherData.salary);
    formData.append("role", "teacher");

    if (teacherId && isEditMode) {
      const { success, data, error } = await handleEditUser(teacherId, formData);
      if (success) {
        Swal.fire({
          icon: "success",
          text: data,
          confirmButtonColor: "#f97316",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: error,
          text: "Something went wrong!",
        });
      }
    } else {
      const { success, data, error } = await handleAddTeacher(formData);
      if (success) {
        Swal.fire({
          icon: "success",
          text: data,
          confirmButtonColor: "#f97316",
        });
        setTeacherInfo(true);
      } else {
        Swal.fire({
          icon: "error",
          title: error,
          text: "Something went wrong!",
        });
      }
    }

    setTeacherModel(false);
    setTeacherAvatar(null);
    setTeacherProfile(null);
    setTeacherData({
      username: "",
      email: "",
      phone: "",
      gender: "",
      qualification: "",
      subjectsTaught: [],
      joiningDate: "",
      salary: "",
      address: "",
      profilePicture: null,
    });

    closeTeacherModal();
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: err?.response?.data?.message || "Error",
      text: "Something went wrong. Please try again.",
    });
  }
};

const handleTeacherDelete = async (id) => {
  const { success, data, error } = await handleDelete(id);
  if (success) {
    Swal.fire({
      icon: "success",
      text: data,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: error,
      text: "Something went wrong!",
    });
  }
};


  const FilteredTeacherData = useMemo(() => {
    let filtered = users?.filter(user => user.role === "teacher") || [];
    if (searchTerm.trim()) {
      filtered = filtered.filter(teacher =>
        teacher.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [searchTerm, users]);

  return (
    <>
      <div className="p-4">
        <div className="flex md:flex-row flex-col gap-3 justify-between items-center mb-4 md:px-4 md:py-4 py-4 px-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 border border-gray-200 bg-gray-100 rounded px-3 py-2 md:w-1/3 w-full">
            <Search />
            <input
              type="text"
              placeholder="Search Teacher Name..."
              className="outline-none bg-transparent w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          <button
            onClick={() => {
              setTeacherModel(true);
              setIsEditMode(false);
            }}
            className="w-full md:w-1/5 lg:w-1/5 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded hover:from-blue-700 hover:to-purple-700 transition duration-150"
          >
            + Add Teacher
          </button>
        </div>

        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="min-w-max w-full table-auto text-sm border-collapse bg-white">
            <thead className="bg-blue-100 text-left text-blue-600">
              <tr className="text-center">
                <th className="p-3">Sr. No.</th>
                <th className="p-3">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Qualification</th>
                <th className="p-3">Subjects</th>
                <th className="p-3">Joining Date</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
               <tr>
                <td colSpan="11" className="text-center py-12 text-gray-500">
                   <FullScreenLoader />
                </td>
               </tr>
              ) : FilteredTeacherData.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center py-10 text-gray-500">
                    No teachers found.
                  </td>
                </tr>
              ) : (
                FilteredTeacherData.map((teacher, idx) => (
                  <tr key={teacher.id} className="text-center hover:bg-gray-50 even:bg-gray-100">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">
                      <img
                        src={`http://localhost:2000/${teacher.profilePicture}`}
                        alt="Teacher"
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="p-3">{teacher.username}</td>
                    <td className="p-3">{teacher.qualification}</td>
                    <td className="p-3">{teacher.subjectsTaught || 'N/A'}</td>
                    <td className="p-3">{teacher.joiningDate || 'N/A'}</td>
                    <td className="p-3">₹{teacher.salary}</td>
                    <td className="p-3">{teacher.email}</td>
                    <td className="p-3">{teacher.phone}</td>
                    <td className="p-3">{teacher.address}</td>
                    <td className="py-3 px-4 relative">
                      <GripVertical
                        className="cursor-pointer w-5"
                        onClick={() => setOpenDropdown(openDropdown === teacher.id ? null : teacher.id)}
                      />
                      {openDropdown === teacher.id && (
                        <div className="absolute right-4 top-10 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => handleEditTeacher(teacher)}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                            onClick={() => {
                              handleTeacherDelete(teacher.id);
                              
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
      </div>

      <TeacherFormModal
        open={teacherModel}
        isEditMode={isEditMode}
        handleTeacherSelectedDataChange={handleTeacherSelectedDataChange}
        subjects={subjects}
        closeTeacherModal={closeTeacherModal}
        teacherData={teacherData}
        handleTeacherDataChange={handleTeacherDataChange}
        handleTeacherFileChange={handleTeacherFileChange}
        teacherAvatar={teacherAvatar}
        handleSubmit={handleSubmitTeacher}
        error={error}
        setError={setError}
      />

      {teacherInfo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[500px] text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Teacher Created Successfully</h2>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {credentials.email}
            </p>
            <p className="text-lg mb-4">
              <strong>Password:</strong> {credentials.password}
            </p>
            <button
              onClick={() => setTeacherInfo(false)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageTeacher;
