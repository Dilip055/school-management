import { BookImage, ImagePlus, Logs, X } from "lucide-react";


const GalleryImgModal = ({
  setOpen,
  handleSubmit,
  imageView,
  handleFileChange,
  handleChange,
  formdata,
  error,
}) => {
  const closeStudentModal = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        className="fixed  inset-0 z-50 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
          <div
            className="fixed inset-0 bg-black/70 transition-opacity"
            onClick={closeStudentModal}
          ></div>

          <div className="relative w-xl max-w-md sm:max-w-7xl transform rounded-3xl bg-white shadow-2xl transition-all z-10">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3
                  className="text-lg sm:text-2xl font-semibold text-white flex items-center gap-2"
                
                >
                  <ImagePlus className="w-6 h-6" aria-hidden="true" />
                  Add Gallery Images
                </h3>
                <button
                  onClick={closeStudentModal}
                  value={formdata.imgcategory}
                  className="text-white hover:text-red-200 transition-colors p-1"
                  aria-label="Close modal"
                >
                  <X className="w-7 h-7 hover:bg-white/20 rounded-lg transition-colors p-1" />
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-6 py-6 max-h-[70vh] overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                      {imageView.length === 0 ? (
                        <img
                          src="https://i.pinimg.com/564x/5c/cb/ed/5ccbedefd717dcb9492ee009fe577db8.jpg"
                          alt="Default Banner"
                          className="w-10 lg:w-30 object-cover rounded-lg shadow-md col-span-6 bg-white"
                        />
                      ) : (
                        imageView.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Image ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-md"
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <Logs className="w-4 h-4 text-blue-600 float-left me-1" />
                        Select Image Category
                      </label>
                      <select
                        onChange={handleChange}
                        name="imgcategory"
                        className="w-full mb-0 px-3 py-2 mx:py-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-gray-50 focus:bg-white outline-none"
                      >
                        <option value="">Select Image Category</option>
                        <option value="Event">Event</option>
                        <option value="Annual Function">Annual Function</option>
                        <option value="Sports">Sports</option>
                        <option value="NewsPaper">NewsPaper</option>
                        <option value="Academic">Academic</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Achievements">Achievements</option>
                      </select>
                      {error.imgcategory && (
                        <p className="text-red-500 text-xs">
                          {error.imgcategory}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                        <BookImage className="w-4 h-4 text-blue-600 float-left" />
                        Select Images
                      </label>
                      <input
                        type="file"
                        id="avatarInput"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full mb-0 px-3 py-2 mx:py-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-gray-50 focus:bg-white outline-none"
                      />
                      {error.imageview && (
                        <p className="text-red-500 text-xs">{error.imageview}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeStudentModal}
                    className="w-full sm:w-auto px-6 py-2 mx:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 mx:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
                  >
                    Add Images
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryImgModal;
