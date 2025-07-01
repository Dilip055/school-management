import axios from "axios"
import { useState } from "react"


const usePaymentApi = () => {
    const [payment, setPayment] = useState('')
    const [loading, setLoading] = useState(false)
  const applyPayment = async(id,formData)=>{
    try{
        setLoading(true)
        const token = localStorage.getItem("token")
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/add/${id}`,{...formData},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
        )
        setPayment((prev)=>[...prev, response.data])
        return{ success: true, data: response?.data?.message}
    }catch(error){
       
        return{ success: false, data: error?.response?.data?.message}
    }finally{
        setLoading(false)
    }
  
    
  }
  return {applyPayment, payment}
}

export default usePaymentApi