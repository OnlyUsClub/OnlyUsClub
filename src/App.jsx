import { CalendarIcon } from "@heroicons/react/24/solid";
import Section from "./components/Section";
import formatDate from "./utils/formatDate";
import "./index.css";

export default function App() {
  const EVENTS = [
    { title: "Après-midi Coquines", date: "2025-08-15", time: "14:00", theme: "Détente sensuelle", description: "Moments coquins en journée.", poster: "/posters/2025-08-15-apres-midi-coquines.png" },
    { title: "White Party", date: "2025-08-16", time: "21:00", theme: "Dress code : blanc", description: "Soirée chic en blanc.", poster: "/posters/2025-08-16-white-party.png" },
    { title: "Les heures suspendues", date: "2025-08-17", time: "20:00", theme: "Slow & sensual", description: "Instants suspendus en musique.", poster: "/posters/2025-08-17-heures-suspenses.png" },
    { title: "Le Goût de l’Interdit", date: "2025-08-21", time: "21:00", theme: "Interdit", description: "Soirée mystère et tentation.", poster: "/posters/2025-08-21-gout-de-l-interdit.png" },
    { title: "Après-midi Coquines", date: "2025-08-22", time: "14:00", theme: "Détente sensuelle", description: "Moments coquins en journée.", poster: "/posters/2025-08-22-apres-midi-coquines.png" },
    { title: "Soirée Masquée", date: "2025-08-22", time: "21:00", theme: "Masques", description: "Intrigue et séduction derrière un masque.", poster: "/posters/2025-08-22-soiree-masquee.png" },
    { title: "Soirée Enivrante", date: "2025-08-23", time: "21:00", theme: "Enivrante", description: "Une nuit pleine de surprises.", poster: "/posters/2025-08-23-soiree-enivrante.png" },
    { title: "Les heures suspendues", date: "2025-08-24", time: "20:00", theme: "Slow & sensual", description: "Instants suspendus en musique.", poster: "/posters/2025-08-24-heures-suspenses.png" },
    { title: "Après-midi Coquines", date: "2025-08-29", time: "14:00", theme: "Détente sensuelle", description: "Moments coquins en journée.", poster: "/posters/2025-08-29-apres-midi-coquines.png" },
    { title: "House & Tapas", date: "2025-08-29", time: "21:00", theme: "House music", description: "Musique et tapas pour se régaler.", poster: "/posters/2025-08-29-house-tapas.png" },
    { title: "Les heures suspendues", date: "2025-08-31", time: "20:00", theme: "Slow & sensual", description: "Instants suspendus en musique.", poster: "/posters/2025-08-31-heures-suspenses.png" },
  ];

  const today = new Date();
  const upcoming = EVENTS.filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 border-b border-red-800">
        <img src="/Logo.jpeg" alt="Logo L'Only-Us" className="h-12 w-auto" />
        <div className="flex gap-4 text-sm">
          <a href="/" className="text-red-500 hover:text-yellow-500">Accueil</a>
          <a href="/agenda" className="text-red-500 hover:text-yellow-500">Agenda</a>
          <a href="/photos" className="text-red-500 hover:text-yellow-500">Photos</a>
          <a href="https://www.instagram.com/lonlyusclub/" target="_blank" className="text-red-500 hover:text-yellow-500">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61579129558554" target="_blank" className="text-red-500 hover:text-yellow-500">Facebook</a>
          <span className="text-yellow-500 font-bold">06 10 39 29 37</span>
        </div>
      </nav>

      {/* Hero */}
      <header className="p-8 text-center">
        <h1 className="text-4xl font-bold text-yellow-500">Bienvenue au L'Only-Us</h1>
        <p className="mt-2 text-red-400">Club libertin – Élégance, sensualité et moments inoubliables</p>
      </header>

      {/* Agenda */}
      <Section title="Agenda" icon={CalendarIcon}>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => (
            <li key={e.title + e.date} className="rounded-2xl overflow-hidden border border-red-700 bg-black">
              <div className="aspect-[4/5] w-full bg-red-950/20">
                {e.poster ? (
                  <img src={e.poster} alt={`Affiche ${e.title}`} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-red-400">{e.title}</div>
                )}
              </div>
              <div className="p-4">
                <div className="text-base font-bold text-yellow-500">{e.title}</div>
                <div className="mt-1 text-sm text-red-400">
                  {formatDate(new Date(e.date))} • {e.time} • {e.theme}
                </div>
                {e.description && <p className="mt-2 text-sm text-white/90">{e.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
