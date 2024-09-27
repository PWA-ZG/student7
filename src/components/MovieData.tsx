import Image from "next/image";

export type MovieType = {
  id: number;
  name?: string;
  title?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
};

const MovieData = ({ movie }: { movie: MovieType }) => {
  const shareButtonFn = () => {
    if (navigator.share) {
      navigator
        .share({
          title: movie.name || movie.title,
          text: movie.overview,
          url: `https://themoviedb.org/movie/${movie.id}`,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      console.log("Web Share API not supported in your browser");
    }
  };

  return (
    <div className={"flex gap-4 w-full pt-8 pb-8"}>
      <div
        className={
          "relative flex-shrink-0 w-[100px] h-[150px] md:w-[200px] md:h-[300px]"
        }
      >
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : "/images/image_not_found.jpeg"
          }
          fill
          sizes={"(min-width: 768px) 200px, 100px"}
          priority={true}
          alt={movie.name || movie.title || "No Title"}
          onError={(event) => {
            event.currentTarget.id = "/images/image_not_found.jpeg";
            event.currentTarget.src = "/images/image_not_found.jpeg";
          }}
        />
      </div>
      <div className={"flex flex-col gap-2"}>
        <p className={"text-2xl font-bold"}>{movie.name || movie.title}</p>
        <div className={"flex justify-start gap-2"}>
          <p className={"text-md"}>{movie.release_date}</p>
          <p className={"text-md"}>•</p>
          <p className={"text-md"}>{movie.vote_average}</p>
        </div>
        <div className={"overflow-hidden overflow-ellipsis min-h-0  h-[160px]"}>
          <p className={"text-sm line-clamp-4"}>{movie.overview}</p>
        </div>
        <button
          type={"button"}
          className={`border border-gray-300 p-2 w-32 ${
            !navigator.share && "hidden"
          }`}
          onClick={shareButtonFn}
          disabled={!navigator.share}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default MovieData;
