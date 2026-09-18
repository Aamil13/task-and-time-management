
 import { IoGridOutline,IoTimerOutline,IoSettingsOutline } from "react-icons/io5";
 import { RiGitbookLine } from "react-icons/ri";
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: any;
}



 
export const PRIMARY_NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: IoGridOutline },
  { id: "tracking", label: "Time Tracking", href: "/dashboard/tracking", icon: IoTimerOutline },
  { id: "tasks", label: "Tasks", href: "/dashboard/tasks", icon: RiGitbookLine },
  { id: "settings", label: "Settings", href: "/dashboard/settings", icon: IoSettingsOutline },
//   { id: "reports", label: "Send report", href: "/reports", icon: Send },
//   { id: "projects", label: "New project", href: "/projects/new", icon: FolderPlus },
];
 
