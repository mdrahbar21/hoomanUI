"use client"

import React from "react";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import MeetingAssistant from "./main/meetingAssistant";
import Sidebar from "./sidebar/side";
import MainContent from "./sidebar/main";
import { ContextProvider, AppStateContext } from "@/components/contexts/contextProvider";

const Home = () => {
  return (
    <ContextProvider>
      <MainComponent />
    </ContextProvider>
  );
};

const MainComponent = () => {
  const  {activeMenu} = AppStateContext();
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
              <div className="w-72 sidebar dark:bg-secondary-dark-bg bg-white">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                {" "}
                <Sidebar />
              </div>
            )}
      <div
              className={
                `dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
              }
             >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>
              <div>
                
              </div>
            </div>
      <MainContent />
    </div>
  );
};

export default Home;
