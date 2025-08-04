import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Ticket, Star, Heart, CalendarDays, X, Clock } from 'lucide-react';
import PaymentModal from './components/PaymentModal';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState('today');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowTime, setSelectedShowTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();

  const movies = [
    { id: 1, title: 'Jurassic World', genre: 'Adventure', img: './images/jurassicworld.jpg', rating: '4.6', price: 'Rs. 500', date: 'today' },
    { id: 2, title: 'Sitaare Zameen Par', genre: 'Drama', img: './images/sitare.jpg', rating: '4.8', price: 'Rs. 450', date: 'tomorrow' },
    { id: 3, title: 'LAAL PEELI AKHIYAAN', genre: 'Comedy', img: './images/lal.jpg', rating: '4.3', price: 'Rs. 400', date: 'today' },
    { id: 4, title: 'SAIYAARA', genre: 'Love Story', img: './images/saiyaara3.jpg', rating: '4.7', price: 'Rs. 480', date: 'tomorrow' },
    { id: 5, title: 'Damsel', genre: 'Adventure', img: './images/Damsel.jpg', rating: '4.2', price: 'Rs. 520', date: 'today' },
    { id: 6, title: 'KABIR SINGH', genre: 'Romance', img: './images/images.jpeg', rating: '4.9', price: 'Rs. 550', date: 'tomorrow' },
  ];

  const upcomingMovies = [
    { id: 7, title: 'AVENGERS', img: './images/Avengers.jpg', genre: 'Action' },
    { id: 8, title: 'PK', img: './images/PKK.jpg', genre: 'Comedy' },
  ];

  // Showtime mapping with IDs (these should match your database)
  const showTimes = [
    { id: 1, time: '10:00 AM', date: 'today' },
    { id: 2, time: '12:30 PM', date: 'today' },
    { id: 3, time: '3:00 PM', date: 'today' },
    { id: 4, time: '5:30 PM', date: 'today' },
    { id: 5, time: '8:00 PM', date: 'today' },
    { id: 6, time: '10:30 PM', date: 'today' },
    { id: 7, time: '10:00 AM', date: 'tomorrow' },
    { id: 8, time: '12:30 PM', date: 'tomorrow' },
    { id: 9, time: '3:00 PM', date: 'tomorrow' },
    { id: 10, time: '5:30 PM', date: 'tomorrow' },
    { id: 11, time: '8:00 PM', date: 'tomorrow' },
    { id: 12, time: '10:30 PM', date: 'tomorrow' }
  ];

  const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const filteredMovies = movies.filter(movie => movie.date === selectedDate);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowBookingModal(true);
    setSelectedShowTime(null);
    setSelectedSeats([]);
  };

  const handleTrailer = () => {
    window.open('https://www.youtube.com/watch?v=IePbVb2f9C0', '_blank');
  };

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedShowTime || selectedSeats.length === 0) {
      alert('Please select show time and seats');
      return;
    }
    
    const totalPrice = selectedSeats.length * parseInt(selectedMovie.price.replace('Rs. ', ''));
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to proceed with booking');
      navigate('/login');
      return;
    }
    
    // Prepare booking data for payment
    setBookingData({
      movieTitle: selectedMovie.title,
      showTime: selectedShowTime.time,
      selectedSeats: selectedSeats,
      totalAmount: totalPrice,
      showtimeId: selectedShowTime.id, // Use the actual showtime ID
      pricePerSeat: selectedMovie.price
    });
    
    setShowBookingModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (bookingId, paymentMethod) => {
    setShowPaymentModal(false);
    if (paymentMethod === 'cash') {
      alert(`Booking confirmed!\nBooking ID: ${bookingId}\nPayment Method: Cash\nPlease pay at the counter.`);
    } else {
      alert('Payment gateway opened. Please complete the payment in the new tab.');
    }
    navigate('/user-dashboard');
  };

  const isSeatOccupied = (seat) => {
    // Simulate some occupied seats
    const occupiedSeats = ['A1', 'A2', 'B5', 'C8', 'D3', 'E7', 'F1', 'G10'];
    return occupiedSeats.includes(seat);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <img src="./images/logo.png" alt="Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-red-600">Movie SWIFTS</span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {['Home', 'About', 'Contact', 'Movies'].map(item => (
                <button
                  key={item}
                  onClick={() => navigate(`/${item.toLowerCase()}`)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => navigate('/track-booking')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors"
              >
                Track Booking
              </button>
              <button
                onClick={() => navigate('/view-all-bookings')}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors"
              >
                My Bookings
              </button>
            </div>

            <div className="flex space-x-4">
              <button onClick={() => navigate('/login')} className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen bg-black text-white">
        <img src="./images/Saiyaara2.jpg" alt="Hero" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6">SAIYAARA</h1>
            <p className="text-xl mb-8">Love Story • 2h 15m</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleTrailer}
                className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Watch Trailer</span>
              </button>
              <button
                onClick={() => handleMovieClick({ title: 'Saiyaara', price: 'Rs. 480' })}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Ticket className="w-5 h-5" />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Date Filter */}
      <section className="bg-gradient-to-r from-orange-400 to-red-500 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-4">
            {['today', 'tomorrow'].map(date => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedDate === date ? 'bg-white text-red-600' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <CalendarDays className="w-4 h-4 inline mr-2" />
                {date.charAt(0).toUpperCase() + date.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Now Showing */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Now Showing - {selectedDate.charAt(0).toUpperCase() + selectedDate.slice(1)}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img src={movie.img} alt={movie.title} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {movie.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                <p className="text-gray-600 mb-3">{movie.genre}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{movie.rating}</span>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Movies */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Coming Soon</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingMovies.map(movie => (
              <div
                key={movie.id}
                onClick={() => alert(`${movie.title} - Coming Soon!`)}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                <img src={movie.img} alt={movie.title} className="w-full h-80 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-gray-300 mb-4">{movie.genre}</p>
                  <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    Get Notified
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Book Tickets - {selectedMovie.title}</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Show Times */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Select Show Time
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {showTimes
                    .filter(showtime => showtime.date === selectedDate)
                    .map(showtime => (
                      <button
                        key={showtime.id}
                        onClick={() => setSelectedShowTime(showtime)}
                        className={`p-3 rounded-lg border transition-colors ${
                          selectedShowTime?.id === showtime.id
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {showtime.time}
                      </button>
                    ))}
                </div>
              </div>

              {/* Seat Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Select Seats</h3>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="text-center mb-4">
                    <div className="w-4 h-4 bg-gray-400 rounded inline-block mr-2"></div>
                    <span className="text-sm">Screen</span>
                  </div>
                  
                  <div className="space-y-2">
                    {seatRows.map(row => (
                      <div key={row} className="flex justify-center space-x-1">
                        <span className="w-6 text-center text-sm font-semibold">{row}</span>
                        {seatNumbers.map(num => {
                          const seat = `${row}${num}`;
                          const isOccupied = isSeatOccupied(seat);
                          const isSelected = selectedSeats.includes(seat);
                          
                          return (
                            <button
                              key={seat}
                              onClick={() => !isOccupied && handleSeatClick(seat)}
                              disabled={isOccupied}
                              className={`w-8 h-8 rounded text-xs font-semibold transition-colors ${
                                isOccupied
                                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-red-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                              }`}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center space-x-6 mt-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-600 rounded mr-2"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                      <span>Occupied</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Movie:</strong> {selectedMovie.title}</p>
                  <p><strong>Show Time:</strong> {selectedShowTime ? selectedShowTime.time : 'Not selected'}</p>
                  <p><strong>Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Not selected'}</p>
                  <p><strong>Price per seat:</strong> {selectedMovie.price}</p>
                  <p><strong>Total:</strong> Rs. {selectedSeats.length * parseInt(selectedMovie.price.replace('Rs. ', ''))}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedShowTime || selectedSeats.length === 0}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && bookingData && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          bookingData={bookingData}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Contact</h4>
              <p>📞 +977 9825779632</p>
              <p>📧 support@movieswiftnepal.com</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
              <div className="space-y-2">
                {['About', 'Contact', 'Movies'].map(item => (
                  <button
                    key={item}
                    onClick={() => navigate(`/${item.toLowerCase()}`)}
                    className="block w-full text-left hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => navigate('/track-booking')}
                  className="block w-full text-left hover:text-white transition-colors"
                >
                  Track Booking
                </button>
                <button
                  onClick={() => navigate('/view-all-bookings')}
                  className="block w-full text-left hover:text-white transition-colors"
                >
                  My Bookings
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Payment</h4>
              <div className="space-y-2">
                <img src="./images/khalti.png" alt="Khalti" className="h-12" />
                <img src="./images/esewa.png" alt="eSewa" className="h-12" />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Follow Us</h4>
              <div className="flex justify-center space-x-4">
                {['f', 'in', 't'].map(social => (
                  <button
                    key={social}
                    onClick={() => alert(`${social.toUpperCase()} - Coming Soon!`)}
                    className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <span className="text-white font-bold">{social}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p>© {new Date().getFullYear()} MovieBookingNepal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 