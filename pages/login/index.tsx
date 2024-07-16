import { useRouter } from "next/router";
import { FormEvent } from "react";

const Page = () => {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/login", {
      method: "POST",
      body: formData,
    });

    const { data } = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/app");
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="pt-[200px]"></div>
      <div className="border border-1 p-4 max-w-screen-md mx-auto">
        <form onSubmit={onSubmit} className="flex flex-col gap-2 text-black">
          <input
            placeholder="Username"
            name="username"
            className="border p-2"
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            className="border p-2"
          />
          <button type="submit" className="px-3 py-3 bg-black text-white">
            <p>Submit</p>
          </button>
        </form>
      </div>
    </main>
  );
};

export default Page;
