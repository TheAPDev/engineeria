
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
    <div className="min-h-screen bg-gray-950 flex flex-col items-center py-4 px-2 sm:px-6 sm:py-8">
      <div className="w-full max-w-lg mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent text-center tracking-tight">Internships</h2>
        <div className="flex flex-col gap-6 mb-12">
          {internships.map((i) => (
            <div key={i.id} className="bg-gray-900 border border-red-600/20 rounded-2xl p-[5vw] sm:p-5 shadow-lg card-hover flex flex-col gap-3" style={{ minWidth: 0 }}>
              <h3 className="text-lg font-bold font-['Montserrat'] text-white mb-1 break-words leading-tight" style={{ wordBreak: 'break-word' }}>{i.title}</h3>
              <p className="text-gray-300 text-sm mb-2 break-words leading-relaxed" style={{ wordBreak: 'break-word' }}>{i.description}</p>
              <a href={i.link} className="w-full text-center py-[3vw] sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 text-lg shadow-md active:scale-95" style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>Apply</a>
            </div>
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent text-center tracking-tight">Hackathons</h2>
        <div className="flex flex-col gap-6">
          {hackathons.map((h) => (
            <div key={h.id} className="bg-gray-900 border border-red-600/20 rounded-2xl p-[5vw] sm:p-5 shadow-lg card-hover flex flex-col gap-3" style={{ minWidth: 0 }}>
              <h3 className="text-lg font-bold font-['Montserrat'] text-white mb-1 break-words leading-tight" style={{ wordBreak: 'break-word' }}>{h.title}</h3>
              <p className="text-gray-300 text-sm mb-2 break-words leading-relaxed" style={{ wordBreak: 'break-word' }}>{h.description}</p>
              <a href={h.link} className="w-full text-center py-[3vw] sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 text-lg shadow-md active:scale-95" style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>Register</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
