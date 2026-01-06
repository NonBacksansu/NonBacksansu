//clublist
const clubs = [
  {
    name: "School Orchestra MSHS",
    type: "Music Club",
    tags: ["Music"],
    description: "A school orchestra for middle and high school students.",
    schedule: "Tuesday, 2:10–3:30 PM",
    supervisor: "Mr. Patrick, Ms. Dominga"
  },

  {
    name: "Basketball HS",
    type: "Sports Club",
    tags: ["Sports"],
    description: "High school basketball training and competition team.",
    schedule: "Monday–Wednesday, 3:30–5:30 PM",
    supervisor: "Ms. Alma"
  },

  {
    name: "Soccer MS",
    type: "Sports Club",
    tags: ["Sports"],
    description: "Middle school soccer training.",
    schedule: "Tuesday & Thursday, 2:30–4:00 PM",
    supervisor: "Mr. Akbar"
  },

  {
    name: "Robotics & AI",
    type: "STEM Club",
    tags: ["STEM"],
    description: "Robotics and AI projects for high school students.",
    schedule: "Tuesday, 3:30–5:00 PM",
    supervisor: "Ms. Savita"
  },

  {
    name: "Go Mandarin!",
    type: "Language Club",
    tags: ["Language"],
    description: "Mandarin language learning club.",
    schedule: "Wednesday, 2:10–3:30 PM",
    supervisor: "Ms. Reta"
  },

  {
    name: "Chess Club",
    type: "Strategy Club",
    tags: ["Sports"],
    description: "Chess club to develop logical and strategic thinking.",
    schedule: "Thursday, 2:10–3:30 PM",
    supervisor: "Ms. Monica V."
  },

  {
    name: "TeenAiders Club",
    type: "Service Club",
    tags: ["SA"],
    description: "Student volunteer club under the Indonesian Red Cross.",
    schedule: "Friday, 1:00–2:30 PM",
    supervisor: "Nurse Maria, Mr. Zaidan"
  }
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
    <div class="club-tags">
      ${club.tags.map(tag => `<span>${tag}</span>`).join("")}
    </div>
    <div class="club-footer">
      To register / further information, contact the supervisor via Teams
    </div>
  `;  
    div.onclick = () => showClubModal(club); //clickablecard
    list.appendChild(div);
  });
}

//modalfuncailty
function showClubModal(club) {
  document.getElementById("modalName").textContent = club.name;
  document.getElementById("modalType").textContent = club.type;
  document.getElementById("modalDescription").textContent = club.description;
  document.getElementById("modalSchedule").textContent = club.schedule;
  document.getElementById("modalSupervisor").textContent = club.supervisor;

  document.getElementById("modalTags").innerHTML =
    club.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join("");

  document.getElementById("clubModal").classList.remove("hidden");
}


window.addEventListener('click', (e) => {
  const modal = document.getElementById('clubModal');
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

//darkmode
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
