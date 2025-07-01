import React, {  useCallback, useMemo, useState } from "react";
import useUserApi from "../../hooks/useUserApi";
import useClassApi from "../../hooks/useClassApi";
import { GripVertical, ReceiptText } from "lucide-react";
import useInvoiceApi from "../../hooks/useInvoiceApi";
import Swal from "sweetalert2";
import useFeeStructApi from "../../hooks/useFeeStructApi";

const ManageInvoiceGenerate = () => {
  const { users } = useUserApi();
  const { Classes } = useClassApi();
  const { feeStructures } = useFeeStructApi();
  const {
    handleInvoice,
    allInvoice,
    invoice,
    updateStatus,
   loading,
    setAllInvoice,
    handleDelete,
    getStudentInvoices,
  } = useInvoiceApi();

  const [openDropdown, setOpenDropdown] = useState("");
  
  const [selectedClass, setSelectedClass] = useState("");
  const students = users.filter((user) => user.role == "student");
  const filteredStudent = useMemo(() => {
    return students.filter((student) => student.classId == selectedClass);
  });
  const [openInvoiceDetail, setOpenInvoiceDetail] = useState(null);

 const handleInvoiceGenerate = async (id) => {
  const { error, data, success } = await handleInvoice(id);
  if (success) {
    setAllInvoice((prevInvoices) => [...prevInvoices, data]);
    Swal.fire({
      icon: "success",
      text: data,
      confirmButtonText: "OK",
      confirmButtonColor: "#f97316",
      customClass: {
        popup: "swal-small-popup",
        title: "swal-small-title",
        text: "swal-small-text",
        confirmButton: "swal-small-btn",
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: error,
      text: "Something went wrong!",
    });
  }
};

  const handleInvoiceDelete = async (id) => {
    const { error, data, success } = await handleDelete(id);
     allInvoice.filter((inv)=>inv.id !== id)
    if (success) {
      Swal.fire({
        icon: "success",
        text: data,
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          text: "swal-small-text",
          confirmButton: "swal-small-btn",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }
   
  };


  const handlegetStudentInvoiceDetail = async (id) => {
    await getStudentInvoices(id);
  };

 useCallback(()=>{
  getStudentInvoices()
  },[invoice,getStudentInvoices, allInvoice])

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 items-start justify-between bg-white rounded-lg shadow-md mb-4 p-4">
        <h2 className="text-xl md:text-3xl text-gray-800 flex items-center ">
          <ReceiptText className="w-8 h-8 me-2" />
          Manage Fee Structure
        </h2>

        <div className="flex justify-center items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="outline-0 bg-gray-200 rounded px-2 py-2 appearance-none text-center focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            {Classes.map((cls, idx) => (
              <option key={idx} value={cls.id}>
                {cls.classname}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!selectedClass ? (
        <div className="bg-white shadow-sm py-12 rounded-lg text-center">
          <h3>Please Select Class</h3>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg shadow">
          <table className="min-w-max w-full table-auto text-sm border-collapse bg-white">
            <thead className="bg-blue-50 text-left text-blue-600 font-semibold">
              <tr className="text-center">
                <th className="sm:p-1 md:p-3">SR. No.</th>
                <th className="p-3 rounded-tl-lg">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Student ID</th>
                <th className="p-3">Class</th>
                <th className="p-3">Father Name</th>
                <th className="p-3">Mother Name</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={14} className="text-center p-12">
                    Loading...
                  </td>
                </tr>
              ) : filteredStudent.length === 0 ? (
                <tr>
                  <td colSpan={14} className="text-center p-12 text-gray-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudent.map((student, idx) => (
                  <tr
                    key={student.id || idx}
                    className="text-center hover:bg-gray-50 even:bg-gray-100 odd:bg-white"
                  >
                    <td className="p-3 font-medium">{idx + 1}</td>
                    <td className="p-2 w-20">
                      <img
                        src={`http://localhost:2000/${student.profilePicture}`}
                        alt="avatar"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3 font-medium">{student.username}</td>
                    <td className="p-3 text-orange-500 font-semibold">
                      {student.admissionNumber || "N/A"}
                    </td>
                    <td className="p-3">
                      {Classes.find((c) => c.id === student.classId)?.classname ||
                        "N/A"}
                    </td>
                    <td className="p-3">
                      {student.Parents?.[0]?.username || "N/A"}
                    </td>
                    <td className="p-3">
                      {student.Parents?.[0]?.motherName || "N/A"}
                    </td>

                    <td className="p-3">
                      {(() => {
                        const studentInvoices = allInvoice?.filter(
                          (invoice) => invoice.studentId === student.id
                        );
                        

                        if (studentInvoices.length === 0) {
                          return (
                            <span className="text-red-600 font-semibold">
                              Fee Not Assigned
                            </span>
                          );
                        }

                        const hasPaid = studentInvoices.some(
                          (inv) => inv.status === "paid"
                        );

                        return hasPaid ? (
                          <span className="text-green-600 font-semibold">
                            Fee Assigned (Paid)
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-semibold">
                            Fee Assigned (Pending)
                          </span>
                        );
                      })()}
                    </td>

                    <td className="ps-10 relative">
                      <GripVertical
                        className="cursor-pointer w-5"
                        aria-label="More actions"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === student.id ? null : student.id
                          )
                        }
                      />

                      {openDropdown === student.id && (
                        <div className="absolute right-17 mt-2 w-42 bg-gray-100 border-2 border-gray-200 rounded shadow-md z-10">
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                              handleInvoiceGenerate(student.id);
                              setOpenDropdown(null);
                            }}
                          >
                            Generate Invoice
                          </button>

                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 "
                            onClick={() => {
                              handlegetStudentInvoiceDetail(student.id);
                              setOpenInvoiceDetail(true);
                            }}
                          >
                            View Invoice
                          </button>

                          <button
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                            onClick={() => {
                              handleInvoiceDelete(student.id);
                              setOpenDropdown(null);
                            }}
                          >
                            Delete Invoice
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}


{openInvoiceDetail && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <ReceiptText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Fee Invoice Details</h2>
              <p className="text-blue-100 text-sm">Student Fee Information</p>
            </div>
          </div>
          <button
            onClick={() => setOpenInvoiceDetail(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
 
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-2 h-6 rounded-full"></div>
            Fee Structure
          </h3>
          
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Sr.No.</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Fee Type</th>
                    <th className="py-3 px-4 text-right font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice ? (
                    invoice.fees && invoice.fees.length > 0 ? (
                      invoice.fees.map((fee, index) => (
                        <tr key={`fee-${fee.id || index}`} className="hover:bg-white transition-colors">
                          <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                          <td className="py-3 px-4 font-medium text-gray-800">{fee.feeType}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-800">₹{fee.amount.toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center py-8 text-gray-500">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                              <ReceiptText className="w-6 h-6 text-gray-400" />
                            </div>
                            No Fee Structures Found
                          </div>
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center py-8 text-red-500">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          No Data Found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {invoice?.invoices?.map((inv, idx) => (
          <div key={`invoice-${inv.id || idx}`} className="mb-6 last:mb-0">
            <h3 className="text-lg font-semibold text-gray-800  flex items-center">
              <div className="w-2 h-6 rounded-full"></div>
              Payment Summary
            </h3>
            
            <div className=" rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-800">₹{inv.totalAmount.toLocaleString()}</p>
                    </div>
                   
                  </div>
                </div>

              
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                      <p className="text-2xl font-bold text-green-600">₹{(inv.paidAmount || 0).toLocaleString()}</p>
                    </div>
                   
                  </div>
                </div>

        
                
              </div>

          
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col md:flex-row gap-3 items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600">Payment Status:</span>
                    {inv.paidAmount > 0 ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          Partially Paid
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                          {inv.status || 'Unpaid'}
                        </span>
                         <ChangeStatus
                      invoice={inv}
                      updateStatus={updateStatus}
                    />
                      </div>
                    )}
                  </div>
                  
               
                   
                
                </div>
              </div>
            </div>
          </div>
        ))}

 
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            onClick={() => setOpenInvoiceDetail(false)}
            className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
          >
            Close
          </button>
          
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default ManageInvoiceGenerate;


export const ChangeStatus = ({ invoice, updateStatus }) => {
  const [paymentStatus, setPaymentStatus] = useState(invoice.status);
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async () => {
    setLoading(true);
    const { data, success, error } = await updateStatus(invoice.id);
    setLoading(false);

    if (success) {
      Swal.fire({
        icon: "success",
        text: data,
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          text: "swal-small-text",
          confirmButton: "swal-small-btn",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }
  };

  const isStatusChanged = paymentStatus !== invoice.status;

  return (
    <div className="flex items-center gap-2">
      <select
        name="status"
        value={paymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
        className="px-3 py-1.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 outline-0 appearance-none"
      >
        <option value="unpaid">Unpaid</option>
        <option value="paid">Paid</option>
      </select>

      <button
        onClick={handleUpdateStatus}
        disabled={!isStatusChanged || loading}
        className={`px-4 py-1.5 rounded-lg text-sm text-white transition-all
          ${loading ? 'bg-gray-400 cursor-not-allowed' :
            isStatusChanged ? 'bg-orange-500 hover:bg-orange-600' :
              'bg-gray-300 cursor-not-allowed'}
        `}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

