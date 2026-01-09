// ========================================
// УПРАВЛЕНИЕ ТЕМОЙ
// ========================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        // Загрузка сохранённой темы из LocalStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        // Обработчик переключения темы
        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Обновляем иконку
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }

        // Обновляем графики при переключении темы
        if (window.appCharts) {
            window.appCharts.updateChartsTheme();
        }
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
}

// ========================================
// ХРАНИЛИЩЕ ДАННЫХ
// ========================================

class DataStore {
    constructor() {
        this.tasks = this.loadTasks();
        this.habits = this.loadHabits();
        this.initSampleData();
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadHabits() {
        const habits = localStorage.getItem('habits');
        return habits ? JSON.parse(habits) : [];
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }

    initSampleData() {
        // Инициализация примеров данных при первом запуске
        if (this.tasks.length === 0) {
            this.tasks = [
                {
                    id: Date.now() + 1,
                    name: 'Утренняя зарядка',
                    category: 'health',
                    type: 'daily',
                    priority: 'high',
                    status: 'completed',
                    startDate: '2026-01-09',
                    endDate: '',
                    plannedTime: 30,
                    actualTime: 25,
                    notes: 'Комплекс упражнений на 30 минут'
                },
                {
                    id: Date.now() + 2,
                    name: 'Работа над проектом',
                    category: 'work',
                    type: 'daily',
                    priority: 'high',
                    status: 'in-progress',
                    startDate: '2026-01-09',
                    endDate: '2026-01-31',
                    plannedTime: 240,
                    actualTime: 180,
                    notes: 'Разработка новой функциональности'
                },
                {
                    id: Date.now() + 3,
                    name: 'Изучение JavaScript',
                    category: 'learning',
                    type: 'daily',
                    priority: 'medium',
                    status: 'in-progress',
                    startDate: '2026-01-09',
                    endDate: '',
                    plannedTime: 60,
                    actualTime: 45,
                    notes: 'Продвинутые концепции ES6+'
                },
                {
                    id: Date.now() + 4,
                    name: 'Встреча с командой',
                    category: 'work',
                    type: 'weekly',
                    priority: 'high',
                    status: 'not-started',
                    startDate: '2026-01-10',
                    endDate: '',
                    plannedTime: 90,
                    actualTime: 0,
                    notes: 'Еженедельный статус проекта'
                },
                {
                    id: Date.now() + 5,
                    name: 'Чтение книг',
                    category: 'hobby',
                    type: 'daily',
                    priority: 'low',
                    status: 'completed',
                    startDate: '2026-01-09',
                    endDate: '',
                    plannedTime: 45,
                    actualTime: 60,
                    notes: 'Чтение перед сном'
                },
                {
                    id: Date.now() + 6,
                    name: 'Медитация',
                    category: 'health',
                    type: 'daily',
                    priority: 'medium',
                    status: 'completed',
                    startDate: '2026-01-09',
                    endDate: '',
                    plannedTime: 20,
                    actualTime: 20,
                    notes: 'Вечерняя практика осознанности'
                },
                {
                    id: Date.now() + 7,
                    name: 'Планирование недели',
                    category: 'personal',
                    type: 'weekly',
                    priority: 'medium',
                    status: 'not-started',
                    startDate: '2026-01-12',
                    endDate: '',
                    plannedTime: 30,
                    actualTime: 0,
                    notes: 'Воскресный обзор и планирование'
                },
                {
                    id: Date.now() + 8,
                    name: 'Покупка продуктов',
                    category: 'personal',
                    type: 'once',
                    priority: 'high',
                    status: 'not-started',
                    startDate: '2026-01-10',
                    endDate: '',
                    plannedTime: 60,
                    actualTime: 0,
                    notes: 'Список: молоко, хлеб, овощи'
                },
                {
                    id: Date.now() + 9,
                    name: 'Онлайн курс по дизайну',
                    category: 'learning',
                    type: 'weekly',
                    priority: 'medium',
                    status: 'in-progress',
                    startDate: '2026-01-09',
                    endDate: '2026-02-28',
                    plannedTime: 120,
                    actualTime: 90,
                    notes: 'UI/UX дизайн для начинающих'
                },
                {
                    id: Date.now() + 10,
                    name: 'Поход в спортзал',
                    category: 'health',
                    type: 'weekly',
                    priority: 'high',
                    status: 'not-started',
                    startDate: '2026-01-11',
                    endDate: '',
                    plannedTime: 90,
                    actualTime: 0,
                    notes: 'Тренировка: грудь и трицепсы'
                },
                {
                    id: Date.now() + 11,
                    name: 'Написание статьи в блог',
                    category: 'hobby',
                    type: 'monthly',
                    priority: 'low',
                    status: 'not-started',
                    startDate: '2026-01-15',
                    endDate: '',
                    plannedTime: 180,
                    actualTime: 0,
                    notes: 'Тема: организация рабочего времени'
                },
                {
                    id: Date.now() + 12,
                    name: 'Подготовка презентации',
                    category: 'work',
                    type: 'once',
                    priority: 'high',
                    status: 'in-progress',
                    startDate: '2026-01-09',
                    endDate: '2026-01-14',
                    plannedTime: 120,
                    actualTime: 60,
                    notes: 'Презентация квартальных результатов'
                },
                {
                    id: Date.now() + 13,
                    name: 'Звонок родителям',
                    category: 'personal',
                    type: 'weekly',
                    priority: 'medium',
                    status: 'completed',
                    startDate: '2026-01-09',
                    endDate: '',
                    plannedTime: 30,
                    actualTime: 45,
                    notes: 'Воскресный звонок'
                },
                {
                    id: Date.now() + 14,
                    name: 'Изучение английского',
                    category: 'learning',
                    type: 'daily',
                    priority: 'high',
                    status: 'in-progress',
                    startDate: '2026-01-09',
                    endDate: '',
                    plannedTime: 30,
                    actualTime: 30,
                    notes: 'Duolingo + подкасты'
                },
                {
                    id: Date.now() + 15,
                    name: 'Уборка дома',
                    category: 'personal',
                    type: 'weekly',
                    priority: 'medium',
                    status: 'not-started',
                    startDate: '2026-01-11',
                    endDate: '',
                    plannedTime: 120,
                    actualTime: 0,
                    notes: 'Генеральная уборка по субботам'
                }
            ];
            this.saveTasks();
        }

        if (this.habits.length === 0) {
            this.habits = [
                {
                    id: Date.now() + 101,
                    name: 'Выпить 2л воды',
                    category: 'health',
                    checks: [true, true, false, true, true, false, true]
                },
                {
                    id: Date.now() + 102,
                    name: 'Утренняя зарядка',
                    category: 'health',
                    checks: [true, false, true, true, false, true, true]
                },
                {
                    id: Date.now() + 103,
                    name: 'Медитация 10 мин',
                    category: 'personal',
                    checks: [true, true, true, true, true, true, false]
                },
                {
                    id: Date.now() + 104,
                    name: 'Чтение 30 мин',
                    category: 'learning',
                    checks: [true, true, false, false, true, true, true]
                },
                {
                    id: Date.now() + 105,
                    name: 'Английский язык',
                    category: 'learning',
                    checks: [true, true, true, false, true, true, false]
                },
                {
                    id: Date.now() + 106,
                    name: 'Прогулка 30 мин',
                    category: 'health',
                    checks: [false, true, true, true, false, true, true]
                },
                {
                    id: Date.now() + 107,
                    name: 'Планирование дня',
                    category: 'work',
                    checks: [true, true, true, true, true, false, false]
                }
            ];
            this.saveHabits();
        }
    }

    addTask(task) {
        task.id = Date.now();
        this.tasks.push(task);
        this.saveTasks();
    }

    updateTask(id, updatedTask) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...updatedTask };
            this.saveTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
    }

    addHabit(habit) {
        habit.id = Date.now();
        habit.checks = [false, false, false, false, false, false, false];
        this.habits.push(habit);
        this.saveHabits();
    }

    deleteHabit(id) {
        this.habits = this.habits.filter(h => h.id !== id);
        this.saveHabits();
    }

    toggleHabitCheck(habitId, dayIndex) {
        const habit = this.habits.find(h => h.id === habitId);
        if (habit) {
            habit.checks[dayIndex] = !habit.checks[dayIndex];
            this.saveHabits();
        }
    }

    exportData() {
        const data = {
            tasks: this.tasks,
            habits: this.habits,
            exportDate: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    }
}

// ========================================
// НАВИГАЦИЯ
// ========================================

class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.pages = document.querySelectorAll('.page');
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.nav = document.getElementById('mainNav');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = link.getAttribute('data-page');
                this.showPage(pageName);
                
                // Закрываем мобильное меню
                if (window.innerWidth <= 768) {
                    this.nav.classList.remove('mobile-open');
                }
            });
        });

        // Мобильное меню
        this.mobileMenuToggle.addEventListener('click', () => {
            this.nav.classList.toggle('mobile-open');
        });
    }

    showPage(pageName) {
        // Убираем active со всех страниц и ссылок
        this.pages.forEach(page => page.classList.remove('active'));
        this.navLinks.forEach(link => link.classList.remove('active'));

        // Добавляем active к выбранной странице и ссылке
        const activePage = document.getElementById(`page-${pageName}`);
        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        
        if (activePage) activePage.classList.add('active');
        if (activeLink) activeLink.classList.add('active');

        // Обновляем данные страницы
        if (pageName === 'dashboard') {
            window.app.renderDashboard();
        } else if (pageName === 'tasks') {
            window.app.renderTasks();
        } else if (pageName === 'habits') {
            window.app.renderHabits();
        } else if (pageName === 'weekly') {
            window.app.renderWeeklyPlan();
        } else if (pageName === 'calendar') {
            window.app.renderCalendar();
        } else if (pageName === 'analytics') {
            window.app.renderAnalytics();
        }
    }
}

// ========================================
// УПРАВЛЕНИЕ ГРАФИКАМИ
// ========================================

class ChartsManager {
    constructor(dataStore) {
        this.dataStore = dataStore;
        this.charts = {};
    }

    getChartColors() {
        const theme = document.documentElement.getAttribute('data-theme');
        const isDark = theme === 'dark';

        return {
            background: isDark ? '#2a2a2a' : '#ffffff',
            text: isDark ? '#e0e0e0' : '#2d3748',
            grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            border: isDark ? '#404040' : '#e2e8f0',
            colors: [
                '#667eea', '#764ba2', '#f093fb', '#f5576c',
                '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
                '#fa709a', '#fee140', '#feca57', '#ff6b6b'
            ]
        };
    }

    updateChartsTheme() {
        // Обновляем все существующие графики при изменении темы
        Object.keys(this.charts).forEach(chartId => {
            if (this.charts[chartId]) {
                this.charts[chartId].destroy();
            }
        });
        
        // Перерисовываем графики с новыми цветами
        this.renderAllCharts();
    }

    renderAllCharts() {
        this.renderStatusChart();
        this.renderCategoryChart();
        this.renderWeekdayChart();
        this.renderTrendChart();
        this.renderTimeChart();
        this.renderPriorityChart();
    }

    renderStatusChart() {
        const canvas = document.getElementById('statusChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();
        
        const statusCounts = {
            'not-started': 0,
            'in-progress': 0,
            'completed': 0
        };

        this.dataStore.tasks.forEach(task => {
            statusCounts[task.status]++;
        });

        if (this.charts.statusChart) {
            this.charts.statusChart.destroy();
        }

        this.charts.statusChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Не начато', 'В процессе', 'Выполнено'],
                datasets: [{
                    data: [
                        statusCounts['not-started'],
                        statusCounts['in-progress'],
                        statusCounts['completed']
                    ],
                    backgroundColor: [colors.colors[3], colors.colors[8], colors.colors[6]],
                    borderColor: colors.border,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    renderCategoryChart() {
        const canvas = document.getElementById('categoryChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();
        
        const categoryCounts = {};
        this.dataStore.tasks.forEach(task => {
            categoryCounts[task.category] = (categoryCounts[task.category] || 0) + 1;
        });

        const categoryLabels = {
            work: 'Работа',
            personal: 'Личное',
            health: 'Здоровье',
            learning: 'Обучение',
            hobby: 'Хобби'
        };

        if (this.charts.categoryChart) {
            this.charts.categoryChart.destroy();
        }

        this.charts.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categoryCounts).map(key => categoryLabels[key]),
                datasets: [{
                    data: Object.values(categoryCounts),
                    backgroundColor: colors.colors.slice(0, Object.keys(categoryCounts).length),
                    borderColor: colors.border,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    renderWeekdayChart() {
        const canvas = document.getElementById('weekdayChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();
        
        const weekdayCounts = [0, 0, 0, 0, 0, 0, 0];
        
        this.dataStore.tasks.forEach(task => {
            if (task.startDate) {
                const date = new Date(task.startDate);
                const day = date.getDay();
                const adjustedDay = day === 0 ? 6 : day - 1;
                weekdayCounts[adjustedDay]++;
            }
        });

        if (this.charts.weekdayChart) {
            this.charts.weekdayChart.destroy();
        }

        this.charts.weekdayChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Количество задач',
                    data: weekdayCounts,
                    backgroundColor: colors.colors[0],
                    borderColor: colors.border,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: colors.text,
                            stepSize: 1
                        },
                        grid: {
                            color: colors.grid
                        }
                    },
                    x: {
                        ticks: {
                            color: colors.text
                        },
                        grid: {
                            color: colors.grid
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: colors.text
                        }
                    }
                }
            }
        });
    }

    renderTrendChart() {
        const canvas = document.getElementById('trendChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();
        
        const last7Days = [];
        const completedCounts = [];
        const inProgressCounts = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            last7Days.push(date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }));
            
            completedCounts.push(Math.floor(Math.random() * 5) + 1);
            inProgressCounts.push(Math.floor(Math.random() * 3) + 1);
        }

        if (this.charts.trendChart) {
            this.charts.trendChart.destroy();
        }

        this.charts.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [
                    {
                        label: 'Выполнено',
                        data: completedCounts,
                        borderColor: colors.colors[6],
                        backgroundColor: colors.colors[6] + '33',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'В процессе',
                        data: inProgressCounts,
                        borderColor: colors.colors[8],
                        backgroundColor: colors.colors[8] + '33',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: colors.text,
                            stepSize: 1
                        },
                        grid: {
                            color: colors.grid
                        }
                    },
                    x: {
                        ticks: {
                            color: colors.text
                        },
                        grid: {
                            color: colors.grid
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: colors.text
                        }
                    }
                }
            }
        });
    }

    renderTimeChart() {
        const canvas = document.getElementById('timeChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();
        
        const plannedTimes = [];
        const actualTimes = [];
        const taskNames = [];

        this.dataStore.tasks.slice(0, 8).forEach(task => {
            taskNames.push(task.name.length > 15 ? task.name.substring(0, 15) + '...' : task.name);
            plannedTimes.push(task.plannedTime || 0);
            actualTimes.push(task.actualTime || 0);
        });

        if (this.charts.timeChart) {
            this.charts.timeChart.destroy();
        }

        this.charts.timeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: taskNames,
                datasets: [
                    {
                        label: 'Плановое время (мин)',
                        data: plannedTimes,
                        backgroundColor: colors.colors[4],
                        borderColor: colors.border,
                        borderWidth: 1
                    },
                    {
                        label: 'Фактическое время (мин)',
                        data: actualTimes,
                        backgroundColor: colors.colors[1],
                        borderColor: colors.border,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: colors.text
                        },
                        grid: {
                            color: colors.grid
                        }
                    },
                    x: {
                        ticks: {
                            color: colors.text,
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            color: colors.grid
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: colors.text
                        }
                    }
                }
            }
        });
    }

    renderPriorityChart() {
        const canvas = document.getElementById('priorityChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();
        
        const priorityCounts = {
            high: 0,
            medium: 0,
            low: 0
        };

        this.dataStore.tasks.forEach(task => {
            priorityCounts[task.priority]++;
        });

        if (this.charts.priorityChart) {
            this.charts.priorityChart.destroy();
        }

        this.charts.priorityChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Высокий', 'Средний', 'Низкий'],
                datasets: [{
                    data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
                    backgroundColor: [colors.colors[3], colors.colors[8], colors.colors[6]],
                    borderColor: colors.border,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
}

// ========================================
// УПРАВЛЕНИЕ РАСПИСАНИЕМ
// ========================================

class ScheduleManager {
    /**
     * Проверяет, должна ли задача выполняться в указанную дату
     * @param {Object} task - Объект задачи
     * @param {Date} date - Дата для проверки
     * @returns {boolean}
     */
    static isTaskActiveOnDate(task, date) {
        const taskDate = new Date(date);
        taskDate.setHours(0, 0, 0, 0);
        
        const startDate = task.startDate ? new Date(task.startDate) : null;
        if (startDate) startDate.setHours(0, 0, 0, 0);
        
        const endDate = task.endDate ? new Date(task.endDate) : null;
        if (endDate) endDate.setHours(0, 0, 0, 0);

        const recurrenceEnd = task.recurrenceEnd ? new Date(task.recurrenceEnd) : null;
        if (recurrenceEnd) recurrenceEnd.setHours(0, 0, 0, 0);

        // Проверка на дату начала
        if (startDate && taskDate < startDate) {
            return false;
        }

        // Проверка на дату окончания (для разовых задач)
        if (task.type === 'once' && endDate && taskDate > endDate) {
            return false;
        }

        // Проверка на дату окончания повторений
        if (recurrenceEnd && taskDate > recurrenceEnd) {
            return false;
        }

        // Проверка исключений
        if (task.exceptions && Array.isArray(task.exceptions)) {
            const dateStr = taskDate.toISOString().split('T')[0];
            if (task.exceptions.includes(dateStr)) {
                return false;
            }
        }

        // Обработка по типу задачи
        switch (task.type) {
            case 'once':
                // Разовая задача - только в дату начала
                if (startDate) {
                    return taskDate.getTime() === startDate.getTime();
                }
                return false;

            case 'daily':
                // Ежедневная задача
                return true;

            case 'weekly':
                // Еженедельная с выбором дней
                if (task.weekdays && Array.isArray(task.weekdays) && task.weekdays.length > 0) {
                    const dayOfWeek = taskDate.getDay();
                    return task.weekdays.includes(dayOfWeek);
                }
                // По умолчанию - каждую неделю в тот же день, что и дата начала
                if (startDate) {
                    return taskDate.getDay() === startDate.getDay();
                }
                return false;

            case 'monthly':
                // Месячная с выбором дней месяца
                if (task.monthDays && Array.isArray(task.monthDays) && task.monthDays.length > 0) {
                    const dayOfMonth = taskDate.getDate();
                    
                    // Проверка на конкретные дни месяца
                    if (task.monthDays.includes(dayOfMonth)) {
                        return true;
                    }
                    
                    // Проверка на последний день месяца
                    if (task.lastDayOfMonth) {
                        const lastDay = new Date(taskDate.getFullYear(), taskDate.getMonth() + 1, 0).getDate();
                        return dayOfMonth === lastDay;
                    }
                    
                    return false;
                }
                // По умолчанию - каждый месяц в тот же день, что и дата начала
                if (startDate) {
                    return taskDate.getDate() === startDate.getDate();
                }
                return false;

            case 'custom':
                // Настраиваемое расписание с интервалом
                if (task.interval && startDate) {
                    const daysDiff = Math.floor((taskDate - startDate) / (1000 * 60 * 60 * 24));
                    if (daysDiff < 0) return false;
                    
                    // Проверяем кратность интервалу
                    if (daysDiff % task.interval === 0) {
                        // Дополнительная проверка на дни недели, если указаны
                        if (task.weekdays && Array.isArray(task.weekdays) && task.weekdays.length > 0) {
                            const dayOfWeek = taskDate.getDay();
                            return task.weekdays.includes(dayOfWeek);
                        }
                        return true;
                    }
                }
                return false;

            default:
                return false;
        }
    }

    /**
     * Получает список дат, когда задача активна в указанном диапазоне
     * @param {Object} task - Объект задачи
     * @param {Date} startRange - Начало диапазона
     * @param {Date} endRange - Конец диапазона
     * @returns {Array<Date>}
     */
    static getTaskActiveDates(task, startRange, endRange) {
        const activeDates = [];
        const currentDate = new Date(startRange);
        
        while (currentDate <= endRange) {
            if (this.isTaskActiveOnDate(task, currentDate)) {
                activeDates.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return activeDates;
    }

    /**
     * Генерирует текстовое описание расписания
     * @param {Object} task - Объект задачи
     * @returns {string}
     */
    static getScheduleDescription(task) {
        switch (task.type) {
            case 'once':
                return 'Разовая задача';

            case 'daily':
                return 'Каждый день';

            case 'weekly':
                if (task.weekdays && task.weekdays.length > 0) {
                    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
                    const selectedDays = task.weekdays.map(d => dayNames[d]).join(', ');
                    return `Еженедельно: ${selectedDays}`;
                }
                return 'Еженедельно';

            case 'monthly':
                if (task.monthDays && task.monthDays.length > 0) {
                    const days = task.monthDays.join(', ');
                    let desc = `Ежемесячно: ${days} число`;
                    if (task.lastDayOfMonth) {
                        desc += ' + последний день';
                    }
                    return desc;
                }
                if (task.lastDayOfMonth) {
                    return 'Ежемесячно: последний день';
                }
                return 'Ежемесячно';

            case 'custom':
                if (task.interval) {
                    let desc = `Каждые ${task.interval} дн.`;
                    if (task.weekdays && task.weekdays.length > 0) {
                        const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
                        const selectedDays = task.weekdays.map(d => dayNames[d]).join(', ');
                        desc += ` (${selectedDays})`;
                    }
                    return desc;
                }
                return 'Настраиваемое';

            default:
                return 'Не указано';
        }
    }
}

// ========================================
// ГЛАВНОЕ ПРИЛОЖЕНИЕ
// ========================================

class App {
    constructor() {
        this.dataStore = new DataStore();
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.chartsManager = new ChartsManager(this.dataStore);
        
        // Глобальный доступ к графикам для обновления темы
        window.appCharts = this.chartsManager;
        
        this.currentFilters = {
            category: 'all',
            type: 'all',
            priority: 'all',
            status: 'all',
            search: ''
        };

        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderDashboard();
    }

    setupEventListeners() {
        // Быстрое добавление задачи
        document.getElementById('quickAddBtn').addEventListener('click', () => {
            const input = document.getElementById('quickTaskInput');
            const name = input.value.trim();
            if (name) {
                this.dataStore.addTask({
                    name,
                    category: 'personal',
                    type: 'once',
                    priority: 'medium',
                    status: 'not-started',
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: '',
                    plannedTime: 0,
                    actualTime: 0,
                    notes: ''
                });
                input.value = '';
                this.renderDashboard();
                this.renderTasks();
            }
        });

        // Модальное окно задачи
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            this.openTaskModal();
        });

        document.getElementById('closeTaskModal').addEventListener('click', () => {
            this.closeTaskModal();
        });

        document.getElementById('cancelTaskBtn').addEventListener('click', () => {
            this.closeTaskModal();
        });

        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });

        // Модальное окно привычки
        document.getElementById('addHabitBtn').addEventListener('click', () => {
            this.openHabitModal();
        });

        document.getElementById('closeHabitModal').addEventListener('click', () => {
            this.closeHabitModal();
        });

        document.getElementById('cancelHabitBtn').addEventListener('click', () => {
            this.closeHabitModal();
        });

        document.getElementById('habitForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveHabit();
        });

        // Обработчики продвинутого расписания
        document.getElementById('taskType').addEventListener('change', (e) => {
            this.updateScheduleVisibility(e.target.value);
        });

        // Добавление исключения
        document.getElementById('addException').addEventListener('click', () => {
            const dateInput = document.getElementById('exceptionDate');
            const date = dateInput.value;
            if (date) {
                this.addException(date);
                dateInput.value = '';
            }
        });

        // Генерация дней месяца
        this.initMonthDaysSelector();

        // Фильтры задач
        document.getElementById('filterCategory').addEventListener('change', (e) => {
            this.currentFilters.category = e.target.value;
            this.renderTasks();
        });

        document.getElementById('filterType').addEventListener('change', (e) => {
            this.currentFilters.type = e.target.value;
            this.renderTasks();
        });

        document.getElementById('filterPriority').addEventListener('change', (e) => {
            this.currentFilters.priority = e.target.value;
            this.renderTasks();
        });

        document.getElementById('filterStatus').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.renderTasks();
        });

        document.getElementById('searchTasks').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.renderTasks();
        });

        // Календарь
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.renderCalendar();
        });

        // Экспорт данных
        document.getElementById('exportDataBtn').addEventListener('click', () => {
            const data = this.dataStore.exportData();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `planner-export-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
        });

        // Модальное окно задач дня
        document.getElementById('closeDayTasksModal').addEventListener('click', () => {
            document.getElementById('dayTasksModal').classList.remove('active');
        });

        // Закрытие модальных окон по клику вне их
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }

    renderDashboard() {
        // KPI метрики
        const totalTasks = this.dataStore.tasks.length;
        const completedTasks = this.dataStore.tasks.filter(t => t.status === 'completed').length;
        const inProgressTasks = this.dataStore.tasks.filter(t => t.status === 'in-progress').length;
        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        document.getElementById('kpi-total').textContent = totalTasks;
        document.getElementById('kpi-completed').textContent = completedTasks;
        document.getElementById('kpi-inprogress').textContent = inProgressTasks;
        document.getElementById('kpi-percentage').textContent = percentage + '%';

        // Задачи на сегодня
        const today = new Date();
        const todayTasks = this.dataStore.tasks.filter(task => {
            return ScheduleManager.isTaskActiveOnDate(task, today);
        });

        const todayTasksList = document.getElementById('todayTasksList');
        
        if (todayTasks.length === 0) {
            todayTasksList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">На сегодня задач нет! 🎉</p>';
        } else {
            todayTasksList.innerHTML = todayTasks.map(task => `
                <div class="today-task-item ${task.status === 'completed' ? 'completed' : ''}">
                    <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} onchange="app.toggleTaskStatus(${task.id})">
                    <label>${task.name}</label>
                    <span class="task-priority-badge priority-${task.priority}">
                        ${task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                </div>
            `).join('');
        }
    }

    toggleTaskStatus(taskId) {
        const task = this.dataStore.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = task.status === 'completed' ? 'not-started' : 'completed';
            this.dataStore.saveTasks();
            this.renderDashboard();
            this.renderTasks();
        }
    }

    renderTasks() {
        let filteredTasks = this.dataStore.tasks;

        // Применяем фильтры
        if (this.currentFilters.category !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.category === this.currentFilters.category);
        }
        if (this.currentFilters.type !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.type === this.currentFilters.type);
        }
        if (this.currentFilters.priority !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.priority === this.currentFilters.priority);
        }
        if (this.currentFilters.status !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.status === this.currentFilters.status);
        }
        if (this.currentFilters.search) {
            filteredTasks = filteredTasks.filter(t => 
                t.name.toLowerCase().includes(this.currentFilters.search) ||
                (t.notes && t.notes.toLowerCase().includes(this.currentFilters.search))
            );
        }

        const tasksList = document.getElementById('tasksList');
        
        if (filteredTasks.length === 0) {
            tasksList.innerHTML = '<p style="grid-column: 1/-1; color: var(--text-secondary); text-align: center; padding: 2rem;">Задачи не найдены</p>';
        } else {
            tasksList.innerHTML = filteredTasks.map(task => {
                const categoryLabels = {
                    work: 'Работа',
                    personal: 'Личное',
                    health: 'Здоровье',
                    learning: 'Обучение',
                    hobby: 'Хобби'
                };

                const typeLabels = {
                    once: 'Разовая',
                    daily: 'Ежедневная',
                    weekly: 'Еженедельная',
                    monthly: 'Месячная',
                    custom: 'Настраиваемая'
                };

                const statusLabels = {
                    'not-started': 'Не начато',
                    'in-progress': 'В процессе',
                    'completed': 'Выполнено'
                };

                const progress = task.plannedTime > 0 
                    ? Math.min(Math.round((task.actualTime / task.plannedTime) * 100), 100)
                    : 0;

                const priorityColor = task.priority === 'high' ? '#667eea' : 
                                     task.priority === 'medium' ? '#f093fb' : '#43e97b';

                return `
                    <div class="task-card" style="border-left-color: ${priorityColor};">
                        <div class="task-card-header">
                            <div>
                                <h4 class="task-card-title">${task.name}</h4>
                                <div class="task-card-meta">
                                    <span class="task-badge category-${task.category}">${categoryLabels[task.category]}</span>
                                    <span class="task-badge priority-${task.priority}">${task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}</span>
                                    <span class="task-badge status-${task.status}">${statusLabels[task.status]}</span>
                                </div>
                            </div>
                            <div class="task-card-actions">
                                <button class="task-action-btn edit" onclick="app.editTask(${task.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="task-action-btn delete" onclick="app.deleteTask(${task.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        ${task.notes ? `<p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.9rem;">${task.notes}</p>` : ''}

                        <div class="task-card-progress">
                            <div class="progress-label">
                                <span>Прогресс</span>
                                <span>${progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%;"></div>
                            </div>
                        </div>

                        ${this.getSchedulePreviewHTML(task)}

                        <div class="task-card-footer">
                            <span>
                                <i class="fas fa-clock"></i>
                                ${task.plannedTime || 0} / ${task.actualTime || 0} мин
                            </span>
                            <span>
                                <i class="fas fa-calendar"></i>
                                ${typeLabels[task.type]}
                            </span>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    openTaskModal(task = null) {
        const modal = document.getElementById('taskModal');
        const form = document.getElementById('taskForm');
        const title = document.getElementById('taskModalTitle');

        // Очистка предыдущих исключений
        this.currentExceptions = [];

        if (task) {
            title.textContent = 'Редактировать задачу';
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskName').value = task.name;
            document.getElementById('taskCategory').value = task.category;
            document.getElementById('taskType').value = task.type;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskStatus').value = task.status;
            document.getElementById('taskStartDate').value = task.startDate;
            document.getElementById('taskEndDate').value = task.endDate;
            document.getElementById('taskPlannedTime').value = task.plannedTime || '';
            document.getElementById('taskActualTime').value = task.actualTime || '';
            document.getElementById('taskNotes').value = task.notes;

            // Загрузка данных расписания
            if (task.weekdays) {
                task.weekdays.forEach(day => {
                    const checkbox = document.querySelector(`input[name="weekdays"][value="${day}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }

            if (task.interval) {
                document.getElementById('taskInterval').value = task.interval;
            }

            if (task.monthDays) {
                task.monthDays.forEach(day => {
                    const checkbox = document.querySelector(`input[name="monthDays"][value="${day}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }

            if (task.lastDayOfMonth) {
                document.getElementById('lastDayOfMonth').checked = true;
            }

            if (task.exceptions) {
                this.currentExceptions = [...task.exceptions];
                this.renderExceptions();
            }

            if (task.recurrenceEnd) {
                document.getElementById('taskRecurrenceEnd').value = task.recurrenceEnd;
            }

            if (task.time) {
                document.getElementById('taskTime').value = task.time;
            }

            // Показать нужные секции расписания
            this.updateScheduleVisibility(task.type);
        } else {
            title.textContent = 'Добавить задачу';
            form.reset();
            document.getElementById('taskId').value = '';
            document.getElementById('taskStartDate').value = new Date().toISOString().split('T')[0];
            this.currentExceptions = [];
            this.renderExceptions();
            this.updateScheduleVisibility('once');
        }

        modal.classList.add('active');
    }

    closeTaskModal() {
        document.getElementById('taskModal').classList.remove('active');
        document.getElementById('taskForm').reset();
        
        // Очистка чекбоксов дней недели
        document.querySelectorAll('input[name="weekdays"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[name="monthDays"]').forEach(cb => cb.checked = false);
        document.getElementById('lastDayOfMonth').checked = false;
        
        // Очистка исключений
        this.currentExceptions = [];
        this.renderExceptions();
        
        // Скрыть продвинутое расписание
        document.getElementById('advancedSchedule').style.display = 'none';
    }

    saveTask() {
        const taskId = document.getElementById('taskId').value;
        const taskType = document.getElementById('taskType').value;
        
        const taskData = {
            name: document.getElementById('taskName').value,
            category: document.getElementById('taskCategory').value,
            type: taskType,
            priority: document.getElementById('taskPriority').value,
            status: document.getElementById('taskStatus').value,
            startDate: document.getElementById('taskStartDate').value,
            endDate: document.getElementById('taskEndDate').value,
            plannedTime: parseInt(document.getElementById('taskPlannedTime').value) || 0,
            actualTime: parseInt(document.getElementById('taskActualTime').value) || 0,
            notes: document.getElementById('taskNotes').value
        };

        // Сохранение дней недели для weekly и custom
        if (taskType === 'weekly' || taskType === 'custom') {
            const weekdayCheckboxes = document.querySelectorAll('input[name="weekdays"]:checked');
            taskData.weekdays = Array.from(weekdayCheckboxes).map(cb => parseInt(cb.value));
        }

        // Сохранение интервала для custom
        if (taskType === 'custom') {
            taskData.interval = parseInt(document.getElementById('taskInterval').value) || 1;
        }

        // Сохранение дней месяца для monthly
        if (taskType === 'monthly') {
            const monthDayCheckboxes = document.querySelectorAll('input[name="monthDays"]:checked');
            taskData.monthDays = Array.from(monthDayCheckboxes).map(cb => parseInt(cb.value));
            taskData.lastDayOfMonth = document.getElementById('lastDayOfMonth').checked;
        }

        // Сохранение исключений
        taskData.exceptions = this.currentExceptions || [];

        // Сохранение даты окончания повторений
        const recurrenceEnd = document.getElementById('taskRecurrenceEnd').value;
        if (recurrenceEnd) {
            taskData.recurrenceEnd = recurrenceEnd;
        }

        // Сохранение времени выполнения
        const taskTime = document.getElementById('taskTime').value;
        if (taskTime) {
            taskData.time = taskTime;
        }

        if (taskId) {
            this.dataStore.updateTask(parseInt(taskId), taskData);
        } else {
            this.dataStore.addTask(taskData);
        }

        // Очистка временных данных
        this.currentExceptions = [];

        this.closeTaskModal();
        this.renderDashboard();
        this.renderTasks();
        this.renderWeeklyPlan(); // Обновляем недельный план
    }

    editTask(taskId) {
        const task = this.dataStore.tasks.find(t => t.id === taskId);
        if (task) {
            this.openTaskModal(task);
        }
    }

    deleteTask(taskId) {
        if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
            this.dataStore.deleteTask(taskId);
            this.renderDashboard();
            this.renderTasks();
        }
    }

    renderHabits() {
        const habitsList = document.getElementById('habitsList');
        const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        if (this.dataStore.habits.length === 0) {
            habitsList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Добавьте свою первую привычку!</p>';
        } else {
            habitsList.innerHTML = this.dataStore.habits.map(habit => {
                const totalChecks = habit.checks.filter(c => c).length;
                const percentage = Math.round((totalChecks / 7) * 100);
                
                // Подсчёт серии
                let currentStreak = 0;
                let maxStreak = 0;
                let tempStreak = 0;
                
                for (let i = 0; i < habit.checks.length; i++) {
                    if (habit.checks[i]) {
                        tempStreak++;
                        maxStreak = Math.max(maxStreak, tempStreak);
                    } else {
                        tempStreak = 0;
                    }
                }
                
                // Текущая серия с конца
                for (let i = habit.checks.length - 1; i >= 0; i--) {
                    if (habit.checks[i]) {
                        currentStreak++;
                    } else {
                        break;
                    }
                }

                return `
                    <div class="habit-card">
                        <div class="habit-header">
                            <span class="habit-name">${habit.name}</span>
                            <button class="habit-delete" onclick="app.deleteHabit(${habit.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="habit-days">
                            ${dayNames.map((day, index) => `
                                <div class="habit-day ${habit.checks[index] ? 'checked' : ''}" onclick="app.toggleHabitDay(${habit.id}, ${index})">
                                    <span class="habit-day-name">${day}</span>
                                    ${habit.checks[index] ? '<i class="fas fa-check"></i>' : ''}
                                </div>
                            `).join('')}
                        </div>
                        <div class="habit-stats">
                            <span>🔥 Серия: ${currentStreak} дней</span>
                            <span>📊 Выполнено: ${percentage}%</span>
                            <span>🏆 Лучшая серия: ${maxStreak} дней</span>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    openHabitModal() {
        document.getElementById('habitModal').classList.add('active');
    }

    closeHabitModal() {
        document.getElementById('habitModal').classList.remove('active');
        document.getElementById('habitForm').reset();
    }

    saveHabit() {
        const habitData = {
            name: document.getElementById('habitName').value,
            category: document.getElementById('habitCategory').value
        };

        this.dataStore.addHabit(habitData);
        this.closeHabitModal();
        this.renderHabits();
    }

    deleteHabit(habitId) {
        if (confirm('Вы уверены, что хотите удалить эту привычку?')) {
            this.dataStore.deleteHabit(habitId);
            this.renderHabits();
        }
    }

    toggleHabitDay(habitId, dayIndex) {
        this.dataStore.toggleHabitCheck(habitId, dayIndex);
        this.renderHabits();
    }

    renderWeeklyPlan() {
        const weeklyBody = document.getElementById('weeklyBody');
        const hours = [];
        
        for (let h = 6; h <= 22; h++) {
            hours.push(`${h.toString().padStart(2, '0')}:00`);
        }

        // Получаем текущую неделю (Пн-Вс)
        const today = new Date();
        const currentDay = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

        // Массив дат на неделю
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            weekDates.push(date);
        }

        // Создаем сетку с задачами
        let html = '';
        hours.forEach((time, timeIndex) => {
            html += `<div class="weekly-time">${time}</div>`;
            
            // Для каждого дня недели
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                const currentDate = weekDates[dayIndex];
                const cellTasks = this.getTasksForTimeSlot(currentDate, time);
                
                html += `<div class="weekly-cell" data-day="${dayIndex}" data-time="${time}">`;
                
                if (cellTasks.length > 0) {
                    cellTasks.forEach(task => {
                        const categoryClass = `category-${task.category}`;
                        html += `
                            <div class="weekly-task ${categoryClass}" onclick="app.editTask(${task.id})" title="${task.name}">
                                <i class="fas fa-circle"></i>
                                <span class="weekly-task-name">${task.name}</span>
                            </div>
                        `;
                    });
                }
                
                html += `</div>`;
            }
        });

        weeklyBody.innerHTML = html;
    }

    getTasksForTimeSlot(date, timeSlot) {
        // Получаем все задачи, активные в этот день
        const activeTasks = this.dataStore.tasks.filter(task => {
            return ScheduleManager.isTaskActiveOnDate(task, date) && task.time;
        });

        // Фильтруем по времени
        return activeTasks.filter(task => {
            if (!task.time) return false;
            
            // Сравниваем только час
            const taskHour = task.time.split(':')[0];
            const slotHour = timeSlot.split(':')[0];
            
            return taskHour === slotHour;
        });
    }

    renderCalendar() {
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];

        document.getElementById('currentMonth').textContent = 
            `${monthNames[this.currentMonth]} ${this.currentYear}`;

        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const prevLastDay = new Date(this.currentYear, this.currentMonth, 0);
        
        const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        const lastDayDate = lastDay.getDate();
        const prevLastDayDate = prevLastDay.getDate();

        const calendar = document.getElementById('calendar');
        
        let calendarHTML = `
            <div class="calendar-header">
                ${['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => 
                    `<div class="calendar-weekday">${day}</div>`
                ).join('')}
            </div>
            <div class="calendar-body">
        `;

        // Предыдущий месяц
        for (let i = firstDayIndex; i > 0; i--) {
            calendarHTML += `<div class="calendar-day other-month">${prevLastDayDate - i + 1}</div>`;
        }

        // Текущий месяц
        const today = new Date();
        for (let day = 1; day <= lastDayDate; day++) {
            const isToday = day === today.getDate() && 
                          this.currentMonth === today.getMonth() && 
                          this.currentYear === today.getFullYear();
            
            const dateStr = `${this.currentYear}-${(this.currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const dayDate = new Date(dateStr);
            const dayTasks = this.dataStore.tasks.filter(task => 
                ScheduleManager.isTaskActiveOnDate(task, dayDate)
            );
            
            calendarHTML += `
                <div class="calendar-day ${isToday ? 'today' : ''}" onclick="app.showDayTasks('${dateStr}')">
                    <span class="calendar-day-number">${day}</span>
                    ${dayTasks.length > 0 ? `
                        <div class="calendar-tasks-indicator">
                            ${dayTasks.slice(0, 3).map(() => '<div class="task-dot"></div>').join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Следующий месяц
        const remainingDays = 42 - (firstDayIndex + lastDayDate);
        for (let day = 1; day <= remainingDays; day++) {
            calendarHTML += `<div class="calendar-day other-month">${day}</div>`;
        }

        calendarHTML += '</div>';
        calendar.innerHTML = calendarHTML;
    }

    showDayTasks(dateStr) {
        const date = new Date(dateStr);
        const dayTasks = this.dataStore.tasks.filter(task => {
            return ScheduleManager.isTaskActiveOnDate(task, date);
        });

        const modal = document.getElementById('dayTasksModal');
        const title = document.getElementById('dayTasksModalTitle');
        const content = document.getElementById('dayTasksContent');

        const dateFormatted = date.toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });

        title.textContent = `Задачи на ${dateFormatted}`;

        if (dayTasks.length === 0) {
            content.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">На этот день задач нет</p>';
        } else {
            content.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${dayTasks.map(task => `
                        <div class="today-task-item">
                            <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} onchange="app.toggleTaskStatus(${task.id})">
                            <label>${task.name}</label>
                            <span class="task-priority-badge priority-${task.priority}">
                                ${task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                            </span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        modal.classList.add('active');
    }

    renderAnalytics() {
        // KPI метрики
        const totalTasks = this.dataStore.tasks.length;
        const completedTasks = this.dataStore.tasks.filter(t => t.status === 'completed').length;
        const inProgressTasks = this.dataStore.tasks.filter(t => t.status === 'in-progress').length;
        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        document.getElementById('analytics-total').textContent = totalTasks;
        document.getElementById('analytics-completed').textContent = completedTasks;
        document.getElementById('analytics-inprogress').textContent = inProgressTasks;
        document.getElementById('analytics-percentage').textContent = percentage + '%';

        // Графики
        this.chartsManager.renderAllCharts();
    }

    // ========================================
    // МЕТОДЫ УПРАВЛЕНИЯ ПРОДВИНУТЫМ РАСПИСАНИЕМ
    // ========================================

    updateScheduleVisibility(type) {
        const advancedSchedule = document.getElementById('advancedSchedule');
        const weekdaySelector = document.getElementById('weekdaySelector');
        const intervalSelector = document.getElementById('intervalSelector');
        const monthDaysSelector = document.getElementById('monthDaysSelector');

        // Скрываем все секции по умолчанию
        weekdaySelector.style.display = 'none';
        intervalSelector.style.display = 'none';
        monthDaysSelector.style.display = 'none';
        advancedSchedule.style.display = 'none';

        // Показываем нужные секции в зависимости от типа
        if (type === 'weekly') {
            advancedSchedule.style.display = 'block';
            weekdaySelector.style.display = 'block';
        } else if (type === 'monthly') {
            advancedSchedule.style.display = 'block';
            monthDaysSelector.style.display = 'block';
        } else if (type === 'custom') {
            advancedSchedule.style.display = 'block';
            weekdaySelector.style.display = 'block';
            intervalSelector.style.display = 'block';
        } else if (type !== 'once' && type !== 'daily') {
            advancedSchedule.style.display = 'block';
        }
    }

    initMonthDaysSelector() {
        const grid = document.querySelector('.month-days-grid');
        if (!grid || grid.children.length > 0) return; // Уже инициализирован

        for (let day = 1; day <= 31; day++) {
            const label = document.createElement('label');
            label.className = 'month-day-checkbox';
            label.innerHTML = `
                <input type="checkbox" name="monthDays" value="${day}">
                <span>${day}</span>
            `;
            grid.appendChild(label);
        }
    }

    addException(date) {
        if (!this.currentExceptions) {
            this.currentExceptions = [];
        }

        if (!this.currentExceptions.includes(date)) {
            this.currentExceptions.push(date);
            this.renderExceptions();
        }
    }

    removeException(date) {
        if (this.currentExceptions) {
            this.currentExceptions = this.currentExceptions.filter(d => d !== date);
            this.renderExceptions();
        }
    }

    renderExceptions() {
        const list = document.getElementById('exceptionsList');
        if (!this.currentExceptions || this.currentExceptions.length === 0) {
            list.innerHTML = '';
            return;
        }

        list.innerHTML = this.currentExceptions.map(date => {
            const formatted = new Date(date).toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
            });
            return `
                <div class="exception-tag">
                    <span>${formatted}</span>
                    <button type="button" onclick="app.removeException('${date}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }).join('');
    }

    getSchedulePreviewHTML(task) {
        // Не показываем для разовых задач или задач без расписания
        if (task.type === 'once' || !task.type) {
            return '';
        }

        const description = ScheduleManager.getScheduleDescription(task);
        let content = `<div class="schedule-info-item">
            <i class="fas fa-repeat"></i>
            <span>${description}</span>
        </div>`;

        // Добавляем визуализацию дней недели
        if (task.weekdays && task.weekdays.length > 0) {
            const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            const dayBadges = task.weekdays.map(d => 
                `<span class="schedule-day-badge">${dayNames[d]}</span>`
            ).join('');
            content += `<div class="schedule-days">${dayBadges}</div>`;
        }

        // Добавляем время выполнения, если есть
        if (task.time) {
            content += `<div class="schedule-info-item">
                <i class="fas fa-clock"></i>
                <span>Время: ${task.time}</span>
            </div>`;
        }

        // Добавляем дату окончания, если есть
        if (task.recurrenceEnd) {
            const endDate = new Date(task.recurrenceEnd).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            content += `<div class="schedule-info-item">
                <i class="fas fa-calendar-times"></i>
                <span>До: ${endDate}</span>
            </div>`;
        }

        // Добавляем исключения, если есть
        if (task.exceptions && task.exceptions.length > 0) {
            content += `<div class="schedule-info-item">
                <i class="fas fa-ban"></i>
                <span>Исключений: ${task.exceptions.length}</span>
            </div>`;
        }

        return `
            <div class="schedule-preview">
                <div class="schedule-preview-title">
                    <i class="fas fa-calendar-alt"></i>
                    Расписание
                </div>
                <div class="schedule-preview-content">
                    ${content}
                </div>
            </div>
        `;
    }
}

// ========================================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
