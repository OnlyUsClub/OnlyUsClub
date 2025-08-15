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

// === Quick Config ===
const CLUB_NAME = "L'Only-Us";
const TAGLINE = "Club libertin – Alès";
const ADDRESS = "1115 route d'Uzès, 30100 Alès";
const PHONE_NUMBER = "06 10 39 29 37";
const EMAIL = "contact@lonlyusclub.fr";
const OPENING = [
  { day: "Jeudi", hours: "20:00 – 02:00" },
  { day: "Vendredi", hours: "20:00 – 03:00" },
  { day: "Samedi", hours: "20:00 – 04:00" },
  { day: "Dimanche", hours: "20:00 – 01:00" },
];
const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/lonlyusclub/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61579129558554", icon: Facebook },
];

// === Tes événements + affiches (.png dans public/posters) ===
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

// === UI helpers ===
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

// === Layout ===
function Navbar() {
  const [open, setOpen] = useState(false);
  const navLink = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm sm:text-base transition ${
      isActive ? "bg-red-600 text-white" : "text-red-400 hover:bg-red-700 hover:text-white"
    }`;
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-800 bg-black text-white">
      <Container className="flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <img src="/Logo.jpeg" alt="Logo L'Only-Us" className="h-10 w-auto" />
          <div>
            <div className="text-lg font-bold leading-tight text-yellow-500">{CLUB_NAME}</div>
            <div className="text-xs text-white/70">{TAGLINE}</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/agenda" className={navLink}><CalendarIcon className="mr-2 inline h-4 w-4"/>Agenda</NavLink>
          <NavLink to="/club" className={navLink}><Info className="mr-2 inline h-4 w-4"/>Présentation</NavLink>
          <NavLink to="/galerie" className={navLink}><Camera className="mr-2 inline h-4 w-4"/>Photos</NavLink>
          <NavLink to="/infos" className={navLink}><MapPin className="mr-2 inline h-4 w-4"/>Infos</NavLink>
        </nav>
        <button className="md:hidden rounded-full border border-red-700 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
      </Container>
      {open && (
        <div className="border-t border-red-800 md:hidden bg-black text-white">
          <Container className="flex flex-col py-2">
            <NavLink to="/agenda" className="px-3 py-2" onClick={close}>Agenda</NavLink>
            <NavLink to="/club" className="px-3 py-2" onClick={close}>Présentation</NavLink>
            <NavLink to="/galerie" className="px-3 py-2" onClick={close}>Photos</NavLink>
            <NavLink to="/infos" className="px-3 py-2" onClick={close}>Infos</NavLink>
          </Container>
        </div>
      )}
    </header>
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
            {OPENING.map((o) => (
              <li key={o.day} className="flex items-center gap-2"><Clock className="h-4 w-4 text-red-500" /> {o.day} : {o.hours}</li>
            ))}
          </ul>
        </div>
      </Container>
      <Container>
        <div className="mt-10 border-t border-red-800 pt-6 text-xs text-white/60">© {new Date().getFullYear()} {CLUB_NAME}. Tous droits réservés. Entrée réservée aux personnes majeures.</div>
      </Container>
    </footer>
  );
}

// === Pages ===
function Home() {
  return (
    <>
      <section className="bg-black">
        <Container className="py-12 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight text-yellow-500">{CLUB_NAME}</h1>
              <p className="mt-3 text-white/80">{TAGLINE}</p>
              <p className="mt-6 text-base sm:text-lg text-white/80 max-w-prose">
                Piste de danse, espace balnéo (jacuzzis, sauna, hammam), coins câlins & bar.
                Des événements chaque semaine dans une ambiance élégante, sensuelle et respectueuse.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/agenda" className="rounded-2xl bg-red-700 px-5 py-3 text-white font-medium hover:bg-red-600 transition">Voir l'agenda</Link>
                <Link to="/galerie" className="rounded-2xl border border-red-700 px-5 py-3 font-medium text-white hover:bg-red-800/50 transition">Découvrir en images</Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-red-700/60 px-3 py-1 text-sm text-red-400 hover:bg-red-700 hover:text-white transition">
                    <s.icon className="h-4 w-4" /> {s.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden border border-red-800">
              <img className="aspect-video w-full object-cover" src="https://images.unsplash.com/photo-1561484930-998b6a7c8883?w=1600" alt="Ambiance club" />
            </div>
          </div>
        </Container>
      </section>
      <Section title="Ce qui vous attend" icon={Info} className="bg-black">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-2xl border border-red-800 p-5 bg-black/60"><div className="text-lg font-semibold text-white">Espace balnéo</div><p className="mt-2 text-sm text-white/70">Jacuzzis, sauna, hammam pour se détendre.</p></li>
          <li className="rounded-2xl border border-red-800 p-5 bg-black/60"><div className="text-lg font-semibold text-white">Piste de danse</div><p className="mt-2 text-sm text-white/70">DJ & lumière pour lâcher prise.</p></li>
          <li className="rounded-2xl border border-red-800 p-5 bg-black/60"><div className="text-lg font-semibold text-white">Coins câlins</div><p className="mt-2 text-sm text-white/70">Espaces confortables et discrets.</p></li>
          <li className="rounded-2xl border border-red-800 p-5 bg-black/60"><div className="text-lg font-semibold text-white">Bar & tapas</div><p className="mt-2 text-sm text-white/70">Cocktails et petites faims (selon soirs).</p></li>
        </ul>
      </Section>
    </>
  );
}

function Agenda() {
  const upcoming = useMemo(() => {
    const now = new Date();
    return EVENTS
      .map((e) => ({ ...e, dt: new Date(`${e.date}T${e.time || "20:00"}`) }))
      .filter((e) => e.dt >= new Date(now.getFullYear(), now.getMonth(), now.getDate()))
      .sort((a, b) => a.dt - b.dt);
  }, []);

  return (
    <Section title="Agenda" icon={CalendarIcon} className="bg-black">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Pill>Dress code respectueux</Pill>
        <Pill>Entrée réservée aux majeurs</Pill>
        <Pill>Couples & solos bienvenus</Pill>
      </div>
      {upcoming.length === 0 ? (
        <div className="rounded-2xl border border-red-800 p-6 text-sm text-white/80 bg-black/60">Aucun événement à venir n'est publié pour le moment.</div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => (
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
                <div className="mt-1 text-sm text-red-400">{formatDate(e.dt)} • {e.time} • {e.theme}</div>
                {e.description && <p className="mt-2 text-sm text-white/90">{e.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function Club() {
  return (
    <Section title="Présentation du club" icon={Info} className="bg-black text-white">
      <div className="prose prose-invert max-w-none">
        <p>
          Bienvenue au <strong>{CLUB_NAME}</strong>, votre club libertin à Alès. Ici, la bienveillance et le respect
          sont au cœur de tout : chacun évolue à son rythme, dans un cadre élégant, propre et sécurisé.
        </p>
        <ul>
          <li><strong>Espace balnéo :</strong> jacuzzis, sauna, hammam.</li>
          <li><strong>Bar & piste de danse :</strong> cocktails, DJ, jeux de lumières.</li>
          <li><strong>Coins câlins :</strong> confortables, discrets, entretenus tout au long de la soirée.</li>
          <li><strong>Dress code :</strong> tenue soignée, thématique selon soirées (voir agenda).</li>
          <li><strong>Règlement :</strong> consentement explicite, hygiène irréprochable, pas de photos non consenties.</li>
        </ul>
      </div>
    </Section>
  );
}

function Galerie() {
  return (
    <Section title="Galerie photos" icon={Camera} className="bg-black text-white">
      <p className="mb-6 text-sm text-white/80">Une sélection d'ambiances (remplace par tes propres photos).</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200", alt: "Bar & cocktails" },
          { src: "https://images.unsplash.com/photo-1541976076758-347942db1970?w=1200", alt: "Ambiance rouge" },
          { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200", alt: "Piste de danse" },
        ].map((img, i) => (
          <div key={i} className="group overflow-hidden rounded-3xl border border-red-800 bg-black">
            <img src={img.src} alt={img.alt} className="h-64 w-full object-cover transition group-hover:scale-105" />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Infos() {
  return (
    <Section title="Infos pratiques" icon={MapPin} className="bg-black text-white">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-red-800 p-6 bg-black">
          <div className="font-semibold text-white">Adresse</div>
          <div className="mt-1 text-sm text-white/90">{ADDRESS}</div>
          <div className="mt-4 font-semibold text-white">Contact</div>
          <div className="mt-1 text-sm text-white/90 flex items-center gap-2"><Phone className="h-4 w-4 text-red-500" /> <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a></div>
          <div className="mt-1 text-sm text-white/90 flex items-center gap-2"><Mail className="h-4 w-4 text-red-500" /> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
          <div className="mt-4 font-semibold text-white">Réseaux sociaux</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-red-700/60 px-3 py-1 text-sm text-red-400 hover:bg-red-700 hover:text-white transition">
                <s.icon className="h-4 w-4" /> {s.name}
              </a>
            ))}
          </div>
          <div className="mt-6 text-xs text-white/60">Accès : parking gratuit devant l'établissement.</div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-red-800">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps?q=1115%20route%20d'Uz%C3%A8s%2030100%20Al%C3%A8s&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </Section>
  );
}

// === Utilities ===
function formatDate(d) {
  return d.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

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
