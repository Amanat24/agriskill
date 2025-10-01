// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
  checkLoginStatus();
});

// Function to check and apply login status
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    document.body.classList.add('logged-in');
  } else {
    document.body.classList.remove('logged-in');
  }
}

// Logout function (add this to your existing code)
function logout() {
  localStorage.removeItem('isLoggedIn');
  checkLoginStatus();
  window.location.href = 'index.html'; // Redirect to home after logout
}

// Smooth Scrolling for Navigation
document.querySelectorAll('a[data-scroll]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      history.pushState(null, null, targetId);
    }
  });
});

// Sticky Navbar
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the current theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle between light and dark
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update button state
  updateThemeButton(newTheme);
});

// Update button based on current theme
function updateThemeButton(theme) {
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

// Initialize button state
updateThemeButton(currentTheme);

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', e => {
  if (!localStorage.getItem('theme')) { // Only if user hasn't set preference
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    updateThemeButton(newTheme);
  }
});

// Search Functionality
const searchData = [
  // Courses
  {
    title: "Organic Farming",
    description: "Learn sustainable farming practices that protect the environment",
    url: "../courses/organic-farming/Index.html",
    type: "course"
  },
  {
    title: "Soil Management",
    description: "Discover techniques to improve soil health and productivity",
    url: "../courses/soil-mangement/soil_index.html",
    type: "course"
  },
  {
    title: "Crop Rotation",
    description: "Master the art of crop rotation for better yields",
    url: "../courses/crop-rotation/crop_rotation_index.html",
    type: "course"
  },
  {
    title: "Water Management",
    description: "Learn efficient water usage techniques for sustainable farming",
    url: "../courses/Water Management/water_management_index.html",
    type: "course"
  },
  {
    title: "Agroforestry",
    description: "Integrate trees and shrubs into farming systems for ecological benefits",
    url: "../courses/Agroforestry/agroforestry_index.html",
    type: "course"
  },
  {
    title: "Farm Business Management",
    description: "Manage your farm as a profitable business with modern techniques",
    url: "../courses/Farm Business Management/farm_business_index.html",
    type: "course"
  },
  
  // Blogs
  {
    title: "Importance of Sustainable Agriculture",
    description: "Learn the Importance of Sustainable Agriculture",
    url: "../Articles/Sustainable Agriculture.html",
    type: "blog"
  },
  {
    title: "Organic Farming",
    description: "Discover natural methods to improve soil health without chemicals",
    url: "../Articles/Organic Farming.html",
    type: "blog"
  },
  {
    title: "5 Sustainable Farming Techniques",
    description: "Expand your knowledge on different Farming Techniques",
    url: "../Articles/farming techniques.html",
    type: "blog"
  },
  {
    title: "Hydroponic Farming",
    description: "Soil-Free Agriculture for the Future",
    url: "../Articles/Hydroponic Farming.html",
    type: "blog"
  },
  {
    title: "Precision Agriculture",
    description: "The Future of Smart Farming",
    url: "../Articles/Precision Agriculture.html",
    type: "blog"
  },
  {
    title: "Top 10 Crops for Profitable Farming",
    description: "Know about Top 10 Crops for Profitable Farming",
    url: "../Articles/Profitable Farming.html",
    type: "blog"
  }
];

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const searchContainer = document.querySelector('.search-container');

// Perform search function
function performSearch() {
  const query = searchInput.value.toLowerCase().trim();
  
  if (query.length < 2) {
    searchResults.style.display = 'none';
    return;
  }

  const results = searchData.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.description.toLowerCase().includes(query)
  );

  displayResults(results, query);
}

// Display search results
function displayResults(results, query) {
  searchResults.innerHTML = '';
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found. Try different keywords.</div>';
    searchResults.style.display = 'block';
    return;
  }

  // Group by type
  const grouped = {
    course: [],
    blog: []
  };

  results.forEach(item => grouped[item.type].push(item));

  // Add Courses section if exists
  if (grouped.course.length > 0) {
    const heading = document.createElement('div');
    heading.className = 'results-heading';
    heading.textContent = 'Courses';
    searchResults.appendChild(heading);

    grouped.course.forEach(item => {
      searchResults.appendChild(createResultItem(item, query));
    });
  }

  // Add Blogs section if exists
  if (grouped.blog.length > 0) {
    const heading = document.createElement('div');
    heading.className = 'results-heading';
    heading.textContent = 'Blogs';
    searchResults.appendChild(heading);

    grouped.blog.forEach(item => {
      searchResults.appendChild(createResultItem(item, query));
    });
  }

  searchResults.style.display = 'block';
}

// Create individual search result item
function createResultItem(item, query) {
  const resultItem = document.createElement('div');
  resultItem.className = 'search-result-item';
  resultItem.innerHTML = `
    <h4>${highlightText(item.title, query)}</h4>
    <p>${highlightText(item.description, query)}</p>
  `;
  
  resultItem.addEventListener('click', () => {
    window.location.href = item.url;
  });
  
  return resultItem;
}

// Highlight matching text in search results
function highlightText(text, query) {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// Event listeners for search
searchInput.addEventListener('input', performSearch);
searchBtn.addEventListener('click', performSearch);

// Close results when clicking outside
document.addEventListener('click', (e) => {
  if (!searchContainer.contains(e.target)) {
    searchResults.style.display = 'none';
  }
});

// Keyboard navigation for search
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  } else if (e.key === 'Escape') {
    searchResults.style.display = 'none';
  }
});

// FAQ Accordion Functionality
document.querySelectorAll('.faq-item h3').forEach(item => {
  item.addEventListener('click', () => {
    const faqItem = item.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(el => {
      if (el !== faqItem) {
        el.classList.remove('active');
      }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active', !isActive);
  });
});

// WhatsApp Click Tracking
document.querySelector('.whatsapp-btn')?.addEventListener('click', function() {
  // You can add analytics here
  console.log('WhatsApp chat initiated');
});

// Initialize any animations when elements come into view
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
  
  // Check for hash in URL and scroll to section
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
});

// Get Started Button Click Handler
document.getElementById('get-started-btn').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default anchor behavior
  document.getElementById('membership-modal').style.display = 'flex';
});

// Form Submission Handler
document.getElementById('membership-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('member-name').value;
  const email = document.getElementById('member-email').value;
  
  if (name && email.includes('@')) {
    // Show personalized congrats
    document.getElementById('member-greeting').textContent = name;
    document.getElementById('membership-modal').style.display = 'none';
    document.getElementById('congrats-banner').style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      document.getElementById('congrats-banner').style.display = 'none';
    }, 5000);
  } else {
    alert('Please enter valid name and email');
  }
});

// Close handlers
document.querySelectorAll('.close-modal, .close-banner').forEach(btn => {
  btn.addEventListener('click', function() {
    document.getElementById('membership-modal').style.display = 'none';
    document.getElementById('congrats-banner').style.display = 'none';
  });
});

// Close when clicking outside modal
window.addEventListener('click', function(e) {
  if (e.target === document.getElementById('membership-modal')) {
    document.getElementById('membership-modal').style.display = 'none';
  }
});

// Login Modal functionality
const loginModal = document.getElementById('login-modal');
const loginBtn = document.getElementById('login-btn'); // Add this button to your navbar
const closeLoginModal = document.querySelector('#login-modal .close-modal');

// Open modal
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

// Close modal
closeLoginModal.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// Form submission
document.getElementById('modal-login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Add your login logic here
  alert('Login functionality will be implemented!');
  loginModal.style.display = 'none';
});