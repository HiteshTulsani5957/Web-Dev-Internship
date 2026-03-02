// ==============================================
// Notes App with LocalStorage
// Features: Add, Edit, Delete, Search, and Persistent Storage
// ==============================================

// Configuration
const CONFIG = {
    STORAGE_KEY: 'notesAppData',
    MAX_TITLE_LENGTH: 50,
    MAX_CONTENT_LENGTH: 500,
};

// State Management
let notesData = [];
let editingNoteId = null;
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const titleCount = document.getElementById('titleCount');
const contentCount = document.getElementById('contentCount');
const notesContainer = document.getElementById('notesContainer');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const totalNotes = document.getElementById('totalNotes');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

// Modal Elements
const editModal = document.getElementById('editModal');
const modalClose = document.querySelector('.modal-close');
const editTitle = document.getElementById('editTitle');
const editContent = document.getElementById('editContent');
const editTitleCount = document.getElementById('editTitleCount');
const editContentCount = document.getElementById('editContentCount');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

// ==============================================
// Initialization
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    loadNotesFromStorage();
    attachEventListeners();
    renderNotes();
    updateStats();
});

// ==============================================
// Event Listeners
// ==============================================

function attachEventListeners() {
    // Add note button
    addBtn.addEventListener('click', addNote);

    // Clear all button
    clearBtn.addEventListener('click', clearAllNotes);

    // Character count listeners
    noteTitle.addEventListener('input', () => {
        titleCount.textContent = noteTitle.value.length;
    });

    noteContent.addEventListener('input', () => {
        contentCount.textContent = noteContent.value.length;
    });

    // Edit modal character count
    editTitle.addEventListener('input', () => {
        editTitleCount.textContent = editTitle.value.length;
    });

    editContent.addEventListener('input', () => {
        editContentCount.textContent = editContent.value.length;
    });

    // Modal controls
    modalClose.addEventListener('click', closeEditModal);
    cancelEditBtn.addEventListener('click', closeEditModal);
    saveEditBtn.addEventListener('click', saveEditedNote);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderNotes();
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderNotes();
        });
    });

    // Enter key to add note
    noteContent.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addNote();
        }
    });
}

// ==============================================
// Core Functions
// ==============================================

/**
 * Validates note input
 * @returns {string|null} Error message if validation fails, null if valid
 */
function validateNoteInput() {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (!title) {
        return 'Please enter a note title.';
    }

    if (title.length > CONFIG.MAX_TITLE_LENGTH) {
        return `Title cannot exceed ${CONFIG.MAX_TITLE_LENGTH} characters.`;
    }

    if (!content) {
        return 'Please enter note content.';
    }

    if (content.length > CONFIG.MAX_CONTENT_LENGTH) {
        return `Content cannot exceed ${CONFIG.MAX_CONTENT_LENGTH} characters.`;
    }

    if (title.length < 3) {
        return 'Title must be at least 3 characters long.';
    }

    if (content.length < 5) {
        return 'Content must be at least 5 characters long.';
    }

    return null;
}

/**
 * Adds a new note
 */
function addNote() {
    // Validate input
    const validationError = validateNoteInput();
    if (validationError) {
        showError(validationError);
        return;
    }

    // Create note object
    const newNote = {
        id: Date.now(),
        title: noteTitle.value.trim(),
        content: noteContent.value.trim(),
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
    };

    // Add to array
    notesData.unshift(newNote);

    // Save to localStorage
    saveNotesToStorage();

    // Clear input fields
    noteTitle.value = '';
    noteContent.value = '';
    titleCount.textContent = '0';
    contentCount.textContent = '0';

    // Update UI
    renderNotes();
    updateStats();
    showSuccess('Note added successfully!');
}

/**
 * Deletes a note by ID
 * @param {number} id - Note ID
 */
function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
        notesData = notesData.filter(note => note.id !== id);
        saveNotesToStorage();
        renderNotes();
        updateStats();
        showSuccess('Note deleted successfully!');
    }
}

/**
 * Opens edit modal for a note
 * @param {number} id - Note ID
 */
function openEditModal(id) {
    const note = notesData.find(n => n.id === id);
    if (!note) return;

    editingNoteId = id;
    editTitle.value = note.title;
    editContent.value = note.content;
    editTitleCount.textContent = note.title.length;
    editContentCount.textContent = note.content.length;

    editModal.classList.add('show');
}

/**
 * Closes edit modal
 */
function closeEditModal() {
    editModal.classList.remove('show');
    editingNoteId = null;
}

/**
 * Saves edited note
 */
function saveEditedNote() {
    const title = editTitle.value.trim();
    const content = editContent.value.trim();

    // Validate
    if (!title) {
        showError('Please enter a note title.');
        return;
    }

    if (title.length > CONFIG.MAX_TITLE_LENGTH) {
        showError(`Title cannot exceed ${CONFIG.MAX_TITLE_LENGTH} characters.`);
        return;
    }

    if (!content) {
        showError('Please enter note content.');
        return;
    }

    if (content.length > CONFIG.MAX_CONTENT_LENGTH) {
        showError(`Content cannot exceed ${CONFIG.MAX_CONTENT_LENGTH} characters.`);
        return;
    }

    // Update note
    const noteIndex = notesData.findIndex(n => n.id === editingNoteId);
    if (noteIndex !== -1) {
        notesData[noteIndex].title = title;
        notesData[noteIndex].content = content;
        notesData[noteIndex].lastModified = new Date().toISOString();

        saveNotesToStorage();
        renderNotes();
        closeEditModal();
        showSuccess('Note updated successfully!');
    }
}

/**
 * Clears all notes with confirmation
 */
function clearAllNotes() {
    if (notesData.length === 0) {
        showError('No notes to clear.');
        return;
    }

    if (confirm(`Are you sure you want to delete all ${notesData.length} notes? This action cannot be undone.`)) {
        notesData = [];
        saveNotesToStorage();
        renderNotes();
        updateStats();
        showSuccess('All notes cleared successfully!');
    }
}

// ==============================================
// Rendering Functions
// ==============================================

/**
 * Filters notes based on current filter and search query
 * @returns {array} Filtered notes
 */
function getFilteredNotes() {
    let filtered = [...notesData];

    // Apply filter
    if (currentFilter === 'recent') {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (currentFilter === 'oldest') {
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    // Apply search
    if (searchQuery) {
        filtered = filtered.filter(note =>
            note.title.toLowerCase().includes(searchQuery) ||
            note.content.toLowerCase().includes(searchQuery)
        );
    }

    return filtered;
}

/**
 * Renders all notes to the DOM
 */
function renderNotes() {
    const filteredNotes = getFilteredNotes();

    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                <p class="empty-icon">📭</p>
                <p>${searchQuery ? 'No notes match your search.' : 'No notes yet. Start by creating your first note!'}</p>
            </div>
        `;
        return;
    }

    notesContainer.innerHTML = filteredNotes.map(note => createNoteCard(note)).join('');

    // Attach delete and edit listeners to buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.note-card').dataset.id);
            deleteNote(id);
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.note-card').dataset.id);
            openEditModal(id);
        });
    });
}

/**
 * Creates HTML for a note card
 * @param {object} note - Note object
 * @returns {string} HTML string
 */
function createNoteCard(note) {
    const createdDate = new Date(note.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return `
        <div class="note-card" data-id="${note.id}">
            <div class="note-title">${escapeHtml(note.title)}</div>
            <div class="note-content">${escapeHtml(note.content)}</div>
            <div class="note-timestamp">📅 ${createdDate}</div>
            <div class="note-actions">
                <button class="note-btn edit-btn">✏️ Edit</button>
                <button class="note-btn delete-btn">🗑️ Delete</button>
            </div>
        </div>
    `;
}

/**
 * Updates statistics
 */
function updateStats() {
    totalNotes.textContent = notesData.length;
}

// ==============================================
// LocalStorage Functions
// ==============================================

/**
 * Saves notes to localStorage
 */
function saveNotesToStorage() {
    try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(notesData));
    } catch (error) {
        console.error('Failed to save notes:', error);
        showError('Failed to save notes. Please check your browser storage.');
    }
}

/**
 * Loads notes from localStorage
 */
function loadNotesFromStorage() {
    try {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
        notesData = stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load notes:', error);
        notesData = [];
        showError('Failed to load notes from storage.');
    }
}

// ==============================================
// Utility Functions
// ==============================================

/**
 * Shows error message
 * @param {string} message - Error message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    successMessage.classList.remove('show');

    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 4000);
}

/**
 * Shows success message
 * @param {string} message - Success message
 */
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.add('show');
    errorMessage.classList.remove('show');

    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ==============================================
// End of Script
// ==============================================
