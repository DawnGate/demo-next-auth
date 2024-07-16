import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const haveToken = localStorage.getItem("token");

    if (!haveToken) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen">
      <div className="text-center">User</div>
    </main>
  );
};

export default Page;
