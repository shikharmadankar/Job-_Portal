import { ExternalLink } from "lucide-react";

/* ================= CARD COMPONENT ================= */
function CompanyCard({ company }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">

      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={company.logo}
            alt="logo"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-xs text-gray-400">Company</p>
            <h3 className="font-semibold text-gray-800">
              {company.name}
            </h3>
          </div>
        </div>

        <ExternalLink className="text-gray-400 cursor-pointer" size={18} />
      </div>

      {/* Divider */}
      <div className="border-t my-4"></div>

      {/* Jobs */}
      <div>
        <p className="text-xs text-gray-400">Jobs available</p>
        <p className="font-semibold text-gray-700">
          {company.jobs} Job opportunities
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {company.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-blue-100 text-purple-600 px-2 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================= MAIN SECTION ================= */
function LatestJobs() {
  const companies = [
    {
      name: "Huawei Technology",
      jobs: 25,
      logo: "https://logo.clearbit.com/huawei.com",
      tags: ["Tech Startups", "Innovators", "+3"],
    },
    {
      name: "Amazon",
      jobs: 30,
      logo: "https://logo.clearbit.com/amazon.com",
      tags: ["Tech Startups", "Ecommerce", "+4"],
    },
    {
      name: "Stripe Finance",
      jobs: 30,
      logo: "https://logo.clearbit.com/stripe.com",
      tags: ["Tech Startups", "Finance", "Innovators", "+2"],
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-6">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Latest job opportunities
      </h2>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {companies.map((company, index) => (
          <CompanyCard key={index} company={company} />
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

export default LatestJobs;