async function fetchUpcomingMovies() {
  try {
    const response = await fetch("/api/getUpcomingMovies", {
      method: "GET",
    });
    const data = await response.json();

    window.localStorage.setItem("upcomingMovies", JSON.stringify(data.results));

    return data;
  } catch (error) {
    return console.log(error);
  }
}

self.addEventListener("periodicsync", function (event) {
  // @ts-ignore
  if (event.tag === "sync-upcoming-movies") {
    // @ts-ignore
    event.waitUntil(fetchUpcomingMovies());
  }
});
