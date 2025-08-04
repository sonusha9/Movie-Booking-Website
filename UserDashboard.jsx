import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Heart, 
  Settings, 
  LogOut, 
  Ticket, 
  Film, 
  TrendingUp, 
  Bell,
  Edit,
  Camera,
  BookOpen,
  Award
} from "lucide-react";

function UserDashboard() {
  const [user, setUser] = useState({
    name: "sonu",
    email: "sonu21@.com",
    avatar: "./images/logo.png",
    memberSince: "2024",
    totalBookings: 12,
    favoriteGenre: "Action",
    loyaltyPoints: 450
  });
  
  const [bookings, setBookings] = useState([
    {
      id: 1,
      movieTitle: "Jurassic World",
      movieImage: "./images/jurassicworld.jpg",
      date: "2024-12-15",
      time: "8:00 PM",
      seats: ["A5", "A6"],
      price: "Rs. 1000",
      status: "upcoming",
      rating: 4.5
    },
    {
      id: 2,
      movieTitle: "SAIYAARA",
      movieImage: "./images/saiyaara3.jpg",
      date: "2024-12-10",
      time: "5:30 PM",
      seats: ["C3"],
      price: "Rs. 480",
      status: "completed",
      rating: 4.8
    },
    {
      id: 3,
      movieTitle: "Damsel",
      movieImage: "./images/Damsel.jpg",
      date: "2024-12-05",
      time: "3:00 PM",
      seats: ["B8", "B9"],
      price: "Rs. 1040",
      status: "completed",
      rating: 4.2
    }
  ]);

  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const upcomingBookings = bookings.filter(booking => booking.status === "upcoming");
  const completedBookings = bookings.filter(booking => booking.status === "completed");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    return status === "upcoming" ? "text-blue-600 bg-blue-100" : "text-green-600 bg-green-100";
  };

  const getStatusText = (status) => {
    return status === "upcoming" ? "Upcoming" : "Completed";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="./images/logo.png" alt="Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-red-600">Movie SWIFTS</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-100">
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  <p className="text-gray-600 mb-2">{user.email}</p>
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {user.memberSince}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>{user.loyaltyPoints} points</span>
                    </span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold">{user.totalBookings}</p>
              </div>
              <Ticket className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Upcoming</p>
                <p className="text-3xl font-bold">{upcomingBookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Loyalty Points</p>
                <p className="text-3xl font-bold">{user.loyaltyPoints}</p>
              </div>
              <Award className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Favorite Genre</p>
                <p className="text-xl font-bold">{user.favoriteGenre}</p>
              </div>
              <Heart className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "bookings", label: "My Bookings", icon: Ticket },
                { id: "favorites", label: "Favorites", icon: Heart },
                { id: "settings", label: "Settings", icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img src={booking.movieImage} alt={booking.movieTitle} className="w-16 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{booking.movieTitle}</h4>
                          <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusText(booking.status)}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600">{booking.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                        <span className="flex items-center space-x-3">
                          <Film className="w-5 h-5 text-red-600" />
                          <span>Browse Movies</span>
                        </span>
                        <span className="text-gray-400">→</span>
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                        <span className="flex items-center space-x-3">
                          <Ticket className="w-5 h-5 text-red-600" />
                          <span>Book Tickets</span>
                        </span>
                        <span className="text-gray-400">→</span>
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                        <span className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-red-600" />
                          <span>View History</span>
                        </span>
                        <span className="text-gray-400">→</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <img src="./images/Avengers.jpg" alt="Avengers" className="w-12 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">Avengers</h5>
                          <p className="text-sm text-gray-600">Action • Coming Soon</p>
                        </div>
                        <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                          Notify
                        </button>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <img src="./images/PKK.jpg" alt="PK" className="w-12 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">PK</h5>
                          <p className="text-sm text-gray-600">Comedy • Coming Soon</p>
                        </div>
                        <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                          Notify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Bookings</h3>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Book New Movie
                  </button>
                </div>

                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        <img src={booking.movieImage} alt={booking.movieTitle} className="w-24 h-32 object-cover rounded-lg" />
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <h4 className="text-xl font-semibold text-gray-900">{booking.movieTitle}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusText(booking.status)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{booking.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{booking.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{booking.seats.join(", ")}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-gray-600">{booking.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-lg font-semibold text-gray-900">{booking.price}</span>
                            {booking.status === "upcoming" && (
                              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                View Ticket
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">My Favorites</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Jurassic World", image: "./images/jurassicworld.jpg", genre: "Adventure", rating: 4.6 },
                    { title: "SAIYAARA", image: "./images/saiyaara3.jpg", genre: "Love Story", rating: 4.7 },
                    { title: "Damsel", image: "./images/Damsel.jpg", genre: "Adventure", rating: 4.2 }
                  ].map((movie, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{movie.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{movie.genre}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{movie.rating}</span>
                          </div>
                          <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Profile Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input type="text" defaultValue={user.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" defaultValue={user.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Email Notifications</span>
                        <button className="w-12 h-6 bg-red-600 rounded-full relative">
                          <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">SMS Notifications</span>
                        <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                          <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
