import React, { useState, useEffect } from "react";
import useClassApi from "../../hooks/useClassApi";
import useSubjectApi from "../../hooks/useSubjectApi";
import useUserApi from "../../hooks/useUserApi";
import useClassRoutineApi from "../../hooks/useClassRoutineApi";
import { Calendar1Icon, CalendarCheck, Clock, NotebookPen, Trash2, User, X, Plus, BookOpen, Users } from "lucide-react";
import Swal from "sweetalert2";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ManageClassRoutine = () => {
  const { Classes } = useClassApi();
  const { subjects } = useSubjectApi();
  const { users } = useUserApi();
  const { classRoutine, handleAddRoutine, handleDeleteRoutineApi, fetchClassRoutine } = useClassRoutineApi();

  const [selectedClass, setSelectedClass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({ subjectId: "", teacherId: "" });

  const startHour = 8;
  const endHour = 15;

  const timeSlots = Array.from({ length: endHour - startHour }, (_, i) => {
    const hour = startHour + i;
    return {
      startTime: `${hour.toString().padStart(2, "0")}:00`,
      endTime: `${(hour + 1).toString().padStart(2, "0")}:00`,
    };
  });

  const handleSlotClick = (day, slot) => {
    const routine = classRoutine.find(
      (r) =>
        r.classId?.toString().trim() === selectedClass?.toString().trim() &&
        r.dayOfWeek?.toLowerCase().trim() === day?.toLowerCase().trim() &&
        normalizeTime(r.startTime) === normalizeTime(slot.startTime) &&
        normalizeTime(r.endTime) === normalizeTime(slot.endTime)
    );
    if (routine) {
      Swal.fire({
        title: "Slot Already Occupied",
        text: "You have already assigned a routine to this time slot",
        icon: "warning",
        confirmButtonColor: "#3b82f6"
      });
      return;
    }

    setFormData({ subjectId: "", teacherId: "" });
    setSelectedSlot({ dayOfWeek: day, ...slot });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteClick = async (e, routineId) => {
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Delete Routine?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280"
    });

    if (result.isConfirmed) {
      await handleDeleteRoutineApi(routineId);
      await fetchClassRoutine();
      Swal.fire("Deleted!", "Routine has been deleted successfully.", "success");
    }
  };

  const handleSubmit = async () => {
    if (!formData.subjectId || !formData.teacherId) {
      Swal.fire("Error", "Please select both a subject and a teacher.", "error");
      return;
    }

    const payload = {
      ...selectedSlot,
      ...formData,
      classId: selectedClass,
    };

    const { success, data, error } = await handleAddRoutine(payload);
    await fetchClassRoutine();
    setModalOpen(false);

    if (success) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data ,
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };

  const normalizeTime = (time) => {
    let t = time.trim();
    if (/^\d{1,2}:\d{2}$/.test(t)) {
      t = t + ":00";
    }
    if (/^\d:\d{2}(:\d{2})?$/.test(t)) {
      t = "0" + t;
    }
    return t;
  };
    useEffect(() => {
    fetchClassRoutine();
  }, []);

  const findRoutine = (day, startTime, endTime) => {
    const routine = classRoutine.find(
      (r) =>
        r.classId?.toString().trim() === selectedClass?.toString().trim() &&
        r.dayOfWeek?.toLowerCase().trim() === day?.toLowerCase().trim() &&
        normalizeTime(r.startTime) === normalizeTime(startTime) &&
        normalizeTime(r.endTime) === normalizeTime(endTime)
    );

    if (!routine) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 transition-colors group">
          <Plus className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium">Add Routine</span>
        </div>
      );
    }

    const subject = subjects.find((s) => s.id === routine.subjectId)?.subjectName || "Unknown";
    const teacher = users.find((u) => u.id === routine.teacherId)?.username || "Unknown";

    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div className="flex items-start justify-between h-full">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-blue-800 text-sm truncate mb-1 flex items-center gap-1">
              <BookOpen className="w-3 h-3 flex-shrink-0" />
              {subject}
            </div>
            <div className="text-xs text-gray-600 truncate flex items-center gap-1">
              <User className="w-3 h-3 flex-shrink-0" />
              {teacher}
            </div>
          </div>
          <button
            className="opacity-0 group-hover:opacity-100 hover:bg-red-100 p-1 rounded-full transition-all duration-200 ml-2 flex-shrink-0"
            onClick={(e) => handleDeleteClick(e, routine.id)}
            aria-label="Delete routine"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    );
  };

  const selectedClassName = Classes.find(cls => cls.id.toString() === selectedClass)?.classname;

  return (
    <div className="min-h-screen  p-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
        <div className=" px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl text-gray-800 flex items-center gap-1">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Calendar1Icon className="w-8 h-8" />
                </div>
                Class Routine Management
              </h1>
              <p className="text-gray-500 mt-2 ms-3">Organize and manage class schedules efficiently</p>
            </div>
            <div className="flex items-center gap-3">

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border-1 border-gray-200 bg-gray-100 appearance-none outline-0 px-4 py-2 md:py-2 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" className="text-gray-800">Select Class</option>
                {Classes.map((cls) => (
                  <option key={cls.id} value={cls.id} className="text-gray-800">
                    {cls.classname}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedClassName && (
            <div className="mt-4 flex items-center gap-2 text-white/90">
              <CalendarCheck className="w-4 h-4" />
              <span className="text-sm font-medium">Currently viewing: <strong>{selectedClassName}</strong></span>
            </div>
          )}
        </div>
      </div>

      {selectedClass ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Weekly Schedule
            </h2>
            <p className="text-gray-600 text-sm mt-1">Click on any empty slot to add a routine</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white">
              <thead>
                <tr>
                  <th className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 font-bold text-center sticky left-0 z-20 border border-gray-300 min-w-[120px]">
                    <Clock className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm">Time</div>
                  </th>
                  {daysOfWeek.map((day) => (
                    <th key={day} className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-4 text-center font-semibold border border-gray-300 min-w-[150px]">
                      <div className="text-sm">{day.substring(0, 3)}</div>
                      <div className="text-xs opacity-75 mt-1">{day.substring(3)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, index) => (
                  <tr key={slot.startTime}>
                    <td className="bg-gray-50 border border-gray-300 text-center font-medium text-gray-700 sticky left-0 z-10 min-w-[120px]">
                      <div className="text-sm font-bold">{slot.startTime}</div>
                      <div className="text-xs text-gray-500">to</div>
                      <div className="text-sm font-bold">{slot.endTime}</div>
                    </td>
                    {daysOfWeek.map((day) => (
                      <td
                        key={`${day}-${slot.startTime}`}
                        className="bg-white border border-gray-300 p-2 cursor-pointer hover:bg-blue-50 transition-all duration-200 h-[100px] relative group min-w-[150px]"
                        onClick={() => handleSlotClick(day, slot)}
                      >
                        {findRoutine(day, slot.startTime, slot.endTime)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar1Icon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Class Selected</h3>
          <p className="text-gray-500 mb-6">Please select a class from the dropdown above to view and manage its routine</p>
          
        </div>
      )}

      {modalOpen && (
        <div  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-semibold text-white flex items-center gap-3">
                  <div className="p-1 bg-white/20 rounded-xl">
                    <Plus className="h-5 w-5" />
                  </div>
                  Add New Routine
                </h2>
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-white hover:bg-white/20 rounded-lg transition-colors" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className=" mb-2 font-semibold text-sm text-gray-700 flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-blue-600" />
                    Day
                  </label>
                  <input
                    type="text"
                    value={selectedSlot.dayOfWeek}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 font-medium text-gray-600"
                  />
                </div>

                <div>
                  <label className=" mb-2 font-semibold text-sm text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Time
                  </label>
                  <input
                    type="text"
                    value={`${selectedSlot.startTime} - ${selectedSlot.endTime}`}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 font-medium text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className=" mb-2 font-semibold text-sm text-gray-700 flex items-center gap-2">
                  <NotebookPen className="w-4 h-4 text-blue-600" />
                  Subject
                </label>
                <select
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Choose a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.subjectName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className=" mb-2 font-semibold text-sm text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Teacher
                </label>
                <select
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select a teacher</option>
                  {users
                    .filter((u) => u.role === "teacher")
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex flex-col md:flex-row gap-3 pt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.subjectId || !formData.teacherId}
                >
                  Add Routine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClassRoutine;