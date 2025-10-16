const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const icon = document.body.classList.contains("dark") ? "sun" : "moon";
    toggleBtn.innerHTML = `<i data-feather="${icon}"></i>`;
    feather.replace();
  });
}

const poemsContainer = document.getElementById("poems");
const searchInput = document.getElementById("searchInput");
const themeSelect = document.getElementById("themeSelect");

function renderPoems(list) {
  poemsContainer.innerHTML = list.map((p, i) => `
    <article class="poem-card" style="--i:${i}">
      <h3>${p.title}</h3>
      <p>${p.snippet}</p>
      <div class="themes">
        ${p.themes.map(t => `<span class="theme-tag" data-theme="${t}">${t}</span>`).join("")}
      </div>
      <a href="poem.html?id=${p.id}" class="read-more">Read More →</a>
    </article>
  `).join("");

  document.querySelectorAll(".theme-tag").forEach(tag => {
    tag.addEventListener("click", e => {
      themeSelect.value = e.target.dataset.theme;
      filterPoems();
    });
  });
}

if (themeSelect) {
  const uniqueThemes = [...new Set(poems.flatMap(p => p.themes))];
  uniqueThemes.forEach(theme => {
    const opt = document.createElement("option");
    opt.value = theme;
    opt.textContent = theme;
    themeSelect.appendChild(opt);
  });
}

function filterPoems() {
  const query = searchInput.value.toLowerCase();
  const selectedTheme = themeSelect.value;
  const filtered = poems.filter(p => {
    const matchesText = p.title.toLowerCase().includes(query) ||
      p.snippet.toLowerCase().includes(query) ||
      p.text.toLowerCase().includes(query);
    const matchesTheme = !selectedTheme || p.themes.includes(selectedTheme);
    return matchesText && matchesTheme;
  });
  renderPoems(filtered);
}

if (poemsContainer) {
  renderPoems(poems);
  searchInput?.addEventListener("input", filterPoems);
  themeSelect?.addEventListener("change", filterPoems);
}
feather.replace();