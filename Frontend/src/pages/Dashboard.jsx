import React, { useEffect, useState } from "react";
import { Home, BookOpen, Calendar, User, LogOut, Search, Bell, MapPin, Briefcase, Star, Clock, CheckCircle, XCircle, ChevronRight, Video, TrendingUp, FileText, Menu, X, Settings } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [jobsError, setJobsError] = useState(null);

  // Applications state for Dashboard tab
  const [myApplications, setMyApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [applicationsError, setApplicationsError] = useState(null);

  // Meetings state for Schedule tab
  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [meetingsError, setMeetingsError] = useState(null);

  useEffect(() => {
    if (activeTab === "Jobs") {
      let isMounted = true;
      const fetchJobsAndApplications = async () => {
        setLoadingJobs(true);
        setJobsError(null);
        try {
          const resJobs = await axios.get(`${API_URL}/job/get`, {
            withCredentials: true
          });
          if (!isMounted) return;
          if (resJobs.data.status) {
            setJobs(resJobs.data.jobs);
          }
          
          try {
            const resApps = await axios.get(`${API_URL}/application/get`, {
              withCredentials: true
            });
            if (!isMounted) return;
            if (resApps.data.success) {
              const appliedSet = new Set(resApps.data.application.map(app => app.job._id));
              setAppliedJobs(appliedSet);
            }
          } catch (appErr) {
            console.error(`Error fetching applications from ${API_URL}/application/get:`, appErr.response ? {
              status: appErr.response.status,
              data: appErr.response.data
            } : appErr.message);
          }
        } catch (error) {
          if (!isMounted) return;
          console.error(`Error fetching jobs from ${API_URL}/job/get:`, error.response ? {
            status: error.response.status,
            data: error.response.data
          } : error.message);
          setJobsError(error.response?.data?.message || error.message || "Failed to load jobs");
        } finally {
          if (isMounted) {
            setLoadingJobs(false);
          }
        }
      };
      fetchJobsAndApplications();
      return () => {
        isMounted = false;
      };
    }
  }, [activeTab]);

  // Fetch applications for dashboard
  useEffect(() => {
    if (activeTab === "Dashboard") {
      let isMounted = true;
      const fetchMyApps = async () => {
        setLoadingApplications(true);
        setApplicationsError(null);
        try {
          const res = await axios.get(`${API_URL}/application/get`, {
            withCredentials: true
          });
          if (!isMounted) return;
          if (res.data.success) {
            setMyApplications(res.data.application);
          }
        } catch (error) {
          if (!isMounted) return;
          console.error(`Error fetching applications from ${API_URL}/application/get:`, error.response ? {
            status: error.response.status,
            data: error.response.data
          } : error.message);
          setApplicationsError(error.response?.data?.message || error.message || "Failed to load applications");
        } finally {
          if (isMounted) {
            setLoadingApplications(false);
          }
        }
      };
      fetchMyApps();
      return () => {
        isMounted = false;
      };
    }
  }, [activeTab]);

  // Fetch meetings for schedule tab
  useEffect(() => {
    if (activeTab === "Schedule") {
      let isMounted = true;
      const fetchMeetings = async () => {
        setLoadingMeetings(true);
        setMeetingsError(null);
        try {
          const res = await axios.get(`${API_URL}/meeting/student`, {
            withCredentials: true
          });
          if (!isMounted) return;
          if (res.data.success) {
            setMeetings(res.data.meetings);
          }
        } catch (error) {
          if (!isMounted) return;
          console.error(`Error fetching meetings from ${API_URL}/meeting/student:`, error.response ? {
            status: error.response.status,
            data: error.response.data
          } : error.message);
          setMeetingsError(error.response?.data?.message || error.message || "Failed to load schedule");
        } finally {
          if (isMounted) {
            setLoadingMeetings(false);
          }
        }
      };
      fetchMeetings();
      return () => {
        isMounted = false;
      };
    }
  }, [activeTab]);

  const handleApply = async (jobId) => {
    try {
      const res = await axios.get(`${API_URL}/application/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setAppliedJobs((prev) => new Set([...prev, jobId]));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error applying to job");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const renderDashboardContent = () => (
    <div className="animate-fade-in space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto">
          <div className="relative group w-full md:w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for jobs, skills, or companies..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-0 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium text-gray-700 transition-all text-sm"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="relative p-2 rounded-full hover:bg-white/50 cursor-pointer transition">
             <Bell className="h-6 w-6 text-gray-600 hover:text-purple-600 transition-colors" />
             <span className="absolute top-1 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-[#f8fafc]"></span>
          </div>
          <button onClick={() => setActiveTab("Jobs")} className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
            <Briefcase size={16} /> Browse Jobs
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            {user?.profile?.profilePhoto ? (
              <img
                src={user.profile.profilePhoto}
                alt="profile"
                className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover cursor-pointer hover:border-purple-200 transition"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-50 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white cursor-pointer">
                {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <div className="hidden md:block">
               <p className="font-extrabold text-sm text-gray-800 leading-tight tracking-tight">{user?.fullname || "Loading..."}</p>
               <p className="text-gray-500 text-xs font-semibold mt-0.5">Job Seeker</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner inside Dashboard */}
      <div className="relative bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] text-white p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center shadow-[0_20px_40px_-15px_rgba(76,29,149,0.5)] overflow-hidden group">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-400/30 transition duration-700" />
        <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-indigo-500/20 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center md:text-left mb-6 md:mb-0 max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 border border-white/10 text-xs font-bold mb-6 tracking-wide backdrop-blur-md">
             <TrendingUp size={14} /> NEW OPPORTUNITIES AWAIT!
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-white tracking-tight leading-tight">
            Ready to find your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">dream career?</span>
          </h2>
          <p className="text-indigo-200 text-base font-medium max-w-sm mx-auto md:mx-0">
             Discover roles tailored to your skills. Don't let your next big chance slip away.
          </p>
        </div>
        <div className="relative z-10 flex-shrink-0">
          {user?.profile?.profilePhoto ? (
             <div className="relative">
               <div className="absolute inset-0 bg-purple-500 rounded-[2rem] blur-xl opacity-50 group-hover:scale-110 transition duration-500"></div>
                <img
                  src={user.profile.profilePhoto}
                  alt="profile banner"
                  className="w-36 h-36 md:w-44 md:h-44 rounded-[2rem] drop-shadow-2xl border-4 border-white/20 object-cover relative z-10"
                />
             </div>
          ) : (
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center text-7xl shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500">
              🚀
            </div>
          )}
        </div>
      </div>

      {/* Skills & Recommended Categories */}
      <div>
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">Explore Categories</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            { name: "Web Dev", icon: "🌐", bg: "bg-blue-50 text-blue-600", border: "border-blue-100" },
            { name: "Software Eng.", icon: "💻", bg: "bg-purple-50 text-purple-600", border: "border-purple-100" },
            { name: "UI/UX Design", icon: "✨", bg: "bg-pink-50 text-pink-600", border: "border-pink-100" },
            { name: "Data Science", icon: "📊", bg: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
            { name: "Marketing", icon: "📱", bg: "bg-amber-50 text-amber-600", border: "border-amber-100" },
          ].map((course, index) => (
            <div
              key={index}
              className={`group bg-white p-6 rounded-[2rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border ${course.border} hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center`}
            >
              <div className={`w-16 h-16 rounded-2xl ${course.bg} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                 {course.icon}
              </div>
              <p className="text-sm font-bold text-gray-800">{course.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Applications Table Redesign */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">Recent Activity</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Track your job application status</p>
          </div>
          <button className="text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
             View All
          </button>
        </div>
        
        <div className="bg-white rounded-[2rem] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100/50 p-2">
            {loadingApplications ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                 <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-gray-500 font-medium">Fetching your applications...</p>
              </div>
            ) : applicationsError ? (
              <div className="p-12 text-center flex flex-col items-center justify-center bg-red-50/50 rounded-2xl border border-red-100">
                 <p className="text-red-600 font-semibold mb-2">Failed to load applications</p>
                 <p className="text-gray-500 text-xs mb-4">{applicationsError}</p>
                 <button onClick={() => setActiveTab("Dashboard")} className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-700 transition">
                    Retry
                 </button>
              </div>
            ) : myApplications.length === 0 ? (
              <div className="p-16 text-center flex flex-col items-center">
                 <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-5 border border-gray-100 shadow-sm">
                    <Briefcase className="text-gray-300" size={36}/>
                 </div>
                 <h4 className="text-xl font-extrabold text-gray-800 mb-2">No applications found</h4>
                 <p className="text-gray-500 text-sm max-w-sm font-medium">You haven't applied to any jobs yet. Head over to the Jobs tab and start your journey.</p>
                 <button onClick={() => setActiveTab("Jobs")} className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-purple-600 transition-colors">
                    Explore Jobs Now
                 </button>
              </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {myApplications.slice(0, 5).map((app, i) => (
                        <div key={app._id || i} className="p-4 rounded-xl flex items-center justify-between hover:bg-gray-50/80 transition-colors group">
                            <div className="flex items-center gap-4 border-r border-gray-100 pr-4 md:border-none md:pr-0 w-3/4 md:w-auto">
                                <div className="w-12 h-12 rounded-2xl bg-[#0f172a] flex items-center justify-center text-xl font-black text-white shadow-md transform group-hover:scale-105 transition-transform flex-shrink-0">
                                   {app.job?.company?.name?.charAt(0)?.toUpperCase() || "C"}
                                </div>
                                <div className="min-w-0 pr-4 md:pr-0">
                                    <h4 className="font-extrabold text-gray-800 text-base group-hover:text-purple-600 transition-colors truncate">{app.job?.title || "N/A"}</h4>
                                    <p className="text-sm text-gray-500 font-medium mt-0.5 truncate flex items-center gap-1.5">
                                      <Briefcase size={12}/> {app.job?.company?.name || "Unknown"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 pl-2 md:pl-0 flex-shrink-0">
                                <span className={`hidden md:flex px-4 py-1.5 text-xs rounded-full font-bold capitalize items-center gap-1.5 shadow-sm
                                    ${app.status === 'accepted' ? 'bg-green-50 text-green-700 border border-green-200' : 
                                      app.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' : 
                                      'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}
                                >
                                    {app.status === 'accepted' && <CheckCircle size={14} />}
                                    {app.status === 'rejected' && <XCircle size={14} />}
                                    {app.status === 'pending' && <Clock size={14} />}
                                    {app.status}
                                </span>
                                <div className="md:hidden">
                                    {app.status === 'accepted' && <CheckCircle className="text-green-500" size={20} />}
                                    {app.status === 'rejected' && <XCircle className="text-red-500" size={20} />}
                                    {app.status === 'pending' && <Clock className="text-yellow-500" size={20} />}
                                </div>
                                <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-600 hover:bg-purple-600 hover:shadow-md hover:shadow-purple-500/20 transition-all">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="animate-fade-in">
      <div className="flex justify-between items-end mb-8">
         <div>
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">Explore Jobs</h2>
            <p className="text-gray-500 font-medium">Find your next role from top matched positions</p>
         </div>
      </div>
      
      {loadingJobs ? (
        <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      ) : jobsError ? (
        <div className="bg-red-50/50 p-8 rounded-[2rem] border border-red-100 text-center shadow-sm max-w-md mx-auto">
           <p className="text-red-600 font-bold mb-2">Failed to load jobs</p>
           <p className="text-gray-500 text-sm mb-4">{jobsError}</p>
           <button onClick={() => { setActiveTab("Jobs"); }} className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-700 transition">
              Retry
           </button>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] border border-gray-100 text-center shadow-sm">
           <Search size={40} className="mx-auto text-gray-300 mb-4" />
           <h3 className="text-xl font-extrabold text-gray-700 mb-2">No jobs available</h3>
           <p className="text-gray-500 font-medium">Check back later for new opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-[2rem] p-6 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_-10px_rgba(124,58,237,0.15)] hover:border-purple-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex items-center justify-center font-black text-2xl shadow-md">
                       {job.company?.name?.charAt(0)?.toUpperCase() || "C"}
                    </div>
                    <button className="text-gray-300 hover:text-yellow-400 focus:text-yellow-400 transition-colors">
                      <Star size={24} fill="currentColor" className="opacity-40 hover:opacity-100" />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-extrabold text-xl text-gray-800 line-clamp-1 group-hover:text-purple-600 transition-colors">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 font-semibold flex items-center gap-1.5 truncate">
                      <span className="text-gray-800">{job.company?.name || "Unknown Company"}</span> • {job.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1.5 bg-blue-50/80 text-blue-700 border border-blue-100/50 rounded-lg text-xs font-bold tracking-wide">
                      {job.jobType}
                    </span>
                    <span className="px-3 py-1.5 bg-green-50/80 text-green-700 border border-green-100/50 rounded-lg text-xs font-bold tracking-wide">
                      ₹{job.salary}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50">
                      {appliedJobs.has(job._id) ? (
                        <button disabled className="w-full bg-green-50 text-green-700 py-3.5 rounded-xl text-sm font-bold border border-green-200 cursor-not-allowed flex items-center justify-center gap-2">
                          <CheckCircle size={16} /> Applied Successfully
                        </button>
                      ) : (
                        <button onClick={() => handleApply(job._id)} className="w-full bg-slate-900 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform active:scale-95">
                          Apply Now
                        </button>
                      )}
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSchedule = () => (
    <div className="animate-fade-in">
      <div className="flex justify-between items-end mb-8">
         <div>
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">Interview Schedule</h2>
            <p className="text-gray-500 font-medium">Keep track of your upcoming interviews</p>
         </div>
      </div>

      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 min-h-[50vh]">
        {loadingMeetings ? (
          <div className="flex justify-center items-center h-full py-20">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        ) : meetingsError ? (
          <div className="text-center py-20 flex flex-col items-center justify-center bg-red-50/50 rounded-2xl border border-red-100 max-w-md mx-auto">
             <p className="text-red-600 font-bold mb-2">Failed to load schedule</p>
             <p className="text-gray-500 text-sm mb-4">{meetingsError}</p>
             <button onClick={() => { setActiveTab("Schedule"); }} className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-700 transition">
                Retry
             </button>
          </div>
        ) : meetings.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
             <div className="w-24 h-24 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center justify-center mb-6 shadow-inner">
                <Calendar size={40} className="text-gray-300" />
             </div>
             <h3 className="font-extrabold text-xl text-gray-700 mb-2">No Upcoming Interviews</h3>
             <p className="text-gray-500 font-medium max-w-sm">When a recruiter schedules an interview with you smoothly, it will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {meetings.map((m) => {
              const meetDate = new Date(m.scheduledDate);
              const isToday = new Date().toDateString() === meetDate.toDateString();
              const isPast = meetDate < new Date();

              return (
                <div key={m._id} className={`relative flex flex-col md:flex-row justify-between md:items-center p-6 border rounded-2xl hover:shadow-md transition-all group overflow-hidden bg-white
                  ${isToday ? 'border-purple-200 shadow-[0_4px_20px_-5px_rgba(168,85,247,0.15)]' : isPast ? 'border-gray-100 opacity-70' : 'border-gray-100'}
                `}>
                  {isToday && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500 rounded-l-2xl"></div>}
                  
                  <div className="flex items-start gap-4 md:mb-0 mb-4 pl-2 md:pl-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm
                        ${isToday ? 'bg-purple-100 text-purple-600' : 'bg-gray-50 text-gray-500'}`}>
                        <Calendar size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-extrabold text-lg ${isToday ? 'text-purple-700' : 'text-gray-800'}`}>{m.title}</h4>
                          {isToday && <span className="px-2.5 py-0.5 rounded-md bg-purple-500 text-white text-[10px] font-black uppercase tracking-wider">Today</span>}
                      </div>
                      <p className="text-sm font-medium text-gray-500">
                        <span className="text-gray-700 font-bold">{m.job?.title || "Position"}</span> at {m.job?.company?.name || "Company"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <User size={12}/> {m.recruiter?.fullname || "Recruiter"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:text-right border-t md:border-t-0 border-gray-50 pt-4 md:pt-0">
                    <div className="flex items-center gap-2 text-gray-800 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Clock size={14} className="text-purple-500" />
                        <p className="font-bold text-sm">
                          {isToday ? meetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 
                           `${meetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${meetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
                        </p>
                    </div>
                    
                    <div className="mt-0 md:mt-3">
                        {m.description ? (
                          <a
                            href={m.description.startsWith("http") ? m.description : `https://${m.description}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 group-hover:bg-purple-600 px-4 py-2 rounded-xl shadow-md transition-all duration-300"
                          >
                            <Video size={14} /> Join Call
                          </a>
                        ) : (
                          <button disabled className="text-xs font-bold text-gray-400 border border-gray-200 bg-gray-50 px-4 py-2 rounded-xl cursor-not-allowed">
                            No Link Yet
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      {/* Mobile Sidebar Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-[10px_0_30px_-15px_rgba(0,0,0,0.05)] border-r border-gray-100 p-6 flex flex-col h-full transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between mb-10 pl-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                 <Briefcase size={16} className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Job<span className="text-purple-600">tale</span></h2>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X size={18} />
            </button>
        </div>

        <nav className="space-y-1.5 flex-1">
          {/* Desktop Navigation Items */}
          <div className="hidden md:block space-y-1.5">
            <div
              onClick={() => { setActiveTab("Dashboard"); }}
              className={`flex items-center gap-3.5 font-bold cursor-pointer px-4 py-3.5 rounded-[1rem] transition-all duration-300 ${activeTab === 'Dashboard' ? 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Home size={20} className={activeTab === 'Dashboard' ? 'text-purple-600' : ''} /> Dashboard
            </div>

            <div
              onClick={() => { setActiveTab("Jobs"); }}
              className={`flex items-center gap-3.5 font-bold cursor-pointer px-4 py-3.5 rounded-[1rem] transition-all duration-300 ${activeTab === 'Jobs' ? 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <BookOpen size={20} className={activeTab === 'Jobs' ? 'text-purple-600' : ''} /> Jobs
            </div>

            <div
              onClick={() => { setActiveTab("Schedule"); }}
              className={`flex items-center gap-3.5 font-bold cursor-pointer px-4 py-3.5 rounded-[1rem] transition-all duration-300 ${activeTab === 'Schedule' ? 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Calendar size={20} className={activeTab === 'Schedule' ? 'text-purple-600' : ''} /> Schedule
            </div>

            <Link to='/profile'>
              <div className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300 mt-2 border border-transparent">
                <User size={20} /> Profile
              </div>
            </Link>

            <Link to='/resume-documents'>
              <div className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300 mt-2 border border-transparent">
                <FileText size={20} /> Resume & Documents
              </div>
            </Link>
          </div>

          {/* Mobile-Only Navigation Items */}
          <div className="block md:hidden space-y-1.5">
            <div
              onClick={() => { setActiveTab("Dashboard"); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3.5 font-bold cursor-pointer px-4 py-3.5 rounded-[1rem] transition-all duration-300 ${activeTab === 'Dashboard' ? 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Home size={20} className={activeTab === 'Dashboard' ? 'text-purple-600' : ''} /> Dashboard
            </div>

            <div
              onClick={() => { setActiveTab("Jobs"); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3.5 font-bold cursor-pointer px-4 py-3.5 rounded-[1rem] transition-all duration-300 ${activeTab === 'Jobs' ? 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <BookOpen size={20} className={activeTab === 'Jobs' ? 'text-purple-600' : ''} /> Jobs
            </div>

            <div
              onClick={() => { setActiveTab("Dashboard"); setIsSidebarOpen(false); }}
              className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300"
            >
              <FileText size={20} /> Applications
            </div>

            <Link to='/resume-documents' onClick={() => setIsSidebarOpen(false)}>
              <div className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300">
                <FileText size={20} /> Resume
              </div>
            </Link>

            <Link to='/profile' onClick={() => setIsSidebarOpen(false)}>
              <div className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300">
                <User size={20} /> Profile
              </div>
            </Link>

            <div
              onClick={() => { alert("Settings are managed automatically for your account."); setIsSidebarOpen(false); }}
              className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300"
            >
              <Settings size={20} /> Settings
            </div>
          </div>
        </nav>

        <div className="mt-auto px-2">
            <div className="hidden md:block bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-purple-100/50 mb-4 text-center">
                <p className="text-xs font-bold text-gray-800 mb-1">Upgrade to Premium</p>
                <p className="text-[10px] font-medium text-gray-500 mb-3">Get 3x more interview calls.</p>
                <button className="bg-white text-purple-700 px-4 py-1.5 rounded-lg text-xs font-bold w-full shadow-sm hover:shadow-md transition">Go Pro</button>
            </div>
            
            <div
              onClick={handleLogout}
              className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:text-red-600 hover:bg-red-50 px-4 py-3.5 rounded-[1rem] transition-all"
            >
              <LogOut size={20} /> Logout
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative pb-10">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-b from-purple-50/50 to-transparent rounded-bl-full pointer-events-none" />
        {/* Mobile Header bar (only shown on mobile screens where sidebar is hidden) */}
        <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-100 p-4 shadow-sm relative z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-600"
            >
              <Menu size={20} />
            </button>
            <span className="text-lg font-black text-gray-900 tracking-tight">Job<span className="text-purple-600">tale</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
               <Bell className="h-6 w-6 text-gray-600 hover:text-purple-600 transition-colors" />
               <span className="absolute top-1.5 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            {user?.profile?.profilePhoto ? (
              <img
                src={user.profile.profilePhoto}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.fullname?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div className="max-w-6xl mx-auto p-4 md:p-10 relative z-10 w-full">
          {activeTab === "Dashboard" && renderDashboardContent()}
          {activeTab === "Jobs" && renderJobs()}
          {activeTab === "Schedule" && renderSchedule()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
