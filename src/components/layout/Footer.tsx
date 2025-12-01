import { Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center items-center flex-col gap-4 py-10">
        <h3 className="text-2xl font-bold">AnkStrem</h3>
        <nav aria-label="Enlaces del footer">
          <ul className="flex gap-4">
            <li>Contact</li>
          </ul>
        </nav>

        <ul className="flex gap-4" aria-label="redes sociales">
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/frank-mendoza-b05906272/"
              rel="noopener noreferrer"
              aria-label="linkedin"
            >
              <Linkedin />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/3AeMe3"
              rel="noopener noreferrer"
              aria-label="linkedin"
            >
              <Github />
            </a>
          </li>
        </ul>

        <span className="mt-5">This project is made with ❤️ by 3AeMe3</span>
      </div>
    </footer>
  );
}
