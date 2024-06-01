import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <Link href="/signin">Sign In</Link>
    </div>
  );
};

export default Home;
