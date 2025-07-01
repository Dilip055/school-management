
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const useStudyMeterialApi = () => {
  const [studyMeterial, setStudyMeterial] = useState([]);
  const [studentMeterial, setStudentMeterial] = useState([]);
  const [studentClassMeterial, setStudentClassMeterial] = useState([]);
  const [loading, setLoading] = useState(false);
  const getToken = () => localStorage.getItem('token');

  const handleCreateStudyMeterial = async (formData, classId, subjectId) => {
    try {
      setLoading(true);
      const token = getToken();

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/studymaterials`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudyMeterial((prev) => [...prev, response.data]);
      await fetchAllStudyMeterial(classId, subjectId);

      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, data: error?.response?.data?.message };
    }finally{
      setLoading(false);
    }
  };

  const fetchAllStudyMeterial = async (classId, subjectId) => {
    try {
      setLoading(true);
      const token = getToken();

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/studymaterials`,
        {
          params: { classId, subjectId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudyMeterial(res.data);
    } catch (err) {
      console.error('Failed to fetch study materials:', err);
    }finally{
      setLoading(false);
    }
  };

  const fetchMeterial = async () => {
    try {
      setLoading(true);
      const token = getToken();

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/studymaterials`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudentMeterial(res.data);
    } catch (err) {
      console.error('Failed to fetch student material:', err);
    }finally{
      setLoading(false);
    }
  };

  const fetchClassStudyMeterial = async () => {
    try {
      setLoading(true);
      const token = getToken();

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/studymaterials/student`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudentClassMeterial(response.data);
    } catch (err) {
      console.error('Failed to fetch class material:', err);
    }finally{
      setLoading(false);
    }
  };



  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const token = getToken();

      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/studymaterials/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudyMeterial(prev => prev.filter(material => material.id !== id));
     return { success: true, data: response?.data?.message };
    } catch (err) {
      return { success: false, data: err?.response?.data?.message };
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeterial();
    fetchAllStudyMeterial();
    fetchClassStudyMeterial();
  }, []);

  return {
    loading,
    handleCreateStudyMeterial,
    studyMeterial,
    studentMeterial,
    studentClassMeterial,
    fetchAllStudyMeterial,
    fetchMeterial,
    fetchClassStudyMeterial,
    handleDelete
  };
};


export default useStudyMeterialApi