const clubs = [
  {
    name: "TEST 1 과학",
    type: "Club",
    tags: ["Science"],
    description: "TEST 1 설명"
  },
  {
    name: "TEST 1 수학",
    type: "Club",
    tags: ["Math"],
    description: "TEST 1 설명"
  },
  {
    name: "TEST 1 영어",
    type: "Club",
    tags: ["English"],
    description: "TEST 1 설명"
  },
  {
    name: "morris",
    type: "Club",
    tags: ["morris math"],
    description: "TEST 1 설명"
  },
];

let selectedTag = "";

function createTagButtons() {
  const tags = [...new Set(clubs.flatMap(club => club.tags))];
  const container = document.getElementById('tagButtons');
  container.innerHTML = '';
  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'tag-button';
    btn.innerText = tag;
    btn.onclick = () => {
      selectedTag = selectedTag === tag ? "" : tag;
      document.querySelectorAll('.tag-button').forEach(b => b.classList.remove('active'));
      if (selectedTag) btn.classList.add('active');
      filterClubs();
    };
    container.appendChild(btn);
  });
}

function filterClubs() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const list = document.getElementById('clubList');
  list.innerHTML = '';

  const filtered = clubs.filter(club => {
    const matchesTag = selectedTag ? club.tags.includes(selectedTag) : true;
    const matchesSearch = query ? (
      club.name.toLowerCase().includes(query) ||
      club.tags.some(tag => tag.toLowerCase().includes(query))
    ) : true;
    return matchesTag && matchesSearch;
  });

  filtered.forEach(club => {
    const div = document.createElement('div');
    div.className = 'club-card';
    div.innerHTML = `
      <div class="club-name">${club.name}</div>
      <div class="club-type">${club.type}</div>
      <div class="club-description">${club.description}</div>
      <div class="club-tags">${club.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
    `;
    div.onclick = () => showClubModal(club); // 🔥 Makes the card clickable
    list.appendChild(div);
  });
}

// 🔍 Modal functionality
function showClubModal(club) {
  document.getElementById('modalName').textContent = club.name;
  document.getElementById('modalType').textContent = club.type;
  document.getElementById('modalDescription').textContent = club.description;
  document.getElementById('modalTags').innerHTML = club.tags.map(tag => `<span>${tag}</span>`).join(', ');
  document.getElementById('clubModal').classList.remove('hidden');
}

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('clubModal').classList.add('hidden');
});

window.addEventListener('click', (e) => {
  const modal = document.getElementById('clubModal');
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// 🌙 Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleModeBtn");

  toggleButton.addEventListener("click", function () {
    const body = document.body;
    const isDark = body.classList.toggle("dark-mode");
    toggleButton.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
  });

  createTagButtons();
  filterClubs();
});
