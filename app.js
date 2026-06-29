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

// Catalogue simplifié pour éviter toute erreur de syntaxe
const sessionCatalog = {
  technique_base: {
    title: "Technique/tactique latéral · Bases",
    type: "Terrain",
    desc: "Contrôle orienté ligne, passes courtes, 1v1 défensif simple, overlaps et centres à blanc.",
    duration: "75 min",
    schema: "Couloir gauche :\nLG en bas, ailier au milieu, zone de centre en haut.",
    steps: [
      "Placer LG en bas du couloir, ailier avec ballon au milieu.",
      "LG se propose en solution courte en retrait.",
      "Sur signal, LG lance une course d'overlap derrière l'ailier.",
      "Ailier fixe le défenseur puis sert LG dans le couloir.",
      "LG contrôle et centre vers la surface."
    ],
    cues: [
      "Course d'overlap à pleine vitesse.",
      "Lever la tête avant de centrer.",
      "Centres tendus, pas trop hauts."
    ]
  },
  force_globale: {
    title: "Force globale en salle",
    type: "Salle",
    desc: "Circuit squats, fentes, pompes, tractions, gainage.",
    duration: "45–60 min",
    schema: "Salle :\nPlusieurs postes en circuit (squat, fente, pompe, traction, gainage).",
    steps: [
      "Échauffement articulaire complet.",
      "Enchaîner 4 à 5 exercices en circuit.",
      "30 à 40 secondes de travail, 20 secondes de repos.",
      "Faire 2 à 3 tours du circuit.",
      "Finir par des étirements légers."
    ],
    cues: [
      "Priorité à la technique.",
      "Respiration régulière.",
      "Mouvements dynamiques mais contrôlés."
    ]
  },
  endurance_base: {
    title: "Endurance · Disguised fitness",
    type: "Terrain",
    desc: "Montées/descente du couloir avec ballon.",
    duration: "60 min",
    schema: "Couloir :\nTrois cônes bas, milieu, haut pour varier les distances.",
    steps: [
      "Placer trois cônes dans le couloir.",
      "Conduire le ballon jusqu'au premier cône puis revenir.",
      "Même chose vers le deuxième puis le troisième.",
      "Répéter plusieurs séries avec peu de repos.",
      "Varier les rythmes de course."
    ],
    cues: [
      "Conduite propre même en fatigue.",
      "Regarder le terrain régulièrement.",
      "Posture légèrement penchée vers l'avant."
    ]
  },
  technique_complexe: {
    title: "Technique/tactique latéral · Complexe",
    type: "Terrain",
    desc: "Sorties de pressing, centres en course.",
    duration: "75 min",
    schema: "Zone latérale avec un ou deux joueurs qui mettent la pression sur LG.",
    steps: [
      "Placer LG près de la ligne avec ballon.",
      "Ajouter un joueur en opposition légère.",
      "LG utilise une feinte pour sortir de la pression.",
      "Après la sortie, jouer une passe ou un centre.",
      "Répéter en travaillant les deux pieds."
    ],
    cues: [
      "Protéger le ballon avec le corps.",
      "Toujours prévoir une passe de sécurité.",
      "Varier les feintes et changements de direction."
    ]
  },
  force_explosivite: {
    title: "Force et explosivité",
    type: "Salle",
    desc: "Fentes unilatérales, step-ups, sauts, sprints courts.",
    duration: "45–60 min",
    schema: "Circuit explosif jambes + tronc.",
    steps: [
      "Échauffer hanches et genoux.",
      "Travailler chaque jambe séparément.",
      "Ajouter quelques séries de sauts explosifs.",
      "Finir par des sprints de 10 à 20 m.",
      "Inclure un exercice de gainage anti-rotation."
    ],
    cues: [
      "Explosivité sur chaque répétition.",
      "Volume modéré pour garder du jus pour le terrain.",
      "Qualité d'exécution avant quantité."
    ]
  },
  endurance_intervalles: {
    title: "Endurance · Intervalles couloir",
    type: "Terrain",
    desc: "Intervalles montées/descente avec ballon.",
    duration: "60 min",
    schema: "Couloir :\nZone de départ en bas et zone d'arrivée en haut.",
    steps: [
      "Définir une zone de départ et une zone d'arrivée.",
      "Enchaîner montées et descentes pendant 30 à 40 secondes.",
      "Repos 20 à 30 secondes.",
      "Répéter 6 à 10 séries.",
      "Varier la conduite de balle."
    ],
    cues: [
      "Rythme régulier.",
      "Conduite de balle maîtrisée.",
      "Bien gérer la récupération."
    ]
  },
  tactique_match: {
    title: "Tactique match · Latéral gauche",
    type: "Terrain",
    desc: "Jeux réduits, ligne défensive, timing des montées.",
    duration: "75 min",
    schema: "Mini-match sur demi-terrain avec focus sur le côté gauche.",
    steps: [
      "Organiser un jeu réduit en sollicitant le côté gauche.",
      "Donner des consignes spécifiques à LG.",
      "Arrêter le jeu pour corriger la position si besoin.",
      "Filmer si possible pour débrief ensuite.",
      "Fixer un ou deux objectifs précis pour LG."
    ],
    cues: [
      "Alignement avec la ligne défensive.",
      "Monter quand il y a couverture.",
      "Communiquer avec le central et le milieu."
    ]
  },
  force_max: {
    title: "Force max + explosivité",
    type: "Salle",
    desc: "Travail de force plus lourd + sauts.",
    duration: "45–60 min"
  },
  endurance_retours: {
    title: "Endurance · Retours défensifs",
    type: "Terrain",
    desc: "Montées offensives simulées + retours en diagonale.",
    duration: "60 min",
    schema: "Couloir + diagonale entre zone offensive et zone défensive.",
    steps: [
      "Placer une zone offensive haute et une zone défensive centrale.",
      "LG monte avec ballon jusqu'à la zone offensive.",
      "Sur perte simulée, sprinte en diagonale vers la zone défensive.",
      "Répéter plusieurs fois avec peu de repos.",
      "Ajouter un adversaire pour rendre le retour plus réaliste."
    ],
    cues: [
      "Retour à pleine intensité.",
      "Orientation du corps vers le jeu.",
      "Maintenir l'intensité malgré la fatigue."
    ]
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
    let schema = "";
    let steps = [];
    let cues = [];

    if (catalogItem) {
      title = catalogItem.title;
      type = catalogItem.type;
      desc = catalogItem.desc;
      duration = catalogItem.duration;
      schema = catalogItem.schema || "";
      steps = catalogItem.steps || [];
      cues = catalogItem.cues || [];
    }

    let stepsHtml = "";
    if (steps.length) {
      stepsHtml = `<ol class="session-steps">${steps.map(s => `<li>${s}</li>`).join("")}</ol>`;
    }

    let cuesHtml = "";
    if (cues.length) {
      cuesHtml = `<ul class="session-cues">${cues.map(c => `<li>${c}</li>`).join("")}</ul>`;
    }

    card.innerHTML = `
      <div class="session-meta">
        <span>${session.jour}</span>
        <span>${duration}</span>
      </div>
      <div class="session-title">${title}</div>
      <div class="session-type">${type}</div>
      <div class="session-desc">${desc}</div>
      ${schema ? `<div class="session-schema"><strong>Schéma :</strong>
${schema}</div>` : ""}
      ${stepsHtml}
      ${cuesHtml}
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
