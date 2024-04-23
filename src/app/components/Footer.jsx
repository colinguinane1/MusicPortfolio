const Footer = () => {
  return (
    <main className="w-full h-24 border-t text-slate-500 border-slate-500 text-sm relative">
      <div className="flex flex-col items-center pt-2">
        <h1>Colin Guinane 2024© All Rights Reserved</h1>
        <h1 className="flex border-b border-slate-500 py-1">
          Website Developed By Colin Guinane{" "}
          <span className="">
            <a
              href="https://github.com/colinguinane1/MusicPortfolio"
              target="_blank"
              className="text-blue-500 px-2 hover:font-extrabold flex"
            >
              Source Code
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-bar-to-right stroke-blue-500 mt-1 ml-[2px]"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 12l-10 0" />
                <path d="M14 12l-4 4" />
                <path d="M14 12l-4 -4" />
                <path d="M20 4l0 16" />
              </svg>
            </a>
          </span>
        </h1>
        <ul className="text-base flex gap-3 py-2">
          <li className="">
            <a className="navbar_text text-slate-500" href="home">
              HOME
            </a>
          </li>
          <li className="">
            <a className="navbar_text" href="listen">
              LISTEN
            </a>
          </li>
          <li className="">
            <a className="navbar_text" href="blog">
              BLOG
            </a>
          </li>
          <li className="">
            <a className="navbar_text" href="contact">
              CONTACT
            </a>
          </li>
          <li className="">
            <a
              className="navbar_text font-extrabold flex"
              href="https://colinguinane.com"
              target="_blank"
            >
              DEV{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-bar-to-right stroke-white mt-1 ml-[2px]"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 12l-10 0" />
                <path d="M14 12l-4 4" />
                <path d="M14 12l-4 -4" />
                <path d="M20 4l0 16" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};
export default Footer;
