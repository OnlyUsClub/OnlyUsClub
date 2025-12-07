import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Camera,
  Info,
  MapPin,
  Instagram,
  Facebook,
  Phone,
  Mail,
  Clock,
  Menu,
} from "lucide-react";

/* ================= CONFIG ================= */
const CLUB_NAME = "L'Only-Us";
const TAGLINE = "Club libertin – Alès";
const ADDRESS = "1115 route d'Uzès, 30100 Alès";
const PHONE_NUMBER = "06 10 39 29 37";
const EMAIL = "onlyus.clublib@gmail.com";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/lonlyusclub/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61579129558554", icon: Facebook },
];

/* ================= ÉVÉNEMENTS COMPLETS ================= */
const EVENTS = [
  { title: "Les heures suspendues", date: "2025-08-31", time: "20:00", theme: "Slow & sensual", poster: "/posters/2025-08-31-heures-suspenses.png" },

  // VENDREDIS APREM
  { title: "Après-midi Coquine", date: "2025-12-05", time: "14:00", theme: "Journée", poster: "/Vendredi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-12", time: "14:00", theme: "Journée", poster: "/Vendredi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-19", time: "14:00", theme: "Journée", poster: "/Vendredi aprem.png" },

  // VENDREDIS SOIR
  { title: "Soirée Jarretelles", date: "2025-12-06", time: "20:00", theme: "Jarretelles", poster: "/Copie de PORTE-JARRETELLES (1).png" },
  { title: "Soirée Nude", date: "2025-12-12", time: "20:00", theme: "Nude", poster: "/nude (1).png" },
  { title: "Soirée Père Noël", date: "2025-12-19", time: "20:00", theme: "Père Noël", poster: "/Père Noël vendredi 19 decembre.png" },
  { title: "Soirée tenue osée", date: "2025-12-26", time: "20:00", theme: "Osée", poster: "/vendredi 26 décembre tenues osées et dévergondées (1).png" },

  // SAMEDIS APREM
  { title: "Après-midi Coquine", date: "2025-12-06", time: "14:00", theme: "Journée", poster: "/Samedi Aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-13", time: "14:00", theme: "Journée", poster: "/Samedi Aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-20", time: "14:00", theme: "Journée", poster: "/Samedi Aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-27", time: "14:00", theme: "Journée", poster: "/Samedi Aprem.png" },

  // SAMEDIS SOIR
  { title: "Black and Yellow", date: "2025-12-06", time: "20:00", poster: "/black and yellow (2).png" },
  { title: "Soirée Cadeau", date: "2025-12-13", time: "20:00", poster: "/Cadeau samedi 13 décembre.png" },
  { title: "Soirée Mère Noël", date: "2025-12-20", time: "20:00", poster: "/Mère Noël samedi 20 decembre (1).png" },
  { title: "Tenues brillantes", date: "2025-12-27", time: "20:00", poster: "/samedi 27 décembre soirée tenues brillantes (1).png" },

  // MARDIS
  { title: "Après-midi Coquine", date: "2025-12-09", time: "14:00", poster: "/Mardi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-16", time: "14:00", poster: "/Mardi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-30", time: "14:00", poster: "/Mardi aprem.png" },

  { title: "Soirée Coquine", date: "2025-12-09", time: "20:30", poster: "/Mardi soir.png" },
  { title: "Soirée Coquine", date: "2025-12-16", time: "20:30", poster: "/Mardi soir.png" },
  { title: "Soirée Coquine", date: "2025-12-30", time: "20:30", poster: "/Mardi soir.png" },

  // MERCREDIS
  { title: "Gang Bang", date: "2025-12-10", time: "14:00", poster: "/Mercredi aprem Gang Bang.png" },
  { title: "Après-midi Coquine", date: "2025-12-17", time: "14:00", poster: "/Mercredi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-31", time: "14:00", poster: "/Mercredi aprem.png" },

  { title: "Soirée Coquine", date: "2025-12-10", time: "20:30", poster: "/Mercredi soir.png" },
  { title: "Soirée Coquine", date: "2025-12-17", time: "20:30", poster: "/Mercredi soir.png" },
  { title: "Réveillon", date: "2025-12-31", time: "20:30", poster: "/Reveillon.png" },

  // JEUDIS
  { title: "Après-midi Coquine", date: "2025-12-04", time: "14:00", poster: "/Jeudi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-11", time: "14:00", poster: "/Jeudi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-18", time: "14:00", poster: "/Jeudi aprem.png" },

  { title: "Soirée Coquine", date: "2025-12-04", time: "20:30", poster: "/Jeudi soir.png" },
  { title: "Soirée Coquine", date: "2025-12-11", time: "20:30", poster: "/Jeudi soir.png" },

  // DIMANCHES
  { title: "Journée coquine", date: "2025-12-07", time: "14:00", poster: "/Dimanche.png" },
  { title: "Journée coquine", date: "2025-12-14", time: "14:00", poster: "/Dimanche.png" },
  { title: "Journée coquine", date: "2025-12-21", time: "14:00", poster: "/Dimanche.png" },
  { title: "Journée coquine", date: "2025-12-28", time: "14:00", poster: "/Dimanche.png" },
];

/* ================= TARIFS ================= */
function getPricing(dt) {
  const d = new Date(dt);
  const weekday = d.getDay();
  const hour = d.getHours();
  const isAfternoon = hour < 18;

  const res = {
    women: "Femmes & personnes trans invitées",
    couples: "",
    men: "",
  };

  if (isAfternoon) {
    res.couples = "Couples : 25€";
    res.men = "Hommes seuls : 30€";
  } else if (weekday >= 1 && weekday <= 4) {
    res.couples = "Couples : 25€";
    res.men = "Hommes seuls : 35€";
  } else {
    res.couples = "Couples : 30€ • 2 consos";
    res.men = "Hommes seuls : 50€ • 2 consos";
  }

  return res;
}

/* ================= UI ================= */
function Container({ children }) {
  return <div className="mx-auto max-w-6xl px-4">{children}</div>;
}

function Section({ title, icon: Icon, children }) {
  return (
    <section className="py-12 bg-black">
      <Container>
        {title && (
          <div className="mb-6 flex items-center gap-2 text-red-500">
            {Icon && <Icon />}
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

/* ================= AGENDA ================= */
function Agenda() {
  const upcoming = useMemo(() => {
    const now = new Date();
    return EVENTS
      .map((e) => {
        const [y, m, d] = e.date.split("-");
        const [h, min] = e.time.split(":");
        return { ...e, dt: new Date(y, m - 1, d, h, min) };
      })
      .filter((e) => e.dt > now)
      .sort((a, b) => a.dt - b.dt);
  }, []);

  return (
    <Section title="Agenda" icon={CalendarIcon}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcoming.map((e) => {
          const pricing = getPricing(e.dt);
          return (
            <div key={e.title + e.date} className="border border-red-800 rounded-xl overflow-hidden">
              <img src={e.poster} alt={e.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-yellow-500 font-bold">{e.title}</h3>
                <p className="text-red-400 text-sm">
                  {new Date(e.date).toLocaleDateString("fr-FR")} • {e.time}
                </p>
                <div className="mt-2 text-sm text-white">
                  <div>{pricing.women}</div>
                  <div>{pricing.couples}</div>
                  <div>{pricing.men}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ================= PAGES ================= */
function Home() {
  return (
    <Section>
      <h1 className="text-yellow-500 text-4xl font-bold text-center">Bienvenue à L’Only-Us</h1>
      <p className="text-center mt-4">{TAGLINE}</p>
    </Section>
  );
}
function Club() { return <Section title="Présentation" icon={Info}><p>Club élégant, convivial.</p></Section>; }
function Galerie() { return <Section title="Galerie" icon={Camera}><p>Galerie bientôt en ligne.</p></Section>; }
function Infos() { return <Section title="Infos" icon={MapPin}><p>{ADDRESS}</p><p>{PHONE_NUMBER}</p><p>{EMAIL}</p></Section>; }

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/club" element={<Club />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/infos" element={<Infos />} />
      </Routes>
    </BrowserRouter>
  );
}
