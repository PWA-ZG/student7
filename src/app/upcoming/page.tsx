"use client";
import { useEffect, useState } from "react";
import MovieData, { MovieType } from "@/components/MovieData";

export default function Upcoming() {
  const [backgroundSync, setBackgroundSync] = useState<boolean>(true);
  const [data, setData] = useState<Array<MovieType>>([]);

  useEffect(() => {
    setData(JSON.parse(window.localStorage.getItem("upcomingMovies") || "[]"));

    async function fetchUpcomingMovies() {
      try {
        const response = await fetch("/api/getUpcomingMovies", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        });
        const data = await response.json();

        window.localStorage.setItem(
          "upcomingMovies",
          JSON.stringify(data.results),
        );
        setData(data.results);

        return data;
      } catch (error) {
        return console.log(error);
      }
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(async (registration) => {
        try {
          // @ts-ignore
          await registration.periodicSync.register("sync-upcoming-movies", {
            minInterval: 24 * 60 * 60 * 1000,
          });
          const notificationOptions = {
            body: "Background sync started!",
            icon: "/images/logo.png",
          };

          fetchUpcomingMovies();

          if (Notification.permission === "granted") {
            new Notification("Sync Notification", notificationOptions);
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                new Notification("Sync Notification", notificationOptions);
              }
            });
          }
        } catch (err) {
          setBackgroundSync(false);
        }
      });
    }
  }, []);

  return (
    <div className={"m-4"}>
      <p className={"text-3xl font-bold"}>Upcoming Movies</p>
      <div className={"flex flex-wrap gap-4"}>
        {!backgroundSync && (
          <div className={"flex justify-center items-center w-full h-[400px]"}>
            <p className={"text-2xl font-bold"}>
              Background Sync is not supported in your browser. If you want to
              use this feature, please install the app
            </p>
          </div>
        )}

        {data.length > 0 &&
          data.map((movie: MovieType) => {
            return <MovieData movie={movie} key={movie.id} />;
          })}

        {backgroundSync && data.length === 0 && (
          <div className={"flex justify-center items-center w-full h-[400px]"}>
            <p className={"text-2xl font-bold"}>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
