import logo from "../assets/images/Logo.svg";

export default function Navbar() {
  return (
    <header className="my-5 px-5 fixed w-full z-10">
      <nav className="flex justify-between ">
        <div className="flex items-center justify-center gap-1 ">
          <img src={logo} alt="" />
          <h1 className="text-white font-bold">
            Stream
            <span className="bg-linear-to-r from-violet-300 to-violet-500 bg-clip-text  text-transparent">
              Ank
            </span>
          </h1>
        </div>
        <button className="border-1 bg-black text-white">--</button>
      </nav>
    </header>
  );
}
