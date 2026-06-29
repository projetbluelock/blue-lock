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

// Schémas inspirés des éditeurs de tactiques (type planet.training) mais simplifiés en texte pour mobile
const sessionCatalog = {
  technique_base: {
    title: "Technique/tactique latéral · Bases",
    type: "Terrain",
    desc: "Contrôle orienté ligne, passes courtes, 1v1 défensif simple, overlaps + centres à blanc.",
    duration: "75 min",
    schema: `Couloir gauche (vue simplifiée):

[But]-----------------------------
        A1           Cx
 LG

LG = latéral gauche, A1 = ailier, Cx = zone de centre.`,
    steps: [
      "Placer LG en bas du couloir, ailier A1 au milieu du couloir avec ballon.",
      "LG se propose en solution courte (passe en retrait) pour habituer le lien avec A1.",
      "Sur signal, LG déclenche une course d'overlap derrière A1 dans le couloir.",
      "A1 fixe le défenseur, puis joue la passe dans le timing vers LG.",
      "LG contrôle orienté vers le but et centre vers point de penalty / second poteau."
    ],
    cues: [
      "Course d'overlap à pleine vitesse, pas en trottinant.",
      "LG regarde le terrain avant de recevoir (scanner).",
      "Centre tendu, éviter les ballons trop hauts en cloche."
    ]
  },
  force_globale: {
    title: "Force globale en salle",
    type: "Salle",
    desc: "Circuit squats/fentes, pompes, tractions, gainage, petits sauts.",
    duration: "45–60 min",
    schema: `Disposition salle:

[Squat]  [Fentes]  [Pompes]  [Tractions]  [Gainage]
Enchaîner les ateliers en circuit (30–40 s par exo).`,
    steps: [
      "Échauffer articulations (chevilles, genoux, hanches, épaules).",
      "Enchaîner 4–5 exercices : squats, fentes, pompes, tractions, gainage.",
      "Temps de travail court (30–40 s) + 20 s de récupération.",
      "Faire 2–3 tours de circuit selon la forme du jour.",
      "Finir par quelques étirements légers des jambes et du dos."
    ],
    cues: [
      "Priorité à la bonne technique plutôt qu'à la charge maximale.",
      "Respiration régulière, ne pas bloquer le souffle.",
      "Rester explosif sur les mouvements, éviter les rythmes trop lents."
    ]
  },
  endurance_base: {
    title: "Endurance · Disguised fitness",
    type: "Terrain",
    desc: "Drills avec ballon, courses variées, montées/descente du couloir en continu.",
    duration: "60 min",
    schema: `Couloir gauche:

LG part de la zone basse, conduit le ballon jusqu'à différents cônes alignés dans le couloir, puis revient.

Ex : C1 (proche), C2 (milieu), C3 (haut).`,
    steps: [
      "Placer 3 cônes dans le couloir (bas, milieu, haut).",
      "LG commence en bas avec ballon, conduit jusqu'à C1 puis revient.",
      "Même principe vers C2 puis C3, en alternant les distances.",
      "Répéter les allers-retours avec temps de repos court entre les séries.",
      "Varier les rythmes (lent, moyen, rapide) en fonction des consignes."
    ],
    cues: [
      "Rester propre techniquement même en fatigue.",
      "Regarder régulièrement le terrain et non seulement le ballon.",
      "Garder une posture légèrement penchée vers l'avant pour les courses."
    ]
  },

  technique_complexe: {
    title: "Technique/tactique latéral · Complexe",
    type: "Terrain",
    desc: "Centres en course, 1v1 avec changements de direction, sorties de pressing pied droit/pied gauche.",
    duration: "75 min",
    schema: `Zone latérale + pressing:

Deux défenseurs placés pour presser LG, qui doit sortir de la zone en utilisant feintes et changements de direction.`,
    steps: [
      "Placer LG près de la ligne avec ballon, 1–2 joueurs en opposition simulée.",
      "Simuler une pression côté intérieur, LG utilise feinte (stepover, crochet) pour sortir.",
      "Après la sortie, LG lève la tête et joue une passe ou un centre.",
      "Répéter en alternant pied droit / pied gauche sur les contrôles.",
      "Augmenter progressivement la pression (plus proche, plus rapide)."
    ],
    cues: [
      "Utiliser le corps pour protéger le ballon.",
      "Toujours prévoir une passe de sécurité en retrait.",
      "Travailler les deux pieds pour habituer les sorties de pressing."
    ]
  },
  force_explosivite: {
    title: "Force & explosivité en salle",
    type: "Salle",
    desc: "Fentes unilatérales, step-ups, sauts, sprints 10–20 m, core anti-rotation.",
    duration: "45–60 min",
    schema: `Circuit explosif:

[Fentes unilatérales] -> [Step-ups] -> [Sauts] -> [Sprints 10–20 m] -> [Core].`,
    steps: [
      "Échauffer particulièrement les hanches et les genoux.",
      "Travailler chaque jambe séparément sur les fentes et step-ups.",
      "Ajouter 3–4 séries de sauts explosifs (box jumps, sauts horizontaux).",
      "Finir par des sprints courts à pleine intensité.",
      "Inclure 1–2 exercices de core anti-rotation (ex : pallof press)."
    ],
    cues: [
      "Rester explosif sur chaque répétition.",
      "Limiter le volume pour ne pas se cramer avant le terrain.",
      "Priorité à la qualité d'exécution plutôt qu'au nombre de répétitions."
    ]
  },
  endurance_intervalles: {
    title: "Endurance · Intervalles couloir",
    type: "Terrain",
    desc: "Intervalles 30–40 s d'effort / 20–30 s de récup avec ballon dans le couloir.",
    duration: "60 min",
    schema: `Intervalles:

LG monte avec ballon du bas du couloir jusqu'à la zone haute, puis redescend, répété sur intervalles chronométrés.`,
    steps: [
      "Définir une zone de départ (bas du couloir) et une zone d'arrivée (haut).",
      "Pendant 30–40 s, LG enchaîne montées/descente avec ballon.",
      "Repos 20–30 s, puis recommencer une nouvelle série.",
      "Répéter 6–10 séries selon le niveau.",
      "Varier le type de conduite (pied intérieur, extérieur, changements de direction)."
    ],
    cues: [
      "Garder un rythme régulier sur chaque intervalle.",
      "Ne pas négliger la qualité de la conduite de balle.",
      "Bien respirer, contrôler la récupération entre les séries."
    ]
  },

  tactique_match: {
    title: "Tactique match · Latéral gauche",
    type: "Terrain",
    desc: "Jeux réduits, ligne défensive, pressing coordonné, timing des montées et des retours.",
    duration: "75 min",
    schema: `Mini-match sur demi-terrain avec focus sur le côté gauche : travail de la ligne défensive et des montées du latéral.`,
    steps: [
      "Organiser un jeu réduit où le côté gauche est très sollicité.",
      "Donner des consignes spécifiques à LG sur les montées et retours.",
      "Arrêter régulièrement le jeu pour corriger la position.",
      "Filmer si possible pour débriefer ensuite.",
      "Fixer 1–2 objectifs par match (ex : ne jamais se faire prendre dans le dos)."
    ],
    cues: [
      "Toujours aligné avec les autres défenseurs.",
      "Monter quand il y a couverture derrière.",
      "Communiquer avec le central et le milieu côté."
    ]
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
    duration: "60 min",
    schema: `Couloir + diagonale:

LG monte dans le couloir avec ballon, puis doit sprinter en diagonale vers une zone défensive centrale pour simuler un retour.`,
    steps: [
      "Placer une zone offensive haute dans le couloir et une zone défensive plus centrale.",
      "LG monte avec ballon jusqu'à la zone offensive.",
      "Sur perte simulée, LG lâche le ballon et sprinte en diagonale vers la zone défensive.",
      "Répéter plusieurs fois avec temps de repos court.",
      "Ajouter ensuite un adversaire qui attaque pour rendre le retour plus réaliste."
    ],
    cues: [
      "Retour à pleine intensité (ne pas jogguer).",
      "Orientation du corps vers le jeu pour pouvoir intervenir.",
      "Apprendre à gérer la fatigue sans baisser l'intensité des retours."
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
