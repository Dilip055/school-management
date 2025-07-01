import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const useUserApi = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);

  const fetchUsers = async () => {
    
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: err?.response?.data?.message || err.message,
        text: 'Could not load users. Try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(prev => prev.filter(user => user.id !== id));
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message  };
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUsers();
      setCredentials(response.data.credentials);
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message  };
    } finally {
      setLoading(false);
    }
  };

  const AddParent = async (parentData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user`,
        parentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUsers();
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message  };
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (passdata) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/updatePassword`,
        passdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUsers();
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message  };
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (id, formData) => {
    if (!formData) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await fetchUsers();
      return { success: true, data: response?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message  };
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeacher = async (teacherData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user`,
        teacherData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUsers();
      setCredentials(res.data.credentials);
      return { success: true, data: res?.data?.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message  };
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentDetails = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudentDetails(response.data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message ,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    handleDelete,
    handleAddUser,
    AddParent,
    fetchStudentDetails,
    studentDetails,
    handleEditUser,
    credentials,
    handleAddTeacher,
    fetchUsers,
    handleUpdatePassword,
  };
};

export default useUserApi;
