import React, { useMemo, useState } from "react";
import useUserApi from "../../hooks/useUserApi.js";
import { ClipLoader } from "react-spinners";
import ParentFormModal from "../../components/ParentFormModal.jsx";
import Swal from "sweetalert2";
import { GripVertical, Search } from "lucide-react";
import FullScreenLoader from "../../components/FullScreenLoader.jsx";

const ManageParents = () => {
  const { users, loading, handleDelete, handleEditUser } = useUserApi();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [parentModel, setParentModel] = useState(false);
  const [parentFromData, setParentFromData] = useState({
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

  const [searchTerm, setSearchTerm] = useState("");
  const [parentAvatar, setParentAvatar] = useState(null);
  const [parentProfile, setParentProfile] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");

  const closeParentModal = () => {
    setParentModel(false);
    setParentAvatar(null);
    setParentProfile(null);
    setParentId(null);
    setIsEditMode(false);
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
    setError("");
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

  const validateParentForm = () => {
    const newErrors = {};
    if (parentFromData.username.trim().length < 3) {
      newErrors.parentNameErr = "Parent name must be at least 3 characters.";
    }
    if (parentFromData.motherName.trim().length < 3) {
      newErrors.motherNameErr = "Mother name must be at least 3 characters.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(parentFromData.email)) {
      newErrors.parentEmailErr = "Please enter a valid email.";
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(parentFromData.phone)) {
      newErrors.parentPhoneErr = "Please enter a valid phone number.";
    }
    if (!parentFromData.address.trim()) {
      newErrors.parentAddressErr = "Please enter address.";
    }
    if (!parentFromData.occupation.trim()) {
      newErrors.parentOccupationErr = "Please enter occupation.";
    }
    if (!parentFromData.relationType) {
      newErrors.parentRelationTypeErr = "Please select relation type.";
    }
    if (!parentFromData.studentId) {
      newErrors.parentStudentIdErr = "Please select student.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitParent = async (e) => {
    e.preventDefault();
    if (!validateParentForm()) {
      return
    }

    const ParentData = new FormData();
    if (parentProfile) {
      ParentData.append("profilePicture", parentProfile);
    }

    ParentData.append("username", parentFromData.username);
    ParentData.append("motherName", parentFromData.motherName);
    ParentData.append("email", parentFromData.email);
    ParentData.append("phone", parentFromData.phone);
    ParentData.append("address", parentFromData.address);
    ParentData.append("occupation", parentFromData.occupation);
    ParentData.append("relationType", parentFromData.relationType);
    ParentData.append("studentId", parentFromData.studentId);
    ParentData.append("role", "parent");

    try {
      if (isEditMode && parentId) {
        const { success, data, error } = await handleEditUser(parentId, ParentData);
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
      }
      closeParentModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error?.response?.data?.message || "Error",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEditParent = (parent) => {
    setIsEditMode(true);
    setParentId(parent.id);
    setParentModel(true);

    if (parent.profilePicture) {
      setParentAvatar(`http://localhost:2000/${parent.profilePicture}`);
    }

    setParentFromData({
      username: parent.username || "",
      motherName: parent.motherName || "",
      email: parent.email || "",
      studentId: parent.Students?.[0]?.id || "",
      phone: parent.phone || "",
      address: parent.address || "",
      occupation: parent.occupation || "",
      relationType: parent.relationType || "",
      profilePicture: parent.profilePicture || null,
    });

    setOpenDropdown(null);
  };

const handleParentDelete = async (id) => {
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
  setOpenDropdown(null);
};  



  const filteredParents = useMemo(() => {
    let filtered = users.filter((user) => user.role === "parent");
    if (searchTerm) {
      filtered = filtered.filter((parent) =>
        parent.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [searchTerm, users]);

  return (
    <>
      <div className="p-2">
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-4 md:px-4 md:py-4 py-2 px-2 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 border-1 border-gray-200 bg-gray-100 rounded px-3 py-2 md:w-1/3 w-full">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search Parent Name..."
              className="outline-none bg-transparent w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>

        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="min-w-max w-full table-auto text-sm border-collapse bg-white">
            <thead className="bg-blue-100 text-left text-blue-600">
              <tr className="text-center">
                <th className="p-3">Sr.No.</th>
                <th className="p-3">Parent's Photo</th>
                <th className="p-3">Father Name</th>
                <th className="p-3">Mother Name</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Mobile No.</th>
                <th className="p-3">Address</th>
                <th className="p-3">Occupation</th>
                <th className="p-3">Relation Type</th>
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
              ) : filteredParents.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center py-12 text-gray-500">
                    No parents found.
                  </td>
                </tr>
              ) : (
                filteredParents.map((parent, idx) => (
                  <tr
                    key={parent.id || idx}
                    className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white text-center"
                  >
                    <td className="p-3">{idx + 1}.</td>
                    <td className="p-3">
                      <img
                        src={`http://localhost:2000/${parent.profilePicture}`}
                        alt="avatar"
                        className="w-16 h-16 rounded-full mx-auto"
                      />
                    </td>
                    <td className="p-3 font-medium">{parent.username}</td>
                    <td className="p-3 font-medium">{parent.motherName}</td>
                    <td className="p-3 text-orange-500 font-semibold">
                      {parent.Students?.[0]?.username || "N/A"}
                    </td>
                    <td className="p-3">{parent.email}</td>
                    <td className="p-3">{parent.phone}</td>
                    <td className="p-3">{parent.address}</td>
                    <td className="p-3">{parent.occupation || "N/A"}</td>
                    <td className="p-3">{parent.relationType || "N/A"}</td>
                    <td className="py-3 px-6 relative">
                      <GripVertical
                        className="cursor-pointer w-5"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === parent.id ? null : parent.id
                          )
                        }
                      />
                      {openDropdown === parent.id && (
                        <div className="absolute right-5 mt-2 w-42 bg-gray-100 border-2 border-gray-200 rounded shadow-md z-10">
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => handleEditParent(parent)}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                            onClick={() => {
                              handleParentDelete(parent.id);
                             
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

      <ParentFormModal
        open={parentModel}
        closeParentModal={closeParentModal}
        parentFromData={parentFromData}
        handleParentChange={handleParentFormDataChange}
        handleParentFileChange={handleParentFileChange}
        parentAvatar={parentAvatar}
        error={error}
        handleParentSubmit={handleSubmitParent}
        students={users?.filter((user) => user.role === "student")}
        isEditMode={isEditMode}
        setError={setError}
      />
    </>
  );
};

export default ManageParents;
