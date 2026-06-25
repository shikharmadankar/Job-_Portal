import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, User, Calendar, BookOpen, Send } from 'lucide-react';

const CATEGORIES = ["All", "Career Growth", "Interviews", "Resume", "Remote Work", "Skills"];

const blogs = [
  {
    title: "The Ultimate Guide to Cracking Your Dream Job Interview in 2026",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1400",
    category: "Interviews",
    readTime: "8 min read",
    author: "Sarah Jenkins",
    date: "Oct 12, 2026",
    desc: "Discover the hidden strategies top candidates use to navigate rigorous interview processes, answer behavioral questions seamlessly, and secure multiple offers.",
    content: "Preparing for an interview goes beyond just knowing your resume. Research the company, practice common questions, and focus on clear communication. Confidence and preparation are key to success. In this comprehensive guide, we cover everything from the STAR method to post-interview follow-ups.",
    featured: true,
  },
  {
    title: "How to Build a Job-Winning Resume That Passes ATS Systems",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000",
    category: "Resume",
    readTime: "6 min read",
    author: "David Chen",
    date: "Oct 10, 2026",
    desc: "Your resume is your first impression. Learn how to format and optimize it to beat Applicant Tracking Systems and land on a recruiter's desk.",
    content: "A strong resume highlights your achievements, not just responsibilities. Use bullet points, quantify results, and tailor your resume for each job you apply to.",
  },
  {
    title: "Remote Jobs: The Future of Work and How to Adapt",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000",
    category: "Remote Work",
    readTime: "5 min read",
    author: "Elena Rodriguez",
    date: "Oct 05, 2026",
    desc: "Explore why remote work continues to dominate the employment landscape and how you can set up a sustainable virtual career.",
    content: "Remote work offers flexibility and better work-life balance. To succeed, build communication skills, stay organized, and create a productive workspace.",
  },
  {
    title: "Top 10 Soft Skills Recruiters Look for in Candidates",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1000",
    category: "Skills",
    readTime: "4 min read",
    author: "Michael Scott",
    date: "Sep 28, 2026",
    desc: "Technical skills get you the interview, but soft skills get you the job. Discover the most in-demand traits employers are actively hiring for right now.",
    content: "Technical skills are important, but soft skills like communication, teamwork, and adaptability are equally valued by recruiters.",
  },
  {
    title: "Navigating Career Changes in a Rapidly Shifting Economy",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
    category: "Career Growth",
    readTime: "7 min read",
    author: "Anita Desai",
    date: "Sep 20, 2026",
    desc: "Pivoting to a new industry? Here is your step-by-step roadmap to successfully transition careers without starting completely from scratch.",
    content: "Career transitions can be daunting but ultimately rewarding. Start by evaluating transferable skills and identifying gaps that need bridging through courses.",
  },
  {
    title: "Maximizing Your LinkedIn Profile for Inbound Opportunities",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
    category: "Career Growth",
    readTime: "5 min read",
    author: "James Wilson",
    date: "Sep 15, 2026",
    desc: "Stop applying and start attracting. Learn how to optimize your LinkedIn presence so recruiters reach out to you directly.",
    content: "Your LinkedIn is your dynamic resume. Optimize your headline, summarize your impact, and actively build a network of professionals in your target industry.",
  }
];

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs.find(b => b.featured);
  const regularBlogs = filteredBlogs.filter(b => !b.featured || activeCategory !== "All" || searchTerm !== "");

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      
      {/* HEADER & HERO SECTION */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-100/50 blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold tracking-wide mb-4 border border-purple-100">
              Insights & Resources
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Fuel Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Career Growth</span> 
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Stay ahead of the curve with expert advice, hiring trends, and actionable strategies to land your dream job and build a fulfilling career.
            </p>
            
            {/* SEARCH BAR */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search articles, topics, or keywords..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 shadow-sm transition-all text-gray-700 bg-white"
              />
              <button className="absolute inset-y-2 right-2 bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-xl font-medium transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* CATEGORIES */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-gray-900 text-white shadow-md scale-105" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEATURED POST (Only show if "All" is selected and search is empty) */}
        {activeCategory === "All" && searchTerm === "" && featuredBlog && (
          <div className="mb-20 group relative rounded-3xl overflow-hidden bg-white shadow-xl shadow-purple-900/5 border border-gray-100 transition-all duration-500 hover:shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              <div className="h-full overflow-hidden">
                <img 
                  src={featuredBlog.image} 
                  alt={featuredBlog.title} 
                  className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                    {featuredBlog.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm font-medium">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {featuredBlog.readTime}
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight group-hover:text-purple-700 transition-colors">
                  {featuredBlog.title}
                </h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed line-clamp-3">
                  {featuredBlog.desc}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{featuredBlog.author}</p>
                      <p className="text-xs text-gray-500">{featuredBlog.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                    Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LATEST POSTS GRID */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
              {activeCategory === "All" && searchTerm === "" ? "Latest Articles" : "Search Results"}
            </h3>
            <span className="text-gray-500 font-medium">
              Showing {regularBlogs.length} results
            </span>
          </div>

          {regularBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularBlogs.map((blog, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur text-gray-900 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm">
                        {blog.category}
                      </span>
                    </div>
                  </div>
      
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-500 text-xs font-medium mb-4 gap-4">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {blog.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {blog.readTime}
                      </div>
                    </div>
      
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                      {blog.desc}
                    </p>
      
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <div className="text-sm font-semibold text-gray-800">
                        {blog.author}
                      </div>
                      <button className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any articles matching your current search or category filter. Try clearing your search or selecting a different category.
              </p>
              <button 
                onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                className="mt-6 text-purple-600 font-semibold hover:text-purple-700 transition"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 text-white">
          {/* Abstract backgrounds */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-40 mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-40 mix-blend-screen"></div>
          
          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to our newsletter</h2>
              <p className="text-gray-400 text-lg mb-0">Get the latest career insights, remote job opportunities, and interview tips delivered straight to your inbox.</p>
            </div>
            <div className="w-full md:w-auto flex-1 max-w-md">
              <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 pl-6 pr-32 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all backdrop-blur-sm"
                  required
                />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-500 text-white px-6 rounded-xl font-medium transition-colors flex items-center gap-2">
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3 ml-2">* We care about your data in our privacy policy.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Blogs;
