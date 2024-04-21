import { LayoutDashboard, Home, Settings } from "lucide-react";

import SideBar, { SidebarItem ,Logout} from "./SideBar";

const AdminNav = () => {

  return (
    <>
      <div className="flex">
        <SideBar>
          <SidebarItem icon={<Home size={20} />} text="Home" link=""  />
       
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Manage jobs" link="job/manage"  />
          <SidebarItem icon={<Settings size={20} />} text="Manage users" link="user/manage" />
         
          <Logout  text="Logout" />
        </SideBar>
      </div>
    </>
  )
}

export default AdminNav
