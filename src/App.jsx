
import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import { Calendar as CalendarIcon, Camera, Info, MapPin, Instagram, Facebook, Phone, Mail, Clock, Menu } from "lucide-react";

// === Quick Config (edit these) ===
const CLUB_NAME = "Only Us";
const TAGLINE = "Club libertin – Alès";
const ADDRESS = "1115 route d'Uzès, 30100 Alès";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/xxxx"; // Remplacez par le vrai lien Maps
const PHONE_NUMBER = "+33 6 00 00 00 00"; // Remplacez
const EMAIL = "contact@onlyus-ales.fr"; // Remplacez
const OPENING = [
  { day: "Jeudi", hours: "20:00 – 02:00" },
  { day: "Vendredi", hours: "20:00 – 03:00" },
  { day: "Samedi", hours: "20:00 – 04:00" },
  { day: "Dimanche", hours: "20:00 – 01:00" },
];
const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/onlyusales", icon: Instagram },
  { name: "Facebook", href: "https://facebook.com/onlyusales", icon: Facebook },
  // Ajoutez Wyylde / autres réseaux ci-dessous si besoin
  // { name: "Wyylde", href: "https://www.wyylde.com/profile/onlyus", icon: Globe },
];

// === Demo events (update freely) ===
const EVENTS = [
  {
    title: "Soirée Blanche",
    date: "2025-08-16",
    time: "21:00",
    theme: "Dress code : blanc",
    description: "Ambiance chic & sensuelle, bar à bulles, DJ set.",
  },
  {
    title: "Tapas & Chill",
    date: "2025-08-17",
    time: "20:30",
    theme: "After-weekend détente",
    description: "Rencontres, musique lounge et petites assiettes.",
  },
  {
    title: "Uniformes & Fantasmes",
    date: "2025-08-23",
    time: "21:00",
    theme: "Infirmière, militaire, écolier·e, à vous de jouer",
    description: "Photobooth, playlists thématiques, surprises.",
  },
];

// === Demo gallery (replace with your photos or URLs) ===
const GALLERY = [
  { src: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=1200", alt: "Jeu de lumières" },
  { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200", alt: "Bar & cocktails" },
  { src: "https://images.unsplash.com/photo-1532634896-26909d0d4b6a?w=1200", alt: "Espace lounge" },
  { src: "https://images.unsplash.com/photo-1541976076758-347942db1970?w=1200", alt: "Ambiance rouge" },
  { src: "https://images.unsplash.com/photo-1526402464712-1b1ee1f7f2dc?w=1200", alt: "Espace jacuzzi (illustration)" },
  { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200", alt: "Piste de danse" },
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
          <div className="mb-6 flex items-center gap-3">
            {Icon && <Icon className="h-6 w-6" />}
            <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

function Pill({ children }) {
  return <span className="rounded-full border px-3 py-1 text-sm">{children}</span>;
}

// === Layout ===
function Navbar() {
  const [open, setOpen] = useState(false);
  const navLink = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm sm:text-base transition ${isActive ? "bg-black text-white" : "hover:bg-black/10"}`;
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <div className="h-10 w-10 rounded-2xl bg-black text-white grid place-items-center font-bold">OU</div>
          <div>
            <div className="text-lg font-bold leading-tight">{CLUB_NAME}</div>
            <div className="text-xs opacity-70">{TAGLINE}</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/agenda" className={navLink}><CalendarIcon className="mr-2 inline h-4 w-4"/>Agenda</NavLink>
          <NavLink to="/club" className={navLink}><Info className="mr-2 inline h-4 w-4"/>Présentation</NavLink>
          <NavLink to="/galerie" className={navLink}><Camera className="mr-2 inline h-4 w-4"/>Photos</NavLink>
          <NavLink to="/infos" className={navLink}><MapPin className="mr-2 inline h-4 w-4"/>Infos</NavLink>
        </nav>
        <button className="md:hidden rounded-full border p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
      </Container>
      {open && (
        <div className="border-t md:hidden bg-white">
          <Container className="flex flex-col py-2">
            <NavLink to="/agenda" className="px-3 py-2" onClick={() => setOpen(false)}>Agenda</NavLink>
            <NavLink to="/club" className="px-3 py-2" onClick={() => setOpen(false)}>Présentation</NavLink>
            <NavLink to="/galerie" className="px-3 py-2" onClick={() => setOpen(false)}>Photos</NavLink>
            <NavLink to="/infos" className="px-3 py-2" onClick={() => setOpen(false)}>Infos</NavLink>
          </Container>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t py-10">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="text-xl font-semibold">{CLUB_NAME}</div>
          <p className="mt-2 text-sm opacity-80">{TAGLINE}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:bg-black hover:text-white transition">
                <s.icon className="h-4 w-4"/> {s.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold">Nous trouver</div>
          <div className="mt-2 flex items-start gap-2 text-sm opacity-90">
            <MapPin className="mt-0.5 h-4 w-4"/> <span>{ADDRESS}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm opacity-90"><Phone className="h-4 w-4"/> <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a></div>
          <div className="mt-1 flex items-center gap-2 text-sm opacity-90"><Mail className="h-4 w-4"/> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
        </div>
        <div>
          <div className="font-semibold">Horaires</div>
          <ul className="mt-2 space-y-1 text-sm opacity-90">
            {OPENING.map((o) => (
              <li key={o.day} className="flex items-center gap-2"><Clock className="h-4 w-4"/> {o.day} : {o.hours}</li>
            ))}
          </ul>
        </div>
      </Container>
      <Container>
        <div className="mt-10 border-t pt-6 text-xs opacity-70">© {new Date().getFullYear()} {CLUB_NAME}. Tous droits réservés. Entrée réservée aux personnes majeures.
        </div>
      </Container>
    </footer>
  );
}

// === Pages ===
function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-200 via-white to-white" />
        <Container className="py-16 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                {CLUB_NAME}
                <span className="block text-lg sm:text-2xl font-medium mt-3">{TAGLINE}</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg opacity-80 max-w-prose">
                Piste de danse, espace balnéo (jacuzzis, sauna, hammam), coins câlins & bar. 
                Des événements uniques chaque semaine, une ambiance chaleureuse et respectueuse.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/agenda" className="rounded-2xl bg-black px-5 py-3 text-white font-medium shadow hover:shadow-lg">Voir l'agenda</Link>
                <Link to="/galerie" className="rounded-2xl border px-5 py-3 font-medium hover:bg-black hover:text-white">Découvrir en images</Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:bg-black hover:text-white transition">
                    <s.icon className="h-4 w-4"/> {s.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-xl">
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1561484930-998b6a7c8883?w=1600" alt="Ambiance club"/>
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block rounded-3xl border bg-white p-4 shadow-xl">
                <div className="text-sm font-semibold">Prochain rendez-vous</div>
                <div className="mt-2 text-sm opacity-80">
                  {nextEventText(EVENTS)}
                </div>
                <Link to="/agenda" className="mt-3 inline-block text-sm underline">Tout voir →</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Section title="Ce qui vous attend" icon={Info}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-2xl border p-5 shadow-sm"><div className="text-lg font-semibold">Espace balnéo</div><p className="mt-2 text-sm opacity-80">Jacuzzis, sauna, hammam pour se détendre.</p></li>
          <li className="rounded-2xl border p-5 shadow-sm"><div className="text-lg font-semibold">Piste de danse</div><p className="mt-2 text-sm opacity-80">DJ & lumière pour lâcher prise.</p></li>
          <li className="rounded-2xl border p-5 shadow-sm"><div className="text-lg font-semibold">Coins câlins</div><p className="mt-2 text-sm opacity-80">Espaces confortables et discrets.</p></li>
          <li className="rounded-2xl border p-5 shadow-sm"><div className="text-lg font-semibold">Bar & tapas</div><p className="mt-2 text-sm opacity-80">Cocktails et petites faims (selon soirs).</p></li>
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
    <Section title="Agenda" icon={CalendarIcon}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Pill>Dress code respectueux</Pill>
        <Pill>Entrée réservée aux majeurs</Pill>
        <Pill>Couples & solos bienvenus</Pill>
      </div>
      {upcoming.length === 0 ? (
        <div className="rounded-2xl border p-6 text-sm opacity-80">Aucun événement à venir n'est publié pour le moment. Revenez bientôt ✨</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {upcoming.map((e) => (
            <li key={`${e.date}-${e.title}`} className="rounded-2xl border p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm opacity-70">{formatDate(e.dt)} • {e.time}</div>
                  <div className="text-lg font-semibold">{e.title}</div>
                </div>
                <div className="text-right">
                  <div className="rounded-full bg-black px-3 py-1 text-xs text-white">{e.theme}</div>
                </div>
              </div>
              {e.description && <p className="mt-3 text-sm opacity-80">{e.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function Club() {
  return (
    <Section title="Présentation du club" icon={Info}>
      <div className="prose max-w-none">
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
        <p>
          Nous organisons des soirées à thème chaque semaine (uniformes, blanche, tapas & chill, etc.). Suivez-nous sur les réseaux pour ne rien manquer.
        </p>
      </div>
    </Section>
  );
}

function Galerie() {
  return (
    <Section title="Galerie photos" icon={Camera}>
      <p className="mb-6 text-sm opacity-80">Une sélection d'ambiances du club (remplacez par vos propres photos si besoin).</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY.map((img, i) => (
          <div key={i} className="group overflow-hidden rounded-3xl border shadow-sm">
            <img src={img.src} alt={img.alt} className="h-64 w-full object-cover transition group-hover:scale-105"/>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Infos() {
  return (
    <Section title="Infos pratiques" icon={MapPin}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border p-6 shadow-sm">
          <div className="font-semibold">Adresse</div>
          <div className="mt-1 text-sm opacity-90">{ADDRESS}</div>
          <div className="mt-4 font-semibold">Contact</div>
          <div className="mt-1 text-sm opacity-90 flex items-center gap-2"><Phone className="h-4 w-4"/> <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a></div>
          <div className="mt-1 text-sm opacity-90 flex items-center gap-2"><Mail className="h-4 w-4"/> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
          <div className="mt-4 font-semibold">Réseaux sociaux</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:bg-black hover:text-white transition">
                <s.icon className="h-4 w-4"/> {s.name}
              </a>
            ))}
          </div>
          <div className="mt-6 text-xs opacity-70">Accès : parking gratuit devant l'établissement.</div>
        </div>
        <div className="rounded-3xl overflow-hidden border">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.9999!2d4.123!3d44.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDA3JzIyLjAiTiA0wrAwNyc1MC4wIkU!5e0!3m2!1sfr!2sfr!4v0000000000"
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
function nextEventText(list) {
  const now = new Date();
  const upcoming = list
    .map((e) => ({ ...e, dt: new Date(`${e.date}T${e.time || "20:00"}`) }))
    .filter((e) => e.dt >= now)
    .sort((a, b) => a.dt - b.dt)[0];
  if (!upcoming) return "Aucun événement planifié";
  return `${formatDate(upcoming.dt)} — ${upcoming.title}`;
}

// === App Root ===
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-900">
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
