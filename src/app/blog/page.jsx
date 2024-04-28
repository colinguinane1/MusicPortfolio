"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Post1 from "./posts/21.04.2024";
const Page = () => {
  return (
    <main>
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mt-20 w-full max-w-[900px]">
            <div className="font-extrabold text-left py-4 px-4 border rounded-md mx-4 md:text-base text-sm">
              <Post1 />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-0 w-full pt-10">
        <Footer />
      </div>
    </main>
  );
};

export default Page;
