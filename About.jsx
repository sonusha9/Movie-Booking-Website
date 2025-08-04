import React from 'react';
import { Film } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#f0fff4] to-[#d1fae5] flex flex-col items-center justify-start p-6 space-y-12'>

      {/* Main About Section */}
      <motion.div 
        className='bg-white shadow-2xl rounded-2xl max-w-4xl w-full p-6 md:p-12'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className='flex justify-center mb-4'>
            <Film size={40} className='text-green-600' />
          </div>
          <h1 className='text-4xl font-extrabold text-green-800 mb-4'>
            About <span className="text-green-600">Movie SWIFTS</span>
          </h1>
          <p className='text-lg text-gray-700 mb-4 leading-relaxed'>
            <span className="font-semibold text-green-700">Movie SWIFTS</span> is a full-featured online movie ticket booking platform designed to simplify your movie-going experience with rich features, secure payments, and real-time seat bookings.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm text-left">
            <h2 className='text-xl font-semibold text-green-700 mb-2'>🎯 Mission:</h2>
            <p className='text-gray-800 mb-4'>
              Revolutionize movie ticketing through innovation, speed, and a seamless digital interface.
            </p>

            <h2 className='text-xl font-semibold text-green-700 mb-2'>🌟 Highlights:</h2>
            <ul className='list-disc list-inside text-gray-800 space-y-1'>
              <li>Multi-city movie search</li>
              <li>Interactive seat layout</li>
              <li>Instant email confirmations</li>
              <li>Secure payments (eSewa, Khalti, etc.)</li>
              <li>Dynamic and mobile-friendly UI</li>
            </ul>
          </div>

          <p className='text-md text-gray-600 mt-6'>
            Enjoy a hassle-free movie booking experience. Powered by technology, built for convenience 🍿🎬
          </p>
        </div>
      </motion.div>

      {/* More Section */}
      <section className="max-w-6xl w-full">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">More &gt;</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-green-700 mb-2">About Us</h3>
            <p className="text-gray-700 mb-4">
              Enriching experiences to amaze you! With technology, comfort, and convenience.
            </p>
            <a href="#" className="text-green-600 font-medium hover:underline">READ MORE</a>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Theater Innovations</h3>
            <p className="text-gray-700 mb-4">
              From 3D to Dolby Atmos – innovation drives our cinematic world.
            </p>
            <a href="#" className="text-green-600 font-medium hover:underline">READ MORE</a>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Immersive Theater</h3>
            <p className="text-gray-700 mb-4">
              Experience the magic of movies with immersive visuals and acoustics.
            </p>
            <a href="#" className="text-green-600 font-medium hover:underline">READ MORE</a>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Pick of the Platter</h3>
            <p className="text-gray-700 mb-4">
              A wide range of snacks and drinks to elevate your movie night.
            </p>
            <a href="#" className="text-green-600 font-medium hover:underline">READ MORE</a>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Reaching Out to Regions</h3>
            <p className="text-gray-700 mb-4">
              Expanding access to cinema beyond the cities — bringing screens to rural hearts.
            </p>
            <a href="#" className="text-green-600 font-medium hover:underline">READ MORE</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
