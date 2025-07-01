import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import logo from '../assets/logo.png'
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import { useAuth } from "../Context/Authcontext";
import FullScreenLoader from "../components/FullScreenLoader";

export default function Login() {
  const { register, trigger, formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:2000/api/auth/login", data);
      const role = res.data.role;
      const userData = { id: res.data.id, role: role };
      login(userData, res.data.token);

      if (role === "admin") navigate("/admin");
      else if (role === "student") navigate("/student/dashboard");
      else if (role === "teacher") navigate("/teacher");
      else if (role === "parent") navigate("/parent/dashboard");
      
      Swal.fire({
        title: 'Login Successful',
        text: res?.data?.message,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: "#f97316",
        customClass: {
          popup: 'swal-small-popup',
          title: 'swal-small-title',
          text: 'swal-small-text',
          confirmButton: 'swal-small-btn',
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };



 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading && <FullScreenLoader />}
      <div className="flex flex-col md:flex-row w-[900px] mx-2  rounded bg-white shadow-lg overflow-hidden md:rounded-lg">

        <div className="md:w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex flex-col items-center justify-center p-8">
          <img src={logo} alt="Logo" className="w-24 mb-4" />
          <h5 className="text-lg text-center font-medium mt-2">"Empowering Minds, Shaping Futures."</h5>
        </div>


        <div className="md:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-bold text-center mb-2">Sign in to your account</h3>
            <p className="text-center text-gray-500 mb-5">Login with your credentials</p>

            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

            
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  <Mail className="float-left w-4 h-4 text-blue-600 me-1 mt-1" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address"
                    }
                  })}
                  onBlur={() => trigger('email')}
                  className="w-full md:px-3 md:py-3 py-2 px-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
              </div>


              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  <KeyRound className="float-left w-4 h-4 text-blue-600 me-1 mt-1" />
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters"
                    }
                  })}
                  onBlur={() => trigger('password')}
                  className="w-full md:px-3 md:py-3 py-2 px-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <Link to="/" className="text-center text-sm text-blue-500 hover:underline text-decoration-none"><ArrowLeft className="float-left w-5 h-5 mt-1" /> Back to Home</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}