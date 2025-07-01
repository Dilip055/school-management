// components/FullScreenLoader.jsx
import React from "react";
import { ClipLoader } from "react-spinners";

const FullScreenLoader = () => {
  return (
    <>
    <div className="fixed inset-0 bg-black/70 z-100 flex items-center justify-center">
      <ClipLoader color="#f7a13d" size={106} />
    </div>
    </>
    
  );
};

export default FullScreenLoader;
