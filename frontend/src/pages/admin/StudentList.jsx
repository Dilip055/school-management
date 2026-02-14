import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import StudentTable from "../../components/StudentTable";
import StudentFormModal from "../../components/StudentFromModal";
import ParentFormModal from "../../components/ParentFormModal";
import useUserApi from "../../hooks/useUserApi";
import useClassApi from "../../hooks/useClassApi";
import { Search } from "lucide-react";

const StudentList = () => {
  const { Classes } = useClassApi();
  const {
    users,
    loading,
    handleEditUser,
    handleDelete,
    handleAddUser,
    credentials,
  } = useUserApi();

  const [avatar, setAvatar] = useState(null);
  const [parentAvatar, setParentAvatar] = useState(null);
  const [profile, setProfile] = useState(null);
  const [parentProfile, setParentProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [studentInfo, setStudentInfo] = useState(false);
  const [parentModel, setParentModel] = useState(false);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState({});

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    classId: "",
    address: "",
    profilePicture: null,
  });

  const [parentFromData, setParentFromData] = useState({
    username: "",
    email: "",
    motherName: "",
    studentId: "",
    phone: "",
    address: "",
    occupation: "",
    relationType: "",
    profilePicture: null,
  });

  const validateStudentForm = () => {
    const newErrors = {};
    if (formData.username.trim().length < 3)
      newErrors.nameErr = "Name must be at least 3 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.emailErr = "Please enter a valid email.";
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phoneErr = "Please enter a valid phone number.";
    if (!formData.gender) newErrors.genderErr = "Please select gender.";
    if (!formData.dateOfBirth)
      newErrors.dobErr = "Please select date of birth.";
    if (!formData.bloodGroup)
      newErrors.bloodGroupErr = "Please select blood group.";
    if (!formData.classId) newErrors.classErr = "Please select class.";
    if (!formData.address.trim())
      newErrors.addressErr = "Please enter address.";
    if (!id && !profile) newErrors.fileErr = "Please upload a profile picture.";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateParentForm = () => {
    const newErrors = {};
    if (parentFromData.username.trim().length < 3)
      newErrors.parentNameErr = "Parent name must be at least 3 characters.";
    if (parentFromData.motherName.trim().length < 3)
      newErrors.motherNameErr = "Mother name must be at least 3 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentFromData.email))
      newErrors.parentEmailErr = "Please enter a valid email.";
    if (!/^[0-9]{10}$/.test(parentFromData.phone))
      newErrors.parentPhoneErr = "Please enter a valid phone number.";
    if (!parentFromData.address.trim())
      newErrors.parentAddressErr = "Please enter address.";
    if (!parentFromData.occupation.trim())
      newErrors.parentOccupationErr = "Please enter occupation.";
    if (!parentFromData.relationType)
      newErrors.parentRelationTypeErr = "Please select relation type.";
    if (!parentFromData.studentId)
      newErrors.parentStudentIdErr = "Please select student.";
    if (!parentProfile)
      newErrors.parentFileErr = "Please upload a profile picture.";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeStudentModal = () => {
    setOpen(false);
    setEdit(false);
    setId(null);
    setAvatar(null);
    setProfile(null);
    setFormData({
      username: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      bloodGroup: "",
      classId: "",
      address: "",
      profilePicture: null,
    });
    setError({});
  };

  const closeParentModal = () => {
    setParentModel(false);
    setParentAvatar(null);
    setParentProfile(null);
    setParentFromData({
      username: "",
      motherName: "",
      email: "",
      studentId: "",
      phone: "",
      address: "",
      occupation: "",
      relationType: "",
      profilePicture: null,
    });
    setError({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setProfile(file);
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleParentFormDataChange = (e) => {
    const { name, value } = e.target;
    setParentFromData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleParentFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setParentAvatar(URL.createObjectURL(file));
      setParentProfile(file);
      setParentFromData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    if (!validateStudentForm()) {
      return;
    }

    const submitData = new FormData();
    submitData.append("profilePicture", profile);
    submitData.append("username", formData.username);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("gender", formData.gender);
    submitData.append("dateOfBirth", formData.dateOfBirth);
    submitData.append("bloodGroup", formData.bloodGroup);
    submitData.append("classId", formData.classId);
    submitData.append("address", formData.address);
    submitData.append("role", "student");

    try {
      if (id && edit) {
        const { success, data, error } = await handleEditUser(id, submitData);
        if (success) {
          Swal.fire({
            icon: "success",
            text: data,
            confirmButtonColor: "#f97316",
            customClass: {
              popup: "swal-small-popup",
              title: "swal-small-title",
              text: "swal-small-text",
              confirmButton: "swal-small-btn",
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: error,
            text: "Something went wrong!",
          });
        }
      } else {
        const { success, data, error } = await handleAddUser(submitData);
        if (success) {
          Swal.fire({
            icon: "success",
            text: data,
            confirmButtonColor: "#f97316",
            customClass: {
              popup: "swal-small-popup",
              title: "swal-small-title",
              text: "swal-small-text",
              confirmButton: "swal-small-btn",
            },
          });
          setStudentInfo(true);
        } else {
          Swal.fire({
            icon: "error",
            title: error,
            text: "Something went wrong!",
          });
        }
      }

      closeStudentModal();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err?.response?.data?.message,
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const handleSubmitParent = async (e) => {
    e.preventDefault();
    if (!validateParentForm()) return;

    const ParentData = new FormData();
    ParentData.append("profilePicture", parentProfile);
    ParentData.append("username", parentFromData.username);
    ParentData.append("motherName", parentFromData.motherName);
    ParentData.append("email", parentFromData.email);
    ParentData.append("phone", parentFromData.phone);
    ParentData.append("address", parentFromData.address);
    ParentData.append("occupation", parentFromData.occupation);
    ParentData.append("relationType", parentFromData.relationType);
    ParentData.append("studentId", parentFromData.studentId);
    ParentData.append("role", "parent");

    const { success, data, error } = await handleAddUser(ParentData);
    if (success) {
      Swal.fire({ icon: "success", text: data, confirmButtonColor: "#f97316" });
      closeParentModal();
    } else {
      Swal.fire({ icon: "error", title: error, text: "Something went wrong!" });
    }
  };

  const handleStudentDelete = async (id) => {
    const { success, data, error } = await handleDelete(id);
    if (success) {
      Swal.fire({ icon: "success", text: data });
    } else {
      Swal.fire({ icon: "error", title: error, text: "Something went wrong!" });
    }
  };

  useEffect(() => {
    let filtered = users;
    if (selectedClass) {
      filtered = filtered.filter(
        (student) => student.classId === selectedClass,
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((student) =>
        student.username.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredStudents(filtered);
  }, [selectedClass, searchTerm, users]);

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded w-full md:w-1/3">
            <Search />
            <input
              type="text"
              placeholder="Search Student..."
              className="outline-none bg-transparent w-full ml-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <select
              className="bg-gray-100 border border-gray-200 px-4 py-2 rounded appearance-none"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSearchTerm("");
              }}
            >
              <option value="">Select Class</option>
              {Classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.classname}
                </option>
              ))}
            </select>
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 md:px-4 py-2 rounded"
              onClick={() => {
                setEdit(false);
                setId(null);
                closeStudentModal();
                setOpen(true);
              }}
            >
              + New Student
            </button>
          </div>
        </div>

        <StudentTable
          students={filteredStudents}
          Classes={Classes}
          loading={loading}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          setOpen={setOpen}
          setFormData={setFormData}
          setEdit={setEdit}
          setId={setId}
          setAvatar={setAvatar}
          profile={profile}
          handleDelete={handleStudentDelete}
          setParentModel={setParentModel}
          setParentFromData={setParentFromData}
        />
      </div>

      {studentInfo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[500px] text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Student Created Successfully
            </h2>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {credentials?.email}
            </p>
            <p className="text-lg mb-4">
              <strong>Password:</strong> {credentials?.password}
            </p>
            <button
              onClick={() => setStudentInfo(false)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <StudentFormModal
        open={open}
        closeStudentModal={closeStudentModal}
        formData={formData}
        handleChange={handleFormDataChange}
        handleFileChange={handleFileChange}
        avatar={avatar}
        error={error}
        handleSubmit={handleSubmitStudent}
        edit={edit}
        Classes={Classes}
      />

      <ParentFormModal
        open={parentModel}
        closeParentModal={closeParentModal}
        parentFromData={parentFromData}
        handleParentChange={handleParentFormDataChange}
        handleParentFileChange={handleParentFileChange}
        parentAvatar={parentAvatar}
        error={error}
        handleParentSubmit={handleSubmitParent}
        students={users}
      />
    </>
  );
};

export default StudentList;
