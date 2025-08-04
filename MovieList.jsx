import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5005/api/moviebooking/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded shadow p-4">
            {movie.poster && (
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover rounded mb-2" />
            )}
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600 mb-2">{movie.genre}</p>
            <p className="text-gray-700 mb-4">{movie.description}</p>
            <Link to={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
              View Details & Showtimes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 