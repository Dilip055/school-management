import React from "react";
import { User } from "lucide-react";
import { useAuth } from "../Context/Authcontext";

const ProfilePage = () => {
  const { userInfo } = useAuth();
  return (
    <div className="p-2">
      <div className="rounded-xl bg-white p-6 mb-4 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between px-5">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
            <img
              src={
                userInfo?.profilePicture
                  ? `http://localhost:2000/${userInfo?.profilePicture}`
                  : 'https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg'
              }
              alt="Student"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-right">
            <h1 className="text-2xl font-bold mt-3 mb-3">{userInfo?.username}</h1>
            {userInfo?.role == "student" && (
              <>
                <p className="text-orange-500">{userInfo?.admissionNumber}</p>
                <p className="text-center">
                  {" "}
                  <span className="me-2">DOB:</span>{" "}
                  {new Date(userInfo?.dateOfBirth).toDateString()}
                </p>
              </>
            )}
            {userInfo?.role == "admin" && (
              <>
                <p className="text-orange-500 mb-3">{userInfo?.email}</p>
                
              </>
            )}
            
            <div className="flex flex-wrap justify-center md:justify-end">
              <div className=" mb-2">
                <span>Role:</span>
                <span className="ml-2 font-medium">{userInfo?.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {userInfo?.role == "student" && (
        <div className="grid grid-cols-1 lg:grid-cols-1">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white  rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <User className="text-indigo-500 mr-2" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b-1 border-gray-200 pb-1">
                  <span className="text-gray-500 text-sm">Father's Name:</span>{" "}
                  <p className="font-medium text-xl">
                    {userInfo?.Parents[0]?.username}
                  </p>
                </div>
                <div className="border-b-1 border-gray-200 pb-1">
                  <span className="text-gray-500 text-sm">Mother's Name:</span>{" "}
                  <p className="font-medium text-xl">
                    {userInfo?.Parents[0]?.motherName}
                  </p>
                </div>
                <div className="border-b-1 border-gray-200 pb-1">
                  <span className="text-gray-500 text-sm">Phone:</span>{" "}
                  <p className="font-medium text-xl">{userInfo?.phone}</p>
                </div>
                <div className="border-b-1 border-gray-200 pb-1">
                  <span className="text-gray-500 text-sm">Email:</span>{" "}
                  <p className="font-medium text-xl">
                    {userInfo?.Parents[0]?.email}
                  </p>
                </div>
                <div className="border-b-1 border-gray-200 pb-1">
                  <span className="text-gray-500 text-sm">Address:</span>{" "}
                  <p className="font-medium text-xl">{userInfo?.address}</p>
                </div>
                <div className="border-b-1 border-gray-200 pb-1">
                  <span className="text-gray-500 text-sm">Blood Group:</span>{" "}
                  <p className="font-medium text-xl">{userInfo?.bloodGroup}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {userInfo?.role == "teacher" && (
        <div className="grid grid-cols-1 lg:grid-cols-1">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <User className="text-indigo-500 mr-2" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 text-sm">Qualification:</span>{" "}
                  <p className="font-medium text-xl">
                    {userInfo?.qualification}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Salary:</span>{" "}
                  <p className="font-medium text-xl">{userInfo?.salary}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Subject Taught:</span>{" "}
                  <p className="font-medium text-xl">
                    {userInfo?.subjectsTaught}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Email:</span>{" "}
                  <p className="font-medium text-xl">{userInfo?.email}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Address:</span>{" "}
                  <p className="font-medium text-xl">{userInfo?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {userInfo?.role == "parent" && (
        <div className="grid grid-cols-1 lg:grid-cols-1">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <User className="text-indigo-500 mr-2" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 text-sm">Student Name:</span>{" "}
                  <p className="font-medium text-xl">
                    {userInfo?.Students[0]?.username}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Wife Name:</span>{" "}
                  <p className="font-medium text-xl">
                    {userInfo?.motherName}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Phone:</span>{" "}
                  <p className="font-medium text-xl">{userInfo?.phone}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Email:</span>{" "}
                  <p className="font-medium text-xl">
                    {userInfo?.email}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Address:</span>{" "}
                  <p className="font-medium text-xl">{userInfo?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
