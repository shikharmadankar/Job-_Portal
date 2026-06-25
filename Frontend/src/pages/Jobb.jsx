import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Building, ChevronRight, Star, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Utility for time ago
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return Math.floor(seconds) + " seconds ago";
};

const Jobb = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ keyword: "", location: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Create query string
      const url = new URL("http://localhost:8000/api/job/get");
      if (searchParams.keyword) url.searchParams.append("keyword", searchParams.keyword);
      // Backend currently doesn't support location filter heavily but we'll prepare the state

      const res = await axios.get(url.toString(), { withCredentials: true });
      if (res.data.status || res.data.success) {
        setJobs(res.data.jobs || []);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleApplyClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  // Safe fallback for company name
  const getCompanyName = (job) => job.company?.name || "Unknown Company";

  return (
    <div className="font-sans bg-[#f8fafc] min-h-screen selection:bg-purple-200 selection:text-purple-900 pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <div className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-[-20%] left-[10%] w-[30%] h-[60%] rounded-full bg-indigo-200/40 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] w-[25%] h-[50%] rounded-full bg-purple-200/40 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-[1.1] mb-6">
              Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Open Positions</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 font-medium">
              Explore thousands of active job opportunities posted by leading organizations tailored to your skills and goals.
            </p>
          </div>

          {/* ─── FIND JOBS FILTER BAR ─── */}
          <form onSubmit={handleSearch} className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/80 p-3 rounded-2xl shadow-[0_10px_40px_-10px_rgba(124,58,237,0.1)] flex flex-col md:flex-row gap-3">
            
            <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-400/50 transition-all">
              <Search className="text-slate-400 mr-3" size={18} />
              <input
                type="text"
                value={searchParams.keyword}
                onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
                placeholder="Job title or keywords..."
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium text-sm"
              />
            </div>

            <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-400/50 transition-all">
              <MapPin className="text-slate-400 mr-3" size={18} />
              <input
                type="text"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                placeholder="Location (City, State, Remote)"
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium text-sm"
              />
            </div>

            <button type="submit" className="md:w-32 bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
            
            {/* LATEST JOBS COLUMN */}
            <div className="lg:w-1/3 space-y-6">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                   <ClockIcon size={20} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-800">Fresh Postings</h2>
               </div>

               <div className="space-y-4">
                  {loading ? (
                    <p className="text-slate-500 text-center py-6">Loading fresh jobs...</p>
                  ) : jobs.length === 0 ? (
                    <p className="text-slate-500 text-center py-6">No jobs found.</p>
                  ) : (
                    jobs.slice(0, 5).map((job) => (
                      <div key={`latest-${job._id}`} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group">
                         <h3 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors truncate">{job.title}</h3>
                         <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-1 truncate">
                            <Building size={14} className="flex-shrink-0" /> {getCompanyName(job)}
                         </p>
                         <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
                            <span className="text-xs font-bold text-slate-400">{timeAgo(job.createdAt)}</span>
                            <span className="text-xs font-bold px-3 py-1 bg-purple-50 text-purple-700 rounded-full">{job.jobType}</span>
                         </div>
                      </div>
                    ))
                  )}
               </div>
            </div>

            {/* ALL JOBS GRID */}
            <div className="lg:w-2/3">
              <div className="flex justify-between items-end mb-8">
                 <div>
                   <h2 className="text-3xl font-bold text-slate-800 mb-2">All Active Jobs</h2>
                   <p className="text-slate-500 font-medium">Showing actively recruiting roles</p>
                 </div>
                 <span className="text-sm font-bold text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">{jobs.length} Results</span>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-white p-10 rounded-3xl border border-slate-100 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Search size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">No active jobs found</h3>
                  <p className="text-slate-500">Try adjusting your search criteria or come back later.</p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                      <div
                        key={`recommended-${job._id}`}
                        className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_-10px_rgba(124,58,237,0.15)] hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                      >
                        <div className="flex justify-between items-start mb-5">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 text-purple-700 font-bold text-xl">
                            {job.company?.logo ? (
                               <img src={job.company.logo} alt={getCompanyName(job)} className="w-full h-full object-cover" />
                            ) : (
                               getCompanyName(job).charAt(0).toUpperCase()
                            )}
                          </div>
                          <button className="text-slate-300 hover:text-yellow-400 transition-colors">
                            <Star size={22} />
                          </button>
                        </div>

                        <div className="mb-4 flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-purple-600 transition-colors line-clamp-2">{job.title}</h3>
                          <p className="text-slate-500 font-medium flex items-center gap-1.5 text-sm truncate">
                            <Building size={14} className="flex-shrink-0" /> {getCompanyName(job)}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold tracking-wide">
                            {job.jobType}
                          </span>
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold tracking-wide flex items-center gap-1">
                            <MapPin size={12} /> {job.location.split(',')[0]}
                          </span>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <div>
                            <p className="text-lg font-bold text-slate-800">₹{job.salary}</p>
                            <p className="text-xs text-slate-400 font-medium">{timeAgo(job.createdAt)}</p>
                          </div>
                          <button 
                            onClick={handleApplyClick}
                            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-purple-600 hover:shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] transition-all duration-300"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {jobs.length > 0 && (
                     <div className="flex justify-center mt-12 gap-2">
                       <button className="w-10 h-10 rounded-xl bg-purple-600 shadow-lg shadow-purple-500/30 text-white font-bold flex items-center justify-center">1</button>
                     </div>
                  )}
                </>
              )}
            </div>
        </div>
      </div>

      {/* ─── BOTTOM CTA ─── */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[2rem] p-10 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[50px] rounded-full pointer-events-none" />
           <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Recruiter actively hiring?
              </h2>
              <p className="text-indigo-100 text-lg mb-8 font-medium">
                Post your open positions today and get access to thousands of qualified candidates ready to interview.
              </p>
              <Link to="/signup">
                <button className="bg-white text-purple-900 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-lg">
                  Start Hiring
                </button>
              </Link>
           </div>
        </div>
      </div>

    </div>
  )
}

const ClockIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)

export default Jobb;
