import React, { useEffect, useState } from "react";

export default function AdminMovieManager() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", poster: "", genre: "" });
  const [showtimeForm, setShowtimeForm] = useState({ movieId: "", date: "", time: "", availableSeats: 100 });
  const [editingMovie, setEditingMovie] = useState(null);
  const [editingShowtime, setEditingShowtime] = useState(null);
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  const fetchMovies = () => {
    fetch("http://localhost:5005/api/moviebooking/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies || []));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleMovieChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = editingMovie ? "PUT" : "POST";
    const url = editingMovie
      ? `http://localhost:5005/api/moviebooking/movies/${editingMovie.id}`
      : "http://localhost:5005/api/moviebooking/movies";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ title: "", description: "", poster: "", genre: "" });
    setEditingMovie(null);
    fetchMovies();
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5005/api/moviebooking/movies/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMovies();
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setForm({
      title: movie.title,
      description: movie.description,
      poster: movie.poster || "",
      genre: movie.genre || "",
    });
  };

  const handleShowtimeChange = (e) => {
    setShowtimeForm({ ...showtimeForm, [e.target.name]: e.target.value });
  };

  const handleShowtimeSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = editingShowtime ? "PUT" : "POST";
    const url = editingShowtime
      ? `http://localhost:5005/api/moviebooking/showtimes/${editingShowtime.id}`
      : "http://localhost:5005/api/moviebooking/showtimes";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(showtimeForm),
    });

    setShowtimeForm({ movieId: "", date: "", time: "", availableSeats: 100 });
    setEditingShowtime(null);
    fetchMovies();
  };

  const handleDeleteShowtime = async (id) => {
    if (!window.confirm("Delete this showtime?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5005/api/moviebooking/showtimes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMovies();
  };

  const toggleExpandMovie = (id) => {
    setExpandedMovieId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 Admin Movie Management</h1>

      {/* Movie Form */}
      <form onSubmit={handleMovieSubmit} className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{editingMovie ? "✏️ Edit Movie" : "➕ Add Movie"}</h2>
        <input name="title" value={form.title} onChange={handleMovieChange} placeholder="Title" className="p-2 border rounded w-full mb-2" required />
        <input name="genre" value={form.genre} onChange={handleMovieChange} placeholder="Genre" className="p-2 border rounded w-full mb-2" />
        <input name="poster" value={form.poster} onChange={handleMovieChange} placeholder="Poster URL" className="p-2 border rounded w-full mb-2" />
        <textarea name="description" value={form.description} onChange={handleMovieChange} placeholder="Description" className="p-2 border rounded w-full mb-2" required />
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingMovie ? "Update" : "Add"} Movie</button>
          {editingMovie && <button type="button" onClick={() => { setEditingMovie(null); setForm({ title: "", description: "", poster: "", genre: "" }); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>}
        </div>
      </form>

      {/* Showtime Form */}
      <form onSubmit={handleShowtimeSubmit} className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{editingShowtime ? "✏️ Edit Showtime" : "➕ Add Showtime"}</h2>
        <select name="movieId" value={showtimeForm.movieId} onChange={handleShowtimeChange} className="p-2 border rounded w-full mb-2" required>
          <option value="">🎥 Select Movie</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>{movie.title}</option>
          ))}
        </select>
        <input name="date" type="date" value={showtimeForm.date} onChange={handleShowtimeChange} className="p-2 border rounded w-full mb-2" required />
        <input name="time" type="time" value={showtimeForm.time} onChange={handleShowtimeChange} className="p-2 border rounded w-full mb-2" required />
        <input name="availableSeats" type="number" min={1} value={showtimeForm.availableSeats} onChange={handleShowtimeChange} className="p-2 border rounded w-full mb-2" required />
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingShowtime ? "Update" : "Add"} Showtime</button>
          {editingShowtime && <button type="button" onClick={() => { setEditingShowtime(null); setShowtimeForm({ movieId: "", date: "", time: "", availableSeats: 100 }); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>}
        </div>
      </form>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded shadow p-4 relative">
            {movie.poster && (
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover rounded mb-3 cursor-pointer" onClick={() => toggleExpandMovie(movie.id)} />
            )}
            <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
            <p className="text-gray-600 mb-2">{movie.genre}</p>

            {expandedMovieId === movie.id && (
              <>
                <p className="mb-2">{movie.description}</p>
                <div className="mb-2">
                  <strong>Showtimes:</strong>
                  <ul className="list-disc ml-5 mt-1">
                    {movie.Showtimes && movie.Showtimes.length > 0 ? (
                      movie.Showtimes.map((showtime) => (
                        <li key={showtime.id} className="mb-1">
                          {showtime.date} at {showtime.time} ({showtime.availableSeats} seats)
                          <button onClick={() => handleEditShowtime(showtime)} className="ml-2 text-blue-600 underline">Edit</button>
                          <button onClick={() => handleDeleteShowtime(showtime.id)} className="ml-2 text-red-600 underline">Delete</button>
                        </li>
                      ))
                    ) : (
                      <li>No showtimes available</li>
                    )}
                  </ul>
                </div>
              </>
            )}
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleEditMovie(movie)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDeleteMovie(movie.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              <button onClick={() => toggleExpandMovie(movie.id)} className="bg-gray-300 px-3 py-1 rounded">{expandedMovieId === movie.id ? "Collapse" : "View More"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
