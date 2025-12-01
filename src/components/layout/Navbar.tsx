import { Search } from "lucide-react";
import { NavLink, Link } from "react-router";
import logo from "../../assets/images/logo.svg";

export default function Navbar() {
  return (
    <header className="absolute z-10 flex justify-between items-center  w-full px-3 py-3">
      <nav className="flex items-center justify-between gap-1  mx-auto w-full lg:w-3/4 mt-2  ">
        <Link to="/" className="flex items-center  gap-2 cursor-pointer  ">
          <img src={logo} alt="StreamAnk Logo" className="h-8 lg:h-10" />
          <h1 className="text-white font-bold text-xl  lg:text-2xl  pl-1">
            Stream
            <span className="title bg-linear-to-r from-violet-300 to-violet-500 bg-clip-text  text-transparent ">
              Ank
            </span>
          </h1>
        </Link>

        <NavLink
          to="/discover"
          className={({ isActive }) =>
            `p-2 rounded-lg transition-all duration-300
            ${isActive ? "bg-white/30 text-indigo-400" : "hover:bg-white/20"}`
          }
        >
          <Search />
        </NavLink>
      </nav>
    </header>
  );
}
