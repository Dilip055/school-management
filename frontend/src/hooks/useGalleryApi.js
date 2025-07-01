
import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const useGalleryApi = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  const handleAddGallery = async (formData) => {
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/gallery`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setGallery((prev) => [...prev, response?.data]);
      await fetchGallery();
      return { success: true, data: response?.data.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message };
    }finally{
      setLoading(false);
    }
  };


  const fetchGallery = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/gallery`);
      setGallery(response?.data);

    }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message,
      });
    
  }
      
  };

  const handleDeleteGallery = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGallery((prev) => prev.filter((item) => item.id !== id));
      return { success: true, data: response?.data.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message };
    }finally{
      setLoading(false);
    }
  };




  return { handleAddGallery, fetchGallery, gallery, handleDeleteGallery, loading };
}

export default useGalleryApi