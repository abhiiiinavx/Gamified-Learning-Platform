// ==========================================
// STATE MANAGEMENT (In-Memory Only)
// ==========================================
let appState = {
    currentUser: null,
    users: [],
    language: 'en',
    selectedRole: null,
    quiz: {
        subject: '',
        currentQuestion: 0,
        questions: [],
        score: 0,
        startTime: null
    }
};

// ==========================================
// QUIZ QUESTIONS BANK
// ==========================================
const quizBank = {
    math: [
        {
            question: "What is the square root of 144?",
            options: ["10", "11", "12", "13"],
            correct: 2,
            hint: "Think: 12 × 12 = ?"
        },
        {
            question: "Solve: 2x + 5 = 15",
            options: ["3", "5", "7", "10"],
            correct: 1,
            hint: "Subtract 5 from both sides first"
        },
        {
            question: "Area of circle with radius 5?",
            options: ["25π", "10π", "50π", "5π"],
            correct: 0,
            hint: "A = πr²"
        },
        {
            question: "Value of π approximately?",
            options: ["2.14", "3.14", "4.14", "5.14"],
            correct: 1,
            hint: "About 3.14159..."
        },
        {
            question: "Triangle sides 3, 4, 5 is?",
            options: ["Equilateral", "Isosceles", "Right", "Scalene"],
            correct: 2,
            hint: "Check Pythagorean theorem"
        }
    ],
    science: [
        {
            question: "Chemical symbol for water?",
            options: ["H2O", "O2", "CO2", "NaCl"],
            correct: 0,
            hint: "2 hydrogen, 1 oxygen"
        },
        {
            question: "Force pulling objects to Earth?",
            options: ["Magnetism", "Friction", "Gravity", "Tension"],
            correct: 2,
            hint: "Keeps us grounded!"
        },
        {
            question: "Speed of light?",
            options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
            correct: 0,
            hint: "About 3×10⁸ m/s"
        },
        {
            question: "Closest planet to Sun?",
            options: ["Venus", "Earth", "Mercury", "Mars"],
            correct: 2,
            hint: "Also the smallest"
        },
        {
            question: "What is photosynthesis?",
            options: ["Plants eating", "Plants making food with sunlight", "Plants breathing", "Plants growing"],
            correct: 1,
            hint: "Light energy → chemical energy"
        }
    ],
    technology: [
        {
            question: "HTML stands for?",
            options: ["Hyper Text Markup Language", "High Tech Language", "Home Tool Language", "Hyper Transfer Language"],
            correct: 0,
            hint: "Used for web pages"
        },
        {
            question: "Binary code is based on?",
            options: ["0 and 1", "A and B", "True/False", "On/Off"],
            correct: 0,
            hint: "Two digits"
        },
        {
            question: "Which concept repeats code?",
            options: ["Variable", "Loop", "Function", "Array"],
            correct: 1,
            hint: "Think 'for' or 'while'"
        },
        {
            question: "CPU stands for?",
            options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing"],
            correct: 0,
            hint: "Brain of computer"
        },
        {
            question: "What is an algorithm?",
            options: ["A computer", "Step-by-step procedure", "Programming language", "Software type"],
            correct: 1,
            hint: "Like a recipe"
        }
    ],
    engineering: [
        {
            question: "Strongest shape in engineering?",
            options: ["Square", "Triangle", "Circle", "Pentagon"],
            correct: 1,
            hint: "Think bridges"
        },
        {
            question: "What is an inclined plane?",
            options: ["Ramp", "Pulley", "Lever", "Wheel"],
            correct: 0,
            hint: "Helps move things up/down"
        },
        {
            question: "What is a fulcrum?",
            options: ["A screw", "Pivot point of lever", "Measuring tool", "Building material"],
            correct: 1,
            hint: "Think seesaw"
        },
        {
            question: "Best electrical conductor?",
            options: ["Plastic", "Wood", "Copper", "Rubber"],
            correct: 2,
            hint: "Used in wires"
        },
        {
            question: "Bridge arch purpose?",
            options: ["Looks nice", "Distributes weight", "Holds road", "Blocks wind"],
            correct: 1,
            hint: "Physics & force"
        }
    ]
};

// ==========================================
// BADGES SYSTEM
// ==========================================
const badges = [
    { id: 1, name: 'First Steps', icon: '🎯', unlocked: false },
    { id: 2, name: 'Week Warrior', icon: '🔥', unlocked: false },
    { id: 3, name: 'Math Master', icon: '🔢', unlocked: false },
    { id: 4, name: 'Science Star', icon: '⭐', unlocked: false },
    { id: 5, name: 'Tech Genius', icon: '💻', unlocked: false },
    { id: 6, name: 'Engineer Pro', icon: '⚙️', unlocked: false },
    { id: 7, name: 'Speed Demon', icon: '⚡', unlocked: false },
    { id: 8, name: 'Perfect Score', icon: '💯', unlocked: false },
    { id: 9, name: 'Explorer', icon: '🗺️', unlocked: false }
];

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
    // Create demo users
    appState.users = [
        {
            username: 'aakriti_singhal',
            email: 'student@demo.com',
            password: 'demo123',
            role: 'student',
            xp: 1250,
            level: 5,
            streak: 3,
            badges: [1, 4, 9]
        },
        {
            username: 'kadambri_agarwal',
            email: 'teacher@demo.com',
            password: 'demo123',
            role: 'teacher',
            xp: 500,
            level: 2,
            streak: 1,
            badges: []
        },
        {
            username: 'aditi_arora',
            email: 'teacher1@demo.com',
            password: 'demo123',
            role: 'teacher',
            xp: 500,
            level: 2,
            streak: 1,
            badges: []
        }
    ];

    renderStreakTracker();
    renderBadges();
    renderLeaderboard();
}

// ==========================================
// AUTH FUNCTIONS
// ==========================================
function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
}

function selectRole(role) {
    document.querySelectorAll('.role-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    event.target.closest('.role-option').classList.add('selected');
    appState.selectedRole = role;
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Find user
    const user = appState.users.find(u => 
        (u.username === username || u.email === username) && u.password === password
    );
    
    if (user) {
        appState.currentUser = user;
        showToast('Welcome back! 🎮', 'success');
        showApp();
    } else {
        showToast('Invalid credentials. Try: demo_student / demo123', 'error');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validation
    if (!appState.selectedRole) {
        showToast('Please select a role', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (appState.users.find(u => u.username === username || u.email === email)) {
        showToast('User already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        username,
        email,
        password,
        role: appState.selectedRole,
        xp: 0,
        level: 1,
        streak: 0,
        badges: []
    };
    
    appState.users.push(newUser);
    appState.currentUser = newUser;
    showToast('Account created! 🎉', 'success');
    showApp();
}

function continueAsGuest() {
    appState.currentUser = {
        username: 'Guest',
        role: 'student',
        xp: 0,
        level: 1,
        streak: 0,
        badges: [],
        isGuest: true
    };
    
    showToast('Welcome, Guest! 👋', 'success');
    showApp();
}

function logout() {
    appState.currentUser = null;
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('authPage').classList.remove('hidden');
    showToast('Logged out', 'success');
}

function toggleLanguage() {
    appState.language = appState.language === 'en' ? 'hi' : 'en';
    const newText = appState.language === 'en' ? '🌐 Switch to Hindi' : '🌐 Switch to English';
    document.getElementById('langToggleText').textContent = newText;
    showToast(`Language: ${appState.language === 'en' ? 'English' : 'Hindi'}`, 'success');
}

// ==========================================
// APP DISPLAY
// ==========================================
function showApp() {
    document.getElementById('authPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    
    const user = appState.currentUser;
    document.getElementById('welcomeUsername').textContent = user.username;
    document.getElementById('userAvatar').textContent = user.username[0].toUpperCase();
    document.getElementById('userLevel').textContent = user.level;
    document.getElementById('userXP').textContent = user.xp;
    document.getElementById('userStreak').textContent = user.streak;
    document.getElementById('userBadges').textContent = user.badges.length;
    
    // Show teacher nav if teacher
    if (user.role === 'teacher') {
        document.getElementById('teacherNav').classList.remove('hidden');
    }
    
    // Update profile page
    document.getElementById('profileAvatar').textContent = user.username[0].toUpperCase();
    document.getElementById('profileName').textContent = user.username;
    document.getElementById('profileRole').textContent = user.role.toUpperCase();
    document.getElementById('profileLevel').textContent = user.level;
    document.getElementById('profileXP').textContent = user.xp;
    document.getElementById('profileStreak').textContent = user.streak;
    
    navigateTo('dashboard');
}

// ==========================================
// NAVIGATION
// ==========================================
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('#mainApp > div[id$="Page"]').forEach(p => {
        p.classList.add('hidden');
    });
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected page
    const pageMap = {
        'dashboard': 'dashboardPage',
        'learn': 'dashboardPage',
        'labs': 'labsPage',
        'leaderboard': 'leaderboardPage',
        'profile': 'profilePage',
        'teacher': 'teacherPage'
    };
    
    document.getElementById(pageMap[page]).classList.remove('hidden');
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️';
    toast.innerHTML = `<span style="font-size: 24px;">${icon}</span><span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// STREAK TRACKER
// ==========================================
function renderStreakTracker() {
    const container = document.getElementById('streakTracker');
    container.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const day = document.createElement('div');
        day.className = 'streak-day';
        
        if (i < (appState.currentUser?.streak || 0)) {
            day.classList.add('active');
            day.textContent = '✓';
        } else {
            day.textContent = i + 1;
        }
        
        container.appendChild(day);
    }
}

// ==========================================
// BADGES
// ==========================================
function renderBadges() {
    const container = document.getElementById('badgesGrid');
    container.innerHTML = '';
    
    const userBadges = appState.currentUser?.badges || [];
    
    badges.forEach(badge => {
        const isUnlocked = userBadges.includes(badge.id);
        const badgeEl = document.createElement('div');
        badgeEl.className = `badge ${isUnlocked ? 'unlocked' : 'locked'}`;
        badgeEl.innerHTML = `
            <div style="font-size: 32px;">${badge.icon}</div>
            <div style="font-size: 10px; text-align: center;">${badge.name}</div>
        `;
        badgeEl.title = badge.name;
        container.appendChild(badgeEl);
    });
}

// ==========================================
// QUIZ SYSTEM
// ==========================================
function startSubject(subject) {
    appState.quiz.subject = subject;
    appState.quiz.currentQuestion = 0;
    appState.quiz.questions = [...quizBank[subject]];
    appState.quiz.score = 0;
    appState.quiz.startTime = Date.now();
    
    document.getElementById('dashboardPage').classList.add('hidden');
    document.getElementById('quizPage').classList.remove('hidden');
    
    const titles = {
        math: 'Mathematics Quiz 🔢',
        science: 'Science Quiz 🔬',
        technology: 'Technology Quiz 💻',
        engineering: 'Engineering Quiz ⚙️'
    };
    
    document.getElementById('quizSubject').textContent = titles[subject];
    document.getElementById('totalQuestions').textContent = appState.quiz.questions.length;
    
    renderQuestion();
    startQuizTimer();
}

function renderQuestion() {
    const quiz = appState.quiz;
    const question = quiz.questions[quiz.currentQuestion];
    
    document.getElementById('currentQuestion').textContent = quiz.currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    
    const progress = ((quiz.currentQuestion + 1) / quiz.questions.length) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';
    
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option';
        optionEl.innerHTML = `
            <div class="option-label">${String.fromCharCode(65 + index)}</div>
            <div style="flex: 1; font-size: 18px;">${option}</div>
        `;
        optionEl.onclick = () => selectAnswer(index);
        optionsGrid.appendChild(optionEl);
    });
    
    document.getElementById('hintBox').classList.remove('show');
    document.getElementById('hintBtn').disabled = false;
    document.getElementById('nextBtn').disabled = true;
}

function selectAnswer(index) {
    const quiz = appState.quiz;
    const question = quiz.questions[quiz.currentQuestion];
    
    // Clear previous selections
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
    });
    
    const options = document.querySelectorAll('.option');
    
    if (index === question.correct) {
        options[index].classList.add('correct');
        quiz.score++;
        const xpGain = 50;
        appState.currentUser.xp += xpGain;
        document.getElementById('userXP').textContent = appState.currentUser.xp;
        showToast(`Correct! +${xpGain} XP 🎉`, 'success');
        
        checkLevelUp();
        checkBadges();
    } else {
        options[index].classList.add('wrong');
        options[question.correct].classList.add('correct');
        showToast('Try again! 💪', 'error');
    }
    
    document.getElementById('nextBtn').disabled = false;
}

function showHint() {
    const quiz = appState.quiz;
    const question = quiz.questions[quiz.currentQuestion];
    
    document.getElementById('hintText').textContent = question.hint;
    document.getElementById('hintBox').classList.add('show');
    document.getElementById('hintBtn').disabled = true;
}

function nextQuestion() {
    const quiz = appState.quiz;
    
    if (quiz.currentQuestion < quiz.questions.length - 1) {
        quiz.currentQuestion++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    const quiz = appState.quiz;
    const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
    
    showToast(`Quiz Complete! Score: ${percentage}% 🎊`, 'success');
    
    // Award XP bonus for perfect score
    if (percentage === 100) {
        appState.currentUser.xp += 100;
        showToast('Perfect Score! +100 XP 🌟', 'success');
    }
    
    document.getElementById('quizPage').classList.add('hidden');
    document.getElementById('dashboardPage').classList.remove('hidden');
    
    document.getElementById('userXP').textContent = appState.currentUser.xp;
    document.getElementById('userBadges').textContent = appState.currentUser.badges.length;
}

function startQuizTimer() {
    let seconds = 0;
    const timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        document.getElementById('quizTimer').textContent = 
            `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

// ==========================================
// LEVEL UP SYSTEM
// ==========================================
function checkLevelUp() {
    const user = appState.currentUser;
    const xpForNextLevel = user.level * 500;
    
    if (user.xp >= xpForNextLevel) {
        user.level++;
        user.xp = user.xp - xpForNextLevel;
        showToast(`🎉 LEVEL UP! Level ${user.level}!`, 'success');
        document.getElementById('userLevel').textContent = user.level;
        document.getElementById('userXP').textContent = user.xp;
    }
}

// ==========================================
// BADGES SYSTEM
// ==========================================
function checkBadges() {
    const user = appState.currentUser;
    
    // First Steps badge
    if (!user.badges.includes(1)) {
        user.badges.push(1);
        showToast('🏆 Badge: First Steps!', 'success');
        renderBadges();
    }
    
    // Perfect Score badge
    if (appState.quiz.score === appState.quiz.questions.length && !user.badges.includes(8)) {
        user.badges.push(8);
        showToast('🏆 Badge: Perfect Score!', 'success');
        renderBadges();
    }
}

// ==========================================
// LEADERBOARD
// ==========================================
function renderLeaderboard() {
    const container = document.getElementById('leaderboardList');
    const leaderboard = [
        { name: 'ABHINAV PRATAP SINGH', score: 2850 },
        { name: 'AAKRITI SINGHAL', score: 2640 },
        { name: 'ADITYA SINGH', score: 2420 },
        { name: 'ADARSH', score: 2180 },
        { name: 'You', score: appState.currentUser?.xp || 0 }
    ].sort((a, b) => b.score - a.score);
    
    container.innerHTML = leaderboard.map((item, index) => `
        <div class="leaderboard-item">
            <div class="leaderboard-rank">${index + 1}</div>
            <div style="flex: 1; font-weight: 600;">${item.name}</div>
            <div style="font-size: 20px; font-weight: 700; color: var(--primary);">${item.score} XP</div>
        </div>
    `).join('');
}

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', init);
