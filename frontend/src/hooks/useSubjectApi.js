import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const useSubjectApi = () => {
   const [loading, setLoading] = useState(false)
   const [subjects, setSubjects] = useState([])



   const handleAddSubject = async (subjectData) => {
    try {
      setLoading(true)
        const token = localStorage.getItem('token')
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/subjects`,
            subjectData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      setSubjects(res.data)
      await fetchSubjects()
      return { success: true, data: res?.data?.message }
    } catch (error) {
      return { success: false, error: error?.response?.data?.message }
    }finally{
      setLoading(false)
    }
  }  



  const handleSubjectDelete = async (id) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
     const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/subjects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubjects(subjects.filter(student => student.id !== id));
      return { success: true, data: res?.data?.message }
    } catch (error) {
      return { success: false, error: error?.response?.data?.message }
    }finally{
      setLoading(false)
    }
  }


  const fetchSubjects = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/subjects`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
      )
      setSubjects(res.data)
      return { success: true, data: res?.data?.message }
    } catch (error) {
      setSubjects([])
    }finally{
      setLoading(false)
    }
  }





 useEffect(() => {
    fetchSubjects()
  }, [])

   return { subjects, loading, handleAddSubject,handleSubjectDelete }
}

export default useSubjectApi