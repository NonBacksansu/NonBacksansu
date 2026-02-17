//clublist
const clubs = [
  {
    name: "Korean Culture Club",
    type: "Culture Club",
    tags: ["Language"],
    description: "Explores Korean culture, traditions, and modern trends. Open for Grades 6–12.",
    schedule: "7:00–8:00 PM",
    supervisor: "Ms. Helen"
  },
  {
    name: "Tech Buzz",
    type: "Technology Club",
    tags: ["STEM"],
    description: "Hands-on technology activities for middle school students. Open for Grades 6–9.",
    schedule: "2:50–4:00 PM",
    supervisor: "Mr. Nikhil"
  },
  {
    name: "PRAMUKA",
    type: "Leadership Club",
    tags: ["Leadership"],
    description: "Scouting activities focused on leadership, discipline, and teamwork. Open for Grades 6–8.",
    schedule: "3:00–4:15 PM",
    supervisor: "Ms. Elsya, Ms. Maria G."
  },
  {
    name: "Basketball MS Boys",
    type: "Sports Club",
    tags: ["Sports"],
    description: "Competitive basketball training for middle school boys. Includes jersey. Open for Grades 7–9.",
    schedule: "Monday & Thursday, 2:50–4:00 PM",
    supervisor: "Coach Tri, Coach Pardo"
  },
  {
    name: "Culinary Club",
    type: "Lifestyle Club",
    tags: ["Cooking"],
    description: "Practical cooking skills taught through Junior Chef programs. Open for Grades 6–10.",
    schedule: "3:00–4:15 PM",
    supervisor: "Ms. Evi"
  },
  {
    name: "MUN Club",
    type: "Academic Club",
    tags: ["Leadership"],
    description: "Model United Nations training with structured sessions led by SpeakUp Academy. Open for Grades 6–11.",
    schedule: "3:00–4:00 PM",
    supervisor: "Ms. Elisabeth, Mr. Luke, Ms. Maria Fe, Ms. Rizky"
  },
  {
    name: "Basketball HS",
    type: "Sports Club",
    tags: ["Sports"],
    description: "High school competitive basketball training. Includes jersey. Open for Grades 10–11.",
    schedule: "Monday–Wednesday, 4:00–6:00 PM",
    supervisor: "Coach Tri, Coach Alan"
  },
  {
    name: "School Orchestra MSHS",
    type: "Music Club",
    tags: ["Music"],
    description: "School orchestra for middle and high school students. Open for Grades 6–11.",
    schedule: "2:10–3:30 PM",
    supervisor: "Mr. Patrick, Ms. Dominga"
  },
  {
    name: "Descartesian Club",
    type: "Academic Club",
    tags: ["STEM"],
    description: "Mathematics enrichment club led by the math department. Open for Grades 6–11.",
    schedule: "2:10–3:30 PM",
    supervisor: "Ms. Leah"
  },
  {
    name: "Warta Aksara",
    type: "Media Club",
    tags: ["Writings"],
    description: "Student publication club focused on writing and media production. Open for Grades 8–10.",
    schedule: "2:10–3:30 PM",
    supervisor: "Ms. Elsya, Mr. Hafidz"
  },
  {
    name: "Table Tennis Club",
    type: "Sports Club",
    tags: ["Sports"],
    description: "Table tennis training and recreational play. Open for Grades 6–10.",
    schedule: "2:10–3:30 PM",
    supervisor: "Mr. R. Ricky"
  },
  {
    name: "Singing Club",
    type: "Music Club",
    tags: ["Music"],
    description: "Vocal training and group singing practice. Open for Grades 3–9.",
    schedule: "2:10–3:30 PM",
    supervisor: "Ms. Claudya"
  },
  {
    name: "Karate Club",
    type: "Martial Arts Club",
    tags: ["Sports"],
    description: "Kyokushinkai karate training including uniform and belt exams. Open for Grades 6–10.",
    schedule: "Tuesday & Thursday, 2:10–3:30 PM",
    supervisor: "Kyokushinkai Karate-Do Indonesia"
  },
  {
    name: "Debate Club",
    type: "Academic Club",
    tags: ["Leadership"],
    description: "Debate training program conducted by SpeakUp Academy. Open for Grades 6–9.",
    schedule: "2:10–3:30 PM",
    supervisor: "SpeakUp Academy"
  },
  {
    name: "Game Design & Development",
    type: "Technology Club",
    tags: ["STEM"],
    description: "Introduction to game development concepts and coding. Open for Grades 6–9.",
    schedule: "2:10–3:30 PM",
    supervisor: "Ms. Tima"
  },
  {
    name: "Robotics & AI",
    type: "Technology Club",
    tags: ["STEM"],
    description: "Advanced robotics and artificial intelligence projects. Open for Grades 10–11.",
    schedule: "3:30–5:00 PM",
    supervisor: "Ms. Savita"
  },
  {
    name: "Code for Change",
    type: "Technology Club",
    tags: ["STEM"],
    description: "Coding projects aimed at solving real-world problems. Open for Grades 10–11.",
    schedule: "3:30–5:00 PM",
    supervisor: "Ms. Tima"
  },
  {
    name: "Chess Club",
    type: "Strategy Club",
    tags: ["Sports"],
    description: "Strategic thinking and chess skill development. Open for Grades 6–10.",
    schedule: "2:10–3:30 PM",
    supervisor: "Ms. Monica V."
  },
  {
    name: "Global Issue Network (GIN)",
    type: "Academic Club",
    tags: ["Leadership"],
    description: "Discussion-based club focused on global challenges and action. Open for Grades 6–12.",
    schedule: "3:00–4:00 PM",
    supervisor: "Ms. Elisabeth, Ms. Ravinder"
  }  

];

const majorMap = {
  Engineering: ["STEM"],
  Business: ["Leadership"],
  Medicine: ["STEM"],
  Arts: ["Music", "Writings"],
  Law: ["Leadership"]
};


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



// --- ALL EVENT LISTENERS (Buttons, Modal, Chatbot) ---
document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Modal Close 'X' Button
  const closeModalBtn = document.getElementById("closeModal");
  if (closeModalBtn) {
    closeModalBtn.onclick = () => {
      document.getElementById("clubModal").classList.add("hidden");
    };
  }

  // 2. Dark Mode Toggle
  const toggleButton = document.getElementById("toggleModeBtn");
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const body = document.body;
      const isDark = body.classList.toggle("dark-mode");
      toggleButton.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    });
  }

  // 3. Chatbot Toggle (Open/Close)
  const chatbotBtn = document.getElementById("chatbotBtn");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const closeChat = document.getElementById("closeChat");

  if (chatbotBtn && chatbotWindow && closeChat) {
    chatbotBtn.onclick = () => chatbotWindow.classList.remove("hidden");
    closeChat.onclick = () => chatbotWindow.classList.add("hidden");
  }

  // 4. Chatbot Sending Logic
  const sendChat = document.getElementById("sendChat");
  const chatInput = document.getElementById("chatInput");
  
  if (sendChat && chatInput) {
    sendChat.onclick = sendMessage;
    chatInput.addEventListener("keypress", e => {
      if (e.key === "Enter") sendMessage();
    });
  }

  // 5. Initialize Club List
  createTagButtons();
  filterClubs();
});

// --- GLOBAL FUNCTIONS (Can stay outside) ---

// Clicking outside modal to close
window.addEventListener('click', (e) => {
  const modal = document.getElementById('clubModal');
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

function sendMessage() {
  const chatInput = document.getElementById("chatInput");
  const msg = chatInput.value.trim();
  if (!msg) return;

  appendMessage(msg, "user-message");
  chatInput.value = "";

  setTimeout(() => {
    botReply(msg);
  }, 600);  
}

function appendMessage(text, className) {
  const chatBody = document.getElementById("chatBody");
  const div = document.createElement("div");
  div.className = className;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(message) {
  const lower = message.toLowerCase();
  let reply = "";

  // Check Major Map
  for (const [major, tags] of Object.entries(majorMap)) {
    if (lower.includes(major.toLowerCase())) {
      const suggestedClubs = clubs.filter(c => c.tags.some(t => tags.includes(t)));
      reply = `Since you're interested in ${major}, check out: ${suggestedClubs.map(c => c.name).join(", ")}.`;
      break;
    }
  }

  // Fallback Keywords
  if (!reply) {
    if (lower.includes("sport")) reply = "We have Basketball, Table Tennis, Karate, and Chess clubs 🏀";
    else if (lower.includes("stem") || lower.includes("tech")) reply = "Check out Tech Buzz, Robotics & AI, Game Design, or Code for Change 💻";
    else if (lower.includes("music")) reply = "You might like Orchestra or Singing Club 🎵";
    else if (lower.includes("leadership")) reply = "MUN, Debate, PRAMUKA, and GIN are great leadership options 🌍";
    else if (lower.includes("language")) reply = "We have Korean Culture Club for you!";
    else if (lower.includes("Cooking")) reply = "Culinary Club will be the best option for you!";
    else if (lower.includes("Music")) reply = "Check Orchestra MSHS, or Singing club🎵";
    else if (lower.includes("Writing")) reply = "How about you try Warta Aksara?";
    else reply = "I can help you find clubs by major (like STEM) or interest (like Sports)!";
  }

  appendMessage(reply, "bot-message");
}
