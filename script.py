from pathlib import Path

base = Path('output/projet-blue-lock')
base.mkdir(parents=True, exist_ok=True)

index_html = '''<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Projet Blue Lock - Plan Latéral Gauche</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="app-header">
    <div class="logo-circle">PB</div>
    <div class="title-block">
      <h1>Projet Blue Lock</h1>
      <p>Assistant d'entraînement pour latéral gauche sur 6 mois.</p>
    </div>
  </header>

  <main class="app-main">
    <section class="config-card">
      <h2>Configuration de la semaine</h2>
      <div class="config-row">
        <label for="phase-select">Phase :</label>
        <select id="phase-select">
          <option value="base">0–2 mois · Bases</option>
          <option value="intensif">2–4 mois · Intensif</option>
          <option value="match">4–6 mois · Match player</option>
        </select>
      </div>
      <div class="config-row">
        <label for="week-input">Semaine :</label>
        <input type="number" id="week-input" min="1" max="24" value="1">
      </div>
      <button id="generate-btn" class="primary-btn">Générer la semaine</button>
    </section>

    <section class="summary-card" id="phase-summary">
      <!-- Résumé de la phase injecté par JS -->
    </section>

    <section class="sessions-grid" id="sessions">
      <!-- Cartes de séances injectées par JS -->
    </section>
  </main>

  <footer class="app-footer">
    <p>Projet Blue Lock · hébergeable sur GitHub Pages · pensé pour mobile.</p>
  </footer>

  <script src="app.js"></script>
</body>
</html>
'''

style_css = '''* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: radial-gradient(circle at top, #0b1736 0, #050814 55%, #000000 100%);
  color: #f5f7ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  align-items: center;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
}

.logo-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #22c55e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  margin-right: 0.8rem;
}

.title-block h1 {
  font-size: 1.4rem;
}

.title-block p {
  font-size: 0.9rem;
  color: #cbd5f5;
}

.app-main {
  flex: 1;
  padding: 1.2rem 1.5rem 1.5rem;
  max-width: 960px;
  margin: 0 auto;
}

.config-card,
.summary-card {
  background: rgba(15,23,42,0.9);
  border-radius: 0.9rem;
  padding: 1.2rem 1.1rem;
  box-shadow: 0 18px 40px rgba(15,23,42,0.65);
  border: 1px solid rgba(148,163,184,0.4);
  margin-bottom: 1rem;
}

.config-card h2 {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
}

.config-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
}

.config-row label {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

select,
input[type="number"] {
  padding: 0.45rem 0.65rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(148,163,184,0.7);
  background: #020617;
  color: #e5e7eb;
  font-size: 0.95rem;
}

select:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59,130,246,0.6);
}

.primary-btn {
  margin-top: 0.4rem;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  color: #0b1120;
  background: linear-gradient(135deg, #3b82f6, #22c55e);
  box-shadow: 0 12px 30px rgba(34,197,94,0.35);
}

.primary-btn:hover {
  filter: brightness(1.05);
}

.sessions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
  margin-top: 0.5rem;
}

@media (min-width: 640px) {
  .sessions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.session-card {
  background: rgba(15,23,42,0.9);
  border-radius: 0.9rem;
  padding: 1rem;
  border: 1px solid rgba(148,163,184,0.35);
  position: relative;
  overflow: hidden;
}

.session-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 55%);
  opacity: 0;
  transition: opacity 0.2s ease-out;
}

.session-card:hover::before {
  opacity: 1;
}

.session-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.session-meta span {
  font-size: 0.85rem;
  color: #cbd5f5;
}

.session-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.session-type {
  font-size: 0.85rem;
  color: #9ca3af;
  margin-bottom: 0.3rem;
}

.session-desc {
  font-size: 0.85rem;
  color: #e5e7eb;
  margin-bottom: 0.6rem;
}

.session-schema {
  font-size: 0.8rem;
  color: #cbd5f5;
  margin-bottom: 0.4rem;
  padding: 0.4rem 0.6rem;
  border-radius: 0.6rem;
  background: rgba(15,23,42,0.95);
  border: 1px dashed rgba(148,163,184,0.7);
  white-space: pre-line;
}

.session-steps,
.session-cues {
  font-size: 0.8rem;
  color: #e5e7eb;
  margin-left: 1.1rem;
  margin-bottom: 0.4rem;
}

.session-steps li,
.session-cues li {
  margin-bottom: 0.2rem;
}

.session-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.4rem;
}

.session-actions button {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(148,163,184,0.7);
  background: #020617;
  color: #e5e7eb;
  font-size: 0.8rem;
  cursor: pointer;
}

.session-actions button.session-done-btn {
  border-color: #22c55e;
}

.session-actions button:hover {
  background: #0f172a;
}

.session-status {
  font-size: 0.8rem;
  color: #9ca3af;
}

.session-status.done {
  color: #22c55e;
}

.app-footer {
  padding: 0.9rem 1.2rem;
  font-size: 0.8rem;
  text-align: center;
  color: #94a3b8;
  border-top: 1px solid rgba(15,23,42,0.7);
  background: rgba(2,6,23,0.85);
}
'''

app_js = '''const player = {
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
    schema: "Couloir gauche (vue simplifiée) :\n\n[But]-----------------------------\n        A1           Cx\n LG\n\nLG = latéral gauche, A1 = ailier, Cx = zone de centre.",
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
    schema: "Disposition salle :\n\n[Squat]  [Fentes]  [Pompes]  [Tractions]  [Gainage]\nEnchaîner les ateliers en circuit (30–40 s par exo).",
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
    schema: "Couloir gauche :\n\nLG part de la zone basse, conduit le ballon jusqu'à différents cônes alignés dans le couloir, puis revient.\n\nEx : C1 (proche), C2 (milieu), C3 (haut).",
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
    schema: "Zone latérale + pressing :\n\nDeux défenseurs placés pour presser LG, qui doit sortir de la zone en utilisant feintes et changements de direction.",
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
    schema: "Circuit explosif :\n\n[Fentes unilatérales] -> [Step-ups] -> [Sauts] -> [Sprints 10–20 m] -> [Core].",
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
    schema: "Intervalles :\n\nLG monte avec ballon du bas du couloir jusqu'à la zone haute, puis redescend, répété sur intervalles chronométrés.",
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
    schema: "Mini-match sur demi-terrain avec focus sur le côté gauche : travail de la ligne défensive et des montées du latéral.",
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
    schema: "Couloir + diagonale :\n\nLG monte dans le couloir avec ballon, puis doit sprinter en diagonale vers une zone défensive centrale pour simuler un retour.",
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
      stepsHtml = `<ol class=\"session-steps\">${steps.map(s => `<li>${s}</li>`).join("")}</ol>`;
    }

    let cuesHtml = "";
    if (cues.length) {
      cuesHtml = `<ul class=\"session-cues\">${cues.map(c => `<li>${c}</li>`).join("")}</ul>`;
    }

    card.innerHTML = `
      <div class="session-meta">
        <span>${session.jour}</span>
        <span>${duration}</span>
      </div>
      <div class="session-title">${title}</div>
      <div class="session-type">${type}</div>
      <div class="session-desc">${desc}</div>
      ${schema ? `<div class=\"session-schema\"><strong>Schéma :</strong>\n${schema}</div>` : ""}
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
'''

(base / 'index.html').write_text(index_html, encoding='utf-8')
(base / 'style.css').write_text(style_css, encoding='utf-8')
(base / 'app.js').write_text(app_js, encoding='utf-8')

print('Updated files in', base)
