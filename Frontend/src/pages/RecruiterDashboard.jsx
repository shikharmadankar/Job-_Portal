import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Building,
  Search,
  Bell,
  LogOut,
  Briefcase,
  CalendarPlus,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Post Job", icon: Briefcase },
    { name: "Employees", icon: Users },
    { name: "Company", icon: Building },
  ];

  return (
    <div className="w-64 bg-[#5c1688] text-white min-h-screen p-5 flex flex-col">
      <h2 className="text-2xl font-extrabold mb-8 tracking-wide">Recruiter</h2>
      <ul className="space-y-3 flex-1">
        {menu.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveTab(item.name)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
              activeTab === item.name ? "bg-purple-800 shadow-inner text-white font-medium" : "hover:bg-purple-700 text-purple-200"
            }`}
          >
            <item.icon size={20} />
            {item.name}
          </li>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 transition mt-auto font-medium"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

const Topbar = ({ user }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, {user?.fullname?.split(" ")[0] || "User"}</h1>
        <p className="text-sm text-gray-500 mt-1">Here is what's happening today.</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
             <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
             <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
        </div>
        <Bell className="cursor-pointer text-gray-500 hover:text-purple-600 transition" size={22} />
        {user?.profile?.profilePhoto ? (
          <img
            src={user.profile.profilePhoto}
            alt="user"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm">
            {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </div>
    </div>
  );
};

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [user, setUser] = useState(null);
  
  // Applicant Fetching State
  const [realApplicants, setRealApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  // Meetings State
  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [schedulingFor, setSchedulingFor] = useState(null); // applicant obj being scheduled
  const [meetingForm, setMeetingForm] = useState({ title: "", description: "", scheduledDate: "" });

  // Job Posting State
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [isRegisteringCompany, setIsRegisteringCompany] = useState(false);
  const [companyForm, setCompanyForm] = useState({ companyName: "" });
  const [jobForm, setJobForm] = useState({
      title: "", description: "", requirements: "", salary: "", location: "", jobType: "", experience: "", position: 0, companyId: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (activeTab === "Post Job" || activeTab === "Company") {
      fetchCompanies();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "Dashboard") {
      fetchApplicantsData();
      fetchMeetings();
    }
  }, [activeTab]);

  const fetchApplicantsData = async () => {
    setLoadingApplicants(true);
    try {
      const resJobs = await axios.get(`${API_URL}/job/getadminjobs`, { withCredentials: true });
      if ((resJobs.data.status || resJobs.data.success) && resJobs.data.jobs) {
         const adminJobs = resJobs.data.jobs;
         let allApps = [];
         for (let job of adminJobs) {
             const resApps = await axios.get(`${API_URL}/application/${job._id}/applicants`, { withCredentials: true });
             if ((resApps.data.status || resApps.data.success) && resApps.data.job?.applications) {
                 const appsWithJobInfo = resApps.data.job.applications.map(app => ({
                     ...app,
                     jobTitle: job.title,
                     jobId: job._id
                 }));
                 allApps = [...allApps, ...appsWithJobInfo];
             }
         }
         allApps.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
         setRealApplicants(allApps);
      }
    } catch (error) {
       console.error("Error fetching applicants", error);
    } finally {
       setLoadingApplicants(false);
    }
  };

  const fetchMeetings = async () => {
    setLoadingMeetings(true);
    try {
      const res = await axios.get(`${API_URL}/meeting/recruiter`, { withCredentials: true });
      if (res.data.success) {
        setMeetings(res.data.meetings);
      }
    } catch (error) {
      console.error("Error fetching meetings", error);
    } finally {
      setLoadingMeetings(false);
    }
  };

  const handleScheduleMeeting = async (e) => {
    e.preventDefault();
    if (!schedulingFor) return;
    try {
      const payload = {
        applicantId: schedulingFor.applicant?._id,
        jobId: schedulingFor.jobId,
        title: meetingForm.title,
        description: meetingForm.description,
        scheduledDate: meetingForm.scheduledDate,
      };
      const res = await axios.post(`${API_URL}/meeting/schedule`, payload, { withCredentials: true });
      if (res.data.success) {
        alert("Meeting scheduled successfully!");
        setSchedulingFor(null);
        setMeetingForm({ title: "", description: "", scheduledDate: "" });
        fetchMeetings();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error scheduling meeting");
    }
  };

  const fetchCompanies = async () => {
      setLoadingCompanies(true);
      try {
          const res = await axios.get(`${API_URL}/company/get`, {
              withCredentials: true
          });
          if (res.data.success) {
              setCompanies(res.data.companies);
              if (res.data.companies.length > 0) {
                  setJobForm(prev => ({ ...prev, companyId: res.data.companies[0]._id }));
              }
          }
      } catch (err) {
          console.error("Failed to fetch companies", err);
      } finally {
          setLoadingCompanies(false);
      }
  };

  const handleRegisterCompany = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post(`${API_URL}/company/register`, companyForm, {
              withCredentials: true
          });
          if (res.data.success) {
              alert("Company Registered Successfully!");
              setCompanyForm({ companyName: "" });
              setIsRegisteringCompany(false);
              fetchCompanies();
          }
      } catch (err) {
          alert(err.response?.data?.message || "Error registering company");
      }
  };

  const handlePostJob = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post(`${API_URL}/job/post`, jobForm, {
              withCredentials: true
          });
          if (res.data.status) {
              alert("Job Posted Successfully!");
              setJobForm({title: "", description: "", requirements: "", salary: "", location: "", jobType: "", experience: "", position: 0, companyId: companies[0]?._id });
          }
      } catch (err) {
          alert(err.response?.data?.message || "Error posting job");
      }
  };

  const handleJobChange = (e) => {
      setJobForm({...jobForm, [e.target.name]: e.target.value});
  };

  // --- Dynamic Stats ---
  const totalApplicants = realApplicants.length;
  const pendingCount = realApplicants.filter(a => a.status === "pending").length;
  const acceptedCount = realApplicants.filter(a => a.status === "accepted").length;
  const rejectedCount = realApplicants.filter(a => a.status === "rejected").length;
  const scheduledMeetingsCount = meetings.filter(m => m.status === "scheduled").length;

  const dynamicStats = [
    { title: "Total Applicants", value: totalApplicants },
    { title: "Pending Review", value: pendingCount },
    { title: "Accepted", value: acceptedCount },
    { title: "Scheduled Meetings", value: scheduledMeetingsCount },
  ];

  const renderDashboardStats = () => (
    <>
      {/* Schedule Meeting Modal */}
      {schedulingFor && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={() => setSchedulingFor(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Schedule Meeting</h2>
            <p className="text-sm text-gray-500 mb-6">
              With <span className="font-semibold text-gray-700">{schedulingFor.applicant?.fullname}</span> for <span className="font-semibold text-purple-600">{schedulingFor.jobTitle}</span>
            </p>
            <form onSubmit={handleScheduleMeeting} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                <input
                  type="text"
                  value={meetingForm.title}
                  onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
                  placeholder="e.g. Technical Round, HR Discussion"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  value={meetingForm.scheduledDate}
                  onChange={(e) => setMeetingForm({...meetingForm, scheduledDate: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description / Meet Link</label>
                <textarea
                  value={meetingForm.description}
                  onChange={(e) => setMeetingForm({...meetingForm, description: e.target.value})}
                  placeholder="Paste your Google Meet / Zoom link here..."
                  rows="3"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 resize-none"
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-[#5c1688] text-white font-bold py-3 rounded-lg hover:opacity-90 transition shadow-lg">
                Confirm & Schedule
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {dynamicStats.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-gray-500 text-sm font-medium">{item.title}</h4>
            <div className="flex justify-between items-end mt-3">
              <h2 className="text-3xl font-bold text-gray-800">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applicants Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-2">
          <div className="flex justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-800">Recent Applicants</h3>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-500 bg-gray-50/50">
              <tr className="border-b text-left">
                <th className="py-3 px-2 font-medium">Name</th>
                <th className="font-medium">Job Applied</th>
                <th className="font-medium">Date</th>
                <th className="font-medium">Status</th>
                <th className="font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {loadingApplicants ? (
                <tr><td colSpan="5" className="text-center py-6 text-gray-500 text-sm">Loading applicants...</td></tr>
              ) : realApplicants.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-6 text-gray-500 text-sm">No applicants yet. Share your job postings to get started!</td></tr>
              ) : realApplicants.map((cand, index) => (
                <tr key={cand._id || index} className="border-b last:border-0 hover:bg-gray-50 transition">
                  <td className="py-3 px-2">
                    <p className="font-semibold text-gray-800">{cand.applicant?.fullname || "Unknown"}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{cand.applicant?.email}</p>
                  </td>
                  <td className="text-gray-600 font-medium">{cand.jobTitle}</td>
                  <td className="text-gray-500 text-xs">{new Date(cand.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${cand.status === 'accepted' ? 'bg-green-100 text-green-700' : cand.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {cand.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSchedulingFor(cand)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition"
                    >
                      <CalendarPlus size={14} />
                      Schedule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Scheduled Meetings Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-6">Upcoming Meetings</h3>
            {loadingMeetings ? (
              <p className="text-gray-500 text-sm text-center py-6">Loading...</p>
            ) : meetings.length === 0 ? (
              <div className="text-center py-10">
                <CalendarPlus size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-400 text-sm">No meetings scheduled yet.</p>
                <p className="text-gray-400 text-xs mt-1">Click "Schedule" on an applicant to set one up.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {meetings.map((m) => (
                  <div key={m._id} className="p-4 border rounded-xl hover:bg-gray-50 transition border-purple-100 bg-purple-50/20">
                    <h4 className="font-semibold text-purple-700">{m.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{m.applicant?.fullname} • {m.job?.title}</p>
                    <p className="text-xs font-semibold text-gray-800 mt-2">
                      {new Date(m.scheduledDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                    {m.description && (
                      <a href={m.description.startsWith("http") ? m.description : `https://${m.description}`} target="_blank" rel="noopener noreferrer"
                         className="inline-block mt-2 text-xs font-medium text-white bg-purple-600 px-3 py-1 rounded shadow hover:bg-purple-700 transition">
                        Join Meeting
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </>
  );

  const renderPostJob = () => {
      if (loadingCompanies) return <p className="text-gray-500 text-center py-10">Loading Data...</p>;

      if (companies.length === 0) {
          return (
              <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center mt-10">
                  <Building size={48} className="mx-auto text-purple-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Register Your Company</h2>
                  <p className="text-gray-500 mb-6 text-sm">You must link a company to your profile before you can post open positions.</p>
                  
                  <form onSubmit={handleRegisterCompany} className="space-y-4">
                      <input 
                          type="text" 
                          placeholder="E.g. Adobe, TechCorp..." 
                          required 
                          onChange={(e) => setCompanyForm({ companyName: e.target.value })}
                          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50"
                      />
                      <button type="submit" className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition shadow-md">
                          Register Company
                      </button>
                  </form>
              </div>
          );
      }

      return (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Post a New Job</h2>
              <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input type="text" name="title" value={jobForm.title} onChange={handleJobChange} required placeholder="Frontend Developer" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50" />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <select name="companyId" value={jobForm.companyId} onChange={handleJobChange} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 disabled:opacity-75">
                          {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input type="text" name="location" value={jobForm.location} onChange={handleJobChange} required placeholder="Remote, New York, etc." className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50" />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                      <input type="text" name="jobType" value={jobForm.jobType} onChange={handleJobChange} required placeholder="Full-Time, Contract, Internship" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50" />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                      <input type="text" name="experience" value={jobForm.experience} onChange={handleJobChange} required placeholder="1-3 Years" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50" />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">No. of Positions</label>
                      <input type="number" name="position" value={jobForm.position} onChange={handleJobChange} required min="1" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50" />
                  </div>

                  <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Salary Component (Numbers only)</label>
                      <input type="number" name="salary" value={jobForm.salary} onChange={handleJobChange} required placeholder="120000" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50" />
                  </div>

                  <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (Comma separated)</label>
                      <input type="text" name="requirements" value={jobForm.requirements} onChange={handleJobChange} required placeholder="React, Node, Tailwind" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50" />
                  </div>

                  <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea name="description" value={jobForm.description} onChange={handleJobChange} required rows="3" placeholder="Describe the role..." className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 resize-none"></textarea>
                  </div>

                  <div className="col-span-2 mt-4">
                      <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-[#5c1688] text-white font-bold py-3 rounded-lg hover:opacity-90 transition shadow-lg text-lg">
                          Publish Job Opening
                      </button>
                  </div>
              </form>
          </div>
      );
  }

  const renderCompany = () => {
    if (isRegisteringCompany) {
      return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Register New Company</h2>
            <button
               onClick={() => setIsRegisteringCompany(false)}
               className="text-gray-500 hover:text-gray-700 text-sm font-medium hover:underline"
            >
               Cancel
            </button>
          </div>
          <form onSubmit={handleRegisterCompany} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={companyForm.companyName}
                onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                placeholder="e.g. Google, Apple, Acme Corp"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition bg-gray-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-[#5c1688] text-white py-3 rounded-lg text-lg font-bold hover:opacity-90 transition shadow-lg"
            >
              Confirm Registration
            </button>
          </form>
        </div>
      );
    }

    return (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">Your Companies Dashboard</h2>
            <button
               onClick={() => setIsRegisteringCompany(true)}
               className="bg-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-purple-700 transition shadow-sm flex items-center gap-2"
            >
               + Add New Company
            </button>
          </div>

          {loadingCompanies ? (
            <p className="text-gray-500 text-center py-10">Loading your companies...</p>
          ) : companies.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 border-dashed max-w-2xl mx-auto mt-10">
              <Building size={48} className="mx-auto text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Companies Found</h3>
              <p className="text-gray-500 mb-8">You haven't registered any companies yet. Set up a company profile to start posting job applications dynamically.</p>
              <button
                onClick={() => setIsRegisteringCompany(true)}
                className="bg-purple-100 text-purple-700 px-8 py-3 rounded-lg font-bold hover:bg-purple-200 transition shadow-sm"
              >
                Launch Your First Company
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company, idx) => (
                <div key={company._id || idx} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all cursor-pointer relative group">
                  <div className="absolute top-4 right-4 h-8 w-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition cursor-pointer">
                     <Building size={16} />
                  </div>
                  <div className="h-16 w-16 bg-gradient-to-br from-purple-100 to-indigo-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-5 shadow-inner">
                     {company.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-extrabold text-gray-800 text-xl mb-1 truncate">{company.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                     <span className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.6)]"></span>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Shell</p>
                  </div>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                     <p className="text-xs text-gray-400 font-medium">ID: <span className="text-gray-600 font-mono tracking-tight">{company._id ? company._id.slice(-6).toUpperCase() : 'N/A'}</span></p>
                     <p className="text-xs text-gray-400 font-semibold">{company.createdAt ? new Date(company.createdAt).toLocaleDateString('en-US', {month:'short', year:'numeric'}) : 'Just Now'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    );
  };

  return (
    <div className="flex bg-gray-50 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 min-h-screen p-8 lg:p-10 overflow-auto">
        <Topbar user={user} />

        {activeTab === "Dashboard" && renderDashboardStats()}
        {activeTab === "Post Job" && renderPostJob()}
        {activeTab === "Company" && renderCompany()}
        {activeTab === 'Employees' && (
            <div className="h-64 flex flex-col justify-center items-center opacity-50 border-2 border-dashed border-gray-300 rounded-2xl">
                <p className="text-xl font-semibold text-gray-500">{activeTab} Interface</p>
                <p className="text-sm text-gray-400">Under Construction</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;