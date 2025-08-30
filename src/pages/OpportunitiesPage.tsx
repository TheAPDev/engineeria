
import { useEffect, useState } from "react";
import { fetchHackathonsAndInternships } from "../supabaseClient";

type Opportunity = {
  id: number;
  title: string;
  description: string;
  link: string;
};

export default function Opportunities() {
  const [internships, setInternships] = useState<Opportunity[]>([]);
  const [hackathons, setHackathons] = useState<Opportunity[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchHackathonsAndInternships().then((res) => {
      setInternships(res.internships);
      setHackathons(res.hackathons);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Hamburger icon always visible in top left */}
      <button
        className="fixed top-6 left-6 z-50 flex flex-col justify-center items-center w-10 h-10 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label="Toggle sidebar"
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-xl z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full pt-6 px-6">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold font-['Montserrat'] text-red-500">Engineeria</h1>
          </div>
          <nav className="flex flex-col gap-4">
            <a href="/hackathons" className="flex items-center gap-2 text-white hover:text-red-500 font-semibold py-2 px-3 rounded transition-colors">
              <span className="material-icons">school</span> Hackathons
            </a>
            <a href="/internships" className="flex items-center gap-2 text-white hover:text-red-500 font-semibold py-2 px-3 rounded transition-colors">
              <span className="material-icons">work</span> Internships
            </a>
            <a href="/my-opportunities" className="flex items-center gap-2 text-white hover:text-red-500 font-semibold py-2 px-3 rounded transition-colors">
              <span className="material-icons">bookmark</span> My Opportunities
            </a>
            <a href="/coming-soon" className="flex items-center gap-2 text-white hover:text-red-500 font-semibold py-2 px-3 rounded transition-colors">
              <span className="material-icons">schedule</span> Coming Soon
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center py-6 px-3 sm:px-6 sm:py-8 ml-0 sm:ml-0 w-full max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent text-center tracking-tight">Internships</h2>
        <div className="flex flex-col gap-4 mb-10">
          {internships.map((i) => (
            <div key={i.id} className="bg-gray-900 border border-red-600/20 rounded-2xl p-4 sm:p-5 shadow-lg card-hover flex flex-col gap-3 min-w-0">
              <h3 className="text-lg font-bold font-['Montserrat'] text-white mb-1 break-words leading-tight">{i.title}</h3>
              <p className="text-gray-300 text-sm mb-2 break-words leading-relaxed">{i.description}</p>
              <a href={i.link} className="w-full text-center py-3 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 text-lg shadow-md active:scale-95 responsive-btn">Apply</a>
            </div>
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent text-center tracking-tight">Hackathons</h2>
        <div className="flex flex-col gap-4">
          {hackathons.map((h) => (
            <div key={h.id} className="bg-gray-900 border border-red-600/20 rounded-2xl p-4 sm:p-5 shadow-lg card-hover flex flex-col gap-3 min-w-0">
              <h3 className="text-lg font-bold font-['Montserrat'] text-white mb-1 break-words leading-tight">{h.title}</h3>
              <p className="text-gray-300 text-sm mb-2 break-words leading-relaxed">{h.description}</p>
              <a href={h.link} className="w-full text-center py-3 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 text-lg shadow-md active:scale-95 responsive-btn">Register</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
