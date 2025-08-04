import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, Home, Ticket } from 'lucide-react';
import { cancelPaymentApi } from '../api/api';

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const bookingId = searchParams.get('booking_id');

  const handleCancelBooking = async () => {
    if (!bookingId) {
      alert('No booking ID found');
      return;
    }

    setLoading(true);
    try {
      const response = await cancelPaymentApi(bookingId);
      if (response.success) {
        alert('Booking cancelled successfully');
        navigate('/');
      } else {
        alert(response.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Cancel booking error:', error);
      alert('An error occurred while cancelling the booking');
    } finally {
      setLoading(false);
    }
  };

  const handleRetryPayment = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Cancel Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
            <p className="text-gray-600">Your payment was not completed</p>
          </div>

          {/* Booking Info */}
          {bookingId && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
              <p className="text-gray-600 mb-2">
                <strong>Booking ID:</strong> #{bookingId}
              </p>
              <p className="text-sm text-gray-500">
                This booking is currently pending payment. You can retry the payment or cancel the booking.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleRetryPayment}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Retry Payment</span>
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

          {/* Cancel Booking Button */}
          {bookingId && (
            <div className="border-t pt-6">
              <button
                onClick={handleCancelBooking}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                    <span>Cancelling...</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span>Cancel This Booking</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Help Information */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• If you're having trouble with payment, try a different payment method</li>
              <li>• For Khalti issues, ensure you have sufficient balance</li>
              <li>• For eSewa issues, check your account status</li>
              <li>• Contact our support team for assistance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel; 