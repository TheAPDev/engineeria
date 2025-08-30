
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

  useEffect(() => {
    fetchHackathonsAndInternships().then((res) => {
      setInternships(res.internships);
      setHackathons(res.hackathons);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 p-0 flex justify-center items-start">
      <div className="w-full max-w-md mx-auto px-2 pb-8 pt-4 sm:px-6 sm:pt-8">
        <h2 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] mb-5 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent text-center tracking-tight">Internships</h2>
        <div className="space-y-7 mb-12">
          {internships.map((i) => (
            <div key={i.id} className="bg-gray-900 border border-red-600/20 rounded-2xl p-4 shadow-lg card-hover flex flex-col gap-2">
              <h3 className="text-base sm:text-lg font-bold font-['Montserrat'] text-white mb-1 break-words leading-tight">{i.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2 break-words leading-relaxed">{i.description}</p>
              <a href={i.link} className="w-full text-center px-0 py-3 sm:px-4 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 text-base sm:text-sm shadow-md active:scale-95">Apply</a>
            </div>
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] mb-5 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent text-center tracking-tight">Hackathons</h2>
        <div className="space-y-7">
          {hackathons.map((h) => (
            <div key={h.id} className="bg-gray-900 border border-red-600/20 rounded-2xl p-4 shadow-lg card-hover flex flex-col gap-2">
              <h3 className="text-base sm:text-lg font-bold font-['Montserrat'] text-white mb-1 break-words leading-tight">{h.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2 break-words leading-relaxed">{h.description}</p>
              <a href={h.link} className="w-full text-center px-0 py-3 sm:px-4 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 text-base sm:text-sm shadow-md active:scale-95">Register</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
