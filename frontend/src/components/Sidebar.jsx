import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Home,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  Grid3X3,
  Menu,
  X,
  ChevronRight,
  User,
  List,
  FileText,
  Calendar,
  BarChart3,
  MessageSquare,
  CreditCard,
  Bell,
  Award,
  BookmarkCheck,
  LogOut,
  Calendar1,
  CheckSquare,
  Upload,
  Eye,
  Download,
  CalendarCheck,
  School,
  HandCoins,
  Images,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "../Context/Authcontext";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const { logout, user, userInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = {
    admin: [
      {
        key: "dashboard",
        icon: <Home className="w-5 h-5" />,
        label: "Dashboard",
        path: "/admin",
        badge: null,
      },
      {
        key: "gallery",
        icon: <Images className="w-5 h-5" />,
        label: "Manage Gallery",
        path: "/admin/gallery",
        badge: null,
      },
      {
        key: "attendance",
        icon: <BookmarkCheck className="w-5 h-5" />,
        label: "Attendance",
        path: "/admin/attendance",
        badge: "New",
      },
      {
        key: "student",
        icon: <GraduationCap className="w-5 h-5" />,
        label: "Students",
        badge: "24",
        children: [
          {
            key: "student-list",
            name: "Manage Student",
            path: "/admin/student/list",
            icon: <List className="w-4 h-4" />,
          },
        ],
      },
      {
        key: "teacher",
        icon: <UserCheck className="w-5 h-5" />,
        label: "Teachers",
        badge: "12",
        children: [
          {
            key: "teacher-list",
            name: "Manage Teachers",
            path: "/admin/teacher/list",
            icon: <List className="w-4 h-4" />,
          },
        ],
      },
      {
        key: "parent",
        icon: <Users className="w-5 h-5" />,
        label: "Parents",
        badge: "18",
        children: [
          {
            key: "parent-list",
            name: "Manage Parent",
            path: "/admin/parent/list",
            icon: <List className="w-4 h-4" />,
          },
        ],
      },
      {
        key: "Events",
        icon: <CalendarCheck className="w-5 h-5" />,
        label: "Events",
        badge: "8",
        children: [
          {
            key: "manage-events",
            name: "Manage Events",
            path: "/admin/events",
            icon: <Grid3X3 className="w-4 h-4" />,
          },
        ],
      },
      {
        key: "classes",
        icon: <School className="w-5 h-5" />,
        label: "Classes",
        badge: "8",
        children: [
          {
            key: "manage-classes",
            name: "Manage Classes",
            path: "/admin/classes",
            icon: <Grid3X3 className="w-4 h-4" />,
          },
          {
            key: "manage-classRoutine",
            name: "Manage Class Routine",
            path: "/admin/classRoutine",
            icon: <Calendar1 className="w-4 h-4" />,
          },
        ],
      },
      {
        key: "subjects",
        icon: <BookOpen className="w-5 h-5" />,
        label: "Subjects",
        badge: "15",
        children: [
          {
            key: "manage-subjects",
            name: "Manage Subjects",
            path: "/admin/subject/list",
            icon: <BookOpen className="w-4 h-4" />,
          },
        ],
      },

      {
        key: "fees",
        icon: <HandCoins className="w-5 h-5" />,
        label: "Fee Management",
        path: "/admin/fees",
        badge: "3",
        children: [
          {
            key: "fee-structure",
            name: "Manage Fee-Structure",
            path: "/admin/fees/struct",
            icon: <BookOpen className="w-4 h-4" />,
          },
          {
            key: "manage-invoice",
            name: "Manage Student Invoice",
            path: "/admin/fees/invoicegenerate",
            icon: <BookOpen className="w-4 h-4" />,
          },
        ],
      },
    ],
    teacher: [
      {
        key: "dashboard",
        icon: <Home className="w-5 h-5" />,
        label: "Dashboard",
        path: "/teacher",
        badge: null,
      },
      {
        key: "attendance-dashboard",
        icon: <BarChart3 className="w-5 h-5" />,
        label: "Attendance Dashboard",
        path: "/teacher/dashboard",
        badge: null,
      },
      {
        key: "student-attendance",
        icon: <CheckSquare className="w-5 h-5" />,
        label: "Student Attendance",
        path: "/teacher/attendence",
        badge: "Daily",
      },
      {
        key: "study-material",
        icon: <Upload className="w-5 h-5" />,
        label: "Study Material",
        path: "/teacher/study",
        badge: null,
      },
    ],
    student: [
      {
        key: "dashboard",
        icon: <Home className="w-5 h-5" />,
        label: "Dashboard",
        path: "/student/dashboard",
        badge: null,
      },
      {
        key: "attendance-view",
        icon: <Eye className="w-5 h-5" />,
        label: "My Attendance",
        path: "/student/dashboard/attenanceview",
        badge: null,
      },
      {
        key: "study-material",
        icon: <Download className="w-5 h-5" />,
        label: "Study Material",
        path: "/student/dashboard/studyMeterial",
        badge: "New",
      },
      {
        key: "event",
        icon: <Calendar className="w-5 h-5" />,
        label: "Events",
        path: "/student/dashboard/event",
        badge: null,
      },
      {
        key: "fees",
        icon: <Calendar className="w-5 h-5" />,
        label: "Fees",
        path: "/student/dashboard/fee",
        badge: null,
      },
    ],
  };

  const handleLogout = async () => {
    await logout();
    Swal.fire({
      title: "Logged Out Successfully",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup: "swal-small-popup",
        title: "swal-small-title",
        confirmButton: "swal-small-btn",
      },
    });
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const roleMenuItems = menuItems[userInfo?.role?.toLowerCase?.()] || [];

    const directMatch = roleMenuItems.find((item) => item.path === currentPath);
    if (directMatch) {
      setActiveItem(directMatch.key);
      return;
    }

    for (const item of roleMenuItems) {
      if (item.children) {
        const childMatch = item.children.find(
          (child) => child.path === currentPath,
        );
        if (childMatch) {
          setActiveItem(childMatch.key);
          setOpenDropdown(item.key);
          return;
        }
      }
    }
  }, [location.pathname, user]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleItemClick = (key, hasChildren = false, path = null) => {
    if (hasChildren) {
      toggleDropdown(key);
    } else {
      setActiveItem(key);
      if (isMobile) {
        setIsOpen(false);
      }
      if (path) {
        navigate(path);
      }
    }
  };

  const handleChildClick = (childKey, path) => {
    setActiveItem(childKey);
    if (isMobile) {
      setIsOpen(false);
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="flex">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-1 left-4 z-50 p-3 bg-slate-800 text-white rounded-xl shadow-lg hover:bg-slate-700 transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/70 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`${
          isMobile ? "fixed" : "relative"
        } inset-y-0 left-0 z-40 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 ease-in-out shadow-2xl ${
          isOpen
            ? "w-72 translate-x-0"
            : isMobile
              ? "w-72 -translate-x-full"
              : "w-16"
        }`}
      >
        <div className="flex items-center justify-around  px-5 py-4 border-b border-slate-700/50">
          <div
            className={`transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            } ${!isMobile && !isOpen ? "lg:opacity-0" : ""}`}
          >
            {isOpen && (
              <div className="w-28">
                <img className="w-full" src={logo} alt="logo" />
              </div>
            )}
          </div>

          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="hover:bg-slate-700/50 transition-all duration-200 group "
              aria-label="Toggle sidebar"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-slate-300 group-hover:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-slate-300 group-hover:text-white" />
              )}
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          <ul className="space-y-1 ps-0">
            {(menuItems[userInfo?.role?.toLowerCase?.()] || []).map((item) => (
              <li key={item.key}>
                <div
                  className={`group relative flex items-center cursor-pointer select-none rounded-xl transition-all duration-200 ${
                    activeItem === item.key && !item.children
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-[1.02]"
                      : openDropdown === item.key
                        ? "bg-slate-700/50"
                        : "hover:bg-slate-700/30 hover:scale-[1.01]"
                  } ${isOpen ? "px-3 py-3" : "px-3 py-3 justify-center"}`}
                  onClick={() =>
                    handleItemClick(item.key, !!item.children, item.path)
                  }
                >
                  <div
                    className={`flex-shrink-0 transition-colors ${
                      activeItem === item.key && !item.children
                        ? "text-white"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </div>

                  {isOpen && (
                    <>
                      <span
                        className={`ml-3 flex-1 font-medium transition-colors ${
                          activeItem === item.key && !item.children
                            ? "text-white"
                            : "text-slate-200 group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </span>

                      {item.children && (
                        <ChevronRight
                          className={`w-4 h-4 ml-2 text-slate-400 transition-transform duration-200 ${
                            openDropdown === item.key ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </>
                  )}
                </div>

                {isOpen && item.children && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openDropdown === item.key
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="mt-1 space-y-1 ml-4">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <div
                            className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 group ${
                              activeItem === child.key
                                ? "bg-slate-600/50 text-white"
                                : "text-slate-300 hover:text-white hover:bg-slate-700/30"
                            }`}
                            onClick={() =>
                              handleChildClick(child.key, child.path)
                            }
                          >
                            <div
                              className={`transition-colors ${
                                activeItem === child.key
                                  ? "text-blue-400"
                                  : "text-slate-400 group-hover:text-slate-300"
                              }`}
                            >
                              {child.icon}
                            </div>
                            <span className="ml-3 text-sm font-medium">
                              {child.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-700/50 p-4">
          {isOpen ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {userInfo?.role}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {userInfo?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/30 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
