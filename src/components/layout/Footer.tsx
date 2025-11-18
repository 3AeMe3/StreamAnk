import { Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <section className=" ">
      <div className="flex justify-center items-center flex-col gap-4 py-10">
        <h3 className="text-2xl font-bold">AnkStrem</h3>
        <ul className="flex gap-4">
          <li>Contact</li>
        </ul>
        <ul className="flex gap-4">
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/frank-mendoza-b05906272/"
            >
              <Linkedin />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/3AeMe3">
              <Github />
            </a>
          </li>
        </ul>
        <span className="mt-5">This project is made with ❤️ by FrankDev</span>
      </div>
    </section>
  );
}
