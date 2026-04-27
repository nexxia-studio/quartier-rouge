import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";
import heroCover from "@/assets/hero-cover.jpg";
import perf1 from "@/assets/perf-1.jpg";
import perf2 from "@/assets/perf-2.jpg";
import perf3 from "@/assets/perf-3.jpg";
import perf4 from "@/assets/perf-4.jpg";
import perf5 from "@/assets/perf-5.jpg";
import perf6 from "@/assets/perf-6.jpg";

export const Route = createFileRoute("/")({
  component: App,
});

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "s01",
    label: "Danse Privée",
    description: "Canal Érotique – Spectacle intime au bord du canal",
    icon: "💃",
    category: "Danse",
    prices: { 15: 80, 30: 140, 60: 250 },
  },
  {
    id: "s02",
    label: "Lapdance",
    description: "Velvet Shadow – Danse rapprochée dans une ambiance tamisée",
    icon: "👯",
    category: "Danse",
    prices: { 15: 120, 30: 200, 60: 360 },
  },
  {
    id: "s03",
    label: "Chevauchée Amsterdam",
    description: "Cowgirl complète avec vue sur le client",
    icon: "🍑",
    category: "Danse",
    prices: { 15: 400, 30: 700, 60: 1200 },
  },
  {
    id: "s04",
    label: "Anal Red Light",
    description: "Pénétration anale sensuelle et progressive",
    icon: "🔞",
    category: "Sexe",
    prices: { 15: 60, 30: 100, 60: 180 },
  },
  {
    id: "s05",
    label: "Double Plaisir",
    description: "Double pénétration (doigts + jouet ou client + jouet)",
    icon: "🔥",
    category: "Sexe",
    prices: { 15: 150, 30: 260, 60: 460 },
  },
  {
    id: "s06",
    label: "69 Canal",
    description: "Position 69 prolongée avec jeux de langue.",
    icon: "👅",
    category: "Sexe",
    prices: { 15: 180, 30: 300, 60: 520 },
  },
  {
    id: "s07",
    label: "Dutch Deepthroat",
    description: "Plaisir manuel intense sans se soucier de votre plaisir",
    icon: "💋",
    category: "Sexe",
    prices: { 15: 200, 30: 340, 60: 600 },
  },
  {
    id: "s08",
    label: "Éjac Faciale Amsterdam",
    description: "Finitions faciales ou corps avec option avaler",
    icon: "💦",
    category: "Sexe",
    prices: { 15: 70, 30: 120, 60: 200 },
  },
  {
    id: "s09",
    label: "Chevauchée Amsterdam",
    description: "Cowgirl complète en équipe",
    icon: "👠",
    category: "Sexe à 3",
    prices: { 15: 350, 30: 600, 60: 1000 },
  },
  {
    id: "s10",
    label: "Trio Red Light",
    description: "Soirée en trio dans une suite privée du Quartier Rouge",
    icon: "🍒",
    category: "Sexe à 3",
    prices: { 15: 300, 30: 500, 60: 850 },
  },
] as const;

type Service = (typeof SERVICES)[number];
const SERVICES_MAP: Record<string, Service> = Object.fromEntries(SERVICES.map((s) => [s.id, s]));

type Performer = {
  id: number;
  name: string;
  alias: string;
  origin: string;
  location: string;
  photo: string;
  available: boolean;
  rating: number;
  reviews: number;
  badge: string;
  tags: string[];
  serviceIds: string[];
  bio: string;
  warning: string | null;
};

const PERFORMERS: Performer[] = [
  {
    id: 1,
    name: "Lola Velvet",
    alias: "La Reine du Canal Érotique",
    origin: "Espagnole",
    location: "Amsterdam – Vitrine Oudezijds Achterburgwal",
    photo: perf1,
    available: true,
    rating: 4.9,
    reviews: 312,
    badge: "⭐ Best-seller",
    tags: ["Sensualité latine", "GFE", "Domination douce"],
    serviceIds: ["s01", "s03", "s04", "s05", "s07"],
    bio: "Formée aux cabarets de Séville avant de poser ses talons à Amsterdam, Lola règne sur sa vitrine du Canal depuis 2018. Une présence magnétique, un sens du rythme rare et une capacité à mettre n'importe quel client à l'aise dès la porte refermée.",
    warning: "⚠️ Pas de baisers profonds sans hygiène irréprochable.",
  },
  {
    id: 2,
    name: "Vicky Vorace",
    alias: "La Belge Sans Tabou",
    origin: "Belge",
    location: "Liège – Quartier Cathédrale Nord",
    photo: perf2,
    available: true,
    rating: 3.2,
    reviews: 47,
    badge: "💶 Petit budget",
    tags: ["Débutante motivée", "Tarifs doux", "Local"],
    serviceIds: ["s01", "s04", "s08"],
    bio: "Vicky débarque dans le métier après 2 ans en peep-show à Bruxelles. Les avis sont mitigés mais le tarif est imbattable. Elle apporte sa propre playlist, parfois un peu datée.",
    warning: "⚠️ Pas de remboursement en cas de finition prématurée.",
  },
  {
    id: 3,
    name: "Ruby Ride",
    alias: "L'Exotique de Bruxelles",
    origin: "Pakistanaise",
    location: "Bruxelles – Quartier Nord",
    photo: perf3,
    available: true,
    rating: 4.7,
    reviews: 189,
    badge: "🔥 Sensation",
    tags: ["Massage tantrique", "GFE", "VIP"],
    serviceIds: ["s02", "s03", "s01"],
    bio: "Ruby mêle l'art du massage oriental à un sens aigu du spectacle. Réputée pour ses lapdances envoûtantes et son contact peau à peau d'une douceur rare. Discrétion absolue garantie.",
    warning: null,
  },
  {
    id: 4,
    name: "Lola Deepthroat",
    alias: "L'Américaine VIP",
    origin: "Américaine",
    location: "Paris / Lyon – Hôtels 5★",
    photo: perf4,
    available: false,
    rating: 4.1,
    reviews: 98,
    badge: "💼 High-class",
    tags: ["Escorte de luxe", "Soirées privées", "Trio"],
    serviceIds: ["s09", "s10", "s02", "s01"],
    bio: "Ex-modèle reconvertie dans l'accompagnement haut de gamme, Lola accompagne dîners d'affaires, soirées privées et week-ends en suite. Anglais et français parfaits, parle aussi business.",
    warning: "⚠️ Indisponible en août (vacances à Mykonos).",
  },
  {
    id: 5,
    name: "Scarlett Squirt",
    alias: "La Rouquine de Galway",
    origin: "Irlandaise",
    location: "Dublin / Tournées Europe",
    photo: perf5,
    available: true,
    rating: 4.8,
    reviews: 234,
    badge: "🍀 Coup de cœur",
    tags: ["Squirt", "Fétichisme soft", "Show duo"],
    serviceIds: ["s04", "s05", "s06"],
    bio: "Star montante de la scène irlandaise, Scarlett s'est fait un nom grâce à ses shows mouillés et son énergie communicative. Sait recevoir comme elle sait se déplacer.",
    warning: "⚠️ Prévoir une serviette. Sérieusement.",
  },
  {
    id: 6,
    name: "Kira Kink",
    alias: "La Maîtresse de Tokyo",
    origin: "Japonaise",
    location: "Tokyo / Tournées internationales",
    photo: perf6,
    available: true,
    rating: 5.0,
    reviews: 501,
    badge: "🏆 Premium",
    tags: ["BDSM", "Shibari", "Domination", "Soirées privées"],
    serviceIds: ["s03", "s02", "s07", "s09"],
    bio: "Formée 8 ans dans les clubs spécialisés de Shinjuku, Kira est une référence mondiale du shibari et de la domination soft. Sessions sur mesure, cadre safe, débutants bienvenus.",
    warning: null,
  },
];

const ALL_TAGS = [...new Set(PERFORMERS.flatMap((m) => m.tags))].sort();
const ALL_ORIGINS = [...new Set(PERFORMERS.map((m) => m.origin))].sort();
const DURATIONS = [
  { minutes: 15 as const, label: "15 min" },
  { minutes: 30 as const, label: "30 min" },
  { minutes: 60 as const, label: "1 heure" },
];

const T = {
  bg: "#0d0d0d",
  bgCard: "#161616",
  bgSide: "#111111",
  bgInput: "#1a1a1a",
  border: "#2a2a2a",
  borderHot: "#c0000a",
  red: "#c0000a",
  redBright: "#e8000f",
  redDim: "#7a0006",
  redGlow: "rgba(192,0,10,0.18)",
  textPrim: "#f0e6e6",
  textSec: "#8a7070",
  textDim: "#4a3838",
  gold: "#c8913a",
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

function PerformerModal({ performer, onClose }: { performer: Performer | null; onClose: () => void }) {
  const [selectedDuration, setSelectedDuration] = useState<15 | 30 | 60>(30);
  if (!performer) return null;
  const performerServices = performer.serviceIds.map((id) => SERVICES_MAP[id]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.bgCard,
          border: `1px solid ${T.border}`,
          borderRadius: "20px",
          maxWidth: "680px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          fontFamily: "'Georgia', serif",
        }}
      >
        <div style={{ position: "relative", height: "260px", borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
          <img
            src={performer.photo}
            alt={performer.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
              filter: "brightness(0.75) saturate(0.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(5,0,0,0.95) 0%, transparent 55%)",
            }}
          />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: T.red }} />
          <div style={{ position: "absolute", bottom: "24px", left: "28px", color: T.textPrim }}>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: T.textSec,
              }}
            >
              {performer.origin} · {performer.location}
            </p>
            <h2 style={{ margin: "4px 0 2px", fontSize: "28px", fontWeight: "bold", color: "#fff" }}>
              {performer.name}
            </h2>
            <p style={{ margin: 0, fontSize: "15px", fontStyle: "italic", color: T.textSec }}>« {performer.alias} »</p>
          </div>
          {!performer.available && (
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#3a0000",
                border: `1px solid ${T.redDim}`,
                color: T.red,
                borderRadius: "999px",
                padding: "6px 16px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              INDISPONIBLE
            </div>
          )}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              background: "rgba(0,0,0,0.5)",
              border: `1px solid ${T.border}`,
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              color: T.textSec,
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <Stars rating={performer.rating} />
            <span style={{ fontSize: "13px", color: T.textSec }}>
              {performer.rating}/5 · {performer.reviews} avis
            </span>
            <span
              style={{
                marginLeft: "auto",
                background: "#1a1000",
                border: `1px solid #3a2800`,
                color: T.gold,
                borderRadius: "999px",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {performer.badge}
            </span>
          </div>

          <p style={{ fontSize: "15px", lineHeight: 1.7, color: T.textSec, marginBottom: "20px" }}>{performer.bio}</p>

          {performer.warning && (
            <div
              style={{
                background: "#1a0000",
                border: `1px solid ${T.redDim}`,
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "13px",
                color: "#c06060",
                marginBottom: "24px",
              }}
            >
              {performer.warning}
            </div>
          )}

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
            {performer.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#1a0a0a",
                  border: `1px solid ${T.border}`,
                  borderRadius: "999px",
                  padding: "4px 12px",
                  fontSize: "12px",
                  color: T.textSec,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            style={{
              height: "1px",
              background: `linear-gradient(to right, ${T.red}, transparent)`,
              marginBottom: "24px",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 600,
                margin: 0,
                color: T.textSec,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Tarifs & Prestations
            </h3>
            <div
              style={{
                display: "flex",
                gap: "4px",
                background: "#0d0d0d",
                borderRadius: "10px",
                padding: "4px",
                border: `1px solid ${T.border}`,
              }}
            >
              {DURATIONS.map((d) => (
                <button
                  key={d.minutes}
                  onClick={() => setSelectedDuration(d.minutes)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "7px",
                    border: "none",
                    background: selectedDuration === d.minutes ? T.red : "transparent",
                    color: selectedDuration === d.minutes ? "#fff" : T.textSec,
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                <th
                  style={{
                    padding: "8px 0",
                    textAlign: "left",
                    fontSize: "11px",
                    color: T.textDim,
                    fontWeight: 500,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Service
                </th>
                <th
                  style={{
                    padding: "8px 0",
                    textAlign: "center",
                    fontSize: "11px",
                    color: T.textDim,
                    fontWeight: 500,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Catégorie
                </th>
                <th
                  style={{
                    padding: "8px 0",
                    textAlign: "right",
                    fontSize: "11px",
                    color: T.red,
                    fontWeight: 500,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {DURATIONS.find((d) => d.minutes === selectedDuration)?.label}
                </th>
              </tr>
            </thead>
            <tbody>
              {performerServices.map((s) => (
                <tr key={s.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: "12px 0", fontSize: "14px", color: T.textPrim }}>
                    <span style={{ marginRight: "8px" }}>{s.icon}</span>
                    {s.label}
                  </td>
                  <td style={{ padding: "12px 0", textAlign: "center" }}>
                    <span
                      style={{
                        background: "#1a0a0a",
                        border: `1px solid ${T.border}`,
                        borderRadius: "999px",
                        padding: "2px 8px",
                        fontSize: "11px",
                        color: T.textSec,
                      }}
                    >
                      {s.category}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 0 12px 16px",
                      textAlign: "right",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: T.red,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.prices[selectedDuration].toLocaleString("fr-BE")} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "28px", display: "flex", gap: "12px" }}>
            <button
              disabled={!performer.available}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                background: performer.available ? T.red : "#2a1a1a",
                color: performer.available ? "#fff" : T.textDim,
                fontSize: "15px",
                fontWeight: 600,
                cursor: performer.available ? "pointer" : "not-allowed",
                fontFamily: "'Georgia', serif",
                boxShadow: performer.available ? `0 0 24px ${T.redGlow}` : "none",
              }}
            >
              {performer.available ? "🔥 Réserver maintenant" : "Indisponible actuellement"}
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "14px 20px",
                borderRadius: "10px",
                border: `1px solid ${T.border}`,
                background: "transparent",
                fontSize: "15px",
                cursor: "pointer",
                color: T.textSec,
                fontFamily: "'Georgia', serif",
              }}
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PerformerCard({ performer, onSelect }: { performer: Performer; onSelect: (m: Performer) => void }) {
  const minPrice = Math.min(...performer.serviceIds.map((id) => SERVICES_MAP[id].prices[15]));

  return (
    <div
      onClick={() => onSelect(performer)}
      style={{
        background: T.bgCard,
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, border-color 0.2s",
        border: `1px solid ${T.border}`,
        fontFamily: "'Georgia', serif",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = T.redDim;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = T.border;
      }}
    >
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img
          src={performer.photo}
          alt={performer.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
            filter: "brightness(0.7) saturate(0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(5,0,0,0.92) 0%, transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: performer.available ? "rgba(0,60,20,0.85)" : "rgba(60,0,0,0.85)",
            border: `1px solid ${performer.available ? "#1a5a30" : T.redDim}`,
            color: performer.available ? "#4ade80" : T.red,
            borderRadius: "999px",
            padding: "4px 10px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          {performer.available ? "● DISPONIBLE" : "● INDISPONIBLE"}
        </div>
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "rgba(0,0,0,0.6)",
            border: `1px solid ${T.border}`,
            color: T.gold,
            borderRadius: "999px",
            padding: "4px 10px",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {performer.badge}
        </div>
        <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
          <p
            style={{ margin: 0, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: T.textSec }}
          >
            {performer.origin}
          </p>
          <h3 style={{ margin: "2px 0 0", fontSize: "17px", fontWeight: "bold", color: "#fff" }}>{performer.name}</h3>
        </div>
      </div>

      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ margin: "0 0 8px", fontSize: "13px", fontStyle: "italic", color: T.textSec }}>
          « {performer.alias} »
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <Stars rating={performer.rating} />
          <span style={{ fontSize: "12px", color: T.textDim }}>({performer.reviews})</span>
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
          {performer.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                background: "#1a0a0a",
                border: `1px solid ${T.border}`,
                borderRadius: "999px",
                padding: "2px 8px",
                fontSize: "11px",
                color: T.textSec,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: T.textDim,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              À partir de
            </p>
            <p style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: T.red }}>
              {minPrice.toLocaleString("fr-BE")} €
            </p>
          </div>
          <button
            style={{
              background: "transparent",
              color: T.red,
              border: `1px solid ${T.redDim}`,
              borderRadius: "10px",
              padding: "10px 16px",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "'Georgia', serif",
            }}
          >
            Voir →
          </button>
        </div>
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

function App() {
  const [selectedPerformer, setSelectedPerformer] = useState<Performer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const filtered = useMemo(() => {
    const minPriceOf = (m: Performer) => Math.min(...m.serviceIds.map((id) => SERVICES_MAP[id].prices[15]));

    let list = PERFORMERS.filter((m) => {
      const q = searchQuery.toLowerCase();
      if (
        q &&
        !m.name.toLowerCase().includes(q) &&
        !m.alias.toLowerCase().includes(q) &&
        !m.tags.some((t) => t.toLowerCase().includes(q))
      )
        return false;
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
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    cursor: "pointer",
    border: "1px solid",
    background: active ? T.red : "transparent",
    color: active ? "#fff" : T.textSec,
    borderColor: active ? T.red : T.border,
    transition: "all 0.15s",
  });

  const activeFilterCount =
    selectedOrigins.length + selectedTags.length + (availableOnly ? 1 : 0) + (maxPrice < 20000 ? 1 : 0);

  const FiltersPanel = (
    <>
      <h2
        style={{
          fontSize: "13px",
          fontWeight: 600,
          margin: "0 0 20px",
          color: T.textSec,
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Filtres
      </h2>

      <div style={{ marginBottom: "24px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            fontSize: "14px",
            color: T.textSec,
          }}
        >
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={() => setAvailableOnly(!availableOnly)}
            style={{ width: "16px", height: "16px", accentColor: T.red }}
          />
          Disponibles uniquement
        </label>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            margin: "0 0 10px",
            fontSize: "11px",
            fontWeight: 600,
            color: T.textDim,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          Trier par
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "8px",
            border: `1px solid ${T.border}`,
            fontSize: "13px",
            color: T.textSec,
            background: T.bgInput,
            cursor: "pointer",
          }}
        >
          <option value="rating">Meilleure note</option>
          <option value="reviews">Plus d'avis</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            margin: "0 0 10px",
            fontSize: "11px",
            fontWeight: 600,
            color: T.textDim,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          Budget max
        </p>
        <input
          type="range"
          min={0}
          max={20000}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{ width: "100%", accentColor: T.red }}
        />
        <p style={{ margin: "6px 0 0", fontSize: "13px", color: T.textSec, textAlign: "right" }}>
          ≤ {maxPrice.toLocaleString("fr-BE")} €
        </p>
      </div>

      <div style={{ height: "1px", background: T.border, marginBottom: "20px" }} />

      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            margin: "0 0 10px",
            fontSize: "11px",
            fontWeight: 600,
            color: T.textDim,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          Origine
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {ALL_ORIGINS.map((o) => (
            <button
              key={o}
              onClick={() => toggleFilter(selectedOrigins, setSelectedOrigins, o)}
              style={filterPillStyle(selectedOrigins.includes(o))}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p
          style={{
            margin: "0 0 10px",
            fontSize: "11px",
            fontWeight: 600,
            color: T.textDim,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          Spécialités
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {ALL_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => toggleFilter(selectedTags, setSelectedTags, t)}
              style={filterPillStyle(selectedTags.includes(t))}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={() => {
            setSelectedOrigins([]);
            setSelectedTags([]);
            setAvailableOnly(false);
            setMaxPrice(20000);
          }}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            background: "transparent",
            border: `1px solid ${T.border}`,
            borderRadius: "8px",
            fontSize: "13px",
            color: T.textSec,
            cursor: "pointer",
          }}
        >
          Réinitialiser les filtres
        </button>
      )}
    </>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Georgia', serif" }}>
      <header
        style={{
          position: "relative",
          minHeight: isMobile ? "78vh" : "82vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `1px solid ${T.border}`,
          padding: isMobile ? "40px 20px" : "60px 40px",
          textAlign: "center",
          overflow: "hidden",
          background: "#080808",
        }}
      >
        <video
          ref={(el) => {
            if (!el) return;
            el.muted = true;
            const tryPlay = () => el.play().catch(() => {});
            tryPlay();
            el.addEventListener("loadedmetadata", tryPlay, { once: true });
          }}
          src={heroVideoAsset.url}
          poster={heroCover}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // @ts-ignore
          disableRemotePlayback
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.85) 100%)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: isMobile ? "16px" : "24px",
            right: isMobile ? "16px" : "24px",
            background: "rgba(192,0,10,0.92)",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            padding: "6px 10px",
            borderRadius: "4px",
            zIndex: 3,
          }}
        >
          18+ ADULTS ONLY
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "780px" }}>
          <p
            style={{
              margin: "0 0 14px",
              fontSize: isMobile ? "10px" : "11px",
              letterSpacing: isMobile ? "3px" : "5px",
              textTransform: "uppercase",
              color: "#e8d8d8",
            }}
          >
            Catalogue non-Officiel <br />par ta Boîte préférée 📦
            <br />Saison 2026
          </p>
          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "clamp(42px, 11vw, 96px)",
              fontWeight: "bold",
              lineHeight: 1.02,
              color: "#fff",
              letterSpacing: "-1.5px",
              textShadow: "0 4px 24px rgba(0,0,0,0.85)",
            }}
          >
            Quartier Rouge
          </h1>
          <div style={{ width: "70px", height: "3px", background: T.red, margin: "0 auto 22px" }} />
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? "15px" : "18px",
              color: "#f0e6e6",
              fontStyle: "italic",
              padding: "0 8px",
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            « Les plus belles vitrines du Quartier Rouge, derrière une seule porte »
          </p>
        </div>
      </header>

      {/* CTA section */}
      <section
        style={{
          background: T.bgSide,
          borderBottom: `1px solid ${T.border}`,
          padding: isMobile ? "28px 20px" : "40px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: T.textDim,
              fontSize: "16px",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Rechercher une professionnelle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 14px 14px 46px",
              borderRadius: "12px",
              border: `1px solid ${T.border}`,
              fontSize: "15px",
              background: T.bgInput,
              color: T.textPrim,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "10px" : "16px",
            marginTop: "18px",
            fontSize: isMobile ? "12px" : "13px",
            color: T.textSec,
          }}
        >
          <span>🔒 100% Discret</span>
          <span>✓ Profils vérifiés</span>
          <span>💸 Tarifs transparents</span>
        </div>
      </section>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "20px 16px" : "32px 24px",
          gap: isMobile ? "16px" : "28px",
          alignItems: "flex-start",
        }}
      >
        {/* Mobile: filter button */}
        {isMobile && (
          <button
            onClick={() => setFiltersOpen(true)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              background: T.bgSide,
              border: `1px solid ${T.border}`,
              color: T.textPrim,
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'Georgia', serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            ⚙️ Filtres{" "}
            {activeFilterCount > 0 && (
              <span
                style={{
                  background: T.red,
                  color: "#fff",
                  borderRadius: "999px",
                  padding: "1px 8px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        {/* Desktop sidebar */}
        {!isMobile && (
          <aside
            style={{
              width: "260px",
              flexShrink: 0,
              background: T.bgSide,
              borderRadius: "16px",
              border: `1px solid ${T.border}`,
              padding: "24px",
              position: "sticky",
              top: "24px",
            }}
          >
            {FiltersPanel}
          </aside>
        )}

        <main style={{ flex: 1, width: "100%", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <p style={{ margin: 0, fontSize: "14px", color: T.textSec }}>
              <strong style={{ color: T.red }}>{filtered.length}</strong> professionnelle
              {filtered.length !== 1 ? "s" : ""} trouvée{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: T.textDim }}>
              <p style={{ fontSize: "48px", marginBottom: "16px" }}>🌹</p>
              <p style={{ fontSize: "18px", fontStyle: "italic", color: T.textSec }}>
                Aucune professionnelle ne correspond à vos critères.
              </p>
              <p style={{ fontSize: "14px" }}>Essayez d'élargir vos filtres.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
                gap: isMobile ? "16px" : "24px",
              }}
            >
              {filtered.map((m) => (
                <PerformerCard key={m.id} performer={m} onSelect={setSelectedPerformer} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      {isMobile && filtersOpen && (
        <div
          onClick={() => setFiltersOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 1100,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(86vw, 340px)",
              height: "100%",
              overflowY: "auto",
              background: T.bgSide,
              borderLeft: `1px solid ${T.border}`,
              padding: "24px",
              fontFamily: "'Georgia', serif",
              animation: "slideIn 0.2s ease-out",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
              <button
                onClick={() => setFiltersOpen(false)}
                style={{
                  background: "transparent",
                  border: `1px solid ${T.border}`,
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  color: T.textSec,
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ✕
              </button>
            </div>
            {FiltersPanel}
          </div>
        </div>
      )}

      <PerformerModal performer={selectedPerformer} onClose={() => setSelectedPerformer(null)} />

      <footer
        style={{
          textAlign: "center",
          padding: "40px 20px",
          borderTop: `1px solid ${T.border}`,
          color: T.textDim,
          fontSize: "13px",
          marginTop: "40px",
        }}
      >
        <p
          style={{
            margin: "0 0 6px",
            color: T.redDim,
            letterSpacing: "3px",
            fontSize: "11px",
            textTransform: "uppercase",
          }}
        >
          Quartier Rouge by Boite 📦
        </p>
        <p style={{ margin: 0 }}>© 2025 · Plateforme réservée aux adultes (18+) · Discrétion et respect garantis</p>
      </footer>
    </div>
  );
}
