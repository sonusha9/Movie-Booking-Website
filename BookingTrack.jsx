import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, CreditCard, User, Phone, Mail, Ticket, Download, ArrowLeft } from 'lucide-react';
import { trackBookingByIdApi, trackBookingByEmailApi } from '../api/api';

const BookingTrack = () => {
  const [trackingMethod, setTrackingMethod] = useState('id'); // 'id' or 'email'
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTrackBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBookingData(null);

    try {
      let response;
      if (trackingMethod === 'id') {
        if (!bookingId.trim()) {
          setError('Please enter a booking ID');
          setLoading(false);
          return;
        }
        response = await trackBookingByIdApi(bookingId.trim());
      } else {
        if (!email.trim()) {
          setError('Please enter an email address');
          setLoading(false);
          return;
        }
        response = await trackBookingByEmailApi(email.trim());
      }

      if (response.success) {
        setBookingData(response.data);
      } else {
        setError(response.message || 'Booking not found');
      }
    } catch (error) {
      console.error('Error tracking booking:', error);
      setError('An error occurred while tracking the booking');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'failed':
        return '✗';
      case 'cancelled':
        return '⊘';
      default:
        return '?';
    }
  };

  const downloadTicket = (booking) => {
    const ticketContent = `
MOVIE TICKET
============

Booking ID: ${booking.bookingId}
Movie: ${booking.movieTitle}
Genre: ${booking.genre}
Duration: ${booking.duration}

Show Details:
Date: ${booking.showDate}
Time: ${booking.showTime}

Seats: ${Array.isArray(booking.selectedSeats) ? booking.selectedSeats.join(', ') : booking.selectedSeats}
Total Amount: Rs. ${booking.totalAmount}

Payment Status: ${booking.paymentStatus.toUpperCase()}
Payment Method: ${booking.paymentMethod || 'Not specified'}
${booking.transactionId ? `Transaction ID: ${booking.transactionId}` : ''}

Customer Details:
Name: ${booking.customerName}
Email: ${booking.customerEmail}
Phone: ${booking.customerPhone}

Booking Date: ${new Date(booking.bookingDate).toLocaleString()}

Please present this ticket at the counter.
    `;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${booking.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <img src="./images/logo.png" alt="Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-red-600">Movie SWIFTS</span>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Booking</h1>
          <p className="text-gray-600">Enter your booking ID or email to track your movie tickets</p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setTrackingMethod('id')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                trackingMethod === 'id'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Ticket className="w-4 h-4 inline mr-2" />
              Track by Booking ID
            </button>
            <button
              onClick={() => setTrackingMethod('email')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                trackingMethod === 'email'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Track by Email
            </button>
          </div>

          <form onSubmit={handleTrackBooking} className="space-y-4">
            {trackingMethod === 'id' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking ID
                </label>
                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="Enter your booking ID (e.g., 12345)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Track Booking
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Booking Results */}
        {bookingData && (
          <div className="space-y-6">
            {Array.isArray(bookingData) ? (
              // Multiple bookings (email search)
              bookingData.map((booking, index) => (
                <div key={booking.bookingId} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{booking.movieTitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.paymentStatus)}`}>
                      {getStatusIcon(booking.paymentStatus)} {booking.paymentStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Show Date: {booking.showDate}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Show Time: {booking.showTime}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Ticket className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Seats: {Array.isArray(booking.selectedSeats) ? booking.selectedSeats.join(', ') : booking.selectedSeats}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Amount: Rs. {booking.totalAmount}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Name: {booking.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Email: {booking.customerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Phone: {booking.customerPhone}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Booking ID: {booking.bookingId}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => downloadTicket(booking)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Ticket</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // Single booking (ID search)
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{bookingData.movieTitle}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(bookingData.paymentStatus)}`}>
                    {getStatusIcon(bookingData.paymentStatus)} {bookingData.paymentStatus.toUpperCase()}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Show Date: {bookingData.showDate}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Show Time: {bookingData.showTime}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Ticket className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Seats: {Array.isArray(bookingData.selectedSeats) ? bookingData.selectedSeats.join(', ') : bookingData.selectedSeats}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Amount: Rs. {bookingData.totalAmount}</span>
                    </div>
                    {bookingData.paymentMethod && (
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Payment Method: {bookingData.paymentMethod}</span>
                      </div>
                    )}
                    {bookingData.transactionId && (
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Transaction ID: {bookingData.transactionId}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Name: {bookingData.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Email: {bookingData.customerEmail}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Phone: {bookingData.customerPhone}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Booking ID: {bookingData.bookingId}
                    </div>
                    <div className="text-sm text-gray-500">
                      Booking Date: {new Date(bookingData.bookingDate).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => downloadTicket(bookingData)}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Ticket</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingTrack; 