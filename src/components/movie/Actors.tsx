import portrait from "../../assets/images/portraitNoImage.webp";
import { IMAGE_BASE_URL } from "../../services/tmdb";

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface ActorProps {
  credits: Cast[];
}

export default function Actors({ credits }: ActorProps) {
  return (
    <section className="  pt-5  mx-5 xl:mx-20">
      <h3 className="text-2xl my-4 font-medium">Actors</h3>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 ">
        {credits.slice(0, 12).map((credit) => (
          <div key={credit.id} className="group">
            <article
              key={credit.id}
              className="bg-[#151515] border-1 border-white/10 rounded-lg pt-3 px-3 flex gap-3  group-hover:transition group-hover:duration-500 group-hover:border-indigo-600 "
            >
              <img
                src={`${IMAGE_BASE_URL}w300/${credit.profile_path}`}
                alt={credit.name}
                className="h-25 rounded-t-lg "
                onError={(e) => (e.currentTarget.src = portrait)}
              />
              <div className="flex flex-col justify-center   text-sm">
                <h3 className="text-xl font-semibold group-hover:text-indigo-600 group-hover:transition group-hover:duration-300">
                  {credit.name}
                </h3>
                <span className="text-md text-gray-300">
                  {credit.character}
                </span>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
