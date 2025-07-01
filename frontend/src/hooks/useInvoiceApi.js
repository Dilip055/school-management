// useInvoiceApi.js
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useInvoiceApi = () => {
  const [invoice, setInvoice] = useState([]);
  const [allInvoice, setAllInvoice] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInvoice = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/invoice/add/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInvoice(response.data);
      getAllInvoice();
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getAllInvoice = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/invoice`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllInvoice(response.data);
    } catch (error) {
      setAllInvoice([]);
    }finally{
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/invoice/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setAllInvoice((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice.studentId !== studentId)
      );
      
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  const getStudentInvoices = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/invoice/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInvoice(response.data);
    } catch (error) {
     setInvoice([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (invoiceId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/invoice/${invoiceId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setAllInvoice((prevInvoices) =>
        prevInvoices.map((inv) =>
          inv.id === invoiceId ? { ...inv, status: response.data.status } : inv
        )
      );
      
      setInvoice((prevInvoices) =>
        prevInvoices.map ? 
        prevInvoices.map((inv) =>
          inv.id === invoiceId ? { ...inv, status: response.data.status } : inv
        ) : prevInvoices
      );
      
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInvoice();
  }, []);

  return {
    invoice,
    getStudentInvoices,
    handleInvoice,
    allInvoice,
    setAllInvoice,
    getAllInvoice,
    handleDelete,
    updateStatus,
    loading,
  };
};

export default useInvoiceApi;