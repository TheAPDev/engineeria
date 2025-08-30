
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
    <div>
      <h2>Internships</h2>
      {internships.map((i) => (
        <div key={i.id} className="card">
          <h3>{i.title}</h3>
          <p>{i.description}</p>
          <a href={i.link}>Apply</a>
        </div>
      ))}

      <h2>Hackathons</h2>
      {hackathons.map((h) => (
        <div key={h.id} className="card">
          <h3>{h.title}</h3>
          <p>{h.description}</p>
          <a href={h.link}>Register</a>
        </div>
      ))}
    </div>
  );
}
