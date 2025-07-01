import React, { useEffect, useState } from "react";
import useInvoiceApi from "../../hooks/useInvoiceApi";
import { useAuth } from "../../Context/Authcontext";
import { BadgeIndianRupee, Banknote, Coins, Receipt, X } from "lucide-react";
import usePaymentApi from "../../hooks/usePaymentApi";
import Swal from "sweetalert2";

export default function StudentInvoices() {
  const { applyPayment } = usePaymentApi();
  const [error, setError] = useState("");
  const [open, setopen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    transactionId: "",
  });
  const [invoiceId, setInvoiceId] = useState("");
  const { getStudentInvoices, invoice } = useInvoiceApi();
  const { userInfo } = useAuth();
  useEffect(() => {
    if (userInfo?.id) {
      getStudentInvoices(userInfo.id)
      
    }
  }, [userInfo?.id]);

  if (!userInfo) {
    return <div>Loading student info...</div>;
  }

  const validate = () => {
    let newErrors = {};
    if (!formData.transactionId) {
      newErrors.transactionId = "TransactionId is Required";
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "PaymentMethod is Required";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
  const {error, data, success} =  await applyPayment(invoiceId, formData);
  if(success){
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
  }else{
    Swal.fire({
      icon: "error",
      title: error,
      text: "Something went wrong!",
    });
  }
    setopen(false)
    setFormData({
      amount: "",
      paymentMethod: "",
      transactionId: "",
    });
  };

  return (
    <div className="p-2">
      <div className=" mb-6 sm:mb-8 bg-white rounded-lg ">
        <h2 className="px-4 py-3 md:py-3 shadow-md text-xl md:text-3xl flex items-center gap-2 mb-1">
          <Receipt /> Fees Invoices
        </h2>
      </div>

      {invoice?.invoices?.length > 0 ? (
        invoice?.invoices?.map((inv) => (
          <>
          <div key={inv.id}>
            <div>
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-2 py-2 sm:p-6 rounded-xl  shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Invoice
                    </h2>
                    <p className="text-gray-600 font-mono border-1 px-1 py-1 rounded text-xs lg:text-lg">
                      #{inv.id}
                    </p>
                    <p className="text-gray-600 mt-2 text-sm lg:text-lg">
                      Student's Name:{" "}
                      <span className="font-semibold">
                        {userInfo?.username}
                      </span>
                    </p>
                    <p className="text-gray-600 text-sm mt-2 lg:text-lg">
                      DOB:{" "}
                      <span>
                        {new Date(userInfo?.dateOfBirth).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                  <div className="text-right space-y-3">
                    <div
                      className={`${
                        inv.status === "paid"
                          ? "text-green-500"
                          : "text-red-500"
                      } px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border inline-block`}
                    >
                      {inv.status}
                    </div>
                    <p className="text-sm lg:text-lg text-gray-600">
                      Due Date:{" "}
                      <span className="font-medium text-gray-900">
                        {new Date(inv.dueDate).toLocaleDateString()}
                      </span>
                    </p>
                    {inv.status === "unpaid" && (
                      <button
                        onClick={() => {
                          setopen(true);
                          setFormData((prev) => ({
                            ...prev,
                            amount: inv.totalAmount,
                          }));
                          setInvoiceId(inv.id);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600  text-white px-2 py-1 sm:px-4 sm:py-1 rounded lg:mt-2"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 mt-4 overflow-hidden">
        <div className="p-2 sm:p-6">
          <div className="space-y-4">
            {invoice?.fees?.map((fee, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-gray-800 lg:text-lg">
                    {fee.feeType}
                  </span>
                </div>
                <span className="font-bold text-gray-900">{fee.amount}</span>
              </div>
            ))}
            <div className="border-t-2 border-gray-200 pt-4 mt-6">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="text-md sm:text-lg font-bold text-gray-800">
                  Total Amount
                </span>

                {invoice?.invoices?.map((inv, idx) => (
                  <span className="text-lg sm:text-xl font-bold text-green-700" key={idx}>
                    {inv.totalAmount}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2 p-4 bg-green-50 rounded-lg">
                <span className="text-md sm:text-lg font-bold text-gray-800">
                  Paid Amount
                </span>

                {invoice?.invoices?.map((inv, idx) => (
                  <span className="text-lg sm:text-xl font-bold text-green-700" key={idx}>
                    {inv.paidAmount || "0.00"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
          </>
          
        ))
      ) : (
        <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-1 sm:mb-2">No Fee Invoice available</h3>
          </div>
      )}

      

      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full mx-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 rounded-t-3xl flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Receipt className="w-6 h-6" />
                Pay Fees
              </h3>
              <button
                onClick={() => {
                  setopen(false);
                  setFormData({
                    amount: "",
                    paymentMethod: "",
                    transactionId: "",
                  });
                }}
                className="text-white hover:text-red-200 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-6">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <BadgeIndianRupee className="w-4 h-4 text-blue-600" />{" "}
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    placeholder="#8569485623"
                    className="w-full px-3 py-2  md:py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-0"
                    onChange={handleChange}
                    value={formData.transactionId}
                  />
                  {error.transactionId && <p className="text-red-500">{error.transactionId}</p>}
                </div>

                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-blue-600" /> Payment Type
                  </label>
                  <select
                    name="paymentMethod"
                    onChange={handleChange}
                    value={formData.paymentMethod}
                    className="w-full px-3 py-2  md:py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-0"
                  >
                    <option value="">Select Payment Type</option>
                    <option value="Bank Account">Bank Account</option>
                    <option value="UPI">UPI</option>
                  </select>
                  {error.paymentMethod && <p className="text-red-500">{error.paymentMethod}</p>}
                </div>

                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-blue-600" /> Fee Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="25000"
                    className="w-full px-3 py-2  md:py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-0"
                    onChange={handleChange}
                    value={formData.amount}
                  />
                  {error.amount && <p className="text-red-500">{error.amount}</p>}
                </div>

                <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
