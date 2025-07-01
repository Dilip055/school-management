import { BookCopy, Calendar, GripVertical, MapPin, Pen, Search, X } from "lucide-react";
import React, { useState } from "react";
import useEventApi from "../../hooks/useEventApi";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import FullScreenLoader from "../../components/FullScreenLoader";

const ManageEvents = () => {
  const { handleAddEvent, Events, loading, handleDelete, handleEditEvent } =
    useEventApi();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [eventId, setEventId] = useState(null);

  const closeStudentModal = () => {
    setOpen(false);
    setEdit(false);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
    });
    setError({});
    setEventId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = "Title is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start Date is required";
    }
    if (!formData.endDate) {
      newErrors.endDate = "End Date is required";
    }
    if(formData.startDate > formData.endDate){
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Start Date should be less than End Date",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

      if (edit && eventId) {
        const {error, success, data} = await handleEditEvent(eventId, formData);
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
          })
        }else{
          Swal.fire({
            icon: "error",
            title: error,
            text: "Something went wrong!",
          })
        }
      } else {
       const {error, success, data} =  await handleAddEvent(formData);
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
        })
      }else{
        Swal.fire({
          icon: "error",
          title: error,
          text: "Something went wrong!",
        })
      }
        
      }
      closeStudentModal();
   
  };


  const handleEventDelete = async(id) =>{
    const { error, data, success} = await handleDelete(id);
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
      })
    }else{
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",

      })
    }
    setOpenDropdown(null);
  }

  return (
    <>
      <div className="p-2">
        <div className="flex md:flex-row flex-col gap-2 justify-between items-center mb-4 md:px-4 md:py-4 py-2 px-2 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 border-1 border-gray-200 bg-gray-100 rounded px-3 py-2 md:w-1/3 w-full">
            <Search />
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none bg-transparent w-full"
            />
          </div>
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded hover:bg-blue-600 md:w-1/3 lg:w-1/5 xl:w-1/9 w-full"
              onClick={() => setOpen(true)}
            >
              + Add Event
            </button>
        </div>

  
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="min-w-max w-full table-auto text-sm border-collapse bg-white">
            <thead className="bg-blue-100 text-left text-blue-600">
              <tr className="text-center">
                <th className="p-3">Sr. No.</th>
                <th className="p-3">Event Title</th>
                <th className="p-3">Event Description</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Created By</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="text-center py-12 text-gray-500">
                    <FullScreenLoader />
                  </td>
                </tr>
              ) : Events.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-12 text-gray-500">
                    No events found.
                  </td>
                </tr>
              ) : (
              Events.map((event, idx) => {
                return (
                  <tr key={idx} className="hover:bg-gray-50 text-center">
                    <td className="p-3 w-20 font-semibold">{idx + 1}.</td>
                    <td className="p-3">{event.title}</td>
                    <td className="p-3 font-medium">{event.description}</td>
                    <td className="p-3 text-orange-500 font-semibold">
                      {event.startDate}
                    </td>
                    <td className="p-3">{event.endDate}</td>
                    <td className="p-3 text-gray-700 truncate max-w-xs">
                      {event.location}
                    </td>
                    <td>{event.creator.username}</td>
                    <td className="py-3 ps-5 relative">
                      <GripVertical
                        className="cursor-pointer w-5"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === event.id ? null : event.id
                          )
                        }
                      />

                      {openDropdown === event.id && (
                        <div className="absolute right-12 mt-2 w-42 bg-gray-100 border-2 border-gray-200 rounded shadow-md z-10">
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                              setOpen(true);
                              setEdit(true);
                              setEventId(event.id);
                              setFormData({
                                title: event.title,
                                description: event.description,
                                startDate: event.startDate,
                                endDate: event.endDate,
                                location: event.location,
                              });
                              setOpenDropdown(null);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                            onClick={() => 
                              handleEventDelete(event.id)
                              }
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              }))}
            
            </tbody>
          </table>
        </div>
      </div>

      {open && (
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
              onClick={closeStudentModal}
            ></div>

            <div className="relative w-full max-w-md sm:max-w-7xl transform rounded-3xl bg-white shadow-2xl transition-all z-10">
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg sm:text-2xl font-semibold  text-white flex items-center gap-2"
                    id="modal-title"
                  >
                    <Calendar className="w-5 h-5" />
                    {edit ? "Edit Event" : "Add New Event"}
                  </h3>
                  <button
                    onClick={closeStudentModal}
                    className="text-white hover:text-red-200 transition-colors p-1"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="px-6 py-6 max-h-[70vh] overflow-y-auto"
              >
                <div className="space-y-6">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                          <Pen className="w-4 h-4 text-blue-600 float-left" />
                          Event Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          onChange={handleChange}
                          value={formData.title}
                          className="w-full px-3 md:py-2.5 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                          placeholder="Sports Day"
                        />
                        {error?.title && (
                          <p
                            className="text-red-500 text-xs mt-1"
                            id="name-error"
                          >
                            {error.title}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                          <BookCopy className="w-4 h-4 text-blue-600 float-left" />
                          Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          onChange={handleChange}
                          value={formData.description}
                          className="w-full px-3 md:py-2.5 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                          placeholder="Organized by the Students Association"
                        />
                        {error?.description && (
                          <p
                            className="text-red-500 text-xs mt-1"
                            id="email-error"
                          >
                            {error.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                          <Calendar className="w-4 h-4 text-blue-600 float-left " />
                          Start Date
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          placeholder="2022-05-01"
                          onChange={handleChange}
                          value={formData.startDate}
                          className="w-full px-3 md:py-2.5 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                        />
                        {error?.startDate && (
                          <p
                            className="text-red-500 text-xs mt-1"
                            id="dob-error"
                          >
                            {error.startDate}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                          <Calendar className="w-4 h-4 text-blue-600 float-left " />
                          Ending Date
                        </label>
                        <input
                          type="date"
                          name="endDate" 
                          onChange={handleChange}
                          value={formData.endDate} 
                          className="w-full px-3 md:py-2.5 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                        />
                        {error?.endDate && (
                          <p
                            className="text-red-500 text-xs mt-1"
                            id="bloodGroup-error"
                          >
                            {error.endDate}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                        <MapPin className="w-4 h-4 text-blue-600 float-left" />
                        Location
                      </label>
                      <textarea
                        name="location" 
                        rows={2}
                        onChange={handleChange}
                        value={formData.location} 
                        className="w-full px-4 md:py-2.5 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white resize-none"
                        placeholder="123 Main St, City, Country"
                      />
                      {error?.location && (
                        <p
                          className="text-red-500 text-xs mt-1"
                          id="address-error"
                        >
                          {error.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeStudentModal}
                      className="w-full sm:w-auto md:py-2.5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 md:py-2.5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
                    >
                      {edit ? "Update Event" : "Create Event"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageEvents;
