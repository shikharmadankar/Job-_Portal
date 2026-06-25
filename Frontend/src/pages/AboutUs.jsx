import React from 'react'
import { Link } from 'react-router-dom'
import { Target, Users, Zap, Award, Briefcase, Globe, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'

const AboutUs = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans overflow-hidden">
      
      {/* ─── HERO SECTION ─── */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="team collaboration"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#4c1d95]/80 to-slate-900/90"></div>
        </div>

        {/* Floating Abstract Shapes */}
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-purple-500/30 blur-[100px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-indigo-500/30 blur-[100px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-purple-200 text-sm font-bold mb-6 backdrop-blur-md">
            <Globe size={16} /> Revolutionizing the Hiring Process
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Empowering Careers, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              Building Futures.
            </span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-indigo-100 font-medium leading-relaxed mb-10">
            We are more than just a job board. We are a dynamic ecosystem connecting world-class talent with leading opportunities—faster, smarter, and more securely.
          </p>
          
          <div className="flex gap-6 text-center">
             <div>
                <p className="text-4xl font-black text-white">10K+</p>
                <p className="text-purple-200 text-sm font-bold tracking-wide mt-1">PLACEMENTS</p>
             </div>
             <div className="w-px bg-white/20 h-12 my-auto"></div>
             <div>
                <p className="text-4xl font-black text-white">2,500</p>
                <p className="text-purple-200 text-sm font-bold tracking-wide mt-1">COMPANIES</p>
             </div>
             <div className="w-px bg-white/20 h-12 my-auto hidden sm:block"></div>
             <div className="hidden sm:block">
                <p className="text-4xl font-black text-white">98%</p>
                <p className="text-purple-200 text-sm font-bold tracking-wide mt-1">SUCCESS RATE</p>
             </div>
          </div>
        </div>
      </div>

      {/* ─── ABOUT SECTION ─── */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692"
              alt="modern office"
              className="rounded-[2.5rem] shadow-2xl w-full object-cover h-[500px]"
            />
            
            {/* Floating Mission Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 max-w-xs hidden md:block">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                   <Target size={24} />
                </div>
                <h4 className="font-extrabold text-gray-800 text-lg mb-2">Our Mission</h4>
                <p className="text-sm text-gray-500 font-medium">To democratize access to great jobs and help companies build diverse, high-performing teams.</p>
            </div>
          </div>

          <div className="lg:pl-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Bridging the gap between <span className="text-purple-600">ambition</span> and <span className="text-indigo-600">success</span>.
            </h2>
            <div className="w-20 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-8"></div>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed font-medium">
              Jobtale was founded on a simple premise: the hiring process shouldn't be a black box. We sought to build a platform that provides complete transparency, robust matching algorithms, and a seamless experience from application to offer letter.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              Whether you're a hyper-growth startup looking for top-tier engineers, or an ambitious candidate searching for your breakthrough role, we provide the ultimate toolkit to make the process effortless.
            </p>

            <ul className="space-y-4">
               {[
                 "Vetted candidate profiles and verified companies.",
                 "AI-driven skill matching and job recommendations.",
                 "Secure, end-to-end interview scheduling.",
               ].map((point, idx) => (
                 <li key={idx} className="flex items-center gap-3 text-gray-700 font-bold">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                       <CheckIcon size={14} />
                    </div>
                    {point}
                 </li>
               ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── FEATURES SECTION ─── */}
      <div className="bg-white py-24 border-y border-gray-100 relative overflow-hidden">
        {/* Subtle Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4c1d95 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                 What Sets Us Apart
               </h2>
               <p className="text-lg text-gray-500 font-medium">
                 We've engineered a comprehensive ecosystem designed to eliminate friction and elevate the recruitment journey.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            {[
                {
                title: "Precision Matching",
                desc: "Our algorithms learn your preferences to deliver highly relevant opportunities straight to your dashboard.",
                ikon: <Zap size={24} />,
                img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
                color: "text-purple-600 bg-purple-100"
                },
                {
                title: "One-Click Applications",
                desc: "Say goodbye to repetitive forms. Apply to multiple roles instantly using your robust Jobtale profile.",
                ikon: <Briefcase size={24} />,
                img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
                color: "text-blue-600 bg-blue-100"
                },
                {
                title: "Unified Dashboards",
                desc: "Whether sourcing candidates or tracking applications, our modern dashboards keep everything organized.",
                ikon: <Award size={24} />,
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
                color: "text-indigo-600 bg-indigo-100"
                },
            ].map((item, index) => (
                <div
                key={index}
                className="bg-gray-50 rounded-[2rem] hover:bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(124,58,237,0.15)] border border-gray-100 transition-all duration-500 overflow-hidden group flex flex-col"
                >
                <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute bottom-4 left-4 ${item.color} w-12 h-12 rounded-xl flex items-center justify-center z-20 shadow-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300`}>
                        {item.ikon}
                    </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-extrabold text-2xl text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-500 font-medium mb-6 leading-relaxed flex-1">{item.desc}</p>
                    <button className="text-purple-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto outline-none">
                        Learn more <ArrowRight size={18} />
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>

      {/* ─── TEAM SECTION ─── */}
      <div className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                The Minds Behind Jobtale
            </h2>
            <p className="text-lg text-gray-500 font-medium">
                A passionate group of technologists, designers, and strategists dedicated to reshaping the professional landscape.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { name: "Team Member 1", role: "Founder & Full Stack Dev", color: "from-purple-500 to-indigo-600", border: "border-purple-100", xp: "10+ Yrs Exp" },
            { name: "Team Member 2", role: "Head of Product UI/UX", color: "from-blue-500 to-cyan-500", border: "border-blue-100", xp: "8+ Yrs Exp" },
            { name: "Team Member 3", role: "Lead Systems Architect", color: "from-pink-500 to-rose-500", border: "border-pink-100", xp: "12+ Yrs Exp" },
          ].map((member, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-[2.5rem] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border ${member.border} text-center hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 group`}
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-[2rem] blur-xl opacity-40 group-hover:opacity-70 transition-opacity`}></div>
                  <div className={`relative w-full h-full rounded-[2rem] bg-gradient-to-br border-4 border-white ${member.color} flex items-center justify-center text-white text-5xl font-black shadow-lg overflow-hidden`}>
                     {/* Replace with actual image if available, using initials as fallback */}
                     {member.name.charAt(0)}
                  </div>
              </div>
              
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold mb-4 tracking-wide uppercase">
                  {member.xp}
              </span>
              
              <h4 className="text-2xl font-extrabold mb-1 text-gray-800">{member.name}</h4>
              <p className="text-gray-500 font-medium mb-6">{member.role}</p>

              <div className="flex justify-center gap-4 text-gray-400">
                  <a href="#" className="hover:text-gray-900 transition-colors"><Github size={20} /></a>
                  <a href="#" className="hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
                  <a href="#" className="hover:text-sky-500 transition-colors"><Twitter size={20} /></a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CTA SECTION ─── */}
      <div className="px-6 pb-20">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#4c1d95] text-white rounded-[3rem] px-8 py-16 md:py-20 text-center relative overflow-hidden shadow-2xl">
            {/* Abstract Decals */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-80 h-80 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                   <Users size={32} className="text-purple-300" />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                    Ready to take the next big step?
                </h2>
                <p className="text-lg text-indigo-200 font-medium mb-10 max-w-xl">
                    Join thousands of professionals and companies who have transformed their recruitment journey with Jobtale.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    <Link to='/signup'>
                    <button className="w-full sm:w-auto bg-white text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:scale-105 transition-all shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)]">
                        Get Started for Free
                    </button>
                    </Link>
                    <Link to='/jobb'>
                    <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors">
                        Browse Open Roles
                    </button>
                    </Link>
                </div>
            </div>
          </div>
      </div>

    </div>
  )
}

const CheckIcon = ({size}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
)

export default AboutUs
