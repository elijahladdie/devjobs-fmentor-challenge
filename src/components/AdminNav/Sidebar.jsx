/* eslint-disable react/prop-types */
import { ChevronFirst, ChevronLast, LogOutIcon } from "lucide-react"
import logo from "../../assets/devjobs-logo.svg";

import { createContext, useContext, useState } from "react"
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    return (

        <aside className="h-screen ">

            <nav className="h-full flex flex-col items-center  sidebar-bg border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} />
                    <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ">
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, link }) {
    const { expanded } = useContext(SidebarContext)
    return (
        <Link to={`/admin/${link}`} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </Link>
    )
}


export const Logout = ({ text }) => {
    const { expanded } = useContext(SidebarContext)

    const handleLogout = async () => {
        try {
            await localStorage.removeItem("token");
            window.location.reload();
        } catch (error) {
            console.error("Logout error:", error);
            // Handle any logout errors here
        }
    };

    return (
        <span onClick={handleLogout} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600`}>

            <LogOutIcon />
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </span>
    );
};