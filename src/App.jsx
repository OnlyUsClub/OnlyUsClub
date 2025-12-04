import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import {
  Calendar as CalendarIcon, Camera, Info, MapPin, Instagram, Facebook, Phone, Mail, Clock, Menu,
} from "lucide-react";

// === Config rapide ===
const CLUB_NAME = "L'Only-Us";
const TAGLINE = "Club libertin – Alès";
const ADDRESS = "1115 route d'Uzès, 30100 Alès";
const PHONE_NUMBER = "06 10 39 29 37";
const EMAIL = "onlyus.clublib@gmail.com";
const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/lonlyusclub/", icon: Instagram },
  { name: "Facebook",  href: "https://www.facebook.com/profile.php?id=61579129558554", icon: Facebook },
];

/* =========================================================
   1) TES ÉVÉNEMENTS
   - Mets l'image dans /public/posters/
   - Donne un NOM SANS DATE (ex: "apres-midi-coquines.png")
   - Si l'événement est périodique, RÉUTILISE le même poster.
   - Ajoute / supprime librement des lignes ci-dessous.
   ========================================================= */
const EVENTS = [
  { title: "Les heures suspendues", date: "2025-08-31", time: "20:00", theme: "Slow & sensual", description: "Instants suspendus en musique.", poster: "/posters/2025-08-31-heures-suspenses.png" },
 
  // Vendredi (Aprem)
  { title: "Après-midi Coquine", date: "2025-12-05", time: "14:00-19:00", theme: "Journée", poster: "/Vendredi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-12", time: "14:00-19:00", theme: "Journée", poster: "/Vendredi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-19", time: "14:00-19:00", theme: "Journée", poster: "/Vendredi aprem.png" },
  // VENDREDIS (Soir)
  { title: "Soirée Jarretelles", date: "2025-12-05", time: "20:00-01:00", theme: "Dentelle", poster: "/Copie de PORTE-JARRETELLES (1).png" },
  { title: "Soirée Nude", date: "2025-12-12", time: "20:00-01:00", theme: "Bleu", poster: "/nude (1).png" },
  { title: "Soirée Ibiza", date: "2025-12-19", time: "20:00-01:00", theme: "ibiza", poster: "/posters/Vendredi 10 oct ibiza.png" },

  // SAMEDIS (Aprem)
  { title: "Après-midi Coquine", date: "2025-12-06", time: "14:00-19:00", theme: "Sexy", poster: "/Samedi Aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-13", time: "14:00-19:00", theme: "Sexy", poster: "/Samedi Aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-20", time: "14:00-19:00", theme: "Sexy", poster: "/Samedi Aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-26", time: "14:00-19:00", theme: "Sexy", poster: "/Samedi Aprem.png" },
  // SAMEDIS (Soir)
  { title: "Soirée Black And Yellow", date: "2025-12-06", time: "20:00-02:00", theme: "Uniforme", poster: "/black and yellow (2).png" },
  { title: "Soirée Cadeau", date: "2025-12-13", time: "20:00-02:00", theme: "Sexy", poster: "/Copie de cadeau 13 ddécembre.png" },
  { title: "Soirée Cadeau!", date: "2025-12-20", time: "20:00-02:00", theme: "Sexy", poster: "/posters/Samedi 11 oct Kdo.png" },
  { title: "Soirée Disco", date: "2025-12-26", time: "20:00-02:00", theme: "Sexy", poster: "/posters/Samedi 18 oct disco.png" },

  // MARDIS (Aprem)
  { title: "Après-midi Coquine", date: "2025-12-09", time: "14:00-19:00", theme: "Après-midi", poster: "/Mardi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-16", time: "14:00-19:00", theme: "Après-midi", poster: "/Mardi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-30", time: "14:00-19:00", theme: "Après-midi", poster: "/Mardi aprem.png" },
  // MARDIS (Soir)
  { title: "Soirée Coquine",    date: "2025-12-09", time: "20:30-01:00", theme: "Soirée",     poster: "/Mardi soir.png" },
  { title: "Soirée Coquine",    date: "2025-12-16", time: "20:30-01:00", theme: "Soirée",     poster: "/Mardi soir.png" },
  { title: "Soirée Coquine",    date: "2025-12-30", time: "20:30-01:00", theme: "Soirée",     poster: "/Mardi soir.png" },


  // MERCREDIS (Aprem)
  { title: "Soirée Coquine", date: "2025-12-10", time: "14:00-19:00", theme: "Après-midi", poster: "/Mercredi aprem.png" },
  { title: "Soirée Coquine", date: "2025-12-17", time: "14:00-19:00", theme: "Après-midi", poster: "/Mercredi aprem.png" },
  { title: "Soirée Coquine", date: "2025-12-31", time: "14:00-19:00", theme: "Après-midi", poster: "/Mercredi aprem.png" },
 
  // MERCREDIS (Soir)
  { title: "Soirée Coquine", date: "2025-12-10", time: "20:30-01:00", theme: "Soirée", poster: "/Mercredi soir.png" },
  { title: "Soirée Coquine", date: "2025-12-17", time: "20:30-01:00", theme: "Soirée", poster: "/Mercredi soir.png" },
  { title: "Soirée Coquine", date: "2025-12-31", time: "20:30-01:00", theme: "Soirée", poster: "/Mercredi soir.png" },


  // JEUDIS APREM
  { title: "Après-midi Coquine", date: "2025-12-04", time: "14:00-19:00", theme: "Après-midi", poster: "/Jeudi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-11", time: "14:00-19:00", theme: "Après-midi", poster: "/Jeudi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-12-18", time: "14:00-19:00", theme: "Après-midi", poster: "/Jeudi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-10-16", time: "14:00-19:00", theme: "Après-midi", poster: "/Jeudi aprem.png" },
  { title: "Après-midi Coquine", date: "2025-10-23", time: "14:00-19:00", theme: "Après-midi", poster: "/Jeudi aprem.png" },
  
  // JEUDIS SOIR
  { title: "Soirée Coquine",    date: "2025-12-04", time: "20:30-01:00", theme: "Soirée",     poster: "/Jeudi soir.png" },
  { title: "Soirée Coquine",    date: "2025-12-11", time: "20:30-01:00", theme: "Soirée",     poster: "/Jeudi soir.png" },
  { title: "Soirée Coquine",    date: "2025-12-18", time: "20:30-01:00", theme: "Soirée",     poster: "/Jeudi soir.png" },

  
  // DIMANCHES (Soir)
  { title: "Journée coquine", date: "2025-12-07", time: "14:00-19:00", theme: "Journée", poster: "/Dimanche.png" },
  { title: "Journée coquine", date: "2025-12-14", time: "14:00-19:00", theme: "Journée", poster: "/Dimanche.png" },
  { title: "Journée coquine", date: "2025-12-21", time: "14:00-19:00", theme: "Journée", poster: "/Dimanche.png" },
  { title: "Journée coquine", date: "2025-12-28", time: "14:00-19:00", theme: "Journée", poster: "/Dimanche.png" },



  // ==== AJOUTE ICI tes nouveaux évènements de la capture ====
  // FORMAT:
  // { title: "Titre", date: "YYYY-MM-DD", time: "HH:MM", theme: "texte optionnel", poster: "/posters/slug-sans-date.png" },
];

/* =========================================================
   2) PRIX AUTOMATIQUES
   - Femmes & personnes trans invitées (toujours)
   - Après-midi (lun→sam) : couples 25€, hommes 30€
   - Soirées lun→jeu : couples 25€, hommes 35€
   - Ven/Sam/Dim soir : couples 30€ • 2 consos, hommes 50€ • 2 consos
   ========================================================= */
function getPricing(dt, timeStr) {
  const d = new Date(dt);                 // 0=Dim … 6=Sam
  const weekday = d.getDay();
  const hour = Number((timeStr || "20:00").split(":")[0]);
  const isAfternoon = hour < 18;

  const res = {
    women: "Femmes & personnes trans invitées",
    couples: "",
    men: "",
  };

  if (isAfternoon && weekday >= 1 && weekday <= 6) {
    res.couples = "Couples : 25€";
    res.men     = "Hommes seuls : 30€";
  } else {
    if (weekday >= 1 && weekday <= 4) {   // Lun→Jeu
      res.couples = "Couples : 25€";
      res.men     = "Hommes seuls : 35€";
    } else {                              // Ven / Sam / Dim
      res.couples = "Couples : 30€ • 2 consos";
      res.men     = "Hommes seuls : 50€ • 2 consos";
    }
  }
  return res;
}

// === Petits helpers d’UI ===
function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
function Section({ title, icon: Icon, children, className = "" }) {
  return (
    <section className={`py-10 sm:py-14 ${className}`}>
      <Container>
        {title && (
          <div className="mb-6 flex items-center gap-3 text-red-500">
            {Icon && <Icon className="h-6 w-6" />}
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">{title}</h2>
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
function Pill({ children }) {
  return <span className="rounded-full border border-red-700/60 px-3 py-1 text-sm text-white/90">{children}</span>;
}

// === Layout (noir/rouge/or) ===
function Navbar() {
  const [open, setOpen] = useState(false);

  const navLink = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm sm:text-base transition ${
      isActive ? "bg-red-600 text-white" : "text-red-400 hover:bg-red-700 hover:text-white"
    }`;

  // Ferme le menu quand on change de page
  const close = () => setOpen(false);

  return (
    <>
      {/* Barre du haut */}
      <header className="sticky top-0 z-50 w-full border-b border-red-800 bg-black text-white">
        <Container className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3" onClick={close}>
            <img src="/Logo.jpeg" alt="Logo L'Only-Us" className="h-10 w-auto" />
            <div>
              <div className="text-lg font-bold leading-tight text-yellow-500">L'Only-Us</div>
              <div className="text-xs text-white/70">Club libertin – Alès</div>
            </div>
          </Link>

          {/* Liens desktop */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/agenda" className={navLink}><CalendarIcon className="mr-2 inline h-4 w-4" />Agenda</NavLink>
            <NavLink to="/club" className={navLink}><Info className="mr-2 inline h-4 w-4" />Présentation</NavLink>
            <NavLink to="/galerie" className={navLink}><Camera className="mr-2 inline h-4 w-4" />Photos</NavLink>
            <NavLink to="/infos" className={navLink}><MapPin className="mr-2 inline h-4 w-4" />Infos</NavLink>
          </nav>

          {/* Bouton hamburger (mobile) */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full border border-red-700 p-2"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>
      </header>

      {/* Overlay + panneau coulissant (mobile) */}
      {open && (
        <>
          {/* Fond sombre cliquable */}
          <div
            className="fixed inset-0 z-[60] bg-black/70"
            onClick={close}
            aria-hidden="true"
          />
          {/* Panneau */}
          <div
            className="fixed top-0 right-0 z-[70] h-full w-80 max-w-[85%] bg-black border-l border-red-800 shadow-xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between p-4 border-b border-red-800">
              <div className="flex items-center gap-2">
                <img src="/Logo.jpeg" alt="Logo" className="h-8 w-auto" />
                <span className="text-yellow-500 font-semibold">Menu</span>
              </div>
              <button
                className="rounded-full border border-red-700 px-3 py-1"
                onClick={close}
                aria-label="Fermer le menu"
              >
                Fermer
              </button>
            </div>

            <nav className="p-3 text-white">
              <NavLink to="/agenda" onClick={close} className="block rounded-xl px-3 py-3 hover:bg-red-800/30">
                Agenda
              </NavLink>
              <NavLink to="/club" onClick={close} className="block rounded-xl px-3 py-3 hover:bg-red-800/30">
                Présentation
              </NavLink>
              <NavLink to="/galerie" onClick={close} className="block rounded-xl px-3 py-3 hover:bg-red-800/30">
                Photos
              </NavLink>
              <NavLink to="/infos" onClick={close} className="block rounded-xl px-3 py-3 hover:bg-red-800/30">
                Infos
              </NavLink>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href="https://www.instagram.com/lonlyusclub/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-700/60 px-3 py-2 text-sm text-red-400 hover:bg-red-700 hover:text-white transition">
                  <Instagram className="h-4 w-4" /> Insta
                </a>
                <a href="https://www.facebook.com/profile.php?id=61579129558554" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-700/60 px-3 py-2 text-sm text-red-400 hover:bg-red-700 hover:text-white transition">
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
              </div>

              <div className="mt-4 text-sm text-white/80">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-red-500" /> <a href="tel:0610392937">06 10 39 29 37</a></div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-red-500" /> <a href="mailto:contact@lonlyusclub.fr">contact@lonlyusclub.fr</a></div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-red-800 py-10 bg-black">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-white">
        <div>
          <div className="text-xl font-semibold text-yellow-500">{CLUB_NAME}</div>
          <p className="mt-2 text-sm text-white/80">{TAGLINE}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-red-700/60 px-3 py-1 text-sm text-red-400 hover:bg-red-700 hover:text-white transition">
                <s.icon className="h-4 w-4" /> {s.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold text-white">Nous trouver</div>
          <div className="mt-2 flex items-start gap-2 text-sm text-white/80">
            <MapPin className="mt-0.5 h-4 w-4 text-red-500" /> <span>{ADDRESS}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-white/80"><Phone className="h-4 w-4 text-red-500" /> <a href={`tel:${PHONE_NUMBER}`} className="hover:underline">{PHONE_NUMBER}</a></div>
          <div className="mt-1 flex items-center gap-2 text-sm text-white/80"><Mail className="h-4 w-4 text-red-500" /> <a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a></div>
        </div>
        <div>
          <div className="font-semibold text-white">Horaires</div>
          <ul className="mt-2 space-y-1 text-sm text-white/80">
            {["Mardi 14:00–19:00  20:30-01:00","Mercredi 14:00–19:00  20:30-01:00","Jeudi 14:00–19:00  20:30-01:00","Vendredi 14:00–19:00  20:00-01:00","Samedi 14:00–19:00  20:00-01:00","Dimanche 14:00–01:00"].map((t,i)=>(
              <li key={i} className="flex items-center gap-2"><Clock className="h-4 w-4 text-red-500" /> {t}</li>
            ))}
          </ul>
        </div>
      </Container>
<Container>
  <div className="mt-10 border-t border-red-800 pt-6 text-xs text-white/60 w-full text-center">
    © {new Date().getFullYear()} {CLUB_NAME}. Tous droits réservés. Entrée réservée aux personnes majeures.
  </div>
</Container>
    </footer>
  );
}

// === Pages ===
function Agenda() {
  // → NE GARDE QUE LES ÉVÉNEMENTS STRICTEMENT FUTURS (passe + aujourd’hui exclus)
  const upcoming = useMemo(() => {
    const now = new Date();
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return EVENTS
      .map((e) => ({ ...e, dt: new Date(`${e.date}T${e.time || "20:00"}`) }))
      .filter((e) => e.dt > endOfToday)
      .sort((a, b) => a.dt - b.dt);
  }, []);

  return (
    <Section title="Agenda" icon={CalendarIcon} className="bg-black">
      {upcoming.length === 0 ? (
        <div className="rounded-2xl border border-red-800 p-6 text-sm text-white/80 bg-black/60">
          Aucun événement à venir n'est publié pour le moment.
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => {
            const pricing = getPricing(e.dt, e.time);
            return (
              <li key={`${e.date}-${e.title}`} className="rounded-2xl overflow-hidden border border-red-800 bg-black">
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
                    {new Date(e.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} • {e.time}{e.theme ? ` • ${e.theme}` : ""}
                  </div>

                  {/* Tarifs automatiques */}
                  <div className="mt-3 rounded-xl border border-red-800 p-3 bg-black/60">
                    <div className="text-xs text-white/80">{pricing.women}</div>
                    <div className="mt-1 text-sm text-yellow-500">{pricing.couples}</div>
                    <div className="text-sm text-red-400">{pricing.men}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Section>
  );
}

function Home(){return <Section className="bg-black">
  <Container>
  <section className="relative bg-black text-center text-white">
    <img src="/posters/Coin calin.jpeg" alt="Entrée du club"
      className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
  <div class="relative z-10 py-32 px-4">
    <h1 class="text-4xl sm:text-5xl font-extrabold text-yellow-500 mb-4">
      Bienvenue à l’Only-Us
    </h1>
    <p class="text-lg sm:text-xl max-w-2xl mx-auto text-white/90">
      ✨ Un lieu unique où l’élégance rencontre la sensualité.<br/>
      Ici, chacun est invité à vivre des instants intenses dans une ambiance raffinée, conviviale et respectueuse.
    </p>
  </div>
</section></Container></Section>;}
function Club() {
  return (
    <Section title="Présentation du club" icon={Info} className="bg-black">
      <div className="text-white/80">
        <p>
          Situé à Alès, l’Only-Us est un club libertin
          <strong> pensé pour tous ceux qui souhaitent partager des instants de plaisir</strong>
          dans un cadre <strong>élégant, sensuel et respectueux</strong>.
        </p>

        <h3>Ce que vous trouverez:</h3>
        <ul>
          <li><strong>Piste de danse</strong> — soirées à thème et ambiance musicale.</li>
          <li><strong>Bar & tapas</strong> — cocktails et petites faims (selon soirées).</li>
          <li><strong>Espace balnéo</strong> — jacuzzis, sauna, hammam pour se détendre.</li>
          <li><strong>Coins câlins</strong> — espaces confortables, discrets et entretenus.</li>
        </ul>
      </div>
    </Section>
  );
}

function Galerie() {
  const images = [
    "/posters/entree 1.JPG",
    "/posters/bar 1.JPG",
    "/posters/bar 2.jpeg",
    "/posters/balneo 6.jpeg",
    "/posters/balneo 5.jpeg",
    "/posters/balneo 11.JPG",
    "/posters/balneo 10.JPG",
    "/posters/balneo 7.jpeg",
    "/posters/balneo 1.JPG",
    "/posters/balneo 2.JPG",
    "/posters/balneo 8.jpeg",
    "/posters/balneo 9.jpeg",
    // ajoute ici toutes les images que tu veux afficher
  ];

  return (
    <Section title="Galerie" icon={Camera} className="bg-black">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-xl border border-red-800">
            <img src={src} alt={`Galerie ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Infos(){return <Section title="Infos pratiques" icon={MapPin} className="bg-black"><p className="text-white/80">{ADDRESS} • {PHONE_NUMBER} • {EMAIL}</p></Section>;}

// === App Root ===
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/club" element={<Club />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/infos" element={<Infos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
