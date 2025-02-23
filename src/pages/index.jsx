import React from "react";
const Login = React.lazy(() => import("./login/index.jsx"));
const Dashboard = React.lazy(() => import("./adminSide/dashboard/index.jsx"));
const User = React.lazy(() => import("./adminSide/users/index.jsx"));
const Resource = React.lazy(() => import("./ResourceSide/index.jsx"));
const projectprogress = React.lazy(() => import("./adminSide/projectProgress/index.jsx"));
const TaskList = React.lazy(() => import("./adminSide/taskList/index.js"));
const UserProfile = React.lazy(() =>
  import("./adminSide/users/UserProfile.jsx")
);
const BlogRequest = React.lazy(() =>
  import("./adminSide/blogRequest/index.jsx")
);

const UserDashboard = React.lazy(() =>
  import("./userSide/userDashboard/index.jsx")
);
const UserBlogRequest = React.lazy(() =>
  import("./userSide/blogRequest/index.jsx")
);
const TeamLeadDashoard = React.lazy(() =>
  import("./TeamLeadDashboard/index.js")
);
const ViewAllTaskOfesources = React.lazy(() =>
  import("./TeamLeadDashboard/ViewAllTaskOfesources.js")
);


const WEB_PAGES = {
  LOGIN: Login,
  DASHBOARD: Dashboard,
  ADMIN_TASK_LIST: TaskList,
  USER: User,
  USER_PROFILE: UserProfile,
  BLOG_REQUEST: BlogRequest,
  USER_DASHBOARD: UserDashboard,
  USER_BLOG_REQUEST: UserBlogRequest,
  RESOURCE_DASHBOARD: Resource,
  PROJECT_PROGRESS: projectprogress,
  TEAM_LEAD_DASHBOARD: TeamLeadDashoard,
  VIEW_RESOURCES_TASKS: ViewAllTaskOfesources,
};
export default WEB_PAGES;
