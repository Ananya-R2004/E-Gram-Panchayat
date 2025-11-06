// DOM Elements
const technicalBtn = document.getElementById('technical-btn');
const nontechnicalBtn = document.getElementById('nontechnical-btn');
const resultsTitle = document.getElementById('results-title');
const resourcesDiv = document.getElementById('resources');
const loadingDiv = document.getElementById('loading');

// --- Predefined Learning Resources ---
const resourcesData = {
  "Technical Skills": [
    {
      title: "Google Digital Garage – Fundamentals of Digital Marketing",
      url: "https://learndigital.withgoogle.com/digitalunlocked",
      description: "Free certified digital marketing and online business basics course from Google."
    },
    {
      title: "NPTEL (IIT & IISc Online Courses)",
      url: "https://nptel.ac.in/",
      description: "Government of India’s free online platform offering engineering and technical courses."
    },
    {
      title: "Udemy Free Programming Courses",
      url: "https://www.udemy.com/courses/free/",
      description: "Browse thousands of free beginner-friendly programming and IT skill courses."
    },
    {
      title: "Khan Academy – Computer Science",
      url: "https://www.khanacademy.org/computing",
      description: "Interactive lessons in coding, algorithms, and computer literacy."
    },
    {
      title: "Coursera – IT Support by Google",
      url: "https://www.coursera.org/professional-certificates/google-it-support",
      description: "Learn computer support and networking fundamentals for entry-level jobs."
    }
  ],
  "Non-Technical / Life Skills": [
    {
      title: "SWAYAM – Government of India Learning Platform",
      url: "https://swayam.gov.in/",
      description: "Free online courses for soft skills, entrepreneurship, and education in Hindi & English."
    },
    {
      title: "edX – Communication & Leadership",
      url: "https://www.edx.org/learn/communication",
      description: "Courses on communication, management, and personal development from top universities."
    },
    {
      title: "RBI Financial Literacy Portal",
      url: "https://www.rbi.org.in/financialeducation/home.html",
      description: "Government initiative for basic financial awareness and money management."
    },
    {
      title: "YouTube – Josh Talks Hindi",
      url: "https://www.youtube.com/c/JoshTalksHindi",
      description: "Inspirational talks in Hindi focusing on entrepreneurship and self-improvement."
    },
    {
      title: "Skill India Mission Portal",
      url: "https://skillindia.gov.in/",
      description: "Official platform for vocational and life-skill training across India."
    }
  ]
};

// --- Functions ---
function showLoading() {
  loadingDiv.classList.remove('hidden');
  resourcesDiv.innerHTML = '';
}

function hideLoading() {
  loadingDiv.classList.add('hidden');
}

function renderResources(category) {
  const resources = resourcesData[category];
  resultsTitle.textContent = `${category} Resources`;
  resourcesDiv.innerHTML = '';

  resources.forEach((item, index) => {
    const block = document.createElement('div');
    block.className = "border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition";

    block.innerHTML = `
      <div class="flex space-x-3">
        <span class="font-bold text-blue-600">${index + 1}.</span>
        <div>
          <a href="${item.url}" target="_blank" class="text-lg font-semibold text-blue-700 hover:text-blue-900">
            ${item.title} <i class="fas fa-external-link-alt text-sm"></i>
          </a>
          <p class="text-gray-600 mt-1">${item.description}</p>
        </div>
      </div>
    `;

    resourcesDiv.appendChild(block);
  });
}

// --- Event Listeners ---
technicalBtn.addEventListener('click', () => {
  showLoading();
  setTimeout(() => {
    hideLoading();
    renderResources("Technical Skills");
  }, 800);
});

nontechnicalBtn.addEventListener('click', () => {
  showLoading();
  setTimeout(() => {
    hideLoading();
    renderResources("Non-Technical / Life Skills");
  }, 800);
});
