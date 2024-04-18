const Navbar = () => {
  return (
    <main className="fixed w-full border-b py-4 bg-black">
      <ul className="text-white flex justify-between mx-4 z-[100]">
        <li>
          <a className="border p-2" href="#">
            CG
          </a>
        </li>
        <li>
          <a className="navbar_text" href="#">
            Home
          </a>
        </li>
        <li>
          <a className="navbar_text" href="#">
            Listen
          </a>
        </li>
        <li>
          <a className="navbar_text" href="#">
            Blog
          </a>
        </li>
        <li>
          <a className="navbar_text" href="#">
            Contact
          </a>
        </li>
        <li>
          <a className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-bar-left md:hidden"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 12l10 0" />
              <path d="M4 12l4 4" />
              <path d="M4 12l4 -4" />
              <path d="M20 4l0 16" />
            </svg>
          </a>
        </li>
      </ul>
    </main>
  );
};

export default Navbar;
