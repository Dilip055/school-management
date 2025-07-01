import {  KeyRound, Lock, Mail, X } from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useUserApi from "../hooks/useUserApi";



const UpdatePasswordModal = ({ setOpen }) => {
    const {handleUpdatePassword} = useUserApi();
  const [passData, setPassData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!passData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(passData.email))
      newErrors.email = "Invalid email";

    if (!passData.oldPassword) newErrors.oldPassword = "Old password is required";
    if (!passData.newPassword) newErrors.newPassword = "New password is required";
    if(!passData.confirmNewPassword) newErrors.confirmNewPassword = "Confirm password is required";
    if (passData.newPassword !== passData.confirmNewPassword)
      newErrors.confirmNewPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
        const {confirmNewPassword, ...formData} = passData;
        const { error, data, success } = await handleUpdatePassword(formData);
        if (success) {
          await Swal.fire({
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
          setOpen(false); 
        } else {
          await Swal.fire({
            icon: "error",
            title: error || "Error",
            text: "Something went wrong!",
          });
        }
    } 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-3xl w-xl max-w-sm sm:max-w-md relative shadow-lg mx-4">
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl px-5 py-6">
        
        <h3 className="text-lg sm:text-2xl font-semibold text-white"><KeyRound className="float-left me-1 mt-1 w-5"/>Update Password</h3>
        <X
          className="h-6 w-6 text-white right-4 cursor-pointer hover:bg-white/20 rounded-lg transition-colors"
          onClick={() => setOpen(false)}
        />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 p-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1"><Mail className="w-4 h-4 text-blue-600 float-left me-1 mt-1" />Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={passData.email}
              onChange={handleChange}
              className="w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

        
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Lock className="w-4 h-4 text-blue-600 float-left me-1 mt-1"/> Old Password
            </label>
            <input
              name="oldPassword"
              type="password"
              placeholder="••••••••"
              value={passData.oldPassword}
              onChange={handleChange}
              className="w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>
            )}
          </div>

 
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
             <KeyRound className="w-4 h-4 text-blue-600 float-left me-1 mt-1"/> New Password
            </label>
            <input
              name="newPassword"
              type="password"
              placeholder="••••••••"
              value={passData.newPassword}
              onChange={handleChange}
              className="w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
            <KeyRound className="w-4 h-4 text-blue-600 float-left me-1 mt-1"/> Confirm New Password
            </label>
            <input
              name="confirmNewPassword"
              type="password"
              placeholder="••••••••"
              value={passData.confirmNewPassword}
              onChange={handleChange}
              className="w-full px-3 md:py-2.5 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>


          <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto px-6 py-2 mx:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 mx:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
