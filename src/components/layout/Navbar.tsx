import { useState } from "react";

import { Search } from "lucide-react";
import logo from "../../assets/images/logo.svg";

import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const [isdisable, setIsDisable] = useState(false);

  const navigate = useNavigate();
  return (
    <header className="absolute z-10 flex justify-between items-center  w-full px-3 py-3">
      <nav className="flex items-center justify-between gap-1  mx-auto w-full lg:w-3/4 mt-2 ">
        <div
          className="flex items-center justify-between gap-1 cursor-pointer "
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="" className="lg:h-10" />
          <h1 className="text-white font-bold lg:text-2xl  pl-1">
            Stream
            <span className="title bg-linear-to-r from-violet-300 to-violet-500 bg-clip-text  text-transparent ">
              Ank
            </span>
          </h1>
        </div>

        <NavLink
          to="/discover"
          replace
          className={`border-1 border-transparent p-1 rounded-lg   hover:bg-white/20 hover:text-indigo-500 hover:transition-all hover:duration-500`}
        >
          <Search />
        </NavLink>
      </nav>
    </header>
  );
}
