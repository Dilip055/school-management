import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const useClassRoutineApi = () => {
  const [classRoutine, setClassRoutine] = useState([]);
  const [loading, setLoading] = useState(false);
  

 
  const getToken = () => {
    return localStorage.getItem('token');
  };


  const getHeaders = () => {
    const token = getToken();
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const handleAddRoutine = async (formData) => {
    try {
      setLoading(true);      
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/classroutines`,
        formData,
        {
          headers: getHeaders(),
        }
      );
      
      setClassRoutine(prev => [...prev, response.data]);
      await fetchClassRoutine()
      return {success:true, data:response?.data?.message}
    } catch (err) {
      console.log(err)
      return {success:false, error:err?.response?.data?.message}
    }finally{
      setLoading(false);
    }
  }
  


  const handleDeleteRoutineApi = async (routineId) => {
    try {
      setLoading(true);
   const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/classroutines/${routineId}`,
        {
          headers: getHeaders(),
        }
      );
      
      setClassRoutine(prev => 
        prev.filter(routine => routine.id !== routineId)
      );
      
      return {success:true, data:response?.data?.message}
    } catch (err) {
      return {success:false, error:err?.response?.data?.message}
    } finally {
      setLoading(false);
    }
  };



  const fetchClassRoutine = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/classroutines`,
        {
          headers: getHeaders(),
        }
      );
      
     
      setClassRoutine(response.data);
      return {success:true, data:response?.data?.message}
    } catch (error) {
       setClassRoutine([]);
    }finally{
      setLoading(false);
    }
  };



 


  return {
    classRoutine,
    loading,
    handleAddRoutine,
   
    handleDeleteRoutineApi,
    fetchClassRoutine,
  };
};

export default useClassRoutineApi;  
