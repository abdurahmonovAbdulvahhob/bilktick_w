import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { request } from "../../api";
import Movies from "../../components/movies/Movies";
import { ReactTyped } from "react-typed";
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["movie"],
    queryFn: () =>
      request
        .get("/search/movie", {
          params: {
            query: searchValue,
          },
        })
        .then((res) => res.data),
  });

  const handleClear = () => {
    setSearchValue("");
    setSearchParams({});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries(["movie"]);

    setSearchParams({ q: searchValue });
  };

  useEffect(() => {
    if (!searchValue) {
      queryClient.invalidateQueries({ queryKey: ["movie"] });
    }
  }, [searchValue]);
  return (
    <div className="container min-h-[58vh] pt-12">
      <form
        onSubmit={handleSearch}
        className="rounded-xl border dark:border-none max-w-[600px] mx-auto h-12 flex dark:bg-secondary"
        action=""
      >
        <button className="rounded-l-xl w-10 grid place-items-center bg-white dark:bg-secondary">
          <CiSearch className="w-6 h-6 text-primary" />
        </button>
        <ReactTyped
          strings={["Avengers", "Venom", "Avatar", "Spiderman"]}
          typeSpeed={40}
          backSpeed={50}
          attr="placeholder"
          loop
          className="flex-1"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-full outline-none w-full indent-3 rounded-r-xl dark:bg-secondary dark:text-white"
            type="text"
          />
        </ReactTyped>
        {searchValue.length ? (
          <button
            type="button"
            className="w-10 grid place-items-center text-primary text-xl"
            onClick={handleClear}
          >
            <span>X</span>
          </button>
        ) : (
          <></>
        )}
      </form>
      <div>
        {!data?.total_results && (
          <p className="text-center py-6">Movie not found</p>
        )}
      </div>
      <Movies data={data?.results} />
    </div>
  );
};

export default Search;
