import { MapPin, Briefcase, Building2 } from "lucide-react";

/* ================= JOB CARD COMPONENT ================= */
function JobCard({ job, featured }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 relative">

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-0 left-0 w-full bg-purple-600 text-white text-xs text-center py-1 rounded-t-xl">
          FEATURED
        </div>
      )}

      {/* Top Section */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <img
            src={job.logo}
            alt="logo"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
        </div>

        <button className="border p-2 rounded-md hover:bg-gray-100">
          🔖
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Building2 size={16} />
          <span>{job.company}</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          <span>{job.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2">
          💰 <span>{job.salary}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {job.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-blue-100 text-purple-600 px-2 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-xs text-gray-400">{job.time}</p>

        <button className="bg-purple-600 text-white px-4 py-1 rounded-md text-sm">
          Job Details →
        </button>
      </div>
    </div>
  );
}

/* ================= MAIN JOBS SECTION ================= */
function Jobs() {
  const jobs = [
    {
      title: "Mobile App Developer",
      company: "Xiaomi",
      location: "Beijing",
      salary: "15-25k",
      category: "Smartphones/Electronics",
      time: "4 Days Ago",
      logo: "https://logo.clearbit.com/mi.com",
      tags: ["Fortune 500", "Innovation Hub", "Global Presence"],
    },
    {
      title: "Hardware Design Engineer",
      company: "Samsung",
      location: "Seoul",
      salary: "15-25k",
      category: "Technology/Electronics",
      time: "1 Week Ago",
      logo: "https://logo.clearbit.com/samsung.com",
      tags: ["Global Tech Leader", "Hardware Innovation", "Global Presence"],
    },
    {
      title: "UI/UX Designer",
      company: "Framer",
      location: "Amsterdam",
      salary: "15-25k",
      category: "Design/Software",
      time: "14 June 2024",
      logo: "https://logo.clearbit.com/framer.com",
      tags: ["Start-up", "Creative Hub", "UI/UX Design"],
    },
    {
      title: "Data Scientist",
      company: "Spotify",
      location: "Stockholm",
      salary: "15-25k",
      category: "Music/Entertainment",
      time: "7 July 2024",
      logo: "https://logo.clearbit.com/spotify.com",
      tags: ["Market Disruptor", "Music Streaming", "Data Analytics"],
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-6">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-10 mt-20">
        Job picks for you
      </h2>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} featured={index === 0} />
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button className="border px-6 py-2 rounded-md hover:bg-gray-100">
          More Opportunities
        </button>
      </div>
    </div>
  );
}

export default Jobs;