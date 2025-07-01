import React from "react";
import {
  X,
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  LibraryBig,
  Banknote,
} from "lucide-react";


const TeacherFromModal = ({
  open,
  subjects,
  closeTeacherModal,
  teacherData,
  handleTeacherDataChange,
  handleTeacherFileChange,
  teacherAvatar,
  handleTeacherSelectedDataChange,
  handleSubmit,
  isEditMode,
  error,
  setError
}) => {
  if (!open) return null;


  return (
    <>
      <div
        className="fixed inset-0 z-50 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
          <div
            className="fixed inset-0 bg-black/70 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="relative w-full max-w-md sm:max-w-7xl transform rounded-3xl bg-white shadow-2xl transition-all z-10">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3
                  className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2"
                  id="modal-title"
                >
                  <User className="w-6 h-6" />
                  {isEditMode ? "Edit Teacher" : "Add Teacher"}
              
                </h3>
                <button
                  className="text-white hover:text-red-200 transition-colors p-1"
                  aria-label="Close modal"
                  onClick={()=>{
                          closeTeacherModal()
                           setError("")
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form className="px-6 py-6 max-h-[70vh] overflow-y-auto" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex flex-col items-center md:mb-8 mb-4">
                  <div className="relative group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                      <img
                        src={
                          teacherAvatar ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
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
                        onChange={handleTeacherFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="mt-3 text-sm text-gray-500 font-medium">
                    Click to upload photo
                  </p>
                  {error?.teacherFileErr && <p className="text-xs text-red-500 mb-1">{error.teacherFileErr}</p>}
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6 gap-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <User className="w-4 h-4 text-blue-600 float-left me-1" />
                        Teacher Name
                      </label>
                      <input
                        type="text"
                        name="username"
                        onChange={handleTeacherDataChange}
                        value={teacherData.username}
                        className="w-full px-3 md:py-2.5 py-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                        placeholder="Teacher Name"
                      />
                       {error?.teacherNameErr && <p className="text-xs text-red-500">{error.teacherNameErr}</p>}
                    </div>

     
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Mail className="w-4 h-4 text-blue-600 float-left me-1" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleTeacherDataChange}
                        value={teacherData.email}
                        className="w-full px-3 md:py-2.5 py-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                        placeholder="teacher@example.com"
                      />
                      {error?.teacherEmailErr && <p className="text-xs text-red-500 mb-1">{error.teacherEmailErr}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6 gap-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Phone className="w-4 h-4 text-blue-600 float-left me-1" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        onChange={handleTeacherDataChange}
                        value={teacherData.phone}
                        className="w-full px-3 md:py-2.5 py-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                        placeholder="8596412365"
                      />
                      {error?.teacherPhoneErr && <p className="text-xs text-red-500 mb-1">{error.teacherPhoneErr}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <BookOpen className="w-4 h-4 text-blue-600 float-left me-1" />
                        Qualification
                      </label>
                      <input
                        type="text"
                        name="qualification"
                        onChange={handleTeacherDataChange}
                        value={teacherData.qualification}
                        className="w-full px-3 md:py-2.5 py-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                        placeholder="Ex. B.Tech"
                      />
                      {error?.qualificationErr && <p className="text-xs text-red-500 mb-1">{error.qualificationErr}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6 gap-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Calendar className="w-4 h-4 text-blue-600 float-left me-1" />
                        Joining Date
                      </label>
                      <input
                        type="date"
                        name="joiningDate"
                        onChange={handleTeacherDataChange}
                        value={teacherData.joiningDate}
                        className="w-full px-3 md:py-2.5 py-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                      />
                      {error?.joiningDateErr && <p className="text-xs text-red-500 mb-1">{error.joiningDateErr}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <LibraryBig className="w-4 h-4 text-blue-600 float-left me-1" />
                        SubjectsTaught
                      </label>
                      <select
                        name="subjectsTaught"
                        multiple
                        onChange={handleTeacherSelectedDataChange}
                        value={teacherData.subjectsTaught}
                        className="w-full px-3 md:py-2.5 py-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
  transition-all duration-200 appearance-none bg-gray-50 focus:bg-white outline-none"
                      >
                        {subjects?.map((subject) => (
                          <option key={subject.id} value={subject.subjectCode} className="border-1 bg-gray-200 border-gray-400 outline-0 rounded px-2 py-1 mb-1">
                            {subject.subjectCode}
                          </option>
                        ))}
                        
                      </select>
                      {error?.subjectsTaughtErr && <p className="text-xs text-red-500 mb-1">{error.subjectsTaughtErr}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Banknote className="w-4 h-4 text-blue-600 float-left me-1" />
                      Salary
                    </label>
                    <input
                      type="text"
                      name="salary"
                      onChange={handleTeacherDataChange}
                      value={teacherData.salary}
                      className="w-full px-3 md:py-2.5 py-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                      placeholder="Ex. 10000"
                    />
                    {error?.salaryErr && <p className="text-xs text-red-500">{error.salaryErr}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin className="w-4 h-4 text-blue-600 float-left me-1" />
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={teacherData.address}
                      onChange={handleTeacherDataChange}
                      rows={3}
                      className="w-full px-3 md:py-2.5 py-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white resize-none"
                      placeholder="123 Main St, City, Country"
                    />
                    {error?.teacherAddressErr && <p className="text-xs text-red-500 mb-1">{error.teacherAddressErr}</p>}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
                  >
                    {isEditMode ? "Update Teacher" : "Create Teacher"}
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

export default TeacherFromModal;
