import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  Award,
  Trophy,
  FileText,
  BookOpen,
  Users,
  Image,
  Camera,
  X,
  Trash2
} from "lucide-react";
import GalleryImgModal from "../../components/GalleryImgModal";
import Swal from "sweetalert2";
import useGalleryApi from "../../hooks/useGalleryApi";
import FullScreenLoader from "../../components/FullScreenLoader";

const ManageGallery = () => {
  const { handleAddGallery, gallery,fetchGallery, handleDeleteGallery, loading } = useGalleryApi();
  const [activeBtn, setActiveBtn] = useState("Event");
  const [open, setOpen] = useState(false);
  const [imageView, setImageView] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [formdata, setFromdata] = useState({
    imgcategory: "",
  });
  const [imgId, setImgId] = useState(null);
  const [error, setError] = useState({});

  const [openImg, setOpenImage] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const categories = [
    { label: "Event", icon: Calendar },
    { label: "Annual Function", icon: Award },
    { label: "Sports", icon: Trophy },
    { label: "Newspaper", icon: FileText },
    { label: "Academic", icon: BookOpen },
    { label: "Cultural", icon: Users },
    { label: "Infrastructure", icon: Image },
    { label: "Achievements", icon: Camera },
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setImageView(fileURLs);
    setImagePath(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidate = () => {
    let newErrors = {};

    if (!formdata.imgcategory || formdata.imgcategory.trim() === "") {
      newErrors.imgcategory = "Image Category Required";
    }
    if (!imagePath || imagePath.length === 0) {
      newErrors.imageview = "Please select images";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidate()) {
      return;
    }
    const imageData = new FormData();
    imagePath.forEach((file) => {
      imageData.append("galleryImgPath", file);
    });
    imageData.append("imgcategory", formdata.imgcategory);
    const { error, success, data } = await handleAddGallery(imageData);
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
      setOpen(false);
      setImageView([]);
      setImagePath(null);
      setError({});
    } else {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }
  };

  const handleImgDelete = async (id) => {
    const { error, success, data } = await handleDeleteGallery(id);
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
    setOpenImage(false);
    setSelectedImg(null);
  };



  const renderCategoryContent = (categoryLabel) => {
    const filteredImages = gallery?.filter(
      (img) => img.imgcategory?.toLowerCase() === categoryLabel?.toLowerCase()
    );

    return filteredImages.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 md:gap-4 gap-2">
        {loading ? (
           <FullScreenLoader />
        ) : (
          filteredImages.map((img, index) => (
            <div key={index} className=" rounded overflow-hidden w-full h-full">
              <img
                onClick={() => {
                  setImgId(img.id);
                  setOpenImage(true);
                  setSelectedImg(`http://localhost:2000/${img.galleryImgPath}`);
                }}
                src={`http://localhost:2000/${img.galleryImgPath}`}
                alt={`Gallery ${img.imgcategory}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        )}
      </div>
    ) : (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">{categoryLabel} Gallery</p>
        <p className="text-gray-400 text-sm mt-2">No images upload</p>
      </div>
    );
  };


  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      <div className="p-4 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-4xl text-gray-800">
              Gallery Management
            </h1>
            <p className="text-gray-600 text-sm">
              Manage your image collections
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded transition-colors hover:brightness-110"
          >
            <Plus size={18} />
            Add Images
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative max-w-sm">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              const isActive = activeBtn === category.label;
              return (
                <button
                  key={index}
                  onClick={() => setActiveBtn(category.label)}
                  className={`p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <IconComponent size={20} />
                    <span className="text-xs font-medium text-center">
                      {category.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            {(() => {
              const activeCategory = categories.find(
                (cat) => cat.label === activeBtn
              );
              const IconComponent = activeCategory?.icon || Image;
              return (
                <>
                  <IconComponent className="text-gray-600 md:h-5 md:w-5 h-4 w-4" />
                  <h3 className="text-sm  md:text-xl font-semibold text-gray-800 mb-0">
                    {activeBtn} Gallery
                  </h3>
                </>
              );
            })()}
          </div>

          <div className="min-h-[300px]">
            {renderCategoryContent(activeBtn)}
          </div>
        </div>
      </div>

      {open && (
        <GalleryImgModal
          setOpen={setOpen}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          imageView={imageView}
          handleChange={handleChange}
          formdata={formdata}
          error={error}
        />
      )}

      {openImg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div>
            <div className="absolute top-10 right-10 flex flex-col items-center gap-2">
              <button onClick={() => setOpenImage(false)}>
                <X className="w-6 h-6  text-white hover:bg-white/20 rounded-lg transition-colors" />
              </button>
              <button
                className="text-red-500 cursor-pointer"
                onClick={() => handleImgDelete(imgId)}
              >
                <Trash2 className="w-8" />
              </button>
            </div>
            <div className="md:w-150 md:h-100 lg:w-200 lg:h-150 h-50 w-70 mx-auto">
              <img
                src={selectedImg}
                alt=""
                className="md:w-full md:h-full  object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageGallery;
