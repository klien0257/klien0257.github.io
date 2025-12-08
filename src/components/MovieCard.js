import React from "react";
import MovieSessions from "../mockData/MovieSessions";
import FormatDate from "../utils/FormatDate";
import SessionInfo from "./SessionInfo";

const MovieCard = ({ movie, hallNumber }) => {
  const movieSessions = MovieSessions(movie, hallNumber);

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex h-96">

      {/* LEFT: Poster */}
      <div className="relative w-1/2">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>

      {/* RIGHT: Movie Info */}
      <div className="p-5 flex flex-col justify-between w-1/2 text-left">

        {/* Title */}
        <h3 className="text-white text-2xl font-semibold">
          {movie.title}
        </h3>

        {/* Sessions */}
        <div className="mt-2">
          <SessionInfo movieSessions={movieSessions} movieId={movie.id} />
        </div>

        {/* Release Date */}
        <div className="mt-3 text-gray-300 text-sm">
          <span>
            <strong className="text-gray-200">Release:</strong>{" "}
            {FormatDate(movie.release_date)}
          </span>
        </div>

        {/* Rating */}
        <div className="text-white-300 text-sm mt-1">
          <span>
            <strong className="text-gray-200">Rating:</strong>{" "}
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

      </div>
    </div>
  );
};

export default MovieCard;
