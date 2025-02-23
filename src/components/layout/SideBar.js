import { Link, useLocation } from "react-router-dom";
import "../../assets/js/jquerry.slimscroll";
// import { useState } from "react";
// import * as FaIcons from "react-icons/fa";
// import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdDashboardCustomize, MdOutlineSpaceDashboard, MdSettingsSuggest } from "react-icons/md";
import { HiUsers } from "react-icons/hi";

import IMAGES from "../../assets/images";
import { PATH } from "../../utils/path.jsx";
import { FaBars, FaBloggerB, FaTasks } from "react-icons/fa";
import { useAuth } from "../../authorization/ProvidedAuth";
import { AiOutlineUnorderedList, AiOutlineUser, AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { Button, NavLink } from "react-bootstrap";
import { useState } from "react";

export default function Sidebar() {
  const auth = useAuth();
  const user = JSON.parse(localStorage.getItem("pms_user"));
  let location = useLocation();
  const [isDropdown1Visible, setIsDropdown1Visible] = useState(false);
  const toggleDropdown1 = () => {
    setIsDropdown1Visible(!isDropdown1Visible);
  };
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <div className="header-left mb-2 d-flex pageName">
            <Link
              to=""
              className="logo mr-0 header-logo-image text-decoration-none"
            >
              <img
                alt="ajhgs"
                src={IMAGES.SIDE_MANUE_LOGO}
                className="sidebar-log-img"
              />{" "}
            </Link>
            <a href="javascript:void(0)" id="toggle_btn">
              <FaBars className="toggleset" />
            </a>
          </div>
          <ul>
            <>
              {user?.userRole === "Admin" && (
                <li
                  className={
                    location.pathname === PATH.DASHBOARD ? "active" : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.DASHBOARD,
                    }}
                    className=""
                  >
                    {" "}
                    <MdDashboardCustomize className="" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {user?.userRole === "Admin" && (
                <li
                  className={
                    location.pathname === PATH.USER ||
                      location.pathname === PATH.GENERATE_BLOG ||
                      location.pathname.includes("/resource-tasks")
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.USER,
                    }}
                    className=""
                  >
                    {" "}
                    <HiUsers className="" />
                    <span>User Listing</span>
                  </Link>
                </li>
              )}
              {/* {user?.userRole === "Admin" && (
                <li
                  className={
                    location.pathname === PATH.BLOG_REQUEST || location.pathname.includes("/resource-tasks") ? "active" : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.BLOG_REQUEST,
                    }}
                    className=""
                  >
                    {" "}
                    <FaBloggerB className="" />
                    <span>Total Resources</span>
                  </Link>
                </li>
              )} */}

              {user?.userRole === "Admin" && (
                <li
                  className={
                    location.pathname === PATH.ADMIN_TASK_LIST
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.ADMIN_TASK_LIST,
                    }}
                    className=""
                  >
                    {" "}
                    <MdDashboardCustomize className="" />
                    <span>Tasks List</span>
                  </Link>
                </li>
              )}

              {user?.userRole === "4" && (
                <li
                  className={
                    location.pathname === PATH.RESOURCE_DASHBOARD ||
                      location.pathname.includes("/resource-tasks")
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.RESOURCE_DASHBOARD,
                    }}
                    className=""
                  >
                    {" "}
                    <HiUsers className="" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {user?.userRole === "4" && (
                <li
                  className={
                    location.pathname === PATH.USER ||
                      location.pathname === PATH.GENERATE_BLOG ||
                      location.pathname.includes("/resource-tasks")
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.USER,
                    }}
                    className=""
                  >
                    {" "}
                    <HiUsers className="" />
                    <span>Resources</span>
                  </Link>
                </li>
              )}
              {/* {user?.userRole === "Admin" && (
                <li
                  className={
                    location.pathname === PATH.BLOG_REQUEST || location.pathname.includes("/resource-tasks") ? "active" : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.BLOG_REQUEST,
                    }}
                    className=""
                  >
                    {" "}
                    <FaBloggerB className="" />
                    <span>Total Resources</span>
                  </Link>
                </li>
              )} */}

              {user?.userRole === "TeamLead" && (
                <li
                  className={
                    location.pathname === PATH.TEAM_LEAD_DASHBOARD
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.TEAM_LEAD_DASHBOARD,
                    }}
                    className=""
                  >
                    {" "}
                    <MdDashboardCustomize className="" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {user?.userRole === "TeamLead" && (
                <li
                  className={
                    location.pathname === PATH.VIEW_RESOURCES_TASKS
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.VIEW_RESOURCES_TASKS,
                    }}
                    className=""
                  >
                    {" "}
                    <AiOutlineUnorderedList className="" />
                    <span>Tasks</span>
                  </Link>
                </li>
              )}

              {user?.userRole === "Resource" && (
                <li
                  className={
                    location.pathname === PATH.RESOURCE_DASHBOARD
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    to={{
                      pathname: PATH.RESOURCE_DASHBOARD,
                    }}
                    className=""
                  >
                    {" "}
                    <MdDashboardCustomize className="" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
}
