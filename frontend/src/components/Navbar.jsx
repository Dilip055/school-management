import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useAuth } from "../Context/Authcontext";
import { Link } from "react-router";
import UpdatePasswordModal from "./UpdatePasswordModal";
import { useState } from "react";

export default function Navbar() {
  const { userInfo } = useAuth();
  const [open, setOpen] = useState(false)

  return (
    <>
      <Disclosure as="nav" className="bg-white-1  00">
        <div className="mx-auto px-5">
          <div className="relative flex h-16 items-center justify-end">
            <div className="absolute inset-y-0 left-0 flex items-center"></div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex text-sm ">
                    <span className="absolute -inset-1.5" />
                    <img
                      alt="profile img"
                      src={
                        userInfo?.profilePicture
                          ? `http://localhost:2000/${userInfo?.profilePicture}`
                          : 'https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg'
                      }
                      className="size-10 rounded-lg"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    {userInfo?.role && (
                      <Link
                        to={
                          {
                            admin: "/admin/adminprofile",
                            teacher: "/teacher/teacherprofile",
                            student: "/student/dashboard/studentprofile",
                            parent: "/parent/dashboard/parentprofile",
                          }[userInfo.role]
                        }
                        className="block px-4 py-2 text-sm text-black font-semibold data-focus:outline-hidden text-decoration-none hover:bg-gray-200 transition-all duration-200"
                      >
                        {{
                          admin: "Admin Profile",
                          teacher: "Teacher Profile",
                          student: "Student Profile",
                          parent: "Parent's Profile",
                        }[userInfo.role] || "Profile"}
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    <Link className="block px-4 py-2 text-sm text-black font-semibold hover:bg-gray-200 transition-all duration-200 data-focus:outline-hidden text-decoration-none" onClick={()=>{
                      setOpen(true)
                    }}>Update Password</Link>
                 
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>


      {open && <UpdatePasswordModal
      setOpen={setOpen}/>}
    </>
  );
}
