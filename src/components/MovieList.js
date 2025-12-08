// ⬆️ MOVE TOKEN OUTSIDE COMPONENT TO FIX NETLIFY CI ESLINT ERROR
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || "";

import React, { useEffect, useState } from "react";
import FetchMoviesByGenre from "../API/FetchMoviesByGenre";
import FetchMoviesBySearch from "../API/FetchMoviesBySearch";
import FetchBackendMovies from "../API/FetchBackendMovies";
import { isLoggedIn } from "../utils/Auth";
import Genres from "./Genre";
import MovieCard from "./MovieCard";
import RecommendedMovies from "./RecommendedMovies";

const MovieList = ({ searchText }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreIds, setGenreIds] = useState([]);

  const userLoggedIn = isLoggedIn();

  useEffect(() => {
    const loadMovies = async () => {
      // 1️⃣ SEARCH → TMDB
      if (searchText) {
        const response = await FetchMoviesBySearch(
          ACCESS_TOKEN,
          page,
          searchText
        );

        if (response) {
          setMovies(response.filteredMovies);
          setTotalPages(response.totalPages);
        }
        return;
      }

      // 2️⃣ GENRE FILTER → TMDB
      if (genreIds.length > 0) {
        const response = await FetchMoviesByGenre(
          ACCESS_TOKEN,
          page,
          genreIds
        );

        if (response) {
          setMovies(response.filteredMovies);
          setTotalPages(response.totalPages);
        }
        return;
      }

      // 3️⃣ DEFAULT → BACKEND MOVIES
      const backendMovies = await FetchBackendMovies();

      setMovies(backendMovies);
      setTotalPages(1);
    };

    loadMovies();
  }, [page, genreIds, searchText]); // ACCESS_TOKEN REMOVED → FIXES NETLIFY ERROR

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <Genres setGenreIds={setGenreIds} />

      {userLoggedIn && (
        <div>
          <RecommendedMovies />
        </div>
      )}

      <h1 className="text-left font-bold mb-4">All Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} hallNumber={index} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          className={`bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-sm font-semibold mx-2 my-2 cursor-pointer ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          onClick={handleNextPage}
          className={`bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-sm font-semibold mx-2 my-2 cursor-pointer ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
