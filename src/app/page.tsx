import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import MeetingAssistant from "./main/meetingAssistant";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Next.js</h1>
      <Link href="/signin">Sign In</Link>
      <MeetingAssistant />
    </div>
  );
};

export default Home;
