"use client";
const Post1 = () => {
  return (
    <main className="text-black dark:text-white">
      <h1 className="text-3xl font-extrabold py-1">Website Launch</h1>
      <h1 className="font-extrabold py-1">21/04/2024</h1>
      <div className="font-light">
        <p>
          After many weeks developing this website, I am very excited for it to
          finally be launched! My goal was to build a website where i could host
          my music myself thus allowing me to add my own tracks that I never
          thought were complete enough to publish or for legal reasons (such as
          a cover)<br></br>
          <br></br>On this website you will find various tags on my playlists
          such as:
        </p>
        <div className="md:flex gap-1 my-2 items-center">
          <h1 className="border-yellow-500 mb-2 border max-w-fit px-2 rounded-full text-yellow-500">
            Artist Choice
          </h1>
          <p>This shows my favorite track in a playlist.</p>
        </div>
        <div className="md:flex gap-1 my-2 items-center">
          <h1 className="border-green-500 mb-2 border max-w-fit max-h-fit px-2 rounded-full text-green-500">
            Website Exclusive
          </h1>
          <p> Albums that have never been released elsewhere.</p>
        </div>
        <div className="md:flex gap-1 my-2  items-center">
          <h1 className="border-red-500 border mb-2 max-w-fit max-h-fit px-2 rounded-full text-red-500">
            YouTube
          </h1>
          <p>Click this to see an accompanying YouTube video.</p>
        </div>
        <div className="md:flex gap-1 my-2  items-center">
          <h1 className="border-blue-500 mb-2 border max-w-fit max-h-fit px-2 rounded-full text-blue-500">
            Inspiration
          </h1>
          <p className="pb-4">
            Click this to see an accompanying source of inspiration.
          </p>
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
        page.
      </div>
    </main>
  );
};

export default Post1;
