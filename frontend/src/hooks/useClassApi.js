import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const useClassApi = () => {
    const [Classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [teacherClass, setTeacherClass] =useState([])
   
   
    const handleAddClass = async (formData) => {
        try {
          setLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/classes`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          await handlefetchClasses();
          return { success: true, data: response?.data?.message };
        } catch (error) {
          return { success: false, error: error.response?.data?.message };
          
        }finally{
          setLoading(false);
        }
      };

      const handleDelete = async (id) => {

        try {
          setLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/classes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setClasses(Classes.filter(classObj => classObj.id !== id));
          return {success: true, data: response?.data?.message}
        } catch (error) {
          return { success: false, error: error.response?.data?.message };
        }finally{
          setLoading(false);
        }
      };


      const handlefetchClasses = async () => {
        try{
          setLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         
          setClasses(response.data);
        }catch(error){
          Swal.fire({
            icon: "error",
            title: error,
            text: "Could not load classes. Try again later.",
          });
        }finally{
          setLoading(false);
        }
      };



      const handleEditClass = async (id, formData) => {
        try {
          setLoading(true);
          const token = localStorage.getItem('token');
        const response =   await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/classes/${id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          await handlefetchClasses();
         
          return { success: true, data: response?.data?.message }
        } catch (error) {
          return { success: false, error: error?.response?.data?.message };
        }finally{
          setLoading(false);
        }
        
      };


      const handleAssignClassTeacher = async (classTeacherData) => {
        try{
          setLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/classes/assign-teacher`,
            classTeacherData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            }
          );
         await handlefetchClasses()
         return {success: true, data: response?.data?.message}
        } catch (error) {
          return { success: false, error: error.response?.data?.message };
        }
        finally{
          setLoading(false);
        }
        
      }




      const fetchTeacherClass = async()=>{
        try{
          setLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classes/teacherclass`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTeacherClass(response.data)
          
        }catch(error){
          Swal.fire({
            icon: "error",
            title: error,
            text: "Could not load teacher class. Try again later.",
          });
        }
       
          
      }

      useEffect(() => {
        handlefetchClasses();
        
      }, []);

  return  {loading, handleAddClass, handleDelete ,handlefetchClasses,handleEditClass , handleAssignClassTeacher, Classes, fetchTeacherClass, teacherClass};
}

export default useClassApi