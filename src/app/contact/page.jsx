import Navbar from "../components/Navbar";
const Page = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div class="flex items-center min-h-screen bg-gray-100 dark:bg-black">
          <div class="container mx-auto">
            <div class="max-w-md mx-auto my-10 bg-black p-5 rounded-md shadow-sm">
              <div class="text-center">
                <h1 class="my-3 text-3xl font-semibold text-black dark:text-gray-200">
                  Contact
                </h1>
              </div>
              <div class="m-7">
                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  id="form"
                >
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
                  <input
                    type="hidden"
                    name="redirect"
                    value="https://web3forms.com/success"
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
                      class="w-full px-3 py-4 text-white bg-indigo-700 rounded-md focus:bg-indigo-600 focus:outline-none"
                    >
                      Send Message
                    </button>
                  </div>
                  <p
                    class="text-base text-center text-gray-400"
                    id="result"
                  ></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
