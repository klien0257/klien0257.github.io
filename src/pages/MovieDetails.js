import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FetchMovieDetails from '../API/GetMovieDetails';
import SeatPlan from '../components/SeatPlan';
import FormatDate from '../utils/FormatDate';
import FormatRuntime from '../utils/FormatRuntime';

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedSessionTime = location.state?.sessionTime || null;

  const [movie, setMovie] = useState(null);

  // No setter needed because we never update session time here
  const sessionTime = passedSessionTime;

  const API_KEY = process.env.REACT_APP_API_KEY || '';

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await FetchMovieDetails(id, API_KEY);
      setMovie(movieData);
    };

    fetchData();
  }, [id, API_KEY]);

  if (!movie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center items-start">
          
          {/* POSTER */}
          <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center mb-8 md:mb-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded"
            />
          </div>

          {/* MOVIE DETAILS */}
          <div className="w-full md:w-1/2 lg:w-2/3 px-6 text-left">
            <h2 className="text-3xl font-semibold text-white">{movie.title}</h2>

            <p className="mt-2">{movie.overview}</p>
            <p className="mt-2"><b>Genres:</b> {movie.genres.map((g) => g.name).join(', ')}</p>
            <p className="mt-2"><b>Tagline:</b> {movie.tagline}</p>
            <p className="mt-1"><b>Runtime:</b> {FormatRuntime(movie.runtime)}</p>
            <p className="mt-1"><b>Rating:</b> {movie.vote_average.toFixed(1)}</p>
            <p className="mt-2"><b>Release Date:</b> {FormatDate(movie.release_date)}</p>
            <p className="mt-2"><b>Production Companies:</b> {movie.production_companies.map((c) => c.name).join(', ')}</p>
            <p className="mt-2"><b>Production Countries:</b> {movie.production_countries.map((c) => c.name).join(', ')}</p>
            <p className="mt-2"><b>Languages:</b> {movie.spoken_languages.map((l) => l.english_name).join(', ')}</p>
            <p className="mt-2"><b>Budget:</b> ${movie.budget.toLocaleString()}</p>
            <p className="mt-2"><b>Revenue:</b> ${movie.revenue.toLocaleString()}</p>

            {movie.homepage && (
              <a
                className="text-blue-400 mt-3 block"
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Homepage
              </a>
            )}
          </div>

        </div>
      </div>

      {/* PASS SESSION TO SEAT PLAN */}
      <SeatPlan movie={movie} sessionTime={sessionTime} />
    </div>
  );
};

export default MovieDetails;
