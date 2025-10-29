export default function Footer() {
  return (
    <section className="bg-gray-900 ">
      <div className="flex justify-center items-center flex-col gap-4 py-10">
        <h3 className="text-2xl font-bold">AnkStrem</h3>
        <ul className="flex gap-4">
          <li>Home</li>
          <li>Movies</li>
          <li>Directory</li>
          <li>Contact</li>
        </ul>
        <ul className="flex gap-4">
          <li>Linkedin</li>
          <li>GitHub</li>
        </ul>
        <span className="mt-5">This project is made with ❤️ by Ank</span>
      </div>
    </section>
  );
}
