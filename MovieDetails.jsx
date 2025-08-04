import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seats, setSeats] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5005/api/moviebooking/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data.movie));
  }, [id]);

  const handleBook = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book seats.");
      navigate("/login");
      return;
    }
    const res = await fetch("http://localhost:5005/api/moviebooking/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ showtimeId: selectedShowtime.id, seats }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Booking successful!");
      navigate("/dashboard");
    } else {
      alert(data.message || "Booking failed");
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      {movie.poster && <img src={movie.poster} alt={movie.title} className="w-64 h-96 object-cover rounded mb-4" />}
      <p className="mb-2">{movie.genre}</p>
      <p className="mb-4">{movie.description}</p>
      <h2 className="text-xl font-semibold mb-2">Showtimes</h2>
      <ul className="mb-4">
        {movie.Showtimes && movie.Showtimes.length > 0 ? (
          movie.Showtimes.map((showtime) => (
            <li key={showtime.id} className="mb-2">
              <button
                className={`px-4 py-2 rounded ${selectedShowtime && selectedShowtime.id === showtime.id ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setSelectedShowtime(showtime)}
              >
                {showtime.date} at {showtime.time} ({showtime.availableSeats} seats left)
              </button>
            </li>
          ))
        ) : (
          <li>No showtimes available.</li>
        )}
      </ul>
      {selectedShowtime && (
        <div className="mb-4">
          <label className="block mb-1">Number of seats:</label>
          <input
            type="number"
            min={1}
            max={selectedShowtime.availableSeats}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="border rounded px-2 py-1 w-24"
          />
        </div>
      )}
      <button
        disabled={!selectedShowtime}
        onClick={handleBook}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        Book Now
      </button>
    </div>
  );
} 