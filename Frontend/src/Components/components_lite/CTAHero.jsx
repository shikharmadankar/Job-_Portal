import React from 'react'
import { Link } from 'react-router-dom'

const CTAHero = () => {
  return (
    <div className="bg-purple-600 py-20 px-6 text-center relative overflow-hidden mb-0">

      {/* Background Glow / Shape */}
      <div className="absolute inset-0 flex justify-center items-center opacity-20">
        <div className="w-500px h-500px bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-white">

        {/* Small Tag */}
        <p className="text-sm tracking-wide mb-4">#1 JOB PORTAL</p>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Discover Your Next Career <br />
          Move with Ease
        </h1>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          
          <button className="bg-white text-purple-600 px-6 py-2 rounded-md font-medium">
            <Link to='/jobb'>
            Start job search
            </Link>
          </button>

          <button className="border border-white px-6 py-2 rounded-md text-white hover:bg-white hover:text-purple-600 transition">
            <Link to='/aboutus'>
            Learn More
            </Link>
          </button>

        </div>
      </div>
    </div>
  )
}

export default CTAHero
