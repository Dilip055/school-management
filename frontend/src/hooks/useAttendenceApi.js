import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useAttendenceApi = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const markBulkAttendance = async (classId, date, attendanceRecords) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/attendance/bulk`,
        { classId, date, attendanceRecords },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendance(prev => [...prev, ...attendanceRecords]);
      return {
        success: true,
        data: response?.data?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error?.response?.data?.error,
      };
    }finally{
      setLoading(false);
    }
  };

  const getAttendanceData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/attendance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendance(response.data);
    } catch (error) {
      setAttendance([]);
    }finally{
      setLoading(false);
    }
  };

  const deleteAttendanceByDate = async (studentId, date) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/attendance/${studentId}?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendance((prev) =>
        prev.filter((a) => a.studentId !== studentId || a.date !== date)
      );
      return {
        success: true,
        data: response?.data?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error?.response?.data?.error,
      };
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getAttendanceData();
  }, []);

  return {loading,
    markBulkAttendance,
    attendance,
    deleteAttendanceByDate,
  };
};

export default useAttendenceApi;
