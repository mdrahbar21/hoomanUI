"use client"

import React from "react";
import Link from "next/link";
import MeetingAssistant from "../components/meetingAssistant";
import { ContextProvider, AppStateContext } from "@/components/contexts/contextProvider";


const Home = () => {
  return (
    <ContextProvider>
      <MainComponent />
    </ContextProvider>
  );
};

const MainComponent = () => {
  return (
    <main >
    <div className="bg-black font-sans">
      <MeetingAssistant />
    </div>
    </main>
  );
};

export default Home;
