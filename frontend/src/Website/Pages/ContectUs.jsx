import React, { useState } from "react";
import { BookOpen, Mail, MapPin, Pen, Phone, User, Send, Clock, Globe } from "lucide-react";
import Breadcrumb from "../Components/Breadcrumb";
import axios from "axios";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Phone: "",
    Subject: "",
    Message: ""
  });
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (error[name]) {
      setError(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleValidate = () => {
    let newErrors = {};
    
    if (!formData.Username) {
      newErrors.Username = 'Name is required';
    } else if (formData.Username.length < 2) {
      newErrors.Username = 'Name must be at least 2 characters';
    }
    
    if (!formData.Email) {
      newErrors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = "Please enter a valid email";
    }
    
    if (!formData.Phone) {
      newErrors.Phone = 'Phone number is required';
    } else if (formData.Phone.length !== 10) {
      newErrors.Phone = 'Phone number must be exactly 10 digits';
    }
    
    if (!formData.Subject) {
      newErrors.Subject = 'Subject is required';
    }
    
    if (!formData.Message) {
      newErrors.Message = 'Message is required';
    } else if (formData.Message.length < 10) {
      newErrors.Message = 'Message must be at least 10 characters';
    }
    
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidate()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/submitInquiry`,
        formData 
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#10b981",
          customClass: {
            popup: 'swal-small-popup',
            title: 'swal-small-title',
            text: 'swal-small-text',
            confirmButton: 'swal-small-btn',
          }
        });
        setFormData({ Username: "", Email: "", Phone: "", Subject: "", Message: "" }); 
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || error.message || "Failed to send message",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: 'swal-small-popup',
          title: 'swal-small-title',
          text: 'swal-small-text',
          confirmButton: 'swal-small-btn',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+91-7894561231",
      description: "Mon-Fri 9AM-6PM"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "InfoapolloInter@gmail.com",
      description: "We'll respond within 24hrs"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Loyola Hall, Naranpura, Ahmedabad, Gujarat 380013",
      description: "Come see our campus"
    }
  ];

  return (
    <>
      <Breadcrumb label={'Contact Us'} />
      
    
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Connect</span> With Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Have questions about admissions, programs, or campus life? We're here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Quick Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Expert Guidance</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{info.title}</h3>
                </div>
                <p className="text-gray-700 font-medium mb-2">{info.content}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 text-blue-500" />
                      Full Name
                    </label>
                    <input
                      name="Username"
                      value={formData.Username}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all ${
                        error.Username ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                    />
                    {error.Username && <p className="text-sm text-red-500 mt-1">{error.Username}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-blue-500" />
                      Phone Number
                    </label>
                    <input
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="Enter your phone"
                      className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all ${
                        error.Phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                    />
                    {error.Phone && <p className="text-sm text-red-500 mt-1">{error.Phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    Email Address
                  </label>
                  <input
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all ${
                      error.Email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {error.Email && <p className="text-sm text-red-500 mt-1">{error.Email}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    Subject
                  </label>
                  <input
                    name="Subject"
                    value={formData.Subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="What is your inquiry about?"
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all ${
                      error.Subject ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {error.Subject && <p className="text-sm text-red-500 mt-1">{error.Subject}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Pen className="w-4 h-4 text-blue-500" />
                    Message
                  </label>
                  <textarea
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us more about your inquiry..."
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all resize-none ${
                      error.Message ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {error.Message && <p className="text-sm text-red-500 mt-1">{error.Message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

          
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Us Here</h3>
                  <p className="text-gray-600 text-sm mb-4">Visit our campus to get a feel for our learning environment.</p>
                </div>
                <div className="h-80 w-full">
                  <iframe
                    title="School Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.181043907259!2d72.834657!3d19.1368466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b65f95b1e0ab%3A0x9f5e3f786a6b5c1e!2sYour%20School%20Name!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* FAQ or Additional Info */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Quick Answers?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Admission Process</p>
                      <p className="text-sm text-gray-600">Learn about our admission requirements and deadlines</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Campus Tours</p>
                      <p className="text-sm text-gray-600">Schedule a personalized campus visit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Programs & Curriculum</p>
                      <p className="text-sm text-gray-600">Explore our academic offerings and extracurriculars</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;