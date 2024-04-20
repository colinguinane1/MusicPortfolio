"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Page = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <h1 className="mt-20 absolute text-white">blog test</h1>
      </div>
      <div className="fixed bottom-0 w-full pb-2">
        <Footer />
      </div>
    </>
  );
};

export default Page;
