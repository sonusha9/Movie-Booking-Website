import React from 'react';

const movie = {
  id: 201,
  title: 'Everest Adventure',
  genre: 'Action/Adventure',
  language: 'Nepali',
  duration: '2h 30min',
  showTime: '04:00 PM',
  seatsAvailable: 35,
  price: 450, 
  poster: 'https://via.placeholder.com/600x300.png?text=Everest+Adventure+Movie'
};

const MovieProductPage = () => {
  const handleBookNow = () => {
    alert(`Ticket booked for "${movie.title}" at ${movie.showTime}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <img src={movie.poster} alt="Movie Poster" className="w-full h-auto rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
      <p className="text-lg mb-1">
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p className="text-lg mb-1">
        <strong>Language:</strong> {movie.language}
      </p>
      <p className="text-lg mb-1">
        <strong>Duration:</strong> {movie.duration}
      </p>
      <p className="text-lg mb-1">
        <strong>Show Time:</strong> {movie.showTime}
      </p>
      <p className="text-lg mb-1">
        <strong>Seats Available:</strong> {movie.seatsAvailable}
      </p>
      <p className="text-green-600 font-bold text-xl mb-4">
        NPR {movie.price}
      </p>
      <button
        onClick={handleBookNow}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Book Ticket
      </button>
    </div>
  );
};

export default MovieProductPage;
