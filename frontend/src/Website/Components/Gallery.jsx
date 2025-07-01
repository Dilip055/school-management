import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookOpen } from "lucide-react";
import useGalleryApi from "../../hooks/useGalleryApi";
import { useNavigate } from "react-router";


const Gallery = () => {
  const navigate = useNavigate();
  const { gallery } = useGalleryApi();
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className=" px-4 py-20 bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <BookOpen className="w-4" />
          Snapshots of School Life
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-2 md:mb-4 text-center">Photo Gallery</h2>
      <p className="text-sm text-center sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Explore highlights of our vibrant campus life, from classrooms to
        cultural events and beyond
      </p>
      <Slider {...settings} className=" mt-8 md:mt-16">
        {gallery.map((img, index) => (
          <div key={index} className="px-2">
            <img
              src={`http://localhost:2000/${img.galleryImgPath}`}
              alt={`Slide ${index}`}
              className="rounded-xl w-full h-64 object-cover shadow-lg"
            />
          </div>
        ))}
      </Slider>
      <div className="flex justify-center mt-8 md:mt-16">
        <button onClick={()=> navigate('/gallery')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 font-semibold  py-3 rounded-lg shadow-lg hover:brightness-110">
          View All
        </button>
        </div>
    </div>
  );
};

export default Gallery;