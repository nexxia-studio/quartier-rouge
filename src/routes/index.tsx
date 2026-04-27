import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "s01", label: "Danse Privée", description: "Canal Érotique – Spectacle intime au bord du canal", icon: "🃏", category: "Danse", prices: { 15: 80, 30: 140, 60: 250 } },
  { id: "s02", label: "Lapdance", description: "Velvet Shadow – Danse rapprochée dans une ambiance tamisée", icon: "🔮", category: "Danse", prices: { 15: 120, 30: 200, 60: 360 } },
  { id: "s03", label: "Chevauchée Amsterdam", description: "Cowgirl complète avec vue sur le client", icon: "🎭", category: "Danse", prices: { 15: 400, 30: 700, 60: 1200 } },
  { id: "s04", label: "Anal Red Light", description: "Pénétration anale sensuelle et progressive", icon: "🤹", category: "Sexe", prices: { 15: 60, 30: 100, 60: 180 } },
  { id: "s05", label: "Double Plaisir", description: "Double pénétration (doigts + jouet ou client + jouet)", icon: "🔥", category: "Sexe", prices: { 15: 150, 30: 260, 60: 460 } },
  { id: "s06", label: "69 Canal", description: "Position 69 prolongée avec jeux de langue.", icon: "🔪", category: "Sexe", prices: { 15: 180, 30: 300, 60: 520 } },
  { id: "s07", label: "Dutch Deepthroat", description: "Plaisir manuel intense sans se soucier de votre plaisir", icon: "🐇", category: "Sexe", prices: { 15: 200, 30: 340, 60: 600 } },
  { id: "s08", label: "Éjac Faciale Amsterdam", description: "Finitions faciales ou corps avec option avaler", icon: "🎈", category: "Sexe", prices: { 15: 70, 30: 120, 60: 200 } },
  { id: "s09", label: "Chevauchée Amsterdam", description: "Cowgirl complète en équipe", icon: "🎤", category: "Sexe à 3", prices: { 15: 350, 30: 600, 60: 1000 } },
  { id: "s10", label: "Escape game & team building", description: "Animation groupe autour de la magie et du mystère.", icon: "🗝️", category: "Sexe à 3", prices: { 15: 300, 30: 500, 60: 850 } },
] as const;

type Service = (typeof SERVICES)[number];
const SERVICES_MAP: Record<string, Service> = Object.fromEntries(SERVICES.map((s) => [s.id, s]));

type Magician = {
  id: number; name: string; alias: string; origin: string; location: string;
  avatar: string; photo: string; available: boolean; rating: number; reviews: number;
  badge: string; tags: string[]; serviceIds: string[]; bio: string; warning: string | null;
};

const MAGICIANS: Magician[] = [
  { id: 1, name: "Lola Velvet", alias: "La Maîtresse des Colombes", origin: "Espagnol", location: "Séville / Tournée mondiale", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=magnifico&backgroundColor=ffd700", photo: "https://images.unsplash.com/photo-1627389955646-6596047473d7?w=400&h=500&fit=crop", available: true, rating: 4.9, reviews: 312, badge: "⭐ Best-seller", tags: ["Magie classique", "Animaux", "Scène"], serviceIds: ["s01", "s03", "s04", "s05", "s07"], bio: "Formé à la prestigieuse École Nationale de Magie de Séville, Magnifico jongle littéralement avec les oiseaux depuis l'âge de 7 ans.", warning: "⚠️ Ne pas réserver si allergie aux plumes." },
  { id: 2, name: "Vicky Vorace", alias: "L'Illusionniste du Dimanche", origin: "Belge", location: "Liège et alentours (max 20km)", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=kevin&backgroundColor=c0c0c0", photo: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=500&fit=crop", available: true, rating: 3.2, reviews: 47, badge: "💶 Petit budget", tags: ["Magie de proximité", "Jonglage", "Anniversaires"], serviceIds: ["s01", "s04", "s08"], bio: "Kevin a découvert la magie en regardant Cyril le Magicien à la télé en 2003.", warning: "⚠️ Remboursement non garanti en cas d'échec du tour." },
  { id: 3, name: "Ruby Ride", alias: "La Voyante des Illusions", origin: "Pakistanaise", location: "Bruxelles", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=zara&backgroundColor=9b59b6", photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop", available: true, rating: 4.7, reviews: 189, badge: "🔮 Mystique", tags: ["Magie mystique", "Lecture d'esprit", "Gala"], serviceIds: ["s02", "s03", "s01"], bio: "Descendante d'une lignée de prestidigitateurs fondée à Lahore en 1887.", warning: null },
  { id: 4, name: "Lola Deepthroat", alias: "La Magicienne Corporatif", origin: "Américaine", location: "Paris / Lyon / Déplacements facturés", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=jeanmichel&backgroundColor=3498db", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop", available: false, rating: 4.1, reviews: 98, badge: "💼 Corporate", tags: ["Magie corporate", "Team building", "Conférence"], serviceIds: ["s09", "s10", "s02", "s01"], bio: "Ancien consultant McKinsey reconverti dans la magie après un burnout inspirant.", warning: "⚠️ Indisponible en août (vacances au Touquet)." },
  { id: 5, name: "Scarlett Squirt", alias: "La Jongleuse de Galway", origin: "Irlandais", location: "Dublin / Europe", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=obrien&backgroundColor=2ecc71", photo: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=500&fit=crop", available: true, rating: 4.8, reviews: 234, badge: "🍀 Coup de cœur", tags: ["Jonglage", "Festival", "Cirque"], serviceIds: ["s04", "s05", "s06"], bio: "Champion d'Europe de jonglage 2019 et 2021.", warning: "⚠️ Couteaux non inclus dans le prix." },
  { id: 6, name: "Kira Kink", alias: "Sensei de l'Impossible", origin: "Japonais", location: "Tokyo / International", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=takeshi&backgroundColor=e74c3c", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop", available: true, rating: 5.0, reviews: 501, badge: "🏆 Premium", tags: ["Magie classique", "Scène", "Gala", "Illusions grandes scènes"], serviceIds: ["s03", "s02", "s07", "s09"], bio: "Formé 12 ans dans un temple de Kyoto.", warning: null },
];

const ALL_TAGS = [...new Set(MAGICIANS.flatMap((m) => m.tags))].sort();
const ALL_ORIGINS = [...new Set(MAGICIANS.map((m) => m.origin))].sort();
const DURATIONS = [
  { minutes: 15 as const, label: "15 min" },
  { minutes: 30 as const, label: "30 min" },
  { minutes: 60 as const, label: "1 heure" },
];

const T = {
  bg: "#0d0d0d", bgCard: "#161616", bgSide: "#111111", bgInput: "#1a1a1a",
  border: "#2a2a2a", borderHot: "#c0000a", red: "#c0000a", redBright: "#e8000f",
  redDim: "#7a0006", redGlow: "rgba(192,0,10,0.18)",
  textPrim: "#f0e6e6", textSec: "#8a7070", textDim: "#4a3838", gold: "#c8913a",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: T.red, fontSize: "13px", letterSpacing: "1px" }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      {"☆".repeat(5 - Math.ceil(rating))}
    </span>
  );
}

function MagicianModal({ magician, onClose }: { magician: Magician | null; onClose: () => void }) {
  const [selectedDuration, setSelectedDuration] = useState<15 | 30 | 60>(30);
  if (!magician) return null;
  const magicianServices = magician.serviceIds.map((id) => SERVICES_MAP[id]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "20px", maxWidth: "680px", width: "100%", maxHeight: "90vh", overflowY: "auto", fontFamily: "'Georgia', serif" }}>
        <div style={{ position: "relative", height: "260px", borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
          <img src={magician.photo} alt={magician.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75) saturate(0.7)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,0,0,0.95) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: T.red }} />
          <div style={{ position: "absolute", bottom: "24px", left: "28px", color: T.textPrim }}>
            <p style={{ margin: 0, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: T.textSec }}>{magician.origin} · {magician.location}</p>
            <h2 style={{ margin: "4px 0 2px", fontSize: "28px", fontWeight: "bold", color: "#fff" }}>{magician.name}</h2>
            <p style={{ margin: 0, fontSize: "15px", fontStyle: "italic", color: T.textSec }}>« {magician.alias} »</p>
          </div>
          {!magician.available && (
            <div style={{ position: "absolute", top: "20px", right: "20px", background: "#3a0000", border: `1px solid ${T.redDim}`, color: T.red, borderRadius: "999px", padding: "6px 16px", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>INDISPONIBLE</div>
          )}
          <button onClick={onClose} style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(0,0,0,0.5)", border: `1px solid ${T.border}`, borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", color: T.textSec, fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <Stars rating={magician.rating} />
            <span style={{ fontSize: "13px", color: T.textSec }}>{magician.rating}/5 · {magician.reviews} avis</span>
            <span style={{ marginLeft: "auto", background: "#1a1000", border: `1px solid #3a2800`, color: T.gold, borderRadius: "999px", padding: "4px 12px", fontSize: "12px", fontWeight: 600 }}>{magician.badge}</span>
          </div>

          <p style={{ fontSize: "15px", lineHeight: 1.7, color: T.textSec, marginBottom: "20px" }}>{magician.bio}</p>

          {magician.warning && (
            <div style={{ background: "#1a0000", border: `1px solid ${T.redDim}`, borderRadius: "10px", padding: "12px 16px", fontSize: "13px", color: "#c06060", marginBottom: "24px" }}>{magician.warning}</div>
          )}

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
            {magician.tags.map((tag) => (
              <span key={tag} style={{ background: "#1a0a0a", border: `1px solid ${T.border}`, borderRadius: "999px", padding: "4px 12px", fontSize: "12px", color: T.textSec }}>{tag}</span>
            ))}
          </div>

          <div style={{ height: "1px", background: `linear-gradient(to right, ${T.red}, transparent)`, marginBottom: "24px" }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, margin: 0, color: T.textSec, letterSpacing: "2px", textTransform: "uppercase" }}>Tarifs & Prestations</h3>
            <div style={{ display: "flex", gap: "4px", background: "#0d0d0d", borderRadius: "10px", padding: "4px", border: `1px solid ${T.border}` }}>
              {DURATIONS.map((d) => (
                <button key={d.minutes} onClick={() => setSelectedDuration(d.minutes)} style={{ padding: "6px 14px", borderRadius: "7px", border: "none", background: selectedDuration === d.minutes ? T.red : "transparent", color: selectedDuration === d.minutes ? "#fff" : T.textSec, fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: "'Georgia', serif" }}>{d.label}</button>
              ))}
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                <th style={{ padding: "8px 0", textAlign: "left", fontSize: "11px", color: T.textDim, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>Service</th>
                <th style={{ padding: "8px 0", textAlign: "center", fontSize: "11px", color: T.textDim, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>Catégorie</th>
                <th style={{ padding: "8px 0", textAlign: "right", fontSize: "11px", color: T.red, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>{DURATIONS.find((d) => d.minutes === selectedDuration)?.label}</th>
              </tr>
            </thead>
            <tbody>
              {magicianServices.map((s) => (
                <tr key={s.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: "12px 0", fontSize: "14px", color: T.textPrim }}>
                    <span style={{ marginRight: "8px" }}>{s.icon}</span>{s.label}
                  </td>
                  <td style={{ padding: "12px 0", textAlign: "center" }}>
                    <span style={{ background: "#1a0a0a", border: `1px solid ${T.border}`, borderRadius: "999px", padding: "2px 8px", fontSize: "11px", color: T.textSec }}>{s.category}</span>
                  </td>
                  <td style={{ padding: "12px 0 12px 16px", textAlign: "right", fontWeight: 700, fontSize: "16px", color: T.red, whiteSpace: "nowrap" }}>
                    {s.prices[selectedDuration].toLocaleString("fr-BE")} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "28px", display: "flex", gap: "12px" }}>
            <button disabled={!magician.available} style={{ flex: 1, padding: "14px", borderRadius: "10px", border: "none", background: magician.available ? T.red : "#2a1a1a", color: magician.available ? "#fff" : T.textDim, fontSize: "15px", fontWeight: 600, cursor: magician.available ? "pointer" : "not-allowed", fontFamily: "'Georgia', serif", boxShadow: magician.available ? `0 0 24px ${T.redGlow}` : "none" }}>
              {magician.available ? "✨ Réserver cette prestation" : "Indisponible actuellement"}
            </button>
            <button onClick={onClose} style={{ padding: "14px 20px", borderRadius: "10px", border: `1px solid ${T.border}`, background: "transparent", fontSize: "15px", cursor: "pointer", color: T.textSec, fontFamily: "'Georgia', serif" }}>Retour</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MagicianCard({ magician, onSelect }: { magician: Magician; onSelect: (m: Magician) => void }) {
  const minPrice = Math.min(...magician.serviceIds.map((id) => SERVICES_MAP[id].prices[15]));

  return (
    <div onClick={() => onSelect(magician)} style={{ background: T.bgCard, borderRadius: "16px", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, border-color 0.2s", border: `1px solid ${T.border}`, fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = T.redDim; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = T.border; }}
    >
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img src={magician.photo} alt={magician.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) saturate(0.6)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,0,0,0.92) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", background: magician.available ? "rgba(0,60,20,0.85)" : "rgba(60,0,0,0.85)", border: `1px solid ${magician.available ? "#1a5a30" : T.redDim}`, color: magician.available ? "#4ade80" : T.red, borderRadius: "999px", padding: "4px 10px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px" }}>
          {magician.available ? "● DISPONIBLE" : "● INDISPONIBLE"}
        </div>
        <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(0,0,0,0.6)", border: `1px solid ${T.border}`, color: T.gold, borderRadius: "999px", padding: "4px 10px", fontSize: "11px", fontWeight: 600 }}>{magician.badge}</div>
        <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
          <p style={{ margin: 0, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: T.textSec }}>{magician.origin}</p>
          <h3 style={{ margin: "2px 0 0", fontSize: "17px", fontWeight: "bold", color: "#fff" }}>{magician.name}</h3>
        </div>
      </div>

      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ margin: "0 0 8px", fontSize: "13px", fontStyle: "italic", color: T.textSec }}>« {magician.alias} »</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <Stars rating={magician.rating} />
          <span style={{ fontSize: "12px", color: T.textDim }}>({magician.reviews})</span>
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
          {magician.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{ background: "#1a0a0a", border: `1px solid ${T.border}`, borderRadius: "999px", padding: "2px 8px", fontSize: "11px", color: T.textSec }}>{tag}</span>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ margin: 0, fontSize: "11px", color: T.textDim, letterSpacing: "1px", textTransform: "uppercase" }}>À partir de</p>
            <p style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: T.red }}>{minPrice.toLocaleString("fr-BE")} €</p>
          </div>
          <button style={{ background: "transparent", color: T.red, border: `1px solid ${T.redDim}`, borderRadius: "10px", padding: "10px 16px", fontSize: "13px", cursor: "pointer", fontFamily: "'Georgia', serif" }}>Voir →</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedMagician, setSelectedMagician] = useState<Magician | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState("rating");

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const filtered = useMemo(() => {
    const minPriceOf = (m: Magician) => Math.min(...m.serviceIds.map((id) => SERVICES_MAP[id].prices[15]));

    let list = MAGICIANS.filter((m) => {
      const q = searchQuery.toLowerCase();
      if (q && !m.name.toLowerCase().includes(q) && !m.alias.toLowerCase().includes(q) &&
          !m.tags.some((t) => t.toLowerCase().includes(q))) return false;
      if (availableOnly && !m.available) return false;
      if (selectedOrigins.length && !selectedOrigins.includes(m.origin)) return false;
      if (selectedTags.length && !selectedTags.some((t) => m.tags.includes(t))) return false;
      if (minPriceOf(m) > maxPrice) return false;
      return true;
    });

    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price_asc") list = [...list].sort((a, b) => minPriceOf(a) - minPriceOf(b));
    else if (sortBy === "price_desc") list = [...list].sort((a, b) => minPriceOf(b) - minPriceOf(a));
    else if (sortBy === "reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [searchQuery, availableOnly, selectedOrigins, selectedTags, maxPrice, sortBy]);

  const filterPillStyle = (active: boolean) => ({
    padding: "5px 12px", borderRadius: "999px", fontSize: "12px",
    cursor: "pointer", border: "1px solid",
    background: active ? T.red : "transparent",
    color: active ? "#fff" : T.textSec,
    borderColor: active ? T.red : T.border,
    transition: "all 0.15s",
  });

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Georgia', serif" }}>
      <header style={{ background: "#080808", borderBottom: `1px solid ${T.border}`, padding: "52px 40px 44px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "200px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(192,0,10,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <p style={{ margin: "0 0 10px", fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: T.textDim, position: "relative" }}>Catalogue Officiel · Saison 2025</p>
        <h1 style={{ margin: "0 0 6px", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: "bold", lineHeight: 1.05, color: "#fff", letterSpacing: "-1px", position: "relative" }}>Quartier Rouge</h1>
        <div style={{ width: "60px", height: "3px", background: T.red, margin: "0 auto 18px", position: "relative" }} />
        <p style={{ margin: "0 0 36px", fontSize: "16px", color: T.textSec, fontStyle: "italic", position: "relative" }}>« Les meilleurs artistes magiques du monde, à portée de budget »</p>

        <div style={{ maxWidth: "520px", margin: "0 auto", position: "relative" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: T.textDim, fontSize: "16px" }}>🔍</span>
          <input type="text" placeholder="Rechercher un magicien, une spécialité..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: "100%", padding: "14px 14px 14px 46px", borderRadius: "12px", border: `1px solid ${T.border}`, fontSize: "15px", background: T.bgInput, color: T.textPrim, outline: "none", boxSizing: "border-box" }} />
        </div>
      </header>

      <div style={{ display: "flex", maxWidth: "1280px", margin: "0 auto", padding: "32px 24px", gap: "28px", alignItems: "flex-start" }}>
        <aside style={{ width: "260px", flexShrink: 0, background: T.bgSide, borderRadius: "16px", border: `1px solid ${T.border}`, padding: "24px", position: "sticky", top: "24px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 600, margin: "0 0 20px", color: T.textSec, letterSpacing: "2px", textTransform: "uppercase" }}>Filtres</h2>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", color: T.textSec }}>
              <input type="checkbox" checked={availableOnly} onChange={() => setAvailableOnly(!availableOnly)} style={{ width: "16px", height: "16px", accentColor: T.red }} />
              Disponibles uniquement
            </label>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 600, color: T.textDim, textTransform: "uppercase", letterSpacing: "1.5px" }}>Trier par</p>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: `1px solid ${T.border}`, fontSize: "13px", color: T.textSec, background: T.bgInput, cursor: "pointer" }}>
              <option value="rating">Meilleure note</option>
              <option value="reviews">Plus d'avis</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 600, color: T.textDim, textTransform: "uppercase", letterSpacing: "1.5px" }}>Budget max</p>
            <input type="range" min={0} max={20000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: "100%", accentColor: T.red }} />
            <p style={{ margin: "6px 0 0", fontSize: "13px", color: T.textSec, textAlign: "right" }}>≤ {maxPrice.toLocaleString("fr-BE")} €</p>
          </div>

          <div style={{ height: "1px", background: T.border, marginBottom: "20px" }} />

          <div style={{ marginBottom: "24px" }}>
            <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 600, color: T.textDim, textTransform: "uppercase", letterSpacing: "1.5px" }}>Origine</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {ALL_ORIGINS.map((o) => (
                <button key={o} onClick={() => toggleFilter(selectedOrigins, setSelectedOrigins, o)} style={filterPillStyle(selectedOrigins.includes(o))}>{o}</button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 600, color: T.textDim, textTransform: "uppercase", letterSpacing: "1.5px" }}>Spécialités</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {ALL_TAGS.map((t) => (
                <button key={t} onClick={() => toggleFilter(selectedTags, setSelectedTags, t)} style={filterPillStyle(selectedTags.includes(t))}>{t}</button>
              ))}
            </div>
          </div>

          {(selectedOrigins.length > 0 || selectedTags.length > 0 || availableOnly || maxPrice < 20000) && (
            <button onClick={() => { setSelectedOrigins([]); setSelectedTags([]); setAvailableOnly(false); setMaxPrice(20000); }} style={{ marginTop: "20px", width: "100%", padding: "8px", background: "transparent", border: `1px solid ${T.border}`, borderRadius: "8px", fontSize: "13px", color: T.textSec, cursor: "pointer" }}>
              Réinitialiser les filtres
            </button>
          )}
        </aside>

        <main style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <p style={{ margin: 0, fontSize: "14px", color: T.textSec }}>
              <strong style={{ color: T.red }}>{filtered.length}</strong> magicien{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: T.textDim }}>
              <p style={{ fontSize: "48px", marginBottom: "16px" }}>🪄</p>
              <p style={{ fontSize: "18px", fontStyle: "italic", color: T.textSec }}>Aucun magicien ne correspond à vos critères.</p>
              <p style={{ fontSize: "14px" }}>Même la magie a ses limites.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
              {filtered.map((m) => (
                <MagicianCard key={m.id} magician={m} onSelect={setSelectedMagician} />
              ))}
            </div>
          )}
        </main>
      </div>

      <MagicianModal magician={selectedMagician} onClose={() => setSelectedMagician(null)} />

      <footer style={{ textAlign: "center", padding: "40px 20px", borderTop: `1px solid ${T.border}`, color: T.textDim, fontSize: "13px", marginTop: "40px" }}>
        <p style={{ margin: "0 0 6px", color: T.redDim, letterSpacing: "3px", fontSize: "11px", textTransform: "uppercase" }}>Quartier Rouge</p>
        <p style={{ margin: 0 }}>© 2025 · Tous les magiciens sont de vrais professionnels (en principe)</p>
      </footer>
    </div>
  );
}
