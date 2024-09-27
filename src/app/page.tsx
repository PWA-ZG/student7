"use client";
import { useEffect, useState } from "react";
import MovieData, { MovieType } from "@/components/MovieData";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [delayedSearchInput, setDelayedSearchInput] = useState<string>("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedSearchInput(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  const [data, setData] = useState<Array<MovieType>>([]);
  const [searchData, setSearchData] = useState<Array<MovieType>>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/getPopularMovies")
      .then((response) => response.json())
      .then((response) => setData(response.results))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setSearchData([]);
    setSearchLoading(false);
    if (!delayedSearchInput) return;

    setSearchLoading(true);

    const searchEncoded = encodeURIComponent(delayedSearchInput);

    fetch(`/api/getSearchResults?query=${searchEncoded}`)
      .then((response) => response.json())
      .then((response) => {
        setSearchData(response.results);
        setSearchLoading(false);
      })
      .catch(() => {
        setSearchLoading(false);
      });
  }, [delayedSearchInput]);

  return (
    <div className={"flex flex-col"}>
      <div
        className={"flex justify-center items-center w-full gap-2 pt-12 pb-12"}
      >
        <input
          className={
            "border border-gray-300 bg-white rounded-lg text-sm focus:outline-none block h-12 w-1/2 md:w-1/3  px-2"
          }
          type="search"
          name="search"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          type="submit"
          className={"border border-gray-300 h-full p-2 rounded-lg"}
        >
          Search
        </button>
      </div>

      <div className={"px-8 flex flex-col"}>
        {search && (
          <p className={"text-3xl font-bold"}>
            Search Result for {`"${search}"`}
          </p>
        )}
        {!search && <p className={"text-3xl font-bold"}>Popular</p>}

        {data.length === 0 && (
          <div className={"flex justify-center items-center w-full h-[400px]"}>
            <p className={"text-2xl font-bold"}>Loading...</p>
          </div>
        )}

        {search && !searchLoading && searchData.length === 0 && (
          <div className={"flex justify-center items-center w-full h-[400px]"}>
            <p className={"text-2xl font-bold"}>No Data</p>
          </div>
        )}

        {searchLoading && (
          <div className={"flex justify-center items-center w-full h-[400px]"}>
            <p className={"text-2xl font-bold"}>Loading...</p>
          </div>
        )}

        {!search &&
          data.map((item) => <MovieData movie={item} key={item.id} />)}

        {search &&
          searchData.map((item) => <MovieData movie={item} key={item.id} />)}
      </div>
    </div>
  );
}
