import React from "react";
import { X, Camera, User, Mail, Phone, Calendar, MapPin, Users } from "lucide-react";

const StudentFormModal = ({
  open,
  closeStudentModal,
  formData,
  handleChange,
  handleFileChange,
  avatar,
  error,
  handleSubmit,
  edit,
  Classes,
}) => {
  if (!open) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div
          className="fixed inset-0 bg-black/70 transition-opacity"
          onClick={closeStudentModal}
        ></div>

        <div className="relative w-full max-w-md sm:max-w-7xl transform rounded-3xl bg-white shadow-2xl transition-all z-10">
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 md:px-6 px-3 py-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <h3 className="text-md md:text-2xl font-semibold text-white flex items-center gap-2">
                <User className="md:w-6 md:h-6 h-5 w-5" aria-hidden="true" />
                {edit ? "Edit Student" : "Add New Student"}
              </h3>
              <button
                onClick={closeStudentModal}
                className="hover:bg-white/20 rounded-lg transition-colors text-white p-1"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

         
          <form onSubmit={handleSubmit} className="px-6 py-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex flex-col items-center md:mb-8 mb-4">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <img
                      src={avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt="Student Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="avatarInput"
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg cursor-pointer transform transition-all hover:scale-110 hover:shadow-xl"
                  >
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      id="avatarInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="mt-3 text-sm text-gray-500 font-medium">Click to upload photo</p>
                {error?.fileErr && (
                  <p className="text-red-500 text-xs mt-1">{error.fileErr}</p>
                )}
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4 gap-2">
                  <div className="space-y-1">
                    <label className="flex items-center text-sm gap-1 sm font-semibold text-gray-700">
                      <User className="w-4 h-4 text-blue-600 float-left" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={formData.username}
                      className="w-full px-3 md:py-2.5 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                      placeholder="Student Name"
                    />
                    {error?.nameErr && (
                      <p className="text-red-500 text-xs mb-1">
                        {error.nameErr}
                      </p>
                    )}
                  </div>


                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                      <Mail className="w-4 h-4 text-blue-600 float-left" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      className="w-full px-3 md:py-2.5  py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                      placeholder="student@example.com"
                      
                    />
                    {error?.emailErr && (
                      <p className="text-red-500 text-xs" >
                        {error.emailErr}
                      </p>
                    )}
                  </div>
                </div>

        
                <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4 gap-2">
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                      <Phone className="w-4 h-4 text-blue-600 float-left" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                      className="w-full px-3 md:py-2.5  py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                      placeholder="8596412365"
                     
                    />
                    {error?.phoneErr && (
                      <p className="text-red-500 text-xs" >
                        {error.phoneErr}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                      <User className="w-4 h-4 text-blue-600 float-left" />
                      Gender
                    </label>
                    <select
                      name="gender"
                      onChange={handleChange}
                      value={formData.gender}
                      className="w-full px-3 md:py-2.5  py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-gray-50 focus:bg-white outline-none"
                      
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {error?.genderErr && (
                      <p className="text-red-500 text-xs" >
                        {error.genderErr}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4 gap-2">
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                      <Calendar className="w-4 h-4 text-blue-600 float-left" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      onChange={handleChange}
                      value={formData.dateOfBirth}
                      className="w-full px-3 md:py-2.5  py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                    />
                    {error?.dobErr && (
                      <p className="text-red-500 text-xs" >
                        {error.dobErr}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                      <span className="w-4 h-4 text-blue-600 font-bold text-xs flex items-center justify-center bg-blue-100 rounded-full float-left me-1">
                        B+
                      </span>
                      Blood Group
                    </label>
                    <input
                      type="text"
                      name="bloodGroup"
                      onChange={handleChange}
                      value={formData.bloodGroup}
                      className="w-full px-3 md:py-2.5  py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                      placeholder="A+"
                    />
                    {error?.bloodGroupErr && (
                      <p className="text-red-500 text-xs">
                        {error.bloodGroupErr}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                    <Users className="w-4 h-4 text-blue-600 float-left" />
                    Class
                  </label>
                  <select
                    name="classId"
                    onChange={handleChange}
                    value={formData.classId}
                    className="w-full px-3 md:py-2.5  py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-gray-50 focus:bg-white outline-none"
                  >
                    <option value="">Select Class</option>
                    {Classes.map((classItem) => (
                      <option key={classItem.id} value={classItem.id}>
                        {classItem.classname}
                      </option>
                    ))}
                  </select>
                  {error?.classErr && (
                    <p className="text-red-500 text-xs" >
                      {error.classErr}
                    </p>
                  )}
                </div>


                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-600 float-left" />
                    Address
                  </label>
                  <textarea
                    name="address"
                    rows={3}
                    onChange={handleChange}
                    value={formData.address}
                    className="w-full px-4 md:py-2.5  py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white resize-none"
                    placeholder="123 Main St, City, Country"
                  />
                  {error?.addressErr && (
                    <p className="text-red-500 text-xs">
                      {error.addressErr}
                    </p>
                  )}
                </div>
              </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeStudentModal}
                    className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
                  >
                    {edit ? "Update Student" : "Create Student"}
                  </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
      </>
    );
};

export default StudentFormModal;
