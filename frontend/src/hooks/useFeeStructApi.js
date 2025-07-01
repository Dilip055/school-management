import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const useFeeStructApi = () => {
  const [feeStructures, setfeeStructures] = useState([]);
  const [loading, setLoading] = useState(false);
 
 
  const handleAddFeeStructure = async (formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/fee-structures`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchFeeStruct();
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchFeeStruct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/fee-structures`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setfeeStructures(response.data);
    } catch (error) {
      setfeeStructures([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeeStruct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/fee-structures/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setfeeStructures(
        feeStructures.filter((feeStruct) => feeStruct.id !== id)
      );
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeStruct();
  }, []);
  return {
    loading,
    feeStructures,
    fetchFeeStruct,
    handleAddFeeStructure,
    handleDeleteFeeStruct,
  };
};

export default useFeeStructApi;
