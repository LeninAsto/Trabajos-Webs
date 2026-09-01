const projects = [
  {
    title: "Expo Física",
    description: "Presentación sobre mol, masa molecular, rendimiento y pureza, con ejercicios y calculadora rápida.",
    href: "../works/semestre-1/expo-fisica/",
    icon: "science",
    semester: "Semestre 1",
    type: "Exposición",
    owner: "Personal"
  },
  {
    title: "Trabajo Final CDI",
    description: "Presentación sobre INDUTECH de la asignatura de Competencia Digital para la Industria.",
    href: "../works/semestre-1/trabajofinal-cdi/",
    icon: "factory",
    semester: "Semestre 1",
    type: "Trabajo final",
    owner: "Personal"
  },
  {
    title: "Trabajo Final ITI",
    description: "Presentación sobre AgroVerde de la asignatura de Introducción a las Tecnologías de Información.",
    href: "../works/semestre-1/trabajofinal-iti/",
    icon: "potted_plant",
    semester: "Semestre 1",
    type: "Trabajo final",
    owner: "Personal"
  },
  {
    title: "Template de Proyecto de Vida",
    description: "Presentación sobre proyecto de vida para la asignatura de Desarrollo Personal.",
    href: "../works/semestre-1/pro-vida/",
    icon: "school",
    semester: "Semestre 1",
    type: "Template",
    owner: "Personal"
  },
  {
    title: "Liderazgo y Toma de Decisiones",
    description: "Presentación sobre liderazgo y toma de decisiones para Desarrollo Personal.",
    href: "../works/semestre-1/expo-lidera/",
    icon: "groups_3",
    semester: "Semestre 1",
    type: "Exposición",
    owner: "Personal"
  },
  {
    title: "Comunicación",
    description: "Diapositivas sobre definición, factores y elementos de la comunicación.",
    href: "../works/semestre-2/expo-com/comunicacion/",
    icon: "message",
    semester: "Semestre 2",
    type: "Exposición",
    owner: "Personal"
  },
  {
    title: "Seguridad e Higiene Industrial",
    description: "Presentación de la Unidad 2 sobre identificación de peligros y evaluación de riesgos.",
    href: "../works/semestre-2/expo-shi/",
    icon: "health_and_safety",
    semester: "Semestre 2",
    type: "Exposición",
    owner: "Personal"
  },
  {
    title: "Ejercicios de Comunicación",
    description: "Tres diapositivas con oraciones, iconos y elementos del proceso comunicativo.",
    href: "../works/semestre-2/expo-com/ejerci/",
    icon: "assignment",
    semester: "Semestre 2",
    type: "Exposición",
    owner: "Personal"
  },
  {
    title: "Escucha activa",
    description: "Presentación sobre técnicas, factores y ejemplo práctico de escucha activa.",
    href: "../works/semestre-2/expo-com/esc-act/",
    icon: "hearing",
    semester: "Semestre 2",
    type: "Exposición",
    owner: "Personal"
  },
  {
    title: "Plan Personal de Motivación Académica",
    description: "Presentación de un plan personal para mejorar el desempeño estudiantil.",
    href: "../works/others/milenka/",
    icon: "self_improvement",
    semester: "Otros",
    type: "Encargo",
    owner: "Milenka"
  }
];

const groupOrder = ["Semestre 2", "Semestre 1", "Otros"];
const filters = ["Todos", "Semestre 1", "Semestre 2", "Otros", "Exposición", "Trabajo final", "Template", "Encargo"];

const state = {
  filter: "Todos",
  query: ""
};

const projectGroups = document.getElementById("projectGroups");
const filterTabs = document.getElementById("filterTabs");
const searchInput = document.getElementById("searchInput");
const stats = document.getElementById("stats");

function normalize(value) {
  return value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesFilter(project) {
  if (state.filter === "Todos") return true;
  return project.semester === state.filter || project.type === state.filter || project.owner === state.filter;
}

function matchesQuery(project) {
  const query = normalize(state.query.trim());
  if (!query) return true;
  return normalize(`${project.title} ${project.description} ${project.semester} ${project.type} ${project.owner}`).includes(query);
}

function getVisibleProjects() {
  return projects.filter((project) => matchesFilter(project) && matchesQuery(project));
}

function createChip(icon, text) {
  return `<span class="chip"><span class="material-symbols-rounded" aria-hidden="true">${icon}</span>${text}</span>`;
}

function createProjectCard(project) {
  return `
    <a class="work-card" href="${project.href}">
      <header>
        <span class="work-icon material-symbols-rounded" aria-hidden="true">${project.icon}</span>
        <span class="open-icon material-symbols-rounded" aria-hidden="true">open_in_new</span>
      </header>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <span class="chips">
        ${createChip("folder", project.semester)}
        ${createChip("category", project.type)}
      </span>
    </a>
  `;
}

function groupProjects(items) {
  return items.reduce((groups, project) => {
    if (!groups[project.semester]) groups[project.semester] = [];
    groups[project.semester].push(project);
    return groups;
  }, {});
}

function renderProjects() {
  const visibleProjects = getVisibleProjects();

  if (!visibleProjects.length) {
    projectGroups.innerHTML = `
      <div class="empty-state">
        <h3>No se encontró nada</h3>
        <p>Prueba con otro filtro o borra la búsqueda. A veces el buscador se pone intenso.</p>
      </div>
    `;
    return;
  }

  const groups = groupProjects(visibleProjects);
  const sortedGroups = Object.keys(groups).sort((a, b) => {
    return groupOrder.indexOf(a) - groupOrder.indexOf(b);
  });

  projectGroups.innerHTML = sortedGroups.map((groupName) => `
    <section class="project-group" aria-labelledby="${normalize(groupName).replace(/\s+/g, "-")}">
      <h3 class="group-title" id="${normalize(groupName).replace(/\s+/g, "-")}">
        <span class="material-symbols-rounded" aria-hidden="true">folder</span>
        ${groupName}
      </h3>
      <div class="work-grid">
        ${groups[groupName].map(createProjectCard).join("")}
      </div>
    </section>
  `).join("");
}

function renderFilters() {
  filterTabs.innerHTML = filters.map((filter) => `
    <button class="filter-button ${filter === state.filter ? "active" : ""}" type="button" data-filter="${filter}">
      ${filter}
    </button>
  `).join("");

  filterTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      renderFilters();
      renderProjects();
    });
  });
}

function renderStats() {
  const semesterCount = new Set(projects.map((project) => project.semester)).size;
  const typeCount = new Set(projects.map((project) => project.type)).size;

  stats.innerHTML = `
    <div class="stat"><strong>${projects.length}</strong><span>Trabajos</span></div>
    <div class="stat"><strong>${semesterCount}</strong><span>Grupos</span></div>
    <div class="stat"><strong>${typeCount}</strong><span>Tipos</span></div>
  `;
}

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProjects();
});

renderStats();
renderFilters();
renderProjects();
