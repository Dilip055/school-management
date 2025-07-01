

import React, { useEffect, useState } from "react";
import { 
  Search, 
  Plus, 
  X, 
  Upload, 
  Download, 
  BookOpen, 
  Users, 
  User, 
  FileText,
  Filter,
  Eye,
  Trash2,
  Edit,
  PenIcon,
  File,
  Building2,
  UploadIcon,
  XCircle,
  FileTextIcon
} from "lucide-react";
import useClassApi from "../../hooks/useClassApi";
import useSubjectApi from "../../hooks/useSubjectApi";
import useStudyMeterialApi from "../../hooks/useStudyMeterialApi";
import Swal from "sweetalert2";

const ManageStudyMeterial = () => {
  const { Classes } = useClassApi();
  const { subjects } = useSubjectApi();
  const [open, setOpen] = useState(false);
  const [meterial, setMeterial] = useState(null);
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    classId: "",
    filePath: null,
    subjectId: "",
  });
  const [filters, setFilters] = useState({
    classId: "",
    subjectId: "",
  });

  const { handleCreateStudyMeterial, studyMeterial, fetchAllStudyMeterial, handleDelete } =
    useStudyMeterialApi();

  const closeStudentModal = () => {
    setFormData({
      title: "",
      description: "",
      classId: "",
      filePath: null,
      subjectId: "",
    });
    setMeterial(null);
    setFile(null);
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const fileName = e.target.files[0];
    if (fileName) {
      setFile(fileName);
      setMeterial(URL.createObjectURL(fileName));
      setFormData((prev) => ({ ...prev, filePath: fileName }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studyData = new FormData();
    studyData.append("title", formData.title);
    studyData.append("description", formData.description);
    studyData.append("classId", formData.classId);
    studyData.append("subjectId", formData.subjectId);
    studyData.append("filePath", file);
    
    const { success, data, error } = await handleCreateStudyMeterial(studyData);
    closeStudentModal();
    fetchAllStudyMeterial(filters.classId, filters.subjectId);
    
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data,
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981",
        background: "#f0fdf4",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error || "Something went wrong!",
        confirmButtonColor: "#ef4444",
      });
    }
  };


  const handleStudyDelete = async (id) => {
    const { success, error, data } = await handleDelete(id);
    if (success) {
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
      })
    } else {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
        confirmButtonColor: "#ef4444",
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredMaterials = studyMeterial.filter((study) =>
    study.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.class?.classname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.subject?.subjectName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

 

  useEffect(() => {
    fetchAllStudyMeterial(filters.classId, filters.subjectId);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Manage Study Materials
          </h1>
          <p className="text-gray-600">Manage and organize educational resources</p>
        </div>


        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
     
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search materials, classes, subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 outline-0"
              />
            </div>

     
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                <span>Filters:</span>
              </div>
              
              <select
                name="classId"
                value={filters.classId}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-0 appearance-none"
              >
                <option value="">All Classes</option>
                {Classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.classname}
                  </option>
                ))}
              </select>

              <select
                name="subjectId"
                value={filters.subjectId}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-0 appearance-none"
              >
                <option value="">All Subjects</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.subjectName}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                Add Material
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredMaterials.length}</span> materials
          </p>
        </div>

   
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMaterials.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
            >
           
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                <div className="flex items-start justify-between mb-2">
                 
                  <div>
                    <XCircle className="h-6 w-6 text-white" onClick={() => handleStudyDelete(study.id)} />
                  </div>
                </div>
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                  {study.title}
                </h3>
              </div>

       
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {study.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Class:</span>
                    <span className="text-gray-600">
                      {study.class?.name || study.class?.classname}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Subject:</span>
                    <span className="text-gray-600">
                      {study.subject?.name || study.subject?.subjectName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Teacher:</span>
                    <span className="text-gray-600">
                      {study.teacher?.username}
                    </span>
                  </div>
                </div>

                <a
                  href={`http://localhost:2000/${study.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 text-white py-2.5 px-4 rounded-lg  transition-all duration-200 font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No study materials found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters, or add a new material.
            </p>
            
          </div>
        )}
      </div>

    
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold">Add Study Material</h2>
                </div>
                <button
                  onClick={closeStudentModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>


            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                 <PenIcon className="w-4 h-4 text-blue-600 float-left me-1 mt-1" /> Material Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <File className="w-4 h-4 text-blue-600 float-left me-1 mt-1" /> Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the study material"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none outline-0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                   <Building2 className="w-4 h-4 text-blue-600 float-left me-1 mt-1" /> Class
                  </label>
                  <select
                    name="classId"
                    value={formData.classId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-0 appearance-none "
                  >
                    <option value="">Select Class</option>
                    {Classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.classname}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                   <BookOpen className="w-4 h-4 text-blue-600 float-left me-1 mt-1" /> Subject
                  </label>
                  <select
                    name="subjectId"
                    value={formData.subjectId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-0 appearance-none"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.subjectName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                 <UploadIcon className="w-4 h-4 text-blue-600 float-left me-1 mt-1" /> Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <div>
                      <span className="text-blue-600 font-medium">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </div>
                    <span className="text-sm text-gray-400">
                      PDF, DOC, XLS, Images up to 10MB
                    </span>
                  </label>
                  {file && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-green-800">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeStudentModal}
                  className=" px-5 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded px-2 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all font-medium"
                >
                  Upload Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudyMeterial;
