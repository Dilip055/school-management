import React, { useState } from "react";

import { Award, BookOpen, Calendar, Camera, FileText, Sparkles, Trophy, Users, X } from "lucide-react";
import Breadcrumb from "../Components/Breadcrumb";
import useGalleryApi from "../../hooks/useGalleryApi";


const GalleryPage = () => {
  const { gallery } = useGalleryApi();
  const [openImg, setOpenImage] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeBtn, setActiveBtn] = useState("Event");
  const [searchQuery, setSearchQuery] = useState("");

  
 

  
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



  const filteredCategories = categories.filter((category) =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const renderCategoryContent = (categoryLabel) => {
    const filteredImages = gallery.filter(
      (img) => img.imgcategory.toLowerCase() === categoryLabel.toLowerCase()
    );

    return filteredImages.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredImages.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 group">
            <img
            onClick={() => {
                  setOpenImage(true);
                  setSelectedImg(`http://localhost:2000/${img.galleryImgPath}`);
                }}
              src={`http://localhost:2000/${img.galleryImgPath}`}
              alt={`Gallery ${img.imgcategory}`}
              className=":w-full md:h-64 h-30 object-cover transform group-hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">{categoryLabel} Gallery</p>
        <p className="text-gray-400 text-sm mt-2">No images uploaded yet.</p>
      </div>
    );
  };

  
  return (
    <>
      <Breadcrumb label={"Our Gallery"} />
      

      {openImg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div>
            <div className="absolute top-10 right-10">
              <button onClick={() => setOpenImage(false)}>
                <X className="w-8 h-8 text-amber-400" />
              </button>
            </div>
            <div className="md:w-200 md:h-150 h-50 w-70 mx-auto">
              <img
                src={selectedImg}
                alt=""
                className="md:w-full md:h-full  object-cover"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm px-3 pb-3 md:px-18 md:pt-20 md:pb-10">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-8"><Sparkles className="float-left md:w-6 w-4 me-1 mt-1" />Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {filteredCategories.map((category, index) => {
  
  const isActive = activeBtn === category.label;
  return (
    <button
      key={index}
      onClick={() => setActiveBtn(category.label)}
      className={`p-3 rounded-lg transition-colors flex flex-col items-center ${
        isActive
          ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
  
      
      <span className="text-xs font-medium text-center">
        {category.label}
      </span>
    </button>
  );
})}

        </div>
      </div>

      <div className="bg-white px-3 mt-3 md:px-18 md:pt-10 md:pb-10">
        <div className="flex items-center gap-2 mb-4">
          {(() => {
            const activeCategory = categories.find(
              (cat) => cat.label === activeBtn
            );
            
            return (
              <>
                
                <h3 className="text-xl font-semibold text-gray-800">
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
    </>
  );
};

export default GalleryPage;
