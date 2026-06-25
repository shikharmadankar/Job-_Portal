import React from 'react';
import { Search, MapPin, Briefcase, Building, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      type: "Full-Time",
      salary: "₹15L - ₹25L",
      posted: "2 days ago"
    },
    {
      title: "Backend Engineer",
      company: "Amazon",
      location: "Hyderabad, India",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      type: "Full-Time",
      salary: "₹18L - ₹30L",
      posted: "1 day ago"
    },
    {
      title: "UI/UX Designer",
      company: "Adobe",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
      type: "Remote",
      salary: "₹12L - ₹20L",
      posted: "Just now"
    },
    {
      title: "Data Analyst",
      company: "Microsoft",
      location: "Pune, India",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      type: "Full-Time",
      salary: "₹10L - ₹18L",
      posted: "3 days ago"
    },
    {
      title: "Mobile App Developer",
      company: "Flipkart",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1526378722484-cc5c5109f89d",
      type: "Hybrid",
      salary: "₹14L - ₹22L",
      posted: "5 hours ago"
    },
  ];

  return (
    <div className="font-sans bg-[#f8fafc] min-h-screen selection:bg-purple-200 selection:text-purple-900 pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Abstract Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-purple-300/30 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[40%] rounded-full bg-indigo-300/30 blur-[100px] pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[30%] rounded-full bg-pink-200/30 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-8 hover:bg-purple-100 transition duration-300 cursor-default shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </span>
            Over 10,000+ jobs available
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.1] mb-6">
            Discover Your Next <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Career Move
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
            Join thousands of professionals finding their dream roles at top tech companies, startups, and remote-first organizations.
          </p>

          {/* ─── GLASSMORPHISM SEARCH BAR ─── */}
          <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border border-white/80 p-3 md:p-4 rounded-3xl shadow-[0_20px_60px_-15px_rgba(124,58,237,0.15)] flex flex-col md:flex-row gap-3 transition-transform hover:scale-[1.01] duration-300">
            
            <div className="flex-1 flex items-center bg-white rounded-2xl px-4 py-3 md:py-4 border border-slate-100 focus-within:ring-2 focus-within:ring-purple-400/50 focus-within:border-purple-400 transition-all shadow-sm">
              <Search className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium text-sm md:text-base"
              />
            </div>

            <div className="flex-1 flex items-center bg-white rounded-2xl px-4 py-3 md:py-4 border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-400/50 focus-within:border-indigo-400 transition-all shadow-sm">
              <MapPin className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium text-sm md:text-base"
              />
            </div>

            <Link to="/jobb" className="md:w-auto w-full">
              <button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 md:py-4 px-8 rounded-2xl hover:shadow-[0_10px_25px_-5px_rgba(124,58,237,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                Search Jobs
              </button>
            </Link>
          </div>

          {/* Popular Searches */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3 text-sm font-medium text-slate-500">
            <span className="text-slate-400">Popular:</span>
            {['Frontend', 'Backend', 'UI/UX Design', 'Remote', 'Data Science'].map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white border border-slate-200 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 cursor-pointer transition-colors shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── LATEST JOB SLIDER ─── */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Featured Opportunities</h2>
            <p className="text-slate-500 font-medium">Hand-picked roles from top companies</p>
          </div>
          <Link to="/jobb">
            <button className="hidden sm:flex items-center gap-1 text-purple-600 font-semibold hover:text-purple-800 transition">
              View all <ChevronRight size={18} />
            </button>
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {jobs.map((job, index) => (
            <div
              key={index}
              className="min-w-[320px] max-w-[320px] bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_-10px_rgba(124,58,237,0.15)] hover:-translate-y-1 transition-all duration-300 snap-center group flex flex-col"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="text-slate-300 hover:text-yellow-400 transition-colors">
                  <Star size={22} />
                </button>
              </div>

              <div className="mb-4 flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-purple-600 transition-colors">{job.title}</h3>
                <p className="text-slate-500 font-medium flex items-center gap-1.5 text-sm">
                  <Building size={14} /> {job.company}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold tracking-wide">
                  {job.type}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold tracking-wide flex items-center gap-1">
                  <MapPin size={12} /> {job.location.split(',')[0]}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-lg font-bold text-slate-800">{job.salary}</p>
                  <p className="text-xs text-slate-400 font-medium">{job.posted}</p>
                </div>
                <Link to="/jobb">
                  <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-purple-600 hover:shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-300">
                    <Briefcase size={18} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CATEGORIES / STATS ─── */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-purple-500/30 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
                Your future <br /> career starts here.
              </h2>
              <p className="text-indigo-200 text-lg mb-8 max-w-md">
                Create a profile, apply to top companies, and manage your interviews all in one place.
              </p>
              <div className="flex gap-4">
                <Link to="/signup">
                  <button className="bg-white text-purple-900 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)]">
                    Create Account
                  </button>
                </Link>
                <Link to="/aboutus">
                  <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl border border-white/20 backdrop-blur-md transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Active Jobs", value: "10k+", color: "bg-purple-500/20" },
                { label: "Companies", value: "2,500", color: "bg-indigo-500/20" },
                { label: "New Users", value: "1.2M", color: "bg-pink-500/20" },
                { label: "Hired Daily", value: "500+", color: "bg-blue-500/20" },
              ].map((stat, i) => (
                <div key={i} className={`${stat.color} backdrop-blur-md border border-white/10 p-6 rounded-3xl text-center transform transition-all duration-300 hover:-translate-y-2 hover:bg-white/10`}>
                  <h3 className="text-4xl font-extrabold mb-1">{stat.value}</h3>
                  <p className="text-indigo-200 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
