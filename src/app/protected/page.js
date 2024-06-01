import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../lib/firebase";

const Protected = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/signin");
      }
    });

    return () => unsubscribe();
  }, []);

  return user ? <div>Welcome, {user.displayName}</div> : <div>Loading...</div>;
};

export default Protected;
