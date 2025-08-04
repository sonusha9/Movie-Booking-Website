import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookMovie() {
  const { showtimeId } = useParams();
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5005/api/moviebooking/showtime/${showtimeId}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [showtimeId]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5005/api/moviebooking/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ showtimeId, seats: selectedSeats }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Book Seats</h1>
      {movie && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{movie.Movie.title}</h2>
          <p>
            <strong>Date:</strong> {movie.date} | <strong>Time:</strong>{" "}
            {movie.time}
          </p>
        </div>
      )}

      <div className="grid grid-cols-6 gap-4 mb-6">
        {["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"].map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`p-2 border rounded ${
              selectedSeats.includes(seat)
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Confirm Booking
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
