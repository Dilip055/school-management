import React, { useState } from "react";
import { applyPayment } from "../../api/useInvoiceApi";
import Swal from "sweetalert2";

const ApplyPaymentModal = ({ invoice, onClose }) => {
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyPayment(invoice.id, formData);
      Swal.fire("Success", "Payment Applied!", "success");
      onClose();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Apply Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label>Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Method</option>
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {formData.paymentMethod === "Online" && (
            <div>
              <label>Transaction ID</label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyPaymentModal;
