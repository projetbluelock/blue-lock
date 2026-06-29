const player = {
  taille: 1.70,
  poids: 56,
  niveau: "debutant_loisirs",
  poste: "latéral_gauche",
  pied_fort: "droit",
  point_fort: "vitesse_explosivite",
  acces_salle: true
};

const phaseSummaries = {
  base: {
    title: "Phase 1 · Bases (0–2 mois)",
    text: "Poser les fondations : technique simple, 1v1 défensif, endurance générale et circuit de force globale en salle."
  },
  intensif: {
    title: "Phase 2 · Intensif (2–4 mois)",
    text: "Augmenter l'intensité : courses répétées dans le couloir, duels plus complexes, force/explosivité ciblée jambes et tronc."
  },
  match: {
    title: "Phase 3 · Match player (4–6 mois)",
    text: "Devenir décisif en match : situations tactiques, retours défensifs, gestion de la fatigue et micro-détails de poste."
  }
};

const sessionCatalog = {
  technique_base: {
    title: "Technique/tactique latéral · Bases",
    type: "Terrain",
    desc: "Contrôle orienté ligne, passes courtes, 1v1 défensif simple, overlaps + centres à blanc.",
    duration: "75 min"
  },
  force_globale: {
    title: "Force globale en salle",
    type: "Salle",
    desc: "Circuit squats/fentes, pompes, tractions, gainage, petits sauts.",
    duration: "45–60 min"
  },
  endurance_base: {
    title: "Endurance · Disguised fitness",
    type: "Terrain",
    desc: "Drills avec ballon, courses variées, montées/descente du couloir en continu.",
    duration: "60 min"
  },

  technique_complexe: {
    title: "Technique/tactique latéral · Complexe",
    type: "Terrain",
    desc: "Centres en course, 1v1 avec changements de direction, sorties de pressing pied droit/pied gauche.",
    duration: "75 min"
  },
  force_explosivite: {
    title: "Force & explosivité en salle",
    type: "Salle",
    desc: "Fentes unilatérales, step-ups, sauts, sprints 10–20 m, core anti-rotation.",
    duration: "45–60 min"
  },
  endurance_intervalles: {
    title: "Endurance · Intervalles couloir",
    type: "Terrain",
    desc: "Intervalles 30–40 s d'effort / 20–30 s de récup avec ballon dans le couloir.",
    duration: "60 min"
  },

  tactique_match: {
    title: "Tactique match · Latéral gauche",
    type: "Terrain",
    desc: "Jeux réduits, ligne défensive, pressing coordonné, timing des montées et des retours.",
    duration: "75 min"
  },
  force_max: {
    title: "Force max + explosivité",
    type: "Salle",
    desc: "Squats/fentes plus lourds (si technique ok), travail de force max en séries courtes + sauts.",
    duration: "45–60 min"
  },
  endurance_retours: {
    title: "Endurance · Retours défensifs",
    type: "Terrain",
    desc: "Montées offensives simulées + retours défensifs en diagonale, gestion de la fatigue.",
    duration: "60 min"
  }
};

const plans = {
  base: [
    { jour: "Mardi", key: "technique_base" },
    { jour: "Jeudi", key: "force_globale" },
    { jour: "Samedi", key: "endurance_base" },
    { jour: "Dimanche", key: "match" }
  ],
  intensif: [
    { jour: "Mardi", key: "technique_complexe" },
    { jour: "Jeudi", key: "force_explosivite" },
    { jour: "Samedi", key: "endurance_intervalles" },
    { jour: "Dimanche", key: "match" }
  ],
  match: [
    { jour: "Mardi", key: "tactique_match" },
    { jour: "Jeudi", key: "force_max" },
    { jour: "Samedi", key: "endurance_retours" },
    { jour: "Dimanche", key: "match" }
  ]
};

function renderPhaseSummary(phaseKey) {
  const summaryEl = document.getElementById("phase-summary");
  const data = phaseSummaries[phaseKey];
  if (!data) {
    summaryEl.innerHTML = "";
    return;
  }
  summaryEl.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.text}</p>
  `;
}

function renderWeek(phaseKey, weekNumber) {
  const container = document.getElementById("sessions");
  container.innerHTML = "";

  const sessions = plans[phaseKey] || [];
  sessions.forEach((session, index) => {
    const catalogItem = sessionCatalog[session.key];
    const doneKey = `week_${weekNumber}_phase_${phaseKey}_session_${index}`;
    const done = localStorage.getItem(doneKey) === "1";

    const card = document.createElement("article");
    card.className = "session-card";

    let title = "Match";
    let type = "Match";
    let desc = "Appliquer le travail de la semaine en match, avec focus sur la position et les choix de jeu.";
    let duration = "90 min";

    if (catalogItem) {
      title = catalogItem.title;
      type = catalogItem.type;
      desc = catalogItem.desc;
      duration = catalogItem.duration;
    }

    card.innerHTML = `
      <div class="session-meta">
        <span>${session.jour}</span>
        <span>${duration}</span>
      </div>
      <div class="session-title">${title}</div>
      <div class="session-type">${type}</div>
      <div class="session-desc">${desc}</div>
      <div class="session-actions">
        <button class="session-done-btn" data-key="${doneKey}">
          ${done ? "Séance faite ✔" : "Marquer comme faite"}
        </button>
        <span class="session-status ${done ? "done" : ""}">
          ${done ? "Suivi : cette séance est cochée" : "Suivi : non cochée"}
        </span>
      </div>
    `;

    container.appendChild(card);
  });

  container.querySelectorAll(".session-done-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      const alreadyDone = localStorage.getItem(key) === "1";
      localStorage.setItem(key, alreadyDone ? "0" : "1");
      renderWeek(phaseKey, weekNumber);
    });
  });
}

function initApp() {
  const phaseSelect = document.getElementById("phase-select");
  const weekInput = document.getElementById("week-input");
  const generateBtn = document.getElementById("generate-btn");

  generateBtn.addEventListener("click", () => {
    const phaseKey = phaseSelect.value;
    const weekNumber = parseInt(weekInput.value, 10) || 1;
    renderPhaseSummary(phaseKey);
    renderWeek(phaseKey, weekNumber);
  });

  renderPhaseSummary("base");
  renderWeek("base", 1);
}

document.addEventListener("DOMContentLoaded", initApp);
