// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Update Date and Time
  function updateDateTime() {
    const now = new Date();
    
    // Format date (e.g., "Friday, August 4, 2023")
    const dateOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    document.getElementById('current-date').innerHTML = 
      `<i class="far fa-calendar-alt"></i> ${formattedDate}`;
    
    // Format time (e.g., "11:45:32 AM")
    const timeOptions = { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    document.getElementById('current-time').innerHTML = 
      `<i class="far fa-clock"></i> ${formattedTime}`;
    
    // Update year in footer
    document.getElementById('current-year').textContent = now.getFullYear();
  }

  // Update every second
  setInterval(updateDateTime, 1000);
  updateDateTime(); // Initial call

  // Fetch Daily Bible Verse
  fetch('https://bible-api.com/john%203:16')
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(data => {
      document.getElementById('daily-verse').textContent = 
        `"${data.text}" - ${data.reference}`;
    })
    .catch(error => {
      console.error('Error fetching verse:', error);
      document.getElementById('daily-verse').textContent = 
        '"For God so loved the world..." - John 3:16';
    });

  // Mobile menu toggle (if needed)
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  menuToggle.addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
  });
  
  if (window.innerWidth <= 768) {
    document.querySelector('nav').appendChild(menuToggle);
  }
});

// Motivational Quotes (Rotates every 5 minutes)
const quotes = [
  {
    text: "Faith is taking the first step even when you don't see the whole staircase.",
    author: "Martin Luther King Jr."
  },
  {
    text: "With God, all things are possible.",
    author: "Matthew 19:26"
  },
  {
    text: "The Lord is my strength and my shield; my heart trusts in Him.",
    author: "Psalm 28:7"
  },
  {
    text: "Do not be anxious about anything, but pray about everything.",
    author: "Philippians 4:6"
  }
];

function rotateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById('motivational-quote').textContent = `"${quotes[randomIndex].text}"`;
  document.getElementById('quote-author').textContent = `— ${quotes[randomIndex].author}`;
}

// Rotate every 5 minutes (300,000ms)
setInterval(rotateQuote, 300000);
rotateQuote(); // Initialize immediately

// Bible Verse Fetching
function fetchVerse(verse = '') {
  const searchInput = verse || document.getElementById('verse-search').value.trim();
  if (!searchInput) return;

  const resultDiv = document.getElementById('verse-result');
  resultDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Loading...</p>';

  fetch(`https://bible-api.com/${encodeURIComponent(searchInput)}`)
    .then(response => {
      if (!response.ok) throw new Error('Verse not found');
      return response.json();
    })
    .then(data => {
      resultDiv.innerHTML = `
        <h3>${data.reference}</h3>
        <p>${data.text}</p>
        <button onclick="copyVerse('${data.reference}', '${data.text}')" class="btn-small">
          <i class="fas fa-copy"></i> Copy
        </button>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p class="error">Error: ${error.message}. Try "John 3:16"</p>`;
    });
}

// Copy Verse to Clipboard
function copyVerse(reference, text) {
  navigator.clipboard.writeText(`${reference}: ${text}`)
    .then(() => alert('Verse copied to clipboard!'))
    .catch(() => alert('Failed to copy.'));
}

// Instagram Feed (Alternative if API access isn't available)
document.addEventListener('DOMContentLoaded', function() {
  // Sample Instagram data (replace with actual API calls)
  const instaPosts = [
    {
      image: "https://via.placeholder.com/600x600?text=Church+Event+1",
      caption: "Sunday service worship moments",
      link: "#"
    },
    {
      image: "https://via.placeholder.com/600x600?text=Bible+Study",
      caption: "Wednesday night Bible study",
      link: "#"
    },
    {
      image: "https://via.placeholder.com/600x600?text=Youth+Group",
      caption: "Youth group summer camp",
      link: "#"
    },
    {
      image: "https://via.placeholder.com/600x600?text=Community+Outreach",
      caption: "Helping our local community",
      link: "#"
    }
  ];

  const instaFeed = document.getElementById('instafeed');
  
  instaPosts.forEach(post => {
    instaFeed.innerHTML += `
      <a href="${post.image}" class="insta-item" data-lightbox="instagram" data-title="${post.caption}">
        <img src="${post.image}" alt="${post.caption}">
        <div class="insta-caption">
          <p>${post.caption}</p>
        </div>
      </a>
    `;
  });

  // Initialize Lightbox
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Auto-calculate church age
  const foundingYear = 1982;
  document.getElementById('church-age').textContent = foundingYear;
  
  // Simple image hover effect
  const images = document.querySelectorAll('.about-image, .team-card img');
  images.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.02)';
      img.style.transition = 'transform 0.3s ease';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.getElementById('youthDropdownBtn');
  const dropdownContent = document.getElementById('youthDropdown');

  // Toggle dropdown on click
  dropdownBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownContent.classList.toggle('show');
    
    // Rotate chevron icon
    const chevron = this.querySelector('.fa-chevron-down');
    chevron.classList.toggle('rotate');
  });

  // Close when clicking outside
  document.addEventListener('click', function() {
    dropdownContent.classList.remove('show');
    const chevron = dropdownBtn.querySelector('.fa-chevron-down');
    chevron.classList.remove('rotate');
  });

  // Prevent closing when clicking inside dropdown
  dropdownContent.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

