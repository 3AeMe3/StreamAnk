import { Search } from "lucide-react";
import { NavLink, Link } from "react-router";
import logo from "../../assets/images/logo.svg";

export default function Navbar() {
  return (
    <header className="absolute z-10 flex w-full items-center justify-between px-3 py-3">
      <nav className="mx-auto mt-2 flex w-full items-center justify-between gap-1 lg:w-3/4">
        <Link to="/" className="flex cursor-pointer items-center gap-2">
          <img src={logo} alt="StreamAnk Logo" className="h-8 lg:h-10" />
          <h1 className="pl-1 text-xl font-bold text-white lg:text-2xl">
            Stream
            <span className="title bg-linear-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent">
              Ank
            </span>
          </h1>
        </Link>

        <NavLink
          to="/discover"
          className={`rounded-lg p-2 transition-all duration-300 hover:bg-white/20 hover:text-indigo-400`}
        >
          <Search />
        </NavLink>
      </nav>
    </header>
  );
}
