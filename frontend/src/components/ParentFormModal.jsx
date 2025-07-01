import React from "react";
import { X, Camera, User, Mail, Phone, MapPin, Users, Briefcase } from "lucide-react";

const ParentFormModal = ({
  open,
  closeParentModal,
  parentFromData,
  handleParentChange,
  handleParentFileChange,
  parentAvatar,
  error,
  handleParentSubmit,
  students,
  setError
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 rounded-2xl"
    
    >
      <form
        onSubmit={handleParentSubmit}
        className="bg-white w-full max-w-7xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden"
      >

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 flex justify-between items-center">
          <h2 id="parent-modal-title" className="text-md sm:text-2xl font-bold flex items-center gap-2">
            <Users className="w-4 h-4" />
            Add Parent Details
          </h2>
          <button
            type="button"
            onClick={()=>{closeParentModal()
                        setError("")
            }}
            className="text-white hover:text-red-200 transition-colors p-1"
            aria-label="Close parent modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>


        <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-4 sm:p-6 space-y-6">

          <div className="flex flex-col items-center md:mb-6 mb-4">
            <div className="relative mb-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <img
                  src={
                    parentAvatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Parent Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="parentAvatarInput"
                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg cursor-pointer transform transition-all hover:scale-110 hover:shadow-xl"
              >
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="parentAvatarInput"
                  accept="image/*"
                  onChange={handleParentFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Click to upload photo
            </p>
            {error?.parentFileErr && (
              <p className="text-red-500 text-xs mt-1 mb-1">{error.parentFileErr}</p>
            )}
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <User className="w-4 h-4 text-blue-600 float-left" />
                Father Name
              </label>
              <input
                type="text"
                name="username"
                value={parentFromData.username}
                onChange={handleParentChange}
                placeholder="Enter Father name"
                className="w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
              {error?.parentNameErr && (
                <p className="text-red-500 text-xs">{error.parentNameErr}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <User className="w-4 h-4 text-blue-600 float-left" />
                Mother Name
              </label>
              <input
                type="text"
                name="motherName"
                value={parentFromData.motherName}
                onChange={handleParentChange}
                placeholder="Enter Mother name"
                className="w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
              {error?.parentNameErr && (
                <p className="text-red-500 text-xs" >{error.motherNameErr}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-600 float-left" />
                Select Student
              </label>
              <select
                name="studentId"
                value={parentFromData.studentId}
                onChange={handleParentChange}
                className="w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              >
                <option value="">Select Student</option>
                {students.filter((student) => student.role === "student").map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.username}
                  </option>
                ))}
              </select>
              {error?.parentStudentIdErr && (
                <p className="text-red-500 text-xs mt-1 mb-1" >{error.parentStudentIdErr}</p>
              )}
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4 text-blue-600 float-left" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={parentFromData.email}
                onChange={handleParentChange}
                placeholder="Enter email address"
                className="w-full px-3 md:py-2.5 py-2  border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
              {error?.parentEmailErr && (
                <p className="text-red-500 text-xs mt-1 mb-1" >{error.parentEmailErr}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Phone className="w-4 h-4 text-blue-600 float-left" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={parentFromData.phone}
                onChange={handleParentChange}
                placeholder="Enter phone number"
                className="w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
              {error?.parentPhoneErr && (
                <p className="text-red-500 text-xs" >{error.parentPhoneErr}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-600 float-left" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={parentFromData.address}
                onChange={handleParentChange}
                placeholder="Enter address"
                className="w-full px-3 md:py-2.5 py-2  border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                
              />
              {error?.parentAddressErr && (
                <p className="text-red-500 text-xs" >{error.parentAddressErr}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-blue-600 float-left" />
                Occupation 
              </label>
              <input
                type="text"
                name="occupation"
                value={parentFromData.occupation}
                onChange={handleParentChange}
                placeholder="Enter occupation"
                className="w-full px-3 md:py-2.5 py-2  border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                
              />
              {error?.parentOccupationErr && (
                <p className="text-red-500 text-xs" >{error.parentOccupationErr}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Users className="w-4 h-4 text-blue-600 float-left" />
                Relation Type 
              </label>
              <select
                name="relationType"
                value={parentFromData.relationType}
                onChange={handleParentChange}
                className="w-full px-3 md:py-2.5 py-2  border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                
              >
                <option value="">Select Relation</option>
                <option value="Parent">Parent</option>
                <option value="Guardian">Guardian</option>
              </select>
              {error?.parentRelationTypeErr && (
                <p className="text-red-500 text-xs" >
                  {error.parentRelationTypeErr}
                </p>
              )}
            </div>
          </div>

         
          <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeParentModal}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
            >
              Submit Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ParentFormModal;
