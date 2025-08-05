document.addEventListener('DOMContentLoaded', function() {
  // Data for all cards
  const socialStats = [
    {
      
      platform: 'facebook',
      username: '@nathanf',
      count: 1987,
      label: 'Followers',
      change: 12,
      changeType: 'up'
    },
    {
      platform: 'twitter',
      username: '@nathanf',
      count: 1044,
      label: 'Followers',
      change: 99,
      changeType: 'up'
    },
    {
      platform: 'instagram',
      username: '@realnathanf',
      count: 11000,
      label: 'Followers',
      change: 1099,
      changeType: 'up'
    },
    {
      platform: 'youtube',
      username: 'Nathan F.',
      count: 8239,
      label: 'Subscribers',
      change: 144,
      changeType: 'down'
    }
  ];

  const overviewStats = [
    {
      
      metric: 'Page Views',
      platform: 'facebook',
      count: 87,
      src:'./images/icon-facebook.svg',
      change: 3,
      changeType: 'up'
    },
    {
      metric: 'Likes',
      platform: 'facebook',
      count: 52,
      src:'./images/icon-facebook.svg',
      change: 2,
      changeType: 'down'
    },
    {
      metric: 'Likes',
      platform: 'instagram',
      count: 5462,
      src: "./images/icon-instagram.svg",
      change: 2257,
      changeType: 'up'
    },
    {
      metric: 'Profile Views',
      platform: 'instagram',
      count: 52000,
      src: "./images/icon-instagram.svg",
      change: 1375,
      changeType: 'up'
    },
    {
      metric: 'Retweets',
      platform: 'twitter',
      src: "./images/icon-twitter.svg",
      count: 117,
      change: 303,
      changeType: 'up'
    },
    {
      metric: 'Likes',
      platform: 'twitter',
      count: 507,
      src: "./images/icon-twitter.svg",
      change: 553,
      changeType: 'up'
    },
    {
      metric: 'Likes',
      platform: 'youtube',
      count: 107,
      src: "./images/icon-youtube.svg",
      change: 19,
      changeType: 'down'
    },
    {
      metric: 'Total Views',
      platform: 'youtube',
      count: 1407,
      src: "./images/icon-youtube.svg",
      change: 12,
      changeType: 'down'
    }
  ];

  // DOM Elements
  const statsGrid = document.getElementById('statsGrid');
  const overviewGrid = document.getElementById('overviewGrid');
  const followersTotal = document.querySelector('.followers-total');

  // Format number with commas
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Calculate total followers
  function calculateTotalFollowers() {
    const total = socialStats.reduce((sum, stat) => sum + stat.count, 0);
    followersTotal.textContent = `Total Followers: ${formatNumber(total)}`;
  }


// Create social stat card
function createSocialStatCard(stat) {
  const card = document.createElement('article');
  card.className = `stat-card stat-card--${stat.platform}`;
  
  // Create icon element
  const icon = document.createElement('img');
  icon.src = `./images/icon-${stat.platform}.svg`;
  icon.alt = `${stat.platform} icon`;
  icon.className = 'platform-icon';
  
  card.innerHTML = `
    <div class="stat-card__header">
      <div class="platform-info">
        <img src="./images/icon-${stat.platform}.svg" alt="${stat.platform}" class="platform-icon">
        <span class="stat-card__username">${stat.username}</span>
      </div>
      <span class="stat-card__count">${formatNumber(stat.count)}</span>
      <span class="stat-card__label">${stat.label}</span>
    </div>
    <div class="stat-card__change stat-card__change--${stat.changeType}">
      ${stat.change} Today
    </div>
  `;
  
  return card;
}

  // Create overview metric card
  function createOverviewCard(stat) {
    const card = document.createElement('article');
    card.className = 'metric-card';
    
    card.innerHTML = `
      <div class="metric-card__info">
        <span class="metric-card__label">${stat.metric}</span>
        <img src="${stat.src}" class="metric-card__label">
       
      </div>
      <div class="metric-card__change metric-card__change--${stat.changeType}">
       <span class="metric-card__count">${formatNumber(stat.count)}</span>
        ${stat.change}%
      </div>
    `;
    
    return card;
  }

  // Render all social stat cards
  function renderSocialStats() {
    statsGrid.innerHTML = '';
    socialStats.forEach(stat => {
      statsGrid.appendChild(createSocialStatCard(stat));
    });
  }

  // Render all overview cards
  function renderOverviewStats() {
    overviewGrid.innerHTML = '';
    overviewStats.forEach(stat => {
      overviewGrid.appendChild(createOverviewCard(stat));
    });
  }

  // Theme toggle functionality
  function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle__switch');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      body.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark');
      const theme = body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
  }

  // Initialize the app
  function init() {
    calculateTotalFollowers();
    renderSocialStats();
    renderOverviewStats();
    setupThemeToggle();
  }

  init();
});