import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Ticket, Download, Home } from 'lucide-react';
import { getPaymentStatusApi, verifyPaymentApi } from '../api/api';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const bookingId = searchParams.get('booking_id');
  const transactionId = searchParams.get('transaction_id');
  const paymentMethod = searchParams.get('payment_method');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!bookingId) {
        setError('No booking ID found');
        setLoading(false);
        return;
      }

      try {
        // Get booking status
        const statusResponse = await getPaymentStatusApi(bookingId);
        
        if (statusResponse.success) {
          setBooking(statusResponse.booking);
          
          // If payment is still pending and we have transaction ID, verify it
          if (statusResponse.booking.paymentStatus === 'pending' && transactionId) {
            const verifyResponse = await verifyPaymentApi({
              bookingId,
              transactionId,
              paymentMethod: paymentMethod || 'khalti'
            });
            
            if (verifyResponse.success) {
              setBooking(verifyResponse.booking);
            } else {
              setError('Payment verification failed');
            }
          }
        } else {
          setError('Booking not found');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setError('An error occurred while verifying payment');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [bookingId, transactionId, paymentMethod]);

  const handleDownloadTicket = () => {
    // Generate ticket content
    const ticketContent = `
      Movie Ticket
      ============
      
      Movie: ${booking?.Showtime?.Movie?.title || 'N/A'}
      Show Time: ${booking?.Showtime?.time || 'N/A'}
      Date: ${booking?.Showtime?.date || 'N/A'}
      Seats: ${booking?.selectedSeats?.join(', ') || 'N/A'}
      Total Amount: Rs. ${booking?.totalAmount || 'N/A'}
      Payment Method: ${booking?.paymentMethod || 'N/A'}
      Transaction ID: ${booking?.transactionId || 'N/A'}
      Booking ID: ${booking?.id || 'N/A'}
      
      Thank you for booking with Movie SWIFTS!
    `;

    // Create and download file
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket_${booking?.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Your booking has been confirmed</p>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Ticket className="w-5 h-5 mr-2" />
              Booking Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Movie</p>
                <p className="font-semibold">{booking?.Showtime?.Movie?.title || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Show Time</p>
                <p className="font-semibold">{booking?.Showtime?.time || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">{booking?.Showtime?.date || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Seats</p>
                <p className="font-semibold">{booking?.selectedSeats?.join(', ') || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold text-green-600">Rs. {booking?.totalAmount || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold capitalize">{booking?.paymentMethod || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-semibold text-sm">{booking?.transactionId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Booking ID</p>
                <p className="font-semibold">#{booking?.id || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownloadTicket}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download Ticket</span>
            </button>
            <button
              onClick={() => navigate('/track-booking')}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Ticket className="w-5 h-5" />
              <span>Track Booking</span>
            </button>
            <button
              onClick={() => navigate('/user-dashboard')}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Ticket className="w-5 h-5" />
              <span>My Bookings</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Important Information</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Please arrive at least 15 minutes before the show time</li>
              <li>• Bring a valid ID proof for verification</li>
              <li>• Keep this booking confirmation for reference</li>
              <li>• For any queries, contact our support team</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 