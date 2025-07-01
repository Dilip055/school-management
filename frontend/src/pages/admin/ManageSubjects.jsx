import React, { useState } from "react";
import useSubjectApi from "../../hooks/useSubjectApi";
import ClipLoader from "react-spinners/ClipLoader";
import { BookOpenCheck, BookmarkCheck, PenLine, Search, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";
import FullScreenLoader from "../../components/FullScreenLoader";

const ManageSubjects = () => {
  const { subjects, loading, handleAddSubject, handleSubjectDelete } = useSubjectApi();
  const [error, setError] = useState({});
  const [subjectModel, setSubjectModel] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateSubjectForm = () => {
    const newErrors = {};
    if (!formData.subjectName) newErrors.subjectName = "Subject name is required";
    if (!formData.subjectCode) newErrors.subjectCode = "Subject code is required";
    if (!formData.description) newErrors.description = "Description is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSubjectForm()) return;
    const {error, data, success} = await handleAddSubject(formData);
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
      });
    }else{
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }
     
      setFormData({ subjectName: "", subjectCode: "", description: "" });
      setError({});
      setSubjectModel(false);
  };


  const handleDelete = async (id)=>{
  const {error, data, success} =  await handleSubjectDelete(id);
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
    });
  }else{
    Swal.fire({
      icon: "error",
      title: error,
      text: "Something went wrong!",
    });
  }
  }

  const handleCloseModal = () => {
    setSubjectModel(false);
    setFormData({ subjectName: "", subjectCode: "", description: "" });
    setError({});
  };

  return (
    <>
      <div className="p-4">
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-4 md:px-4 md:py-4 py-4 px-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 border-1 border-gray-200 bg-gray-100 rounded px-3 py-2 md:w-1/3 w-full">
            <Search />
            <input type="text" placeholder="Search here..." className="outline-none bg-transparent w-full" />
          </div>
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded hover:bg-blue-600 md:w-1/5 lg:w-1/5 xl:w-1/8  w-full"
            onClick={() => setSubjectModel(true)}
          >
            + New Subject
          </button>
        </div>

        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-blue-100 text-left text-blue-600">
              <tr className='text-center'>
                <th className="p-3">Sr. No.</th>
                <th className="p-3">Subject Name</th>
                <th className="p-3">Subject Code</th>
                <th className="p-3">Description</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <FullScreenLoader />
              ) : subjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">No subjects found.</td>
                </tr>
              ) : (
                subjects.map((subject, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="p-3 font-semibold">{idx + 1}.</td>
                    <td className="p-3">{subject.subjectName}</td>
                    <td className="p-3">{subject.subjectCode}</td>
                    <td className="p-3">{subject.description}</td>
                    <td className="p-3 px-5">
                      <button className="cursor-pointer text-red-500 font-semibold" onClick={() => handleDelete(subject.id)}>
                      <Trash2 className="w-5 h-5"  />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      
      {subjectModel && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-3xl  w-[90%] max-w-md">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 rounded-t-3xl flex justify-between items-center">
              <h3 className="text-lg sm:text-2xl font-semibold text-white flex items-center gap-2">
                <BookOpenCheck className="w-6 h-6" />
                Add New Subject
              </h3>
              <button onClick={handleCloseModal} className="text-white hover:text-red-200 p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="md:px-6 md:py-6 px-4 py-4">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
                    <BookmarkCheck className="w-4 h-4 text-blue-600 float-left" /> Subject Name
                  </label>
                  <input
                    type="text"
                    name="subjectName"
                    placeholder="Ex. Science"
                    className="w-full px-3 py-2 md:py-2.5  border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 bg-gray-50 focus:bg-white outline-0"
                    onChange={handleChange}
                    value={formData.subjectName}
                  />
                  {error.subjectName && <p className="text-red-500 text-xs mt-1">{error.subjectName}</p>}
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
                    <BookmarkCheck className="w-4 h-4 text-blue-600 float-left " /> Subject Code
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    placeholder="Ex. Sci101"
                    className="w-full px-3 py-2 md:py-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 bg-gray-50 focus:bg-white outline-0"
                    onChange={handleChange}
                    value={formData.subjectCode}
                  />
                  {error.subjectCode && <p className="text-red-500 text-xs mt-1">{error.subjectCode}</p>}
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
                    <PenLine className="w-4 h-4 text-blue-600 float-left" /> Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Ex. Research Work"
                    className="w-full px-3 py-2 md:py-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 bg-gray-50 focus:bg-white outline-0"
                    onChange={handleChange}
                    value={formData.description}
                  />
                  {error.description && <p className="text-red-500 text-xs mt-1">{error.description}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="w-full px-6 py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg"
                  >
                    Create Subject
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageSubjects;
