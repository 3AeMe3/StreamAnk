export default function Hero() {
  return (
    <section className="h-screen ">
      <div className="relative h-full bg-[url(./assets/images/bg.webp)] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative  h-full flex gap-4 justify-end flex-col px-4 pb-5 ">
          <h2 className="text-2xl font-bold">
            Kimetsu no Yaiba: <br /> Mugen-jō-hen
          </h2>
          <div className="flex gap-1">
            <span>imbd</span>
            <span>score</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            cumque aliquam numquam, magni molestiae nobis nesciunt quasi sit, in
            provident rem sapiente vero officia a vel asperiores iusto suscipit
            fuga.
          </p>
          <div className="flex gap-4">
            <button className="bg-indigo-500 px-2 py-1 rounded-md">
              Watch Now
            </button>
            <button className=" px-2 py-1 rounded-md border-1 bg-black/70">
              Watch trailer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
