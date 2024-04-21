const Post1 = () => {
  return (
    <main>
      <h1 className="text-3xl font-extrabold py-1">Website Launch</h1>
      <h1 className="font-extrabold py-1">21/04/2024</h1>
      <p className="font-light">
        After many weeks developing this website, I am very excited for it to
        finally be launched! My goal was to build a website where i could host
        my music myself thus allowing me to add my own tracks that I never
        thought were complete enough to publish or for legal reasons (such as a
        cover)<br></br>
        <br></br>On this website you will find various tags on my playlists such
        as:
        <div className="pb-2">
          <div className="flex">
            <h1 className="text-yellow-300 border-2 border-yellow-600 max-w-fit px-3 rounded-full my-2 min-w-fit max-h-6 md:max-h-7">
              Artist&apos;s Choice <span className="font-extrabold"></span>
            </h1>
            <p className="mt-[10px] mx-2">
              This displays my personal favorite song in a playlist.
            </p>
          </div>
          <div className="flex">
            <h1 className="text-green-400 border-2 border-green-600 px-3 rounded-full my-2 min-w-fit max-h-6 md:max-h-7">
              Website Exclusive <span className="font-extrabold"></span>
            </h1>
            <p className="mt-[10px] mx-2">
              Any playlist with this tag has never been released elsewhere.
            </p>
          </div>
          <div className="flex">
            <h1 className="text-red-500 border-2 border-red-800 my-2  max-w-fit px-3 rounded-full flex min-w-fit max-h-6 md:max-h-7">
              <span className="">Youtube</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-up-right stroke-red-500 md:mt-[2px]"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 7l-10 10" />
                <path d="M8 7l9 0l0 9" />
              </svg>
            </h1>
            <p className="mt-[10px] mx-2">
              If there is an accompanying YouTube video you can click this
              button
            </p>
          </div>
          <div className="flex">
            <a className="text-blue-400 flex border-2 border-blue-600  max-w-fit px-3 my-2 rounded-full min-w-fit max-h-6 md:max-h-7">
              <span className=""> Inspiration</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-up-right stroke-blue-500 md:mt-[3px]"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 7l-10 10" />
                <path d="M8 7l9 0l0 9" />
              </svg>
            </a>
            <p className="mt-[10px] mx-2">
              If there was something that inspired me you can click this button.
            </p>
          </div>
        </div>
        You can find the source code for the website{" "}
        <a
          href="https://github.com/colinguinane1/MusicPortfolio"
          target="_blank"
          className="font-extrabold text-blue-500"
        >
          here
        </a>
        , feel free to give me any feedback on the{" "}
        <a href="contact" className="font-extrabold text-blue-500">
          contact
        </a>{" "}
        page
      </p>
    </main>
  );
};

export default Post1;
