import { useState } from "react";
import logo from "../assets/images/logo.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="absolute z-10 flex justify-between items-center w-full px-5 py-3">
      <nav className="flex items-center justify-between gap-1 w-full">
        <div className="flex items-center justify-between gap-1">
          <img src={logo} alt="" />
          <h1 className="text-white font-bold">
            Stream
            <span className="title bg-linear-to-r from-violet-300 to-violet-500 bg-clip-text  text-transparent">
              Ank
            </span>
          </h1>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className="h-7  "
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 7L4 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M20 12L4 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M20 17L4 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      <div className={`${isMenuOpen ? "block" : "hidden"}   `}>
        <ul className="  absolute  top-15 left-0 h-60 w-full z-10  bg-black/60   flex justify-center items-center flex-col gap-4 p-4">
          <li>Home</li>
          <li>Movies</li>
          <li>Directory</li>
          <li>Contact</li>
        </ul>
      </div>
    </header>
  );
}
