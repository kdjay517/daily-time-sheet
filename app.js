// Daily Log Tracker - Modern ES6+ Implementation
class DailyLogTracker {
    constructor() {
        this.currentUser = null;
        this.currentDate = new Date();
        this.currentView = 'dashboard';
        this.entries = new Map();
        this.projects = [];
        this.leaveTypes = [];
        this.leaveDurations = [];
        this.isGuest = false;
        
        // Initialize components
        this.auth = new AuthManager(this);
        this.calendar = new CalendarManager(this);
        this.entryManager = new EntryManager(this);
        this.dashboard = new DashboardManager(this);
        this.statistics = new StatisticsManager(this);
        this.ui = new UIManager(this);
        
        this.init();
    }

    async init() {
        try {
            // Show loading screen
            this.showLoading();
            
            // Load sample data
            await this.loadSampleData();
            
            // Initialize UI
            this.setupEventListeners();
            
            // Simulate loading time
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show auth screen
            this.showAuthScreen();
        } catch (error) {
            console.error('Initialization error:', error);
            this.ui.showToast('Error initializing application', 'error');
        }
    }

    async loadSampleData() {
        const sampleData = {
            "sampleUser": {
                "employeeId": "EMP001",
                "name": "John Doe",
                "email": "john.doe@company.com",
                "leaveBalance": {
                    "annual": 18.5,
                    "sick": 8,
                    "personal": 4.5,
                    "emergency": 3
                }
            },
            "projectData": [
                {"projectId": "IN-1100-NA", "subCode": "0010", "projectTitle": "General Overhead", "client": "Internal", "status": "active"},
                {"projectId": "WV-1112-4152", "subCode": "0210", "projectTitle": "AS_Strategy", "client": "Westville Corp", "status": "active"},
                {"projectId": "WV-1112-4152", "subCode": "1010", "projectTitle": "AS_Strategy", "client": "Westville Corp", "status": "active"},
                {"projectId": "WV-1112-4152", "subCode": "1020", "projectTitle": "AS_Strategy", "client": "Westville Corp", "status": "active"},
                {"projectId": "RW-1173-9573P00303", "subCode": "0010", "projectTitle": "RW Tracking", "client": "RedWing Solutions", "status": "active"},
                {"projectId": "WV-1137-D75B1-C4285-08-03", "subCode": "1250", "projectTitle": "MERCIA_INSIGNIA_ElectronicController_Mil", "client": "Defense Systems", "status": "active"},
                {"projectId": "WV-1116-4306", "subCode": "0020", "projectTitle": "SensorLess_Controller_Demo", "client": "TechCorp", "status": "active"}
            ],
            "leaveTypes": [
                {"id": "HOLIDAY", "title": "Holiday", "color": "#ed8936", "icon": "🎉", "description": "Public holidays and festivals"},
                {"id": "LEAVE", "title": "General Leave", "color": "#e53e3e", "icon": "🏖️", "description": "General purpose leave"},
                {"id": "SICK_LEAVE", "title": "Sick Leave", "color": "#4299e1", "icon": "🤒", "description": "Medical illness or appointments"},
                {"id": "VACATION", "title": "Vacation", "color": "#38a169", "icon": "✈️", "description": "Planned vacation time"},
                {"id": "PERSONAL_LEAVE", "title": "Personal Leave", "color": "#9f7aea", "icon": "👤", "description": "Personal matters and emergencies"}
            ],
            "leaveDurations": [
                {"id": "full_day", "title": "Full Day", "hours": 8, "timeRange": "9:00 AM - 5:30 PM", "description": "Complete working day"},
                {"id": "first_half", "title": "First Half", "hours": 4, "timeRange": "9:00 AM - 1:00 PM", "description": "Morning session"},
                {"id": "second_half", "title": "Second Half", "hours": 4, "timeRange": "1:30 PM - 5:30 PM", "description": "Afternoon session"}
            ],
            "sampleMonthlyData": {
                "2025-09-27": {
                    "projects": [
                        {
                            "projectId": "WV-1112-4152",
                            "projectTitle": "AS_Strategy",
                            "subCode": "1010",
                            "chargeCode": "WV-1112-4152-1010",
                            "hours": 6.5,
                            "comments": "Sprint planning and code review session",
                            "entryType": "WORK",
                            "createdAt": "2025-09-27T10:30:00.000Z"
                        },
                        {
                            "projectId": "IN-1100-NA",
                            "projectTitle": "General Overhead",
                            "subCode": "0010",
                            "chargeCode": "IN-1100-NA-0010",
                            "hours": 1.5,
                            "comments": "Team meeting and admin tasks",
                            "entryType": "WORK",
                            "createdAt": "2025-09-27T14:30:00.000Z"
                        }
                    ],
                    "totalHours": 8
                },
                "2025-09-26": {
                    "projects": [
                        {
                            "projectId": "SICK_LEAVE",
                            "projectTitle": "Sick Leave",
                            "subCode": null,
                            "chargeCode": "N/A",
                            "hours": 4,
                            "comments": "Doctor appointment and follow-up",
                            "entryType": "SICK_LEAVE",
                            "leaveType": "SICK_LEAVE",
                            "duration": "first_half",
                            "reason": "Doctor appointment and follow-up",
                            "createdAt": "2025-09-26T08:00:00.000Z"
                        },
                        {
                            "projectId": "WV-1116-4306",
                            "projectTitle": "SensorLess_Controller_Demo",
                            "subCode": "0020",
                            "chargeCode": "WV-1116-4306-0020",
                            "hours": 4,
                            "comments": "Testing and debugging controller firmware",
                            "entryType": "WORK",
                            "createdAt": "2025-09-26T13:30:00.000Z"
                        }
                    ],
                    "totalHours": 8
                },
                "2025-09-25": {
                    "projects": [
                        {
                            "projectId": "VACATION",
                            "projectTitle": "Vacation",
                            "subCode": null,
                            "chargeCode": "N/A",
                            "hours": 8,
                            "comments": "Annual vacation day",
                            "entryType": "VACATION",
                            "leaveType": "VACATION",
                            "duration": "full_day",
                            "reason": "Annual vacation day",
                            "createdAt": "2025-09-25T00:00:00.000Z"
                        }
                    ],
                    "totalHours": 8
                }
            }
        };

        this.projects = sampleData.projectData;
        this.leaveTypes = sampleData.leaveTypes;
        this.leaveDurations = sampleData.leaveDurations;
        
        // Load sample entries
        Object.entries(sampleData.sampleMonthlyData).forEach(([date, data]) => {
            this.entries.set(date, data);
        });
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.switchView(view);
            });
        });

        // Quick actions
        document.getElementById('addProjectEntry')?.addEventListener('click', () => {
            this.entryManager.showEntryModal('project');
        });

        document.getElementById('addLeaveEntry')?.addEventListener('click', () => {
            this.entryManager.showEntryModal('leave');
        });

        document.getElementById('addNewEntry')?.addEventListener('click', () => {
            this.entryManager.showEntryModal('project');
        });

        document.getElementById('exportData')?.addEventListener('click', () => {
            this.showExportModal();
        });

        // Global search
        document.getElementById('globalSearch')?.addEventListener('input', (e) => {
            this.handleGlobalSearch(e.target.value);
        });

        // User menu
        document.getElementById('userMenuBtn')?.addEventListener('click', () => {
            this.ui.showToast('User menu coming soon!', 'info');
        });
    }

    switchView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewName);
        });

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.toggle('active', view.id === `${viewName}View`);
        });

        this.currentView = viewName;

        // Initialize view-specific content
        switch (viewName) {
            case 'dashboard':
                this.dashboard.render();
                break;
            case 'calendar':
                this.calendar.render();
                break;
            case 'entries':
                this.renderEntriesView();
                break;
            case 'statistics':
                this.statistics.render();
                break;
        }
    }

    renderEntriesView() {
        const container = document.getElementById('entriesContent');
        if (!container) return;

        const entries = Array.from(this.entries.entries())
            .flatMap(([date, data]) => 
                data.projects.map(entry => ({ ...entry, date }))
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (entries.length === 0) {
            container.innerHTML = '<div class="text-center" style="color: var(--color-text-secondary); padding: var(--space-32);">No entries found. Click "New Entry" to add your first time entry.</div>';
            return;
        }

        container.innerHTML = entries.map(entry => `
            <div class="card entry-card">
                <div class="card__body">
                    <div class="entry-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-12);">
                        <div class="entry-date" style="font-weight: var(--font-weight-medium); color: var(--color-text-secondary);">${this.formatDate(entry.date)}</div>
                        <div class="entry-actions" style="display: flex; gap: var(--space-8);">
                            <button class="btn btn--sm btn--outline" onclick="app.entryManager.editEntry('${entry.date}', '${entry.projectId}')">Edit</button>
                            <button class="btn btn--sm btn--outline text-error" onclick="app.entryManager.deleteEntry('${entry.date}', '${entry.projectId}')">Delete</button>
                        </div>
                    </div>
                    <div class="entry-details">
                        <div class="entry-project" style="margin-bottom: var(--space-8);">
                            <strong>${entry.projectTitle}</strong>
                            ${entry.chargeCode !== 'N/A' ? `<span class="entry-charge-code" style="color: var(--color-text-secondary); margin-left: var(--space-8);">(${entry.chargeCode})</span>` : ''}
                        </div>
                        <div class="entry-meta" style="display: flex; gap: var(--space-16); margin-bottom: var(--space-8);">
                            <span class="entry-hours" style="color: var(--color-primary); font-weight: var(--font-weight-medium);">${entry.hours} hours</span>
                            <span class="entry-type status status--${entry.entryType.toLowerCase().replace('_', '-')}">${entry.entryType.replace('_', ' ')}</span>
                        </div>
                        ${entry.comments ? `<div class="entry-comments" style="color: var(--color-text-secondary); font-size: var(--font-size-sm); font-style: italic;">"${entry.comments}"</div>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    handleGlobalSearch(query) {
        if (!query.trim()) return;

        const results = [];
        this.entries.forEach((data, date) => {
            data.projects.forEach(entry => {
                if (entry.projectTitle.toLowerCase().includes(query.toLowerCase()) ||
                    entry.comments?.toLowerCase().includes(query.toLowerCase())) {
                    results.push({ ...entry, date });
                }
            });
        });

        this.ui.showToast(`Found ${results.length} results for "${query}"`, 'info');
    }

    showExportModal() {
        const modal = document.getElementById('exportModal');
        if (modal) {
            modal.classList.remove('hidden');
            this.setupExportModalEvents();
        }
    }

    setupExportModalEvents() {
        const closeBtn = document.getElementById('closeExportModal');
        const cancelBtn = document.getElementById('cancelExport');
        const exportBtn = document.getElementById('confirmExport');

        const closeModal = () => {
            document.getElementById('exportModal').classList.add('hidden');
        };

        closeBtn?.addEventListener('click', closeModal);
        cancelBtn?.addEventListener('click', closeModal);
        exportBtn?.addEventListener('click', () => {
            this.exportData();
            closeModal();
        });

        // Set default date range
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        document.getElementById('exportStartDate').value = startOfMonth.toISOString().split('T')[0];
        document.getElementById('exportEndDate').value = today.toISOString().split('T')[0];
    }

    exportData() {
        const format = document.querySelector('input[name="exportFormat"]:checked').value;
        const startDate = document.getElementById('exportStartDate').value;
        const endDate = document.getElementById('exportEndDate').value;

        const data = this.getEntriesInRange(startDate, endDate);
        
        if (format === 'csv') {
            this.exportToCSV(data);
        } else {
            this.exportToJSON(data);
        }

        this.ui.showToast('Data exported successfully!', 'success');
    }

    getEntriesInRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const result = [];

        this.entries.forEach((data, date) => {
            const entryDate = new Date(date);
            if (entryDate >= start && entryDate <= end) {
                data.projects.forEach(entry => {
                    result.push({ ...entry, date });
                });
            }
        });

        return result;
    }

    exportToCSV(data) {
        const headers = ['Date', 'Project', 'Charge Code', 'Hours', 'Type', 'Comments'];
        const rows = data.map(entry => [
            entry.date,
            entry.projectTitle,
            entry.chargeCode || 'N/A',
            entry.hours,
            entry.entryType,
            entry.comments || ''
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');

        this.downloadFile(csvContent, 'timesheet_export.csv', 'text/csv');
    }

    exportToJSON(data) {
        const jsonContent = JSON.stringify(data, null, 2);
        this.downloadFile(jsonContent, 'timesheet_export.json', 'application/json');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    showLoading() {
        document.getElementById('loadingScreen').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingScreen').classList.add('hidden');
    }

    showAuthScreen() {
        this.hideLoading();
        document.getElementById('authScreen').classList.remove('hidden');
    }

    showMainApp() {
        document.getElementById('authScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        this.switchView('dashboard');
    }
}

class AuthManager {
    constructor(app) {
        this.app = app;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Auth tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchAuthTab(e.target.dataset.tab);
            });
        });

        // Forms
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e.target);
        });

        document.getElementById('registerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister(e.target);
        });

        // Guest mode
        document.getElementById('guestModeBtn')?.addEventListener('click', () => {
            this.handleGuestMode();
        });
    }

    switchAuthTab(tabName) {
        // Update tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.toggle('active', form.id === `${tabName}Form`);
        });
    }

    async handleLogin(form) {
        const email = form.querySelector('#loginEmail').value;
        const password = form.querySelector('#loginPassword').value;
        const remember = form.querySelector('#rememberMe').checked;

        this.setLoading(form, true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (email && password) {
            this.app.currentUser = {
                name: 'John Doe',
                email: email,
                employeeId: 'EMP001'
            };

            document.getElementById('userName').textContent = this.app.currentUser.name;
            this.app.ui.showToast('Login successful!', 'success');
            this.app.showMainApp();
        } else {
            this.app.ui.showToast('Please enter valid credentials', 'error');
        }

        this.setLoading(form, false);
    }

    async handleRegister(form) {
        const name = form.querySelector('#registerName').value;
        const email = form.querySelector('#registerEmail').value;
        const password = form.querySelector('#registerPassword').value;

        this.setLoading(form, true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (name && email && password) {
            this.app.currentUser = {
                name: name,
                email: email,
                employeeId: 'EMP001'
            };

            document.getElementById('userName').textContent = this.app.currentUser.name;
            this.app.ui.showToast('Registration successful!', 'success');
            this.app.showMainApp();
        } else {
            this.app.ui.showToast('Please fill all fields', 'error');
        }

        this.setLoading(form, false);
    }

    handleGuestMode() {
        this.app.isGuest = true;
        this.app.currentUser = {
            name: 'Guest User',
            email: 'guest@example.com',
            employeeId: 'GUEST'
        };

        document.getElementById('userName').textContent = this.app.currentUser.name;
        this.app.ui.showToast('Welcome, Guest! Exploring with sample data.', 'info');
        this.app.showMainApp();
    }

    setLoading(form, loading) {
        const btn = form.querySelector('.btn--primary');
        const spinner = btn.querySelector('.btn-spinner');
        const text = btn.querySelector('.btn-text');

        btn.classList.toggle('loading', loading);
        spinner.classList.toggle('hidden', !loading);
        btn.disabled = loading;
    }
}

class CalendarManager {
    constructor(app) {
        this.app = app;
        this.currentDate = new Date();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('prevMonth')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render();
        });

        document.getElementById('nextMonth')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.render();
        });
    }

    render() {
        const monthElement = document.getElementById('currentMonth');
        const gridElement = document.getElementById('calendarGrid');

        if (!monthElement || !gridElement) return;

        // Update month display
        monthElement.textContent = this.currentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });

        // Generate calendar grid
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const today = new Date();

        // Add headers
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
            days.push(`<div class="calendar-day header">${day}</div>`);
        });

        // Add days
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dateStr = currentDate.toISOString().split('T')[0];
            const isCurrentMonth = currentDate.getMonth() === this.currentDate.getMonth();
            const isToday = currentDate.toDateString() === today.toDateString();
            const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
            const hasEntries = this.app.entries.has(dateStr);
            
            let classes = ['calendar-day'];
            if (!isCurrentMonth) classes.push('other-month');
            if (isToday) classes.push('today');
            if (isWeekend) classes.push('weekend');
            if (hasEntries) {
                const entry = this.app.entries.get(dateStr);
                const hasWork = entry.projects.some(p => p.entryType === 'WORK');
                const hasLeave = entry.projects.some(p => p.entryType !== 'WORK');
                if (hasWork) classes.push('has-work');
                if (hasLeave) classes.push('has-leave');
            }

            days.push(`
                <div class="${classes.join(' ')}" data-date="${dateStr}" onclick="app.calendar.selectDate('${dateStr}')">
                    ${currentDate.getDate()}
                </div>
            `);
        }

        gridElement.innerHTML = days.join('');
    }

    selectDate(dateStr) {
        const entries = this.app.entries.get(dateStr);
        if (entries) {
            this.app.ui.showToast(`${entries.totalHours} hours logged on ${this.app.formatDate(dateStr)}`, 'info');
        } else {
            this.app.entryManager.showEntryModal('project', dateStr);
        }
    }
}

class EntryManager {
    constructor(app) {
        this.app = app;
        this.currentEntryType = 'project';
        this.currentDate = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Entry type tabs
        document.querySelectorAll('.entry-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchEntryType(e.target.dataset.type);
            });
        });

        // Modal controls
        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.hideEntryModal();
        });

        document.getElementById('cancelEntry')?.addEventListener('click', () => {
            this.hideEntryModal();
        });

        document.getElementById('saveEntry')?.addEventListener('click', () => {
            this.saveEntry();
        });

        // Project autocomplete
        const projectSelect = document.getElementById('projectSelect');
        if (projectSelect) {
            projectSelect.addEventListener('input', (e) => {
                this.handleProjectAutocomplete(e.target.value);
            });

            projectSelect.addEventListener('blur', () => {
                setTimeout(() => {
                    document.getElementById('projectDropdown').classList.add('hidden');
                }, 200);
            });
        }

        // Hours controls
        document.getElementById('increaseHours')?.addEventListener('click', () => {
            this.adjustHours(0.5);
        });

        document.getElementById('decreaseHours')?.addEventListener('click', () => {
            this.adjustHours(-0.5);
        });

        // Character counter
        document.getElementById('projectComments')?.addEventListener('input', (e) => {
            this.updateCharacterCount(e.target.value.length);
        });

        // Leave type
        document.getElementById('leaveType')?.addEventListener('change', (e) => {
            this.handleLeaveTypeChange(e.target.value);
        });

        // Initialize components when DOM is ready
        setTimeout(() => {
            this.setupDurationOptions();
            this.setupLeaveTypes();
        }, 100);
    }

    switchEntryType(type) {
        this.currentEntryType = type;

        // Update tabs
        document.querySelectorAll('.entry-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.type === type);
        });

        // Update forms
        document.querySelectorAll('.entry-form').forEach(form => {
            form.classList.toggle('active', form.id === `${type}EntryForm`);
        });

        // Update modal title
        const title = type === 'project' ? 'Add Project Entry' : 'Add Leave Entry';
        document.getElementById('modalTitle').textContent = title;
    }

    handleProjectAutocomplete(query) {
        const dropdown = document.getElementById('projectDropdown');
        if (!dropdown) return;

        if (!query.trim()) {
            dropdown.classList.add('hidden');
            return;
        }

        const matches = this.app.projects.filter(project => 
            project.projectTitle.toLowerCase().includes(query.toLowerCase()) ||
            project.projectId.toLowerCase().includes(query.toLowerCase()) ||
            project.client.toLowerCase().includes(query.toLowerCase())
        );

        if (matches.length === 0) {
            dropdown.classList.add('hidden');
            return;
        }

        dropdown.innerHTML = matches.map(project => `
            <div class="autocomplete-option" onclick="app.entryManager.selectProject('${project.projectId}', '${project.subCode}')">
                <div class="option-title">${project.projectTitle}</div>
                <div class="option-details">${project.projectId}-${project.subCode} • ${project.client}</div>
            </div>
        `).join('');

        dropdown.classList.remove('hidden');
    }

    selectProject(projectId, subCode) {
        const project = this.app.projects.find(p => p.projectId === projectId && p.subCode === subCode);
        if (!project) return;

        document.getElementById('projectSelect').value = project.projectTitle;
        document.getElementById('chargeCode').value = `${project.projectId}-${project.subCode}`;
        document.getElementById('projectDropdown').classList.add('hidden');
    }

    adjustHours(delta) {
        const input = document.getElementById('hoursInput');
        if (!input) return;

        const currentValue = parseFloat(input.value) || 0;
        const newValue = Math.max(0, Math.min(24, currentValue + delta));
        input.value = newValue;
    }

    updateCharacterCount(count) {
        const counter = document.getElementById('commentCount');
        if (counter) {
            counter.textContent = count;
            counter.style.color = count > 180 ? 'var(--color-warning)' : 'var(--color-text-secondary)';
        }
    }

    handleLeaveTypeChange(leaveTypeId) {
        const leaveType = this.app.leaveTypes.find(lt => lt.id === leaveTypeId);
        if (!leaveType) return;

        // Update UI based on leave type selection
        this.app.ui.showToast(`Selected ${leaveType.title}`, 'info');
    }

    setupDurationOptions() {
        const container = document.getElementById('durationOptions');
        if (!container || !this.app.leaveDurations || this.app.leaveDurations.length === 0) {
            console.log('Duration options container not found or no duration data');
            return;
        }

        container.innerHTML = this.app.leaveDurations.map(duration => `
            <label class="duration-option">
                <input type="radio" name="leaveDuration" value="${duration.id}">
                <div class="duration-details">
                    <div class="duration-title">${duration.title} (${duration.hours} hours)</div>
                    <div class="duration-subtitle">${duration.timeRange} • ${duration.description}</div>
                </div>
            </label>
        `).join('');

        // Add click handlers
        container.querySelectorAll('.duration-option').forEach(option => {
            option.addEventListener('click', () => {
                container.querySelectorAll('.duration-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
                option.querySelector('input').checked = true;
            });
        });
    }

    setupLeaveTypes() {
        const select = document.getElementById('leaveType');
        if (!select || !this.app.leaveTypes || this.app.leaveTypes.length === 0) {
            console.log('Leave type select not found or no leave types data');
            return;
        }

        // Clear existing options first
        select.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select leave type...';
        select.appendChild(defaultOption);

        // Add leave type options
        this.app.leaveTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.id;
            option.textContent = `${type.icon} ${type.title}`;
            select.appendChild(option);
        });

        console.log('Leave types setup complete:', this.app.leaveTypes.length, 'types added');
    }

    showEntryModal(type = 'project', date = null) {
        this.currentDate = date || new Date().toISOString().split('T')[0];
        this.switchEntryType(type);
        
        const modal = document.getElementById('entryModal');
        if (modal) {
            modal.classList.remove('hidden');
            
            // Set default values
            if (type === 'project') {
                document.getElementById('hoursInput').value = '8';
            }
            
            // Re-initialize components for leave entry
            if (type === 'leave') {
                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    this.setupLeaveTypes();
                    this.setupDurationOptions();
                }, 50);
            }
        }
    }

    hideEntryModal() {
        document.getElementById('entryModal').classList.add('hidden');
        this.clearForm();
    }

    clearForm() {
        document.getElementById('projectSelect').value = '';
        document.getElementById('chargeCode').value = '';
        document.getElementById('hoursInput').value = '8';
        document.getElementById('projectComments').value = '';
        document.getElementById('leaveType').value = '';
        document.getElementById('leaveReason').value = '';
        this.updateCharacterCount(0);
        
        // Clear duration selection
        document.querySelectorAll('.duration-option').forEach(opt => {
            opt.classList.remove('selected');
            opt.querySelector('input').checked = false;
        });
    }

    async saveEntry() {
        const btn = document.getElementById('saveEntry');
        const spinner = btn.querySelector('.btn-spinner');
        const text = btn.querySelector('.btn-text');

        btn.classList.add('loading');
        spinner.classList.remove('hidden');
        btn.disabled = true;

        // Simulate save operation
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const entryData = this.validateAndGetEntryData();
            if (entryData) {
                this.addEntry(entryData);
                this.hideEntryModal();
                this.app.ui.showToast('Entry saved successfully!', 'success');
                
                // Refresh current view
                if (this.app.currentView === 'dashboard') {
                    this.app.dashboard.render();
                } else if (this.app.currentView === 'calendar') {
                    this.app.calendar.render();
                } else if (this.app.currentView === 'entries') {
                    this.app.renderEntriesView();
                }
            }
        } catch (error) {
            this.app.ui.showToast(error.message, 'error');
        }

        btn.classList.remove('loading');
        spinner.classList.add('hidden');
        btn.disabled = false;
    }

    validateAndGetEntryData() {
        const errors = document.getElementById('formErrors');
        errors.innerHTML = '';

        if (this.currentEntryType === 'project') {
            const project = document.getElementById('projectSelect').value;
            const chargeCode = document.getElementById('chargeCode').value;
            const hours = parseFloat(document.getElementById('hoursInput').value);
            const comments = document.getElementById('projectComments').value;

            if (!project) {
                throw new Error('Please select a project');
            }
            if (!chargeCode) {
                throw new Error('Charge code is required');
            }
            if (!hours || hours <= 0) {
                throw new Error('Hours must be greater than 0');
            }

            return {
                type: 'project',
                projectTitle: project,
                chargeCode,
                hours,
                comments,
                entryType: 'WORK'
            };
        } else {
            const leaveType = document.getElementById('leaveType').value;
            const duration = document.querySelector('input[name="leaveDuration"]:checked');
            const reason = document.getElementById('leaveReason').value;

            if (!leaveType) {
                throw new Error('Please select a leave type');
            }
            if (!duration) {
                throw new Error('Please select a duration');
            }

            const durationData = this.app.leaveDurations.find(d => d.id === duration.value);
            const leaveTypeData = this.app.leaveTypes.find(lt => lt.id === leaveType);

            return {
                type: 'leave',
                projectTitle: leaveTypeData.title,
                leaveType: leaveType,
                duration: duration.value,
                hours: durationData.hours,
                reason,
                entryType: leaveType
            };
        }
    }

    addEntry(entryData) {
        const dateKey = this.currentDate;
        let dayData = this.app.entries.get(dateKey);

        if (!dayData) {
            dayData = { projects: [], totalHours: 0 };
            this.app.entries.set(dateKey, dayData);
        }

        const entry = {
            projectId: entryData.chargeCode || entryData.leaveType,
            projectTitle: entryData.projectTitle,
            subCode: entryData.chargeCode ? entryData.chargeCode.split('-').pop() : null,
            chargeCode: entryData.chargeCode || 'N/A',
            hours: entryData.hours,
            comments: entryData.comments || entryData.reason,
            entryType: entryData.entryType,
            createdAt: new Date().toISOString(),
            ...entryData
        };

        dayData.projects.push(entry);
        dayData.totalHours += entryData.hours;
    }

    editEntry(date, projectId) {
        this.app.ui.showToast('Edit functionality coming soon!', 'info');
    }

    deleteEntry(date, projectId) {
        if (confirm('Are you sure you want to delete this entry?')) {
            const dayData = this.app.entries.get(date);
            if (dayData) {
                const index = dayData.projects.findIndex(p => p.projectId === projectId);
                if (index !== -1) {
                    const entry = dayData.projects[index];
                    dayData.totalHours -= entry.hours;
                    dayData.projects.splice(index, 1);
                    
                    if (dayData.projects.length === 0) {
                        this.app.entries.delete(date);
                    }
                    
                    this.app.ui.showToast('Entry deleted successfully!', 'success');
                    this.app.renderEntriesView();
                }
            }
        }
    }
}

class DashboardManager {
    constructor(app) {
        this.app = app;
        this.timeChart = null;
    }

    render() {
        this.updateQuickStats();
        this.updateRecentEntries();
        this.updateLeaveBalances();
        this.updateTimeChart();
        this.updateTodayDate();
    }

    updateQuickStats() {
        const today = new Date().toISOString().split('T')[0];
        const todayData = this.app.entries.get(today);
        
        document.getElementById('todayHours').textContent = todayData ? todayData.totalHours.toFixed(1) : '0.0';
        document.getElementById('todayProjects').textContent = todayData ? todayData.projects.length : '0';
        
        // Calculate monthly hours
        let monthlyHours = 0;
        const currentMonth = new Date().toISOString().substring(0, 7);
        
        this.app.entries.forEach((data, date) => {
            if (date.startsWith(currentMonth)) {
                monthlyHours += data.totalHours;
            }
        });
        
        document.getElementById('monthHours').textContent = monthlyHours.toString();
        document.getElementById('leaveBalance').textContent = '18.5';
    }

    updateRecentEntries() {
        const container = document.getElementById('recentEntries');
        if (!container) return;

        const recentEntries = Array.from(this.app.entries.entries())
            .sort(([a], [b]) => new Date(b) - new Date(a))
            .slice(0, 5)
            .flatMap(([date, data]) => 
                data.projects.map(entry => ({ ...entry, date }))
            );

        if (recentEntries.length === 0) {
            container.innerHTML = '<div class="text-center" style="color: var(--color-text-secondary); padding: var(--space-16);">No entries yet</div>';
            return;
        }

        container.innerHTML = recentEntries.map(entry => `
            <div class="entry-item">
                <div class="entry-details">
                    <div class="entry-project">${entry.projectTitle}</div>
                    <div class="entry-hours">
                        <span class="entry-hours-value">${entry.hours}</span> hours • ${this.app.formatDate(entry.date)}
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateLeaveBalances() {
        const container = document.getElementById('leaveBalances');
        if (!container) return;

        const balances = [
            { type: 'Annual', icon: '🏖️', days: 18.5 },
            { type: 'Sick', icon: '🤒', days: 8.0 },
            { type: 'Personal', icon: '👤', days: 4.5 },
            { type: 'Emergency', icon: '🚨', days: 3.0 }
        ];

        container.innerHTML = balances.map(balance => `
            <div class="leave-balance-item">
                <div class="leave-type">
                    <span class="leave-icon">${balance.icon}</span>
                    <span class="leave-name">${balance.type}</span>
                </div>
                <div class="leave-days">${balance.days} days</div>
            </div>
        `).join('');
    }

    updateTimeChart() {
        const ctx = document.getElementById('timeChart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.timeChart) {
            this.timeChart.destroy();
        }

        // Get today's data
        const today = new Date().toISOString().split('T')[0];
        const todayData = this.app.entries.get(today);

        let data = [];
        let labels = [];

        if (todayData && todayData.projects.length > 0) {
            const projectHours = {};
            todayData.projects.forEach(entry => {
                if (projectHours[entry.projectTitle]) {
                    projectHours[entry.projectTitle] += entry.hours;
                } else {
                    projectHours[entry.projectTitle] = entry.hours;
                }
            });

            labels = Object.keys(projectHours);
            data = Object.values(projectHours);
        } else {
            labels = ['No entries yet'];
            data = [1];
        }

        this.timeChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F',
                        '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'
                    ],
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    updateTodayDate() {
        const dateElement = document.getElementById('todayDate');
        if (dateElement) {
            dateElement.textContent = new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
}

class StatisticsManager {
    constructor(app) {
        this.app = app;
        this.projectChart = null;
        this.trendChart = null;
    }

    render() {
        this.updateProjectChart();
        this.updateTrendChart();
    }

    updateProjectChart() {
        const ctx = document.getElementById('projectChart');
        if (!ctx) return;

        if (this.projectChart) {
            this.projectChart.destroy();
        }

        // Calculate project hours
        const projectHours = {};
        this.app.entries.forEach((data) => {
            data.projects.forEach(entry => {
                if (entry.entryType === 'WORK') {
                    if (projectHours[entry.projectTitle]) {
                        projectHours[entry.projectTitle] += entry.hours;
                    } else {
                        projectHours[entry.projectTitle] = entry.hours;
                    }
                }
            });
        });

        const labels = Object.keys(projectHours);
        const data = Object.values(projectHours);

        this.projectChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hours',
                    data: data,
                    backgroundColor: '#1FB8CD',
                    borderColor: '#13343B',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    updateTrendChart() {
        const ctx = document.getElementById('trendChart');
        if (!ctx) return;

        if (this.trendChart) {
            this.trendChart.destroy();
        }

        // Generate last 7 days data
        const labels = [];
        const data = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            
            const dayData = this.app.entries.get(dateStr);
            data.push(dayData ? dayData.totalHours : 0);
        }

        this.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Hours',
                    data: data,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

class UIManager {
    constructor(app) {
        this.app = app;
        this.toastContainer = document.getElementById('toastContainer');
    }

    showToast(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <div class="toast-title">${icons[type] || icons.info} ${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        this.toastContainer.appendChild(toast);

        // Auto remove after duration
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, duration);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DailyLogTracker();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'k':
                e.preventDefault();
                document.getElementById('globalSearch')?.focus();
                break;
            case 'n':
                e.preventDefault();
                if (window.app) {
                    window.app.entryManager.showEntryModal('project');
                }
                break;
            case 'e':
                e.preventDefault();
                if (window.app) {
                    window.app.showExportModal();
                }
                break;
        }
    }

    // Close modals with Escape
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Note: In a real implementation, you would register an actual service worker
        console.log('PWA capabilities available');
    });
}
