/**
 * Client Portal - Password Gate & Progress Persistence
 *
 * This script handles:
 * 1. Password authentication (client-side, simple privacy)
 * 2. Checkbox state persistence (localStorage)
 * 3. Session log persistence (localStorage)
 * 4. Progress bar updates
 * 5. Collapsible sections
 */

(function() {
  'use strict';

  // Get client ID from the page (set in HTML)
  const clientId = window.PORTAL_CLIENT_ID || 'default';
  const clientPassword = window.PORTAL_PASSWORD || '';

  // Storage keys
  const STORAGE_KEYS = {
    authenticated: `portal_${clientId}_auth`,
    checkboxes: `portal_${clientId}_checkboxes`,
    logs: `portal_${clientId}_logs`
  };

  // DOM Elements
  let passwordGate, courseContent, passwordForm, passwordInput, passwordError;
  let progressFill, progressPercent;

  /**
   * Initialize the portal when DOM is ready
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    passwordGate = document.getElementById('password-gate');
    courseContent = document.getElementById('course-content');
    passwordForm = document.getElementById('password-form');
    passwordInput = document.getElementById('password-input');
    passwordError = document.getElementById('password-error');
    progressFill = document.getElementById('progress-fill');
    progressPercent = document.getElementById('progress-percent');

    // Check if already authenticated
    if (isAuthenticated()) {
      showContent();
    } else {
      showPasswordGate();
    }

    // Set up password form
    if (passwordForm) {
      passwordForm.addEventListener('submit', handlePasswordSubmit);
    }

    // Set up collapsible sections
    setupCollapsibles();
  });

  /**
   * Check if user is authenticated for this client portal
   */
  function isAuthenticated() {
    return localStorage.getItem(STORAGE_KEYS.authenticated) === 'true';
  }

  /**
   * Handle password form submission
   */
  function handlePasswordSubmit(e) {
    e.preventDefault();

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === clientPassword) {
      // Correct password - authenticate and show content
      localStorage.setItem(STORAGE_KEYS.authenticated, 'true');
      showContent();
    } else {
      // Wrong password - show error
      passwordError.classList.add('show');
      passwordInput.value = '';
      passwordInput.focus();

      // Hide error after 3 seconds
      setTimeout(function() {
        passwordError.classList.remove('show');
      }, 3000);
    }
  }

  /**
   * Show password gate, hide content
   */
  function showPasswordGate() {
    if (passwordGate) passwordGate.style.display = 'flex';
    if (courseContent) courseContent.classList.remove('visible');
  }

  /**
   * Show course content, hide password gate
   */
  function showContent() {
    if (passwordGate) passwordGate.style.display = 'none';
    if (courseContent) courseContent.classList.add('visible');

    // Initialize checkboxes and logs after showing content
    initializeCheckboxes();
    initializeLogs();
    updateProgress();
  }

  /**
   * Initialize checkbox persistence
   */
  function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkpoint-checkbox');
    const savedState = getSavedCheckboxState();

    checkboxes.forEach(function(checkbox, index) {
      // Generate a unique ID if not present
      if (!checkbox.id) {
        checkbox.id = 'checkbox-' + index;
      }

      // Restore saved state
      if (savedState[checkbox.id]) {
        checkbox.checked = true;
      }

      // Add change listener
      checkbox.addEventListener('change', function() {
        saveCheckboxState();
        updateProgress();
      });
    });
  }

  /**
   * Get saved checkbox state from localStorage
   */
  function getSavedCheckboxState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.checkboxes);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  /**
   * Save checkbox state to localStorage
   */
  function saveCheckboxState() {
    const checkboxes = document.querySelectorAll('.checkpoint-checkbox');
    const state = {};

    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        state[checkbox.id] = true;
      }
    });

    localStorage.setItem(STORAGE_KEYS.checkboxes, JSON.stringify(state));
  }

  /**
   * Initialize session log persistence
   */
  function initializeLogs() {
    const textareas = document.querySelectorAll('.log-textarea');
    const savedLogs = getSavedLogs();

    textareas.forEach(function(textarea, index) {
      // Generate a unique ID if not present
      if (!textarea.id) {
        textarea.id = 'log-' + index;
      }

      // Restore saved content
      if (savedLogs[textarea.id]) {
        textarea.value = savedLogs[textarea.id];
      }

      // Add input listener (saves on every keystroke, debounced)
      let saveTimeout;
      textarea.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveLogs, 500);
      });

      // Also save on blur
      textarea.addEventListener('blur', saveLogs);
    });
  }

  /**
   * Get saved logs from localStorage
   */
  function getSavedLogs() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.logs);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  /**
   * Save logs to localStorage
   */
  function saveLogs() {
    const textareas = document.querySelectorAll('.log-textarea');
    const logs = {};

    textareas.forEach(function(textarea) {
      if (textarea.value.trim()) {
        logs[textarea.id] = textarea.value;
      }
    });

    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(logs));
  }

  /**
   * Update progress bar based on checked checkboxes
   */
  function updateProgress() {
    const checkboxes = document.querySelectorAll('.checkpoint-checkbox');
    const total = checkboxes.length;
    let checked = 0;

    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) checked++;
    });

    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

    if (progressFill) {
      progressFill.style.width = percent + '%';
    }

    if (progressPercent) {
      progressPercent.textContent = percent + '%';
    }
  }

  /**
   * Set up collapsible "If you struggled" sections
   */
  function setupCollapsibles() {
    const toggles = document.querySelectorAll('.struggled-toggle');

    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        const content = this.nextElementSibling;

        this.classList.toggle('open');
        content.classList.toggle('open');
      });
    });
  }

  /**
   * Public API for debugging/testing
   */
  window.ClientPortal = {
    clearAuth: function() {
      localStorage.removeItem(STORAGE_KEYS.authenticated);
      location.reload();
    },
    clearProgress: function() {
      localStorage.removeItem(STORAGE_KEYS.checkboxes);
      location.reload();
    },
    clearLogs: function() {
      localStorage.removeItem(STORAGE_KEYS.logs);
      location.reload();
    },
    clearAll: function() {
      localStorage.removeItem(STORAGE_KEYS.authenticated);
      localStorage.removeItem(STORAGE_KEYS.checkboxes);
      localStorage.removeItem(STORAGE_KEYS.logs);
      location.reload();
    }
  };

})();
