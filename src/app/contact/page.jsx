"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { motion, spring } from "framer-motion";
const Page = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true when form is being submitted
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "1e2e32a1-7b64-4030-a532-7d2515ebe939",
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        message: e.target.message.value,
      }),
    });
    const result = await response.json();
    if (result.success) {
      setIsSubmitted(true);
    }
    setIsSubmitting(false); // Reset submitting state after form submission
  }

  return (
    <>
      <div className="z-[1000000]">
        <Navbar />
      </div>
      <motion.div
        initial={{ y: "300%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="no_transition z-[0]"
      >
        <div class="flex items-center h-fit dark:bg-transparent">
          <div class="container mx-auto my-auto mt-32">
            <div class="mx-auto dark:bg-black pb-[40%] rounded-md shadow-sm">
              <div class="text-center ">
                <h1 class="my-3 text-3xl font-semibold text-black dark:text-gray-200">
                  Contact
                </h1>
              </div>
              <div class="m-7">
                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="access_key"
                    value="1e2e32a1-7b64-4030-a532-7d2515ebe939"
                  />
                  <input
                    type="hidden"
                    name="subject"
                    value="New Submission from Web3Forms"
                  />
                  <div class="mb-6">
                    <label
                      for="name"
                      class="block mb-2 font-medium text-sm text-gray-600 dark:text-gray-400"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Licensing, Collaboration, etc"
                      required
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 font-medium text-sm text-gray-600 dark:text-gray-400"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="you@company.com"
                      required
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="phone"
                      id="phone"
                      type="phone"
                      class="text-sm mb-2 font-medium text-gray-600 dark:text-gray-400"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="+1 (555) 1234-567"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="message"
                      class="block mb-2 font-medium text-sm text-gray-600 dark:text-gray-400"
                    >
                      Your Message *
                    </label>

                    <textarea
                      rows="5"
                      name="message"
                      id="message"
                      placeholder="Your Message"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-6">
                    <button
                      type="submit"
                      class="flex items-center justify-center text-center button-blue-gradient w-full"
                    >
                      Send Message{" "}
                      {isSubmitting &&
                        !isSubmitted && ( // Conditionally render loading SVG if submitting and not yet submitted
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="animate-spin h-5 w-5 stroke-white ml-2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="#2c3e50"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12h1m1.28-5.903l.719.718m3.841.765l.836-.836M12 3v1m5.903 1.28l-.718.719m-.765 3.841l.836.836M21 12h-1m-1.28 5.903l-.719-.718m-3.841-.765l-.836.836M12 21v-1m-5.903-1.28l.718-.719m.765-3.841l-.836-.836"
                            ></path>
                          </svg>
                        )}
                      {isSubmitted && ( // Conditionally render check SVG if form is successfully submitted
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-circle-check stroke-green-500 -mt-[1px] ml-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l5 5l10 -10" />
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="bottom-0 w-full pb-2">
        <Footer />
      </div>
    </>
  );
};

export default Page;
