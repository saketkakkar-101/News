import BottomNavBar from "@/components/shared/BottomNavBar";
import DashboardComments from "@/components/shared/DashboardComments";
import DashboardPosts from "@/components/shared/DashboardPosts";
import DashboardProfile from "@/components/shared/DashboardProfile";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import DashboardUsers from "@/components/shared/DashboardUsers";
import Maindashboard from "@/components/shared/Maindashboard";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
const location = useLocation()
const [tab, setTab] = useState("")

useEffect(() => {
  const urlParams = new URLSearchParams(location.search)
  const tabFromUrl = urlParams.get("tab")

  // console.log(tabFromUrl);
  if (tabFromUrl) {
    setTab(tabFromUrl)
  }
}, [location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      {/* sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      <BottomNavBar />

         {/* Profile */}
          
        <div className="w-full">
          {tab === "profile" && <DashboardProfile />}
         {/* news articles */}
        {tab === "posts" && <DashboardPosts />}
        {/* news articles */}
        {tab === "users" && <DashboardUsers />}
        {/* Comments */}
        {tab === "comments" && <DashboardComments />}
        {/* dashboard main component */}
        {tab === "dashboard" && <Maindashboard />}
        </div>

    </div>
  );
};

export default Dashboard;


