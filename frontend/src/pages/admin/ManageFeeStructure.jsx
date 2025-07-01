import React, { useMemo, useState } from "react";
import {
  BookmarkCheck,
  BookOpenCheck,
  Calendar1Icon,
  HandCoins,
  PenLine,
  Trash2,
  X,
} from "lucide-react";
import useClassApi from "../../hooks/useClassApi";
import useFeeStructApi from "../../hooks/useFeeStructApi";
import Swal from "sweetalert2";
import FullScreenLoader from "../../components/FullScreenLoader";


const ClassSelect = ({ value, onChange, Classes }) => (
  <select
    value={value}
    onChange={onChange}
    className="text-black px-2 py-2 rounded appearance-none bg-gray-200 border border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center"
  >
    <option value="">Select Class</option>
    {Classes?.map((cls) => (
      <option key={cls.id} value={cls.id}>
        {cls.classname}
      </option>
    ))}
  </select>
);

const ManageFeeStructure = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    classId: "",
    feeType: "",
    amount: "",
  });
  const [error, setError]=useState();

  const { Classes } = useClassApi();
  const {loading, feeStructures, handleAddFeeStructure, handleDeleteFeeStruct } = useFeeStructApi();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const validateForm = () => {
    const { feeType, amount } = formData;
    const newErrors = {};
  
    if (!feeType?.trim()) {
      newErrors.feeType = "Please select a valid Fee Type.";
    }
  
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Amount must be a valid number greater than 0.";
    }
  
    setError(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validation = validateForm();
    if (validation !== true) {
      return;
    }
   const { error, data, success } = await handleAddFeeStructure(formData)
   if(success){
    Swal.fire({
      icon: "success",
      text: data,
      confirmButtonText: "OK",
      confirmButtonColor: "#f97316",
  customClass: {
    popup: 'swal-small-popup',
    title: 'swal-small-title',
    text: 'swal-small-text',
    confirmButton: 'swal-small-btn',
  }
    })
  }else{
    Swal.fire({
      icon: "error",
      title: error,
      text: "Something went wrong!",
    })
  

  }
  setError("")
    setFormData({
      classId: selectedClass,
      feeType: "",
      amount: "",
      feeFrequency: "",
    });
    setShowModal(false);
  };

  const handleDeleteExam = async(id) => {
    const {error, success, data} = await handleDeleteFeeStruct(id)
      if(success){
        Swal.fire({
          icon: "success",
          text: data,
          confirmButtonText: "OK",
          confirmButtonColor: "#f97316",
      customClass: {
        popup: 'swal-small-popup',
        title: 'swal-small-title',
        text: 'swal-small-text',
        confirmButton: 'swal-small-btn',
      }
        })
      }else{
        Swal.fire({
          icon: "error",
          title: error,
          text: "Something went wrong!",
        })
  }}
 
  const sortedFeeStructure = (Array.isArray(feeStructures) ? feeStructures : [])
  .filter((feeStruct) => feeStruct.classId === selectedClass)
  .sort((a, b) => a.feeType.localeCompare(b.feeType));



  return (
    <>
    <div className="p-2">
    <div className="flex flex-col md:flex-row gap-3 items-start justify-between bg-white rounded-lg shadow-md mb-4 p-4">
        <h2 className="text-xl md:text-3xl text-gray-800 flex items-center">
          <HandCoins  className="w-8 h-8 me-2" />
          Manage Fee Structure
        </h2>

        <div className="flex justify-center items-center gap-3">
          <ClassSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            Classes={Classes}
          />
          {selectedClass && (
            <button
              onClick={() => {
                setShowModal(true);
                setFormData((prev) => ({ ...prev, classId: selectedClass }));
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded shadow-md"
            >
              + Add Fee
            </button>
          )}
        </div>
      </div>
    </div>
     


      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 transition-opacity duration-300">
          <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 rounded-t-3xl flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpenCheck className="w-6 h-6" />
                Add Fee Structure
              </h3>
              <button
                onClick={() => {setShowModal(false)
                  setError("")}
                }
                className="text-white hover:text-red-200 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-6">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                 
                  <select
            name="feeType"
            value={formData.feeType}
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          >
            <option> Select FeeType</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Exam Fee">Exam Fee</option>
            <option value="Transport Fee">Transport Fee</option>
          </select>
          {error?.feeType && <p className="text-red-600 text-sm mt-1">{error.feeType}</p>}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Ex. 5000"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    onChange={handleChange}
                    value={formData.amount}
                  />
                 {error?.amount && <p className="text-red-600 text-sm mt-1">{error.amount}</p>}
                </div>

                

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg"
                  >
                    Create Fee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {!selectedClass && <>
        <div className="overflow-x-auto bg-white rounded-lg mx-2">
            <div className=" text-center py-12 w-full   rounded-lg shadow-lg">Please select class</div>
          </div></>
      }

      {selectedClass && (
        <>
          <div className="overflow-x-auto p-4">
          <h2 className="text-xl font-semibold mb-4">
            Fee Structures for{" "}
            {Classes.find((c) => c.id === selectedClass)?.classname || "Selected Class"}
          </h2>
            <table className="w-full  border-gray-300 rounded-2xl shadow-sm">
              <thead className="bg-blue-100 text-left text-blue-600 font-semibold rounded-2xl">
                <tr>
                  <th className="py-2 text-center">Sr. No.</th>
                  <th className="py-2 text-center">Fee Type</th>
                  <th className="py-2 text-center">Amount</th>
                  <th className="py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <FullScreenLoader />
                ) : sortedFeeStructure.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12 bg-white text-gray-500">
                      No fee structures found.
                    </td>
                  </tr>
                ) : (
                  sortedFeeStructure.map((fee, idx) => (
                    <tr key={fee.id} className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white">
                      <td className="text-center px-4 py-3">{idx + 1}</td>
                      <td className="text-center px-4 py-3">{fee.feeType}</td>
                      <td className="text-center px-4 py-3">{fee.amount}</td>
                      <td className="text-center px-4 py-3">
                        <button
                          onClick={() => handleDeleteExam(fee.id)}
                          className="text-red-500 font-semibold "
                        >
                          <Trash2 className="w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                
                
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default ManageFeeStructure;
