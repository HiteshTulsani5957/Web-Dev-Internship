/* ==================== UI Manager Class ==================== */
class UIManager {
    constructor() {
        this.elements = {
            loaderContainer: document.getElementById('loaderContainer'),
            errorContainer: document.getElementById('errorContainer'),
            successContainer: document.getElementById('successContainer'),
            loaderText: document.getElementById('loaderText'),
            loaderPercentage: document.getElementById('loaderPercentage'),
            progressFill: document.getElementById('progressFill'),
            errorTitle: document.getElementById('errorTitle'),
            errorMessage: document.getElementById('errorMessage'),
            errorDetails: document.getElementById('errorDetails'),
            dataDisplay: document.getElementById('dataDisplay'),
            fetchDataBtn: document.getElementById('fetchDataBtn'),
            fetchErrorBtn: document.getElementById('fetchErrorBtn'),
            clearBtn: document.getElementById('clearBtn'),
            retryBtn: document.getElementById('retryBtn'),
            dismissBtn: document.getElementById('dismissBtn'),
            closeSuccessBtn: document.getElementById('closeSuccessBtn'),
            simulateSelect: document.getElementById('simulateSelect')
        };

        this.lastScenario = 'success';
        this.initEventListeners();
    }

    /**
     * Initialize all event listeners
     */
    initEventListeners() {
        this.elements.fetchDataBtn.addEventListener('click', () => this.handleFetchData());
        this.elements.fetchErrorBtn.addEventListener('click', () => this.handleFetchError());
        this.elements.clearBtn.addEventListener('click', () => this.clearAll());
        this.elements.retryBtn.addEventListener('click', () => this.handleRetry());
        this.elements.dismissBtn.addEventListener('click', () => this.hideError());
        this.elements.closeSuccessBtn.addEventListener('click', () => this.hideSuccess());
    }

    /**
     * Show loader with animation
     * @param {string} text - Loader text message
     */
    showLoader(text = 'Loading data...') {
        this.hideAll();
        this.elements.loaderText.textContent = text;
        this.elements.loaderContainer.style.display = 'flex';
        this.animateProgressBar();
    }

    /**
     * Animate progress bar
     */
    animateProgressBar() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) progress = 100;

            this.elements.progressFill.style.width = progress + '%';
            this.elements.loaderPercentage.textContent = Math.floor(progress) + '%';

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 300);
    }

    /**
     * Hide loader
     */
    hideLoader() {
        this.elements.loaderContainer.style.display = 'none';
        this.elements.progressFill.style.width = '0%';
        this.elements.loaderPercentage.textContent = '0%';
    }

    /**
     * Show error with custom details
     * @param {string} title - Error title
     * @param {string} message - Error message
     * @param {string} details - Error details
     */
    showError(title = 'Error', message = 'Something went wrong', details = '') {
        this.hideAll();
        this.elements.errorTitle.textContent = title;
        this.elements.errorMessage.textContent = message;
        this.elements.errorDetails.textContent = details;
        this.elements.errorContainer.style.display = 'flex';
    }

    /**
     * Hide error
     */
    hideError() {
        this.elements.errorContainer.style.display = 'none';
    }

    /**
     * Show success with data display
     * @param {Array} data - Data to display
     */
    showSuccess(data = []) {
        this.hideAll();
        this.displayData(data);
        this.elements.successContainer.style.display = 'flex';
    }

    /**
     * Display data in success container
     * @param {Array} data - Data array to display
     */
    displayData(data) {
        this.elements.dataDisplay.innerHTML = '';
        
        if (Array.isArray(data) && data.length > 0) {
            data.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'data-item';
                itemDiv.innerHTML = `
                    <strong>Item ${index + 1}:</strong> ${this.escapeHtml(item)}
                `;
                this.elements.dataDisplay.appendChild(itemDiv);
            });
        } else {
            this.elements.dataDisplay.innerHTML = '<div class="data-item"><strong>Status:</strong> Data loaded successfully!</div>';
        }
    }

    /**
     * Hide success container
     */
    hideSuccess() {
        this.elements.successContainer.style.display = 'none';
    }

    /**
     * Hide all containers
     */
    hideAll() {
        this.hideLoader();
        this.hideError();
        this.hideSuccess();
    }

    /**
     * Clear all UI
     */
    clearAll() {
        this.hideAll();
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Handle fetch data button
     */
    async handleFetchData() {
        this.showLoader('Fetching your data...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockData = [
            'User profile loaded',
            'Settings synchronized',
            'Dashboard initialized',
            'Notifications enabled',
            'Data cached successfully'
        ];
        
        this.hideLoader();
        this.showSuccess(mockData);
    }

    /**
     * Handle fetch error button
     */
    async handleFetchError() {
        const scenario = this.elements.simulateSelect.value;
        this.lastScenario = scenario;
        this.showLoader('Attempting to fetch data...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.hideLoader();

        switch (scenario) {
            case 'timeout':
                this.showError(
                    'Request Timeout',
                    'The request took too long to complete',
                    'Server response exceeded 30 seconds. Please check your connection and try again.'
                );
                break;
            case 'network':
                this.showError(
                    'Network Error',
                    'Failed to connect to the server',
                    'Unable to reach the server. Please check your internet connection and try again.'
                );
                break;
            case 'validation':
                this.showError(
                    'Validation Error',
                    'Invalid input data',
                    'The provided data does not meet the required format. Please review your input and try again.'
                );
                break;
            default:
                this.showError(
                    'Unknown Error',
                    'An unexpected error occurred',
                    'Please try again later or contact support if the problem persists.'
                );
        }
    }

    /**
     * Handle retry button
     */
    async handleRetry() {
        this.showLoader('Retrying request...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        this.hideLoader();
        
        const mockData = [
            'Connection re-established',
            'Data fetched successfully',
            'Operation completed'
        ];
        
        this.showSuccess(mockData);
    }
}

/* ==================== Validation Helper Class ==================== */
class ValidationHelper {
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid
     */
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate required field
     * @param {string} value - Value to check
     * @returns {boolean} True if not empty
     */
    static validateRequired(value) {
        return value && value.trim().length > 0;
    }

    /**
     * Validate minimum length
     * @param {string} value - Value to check
     * @param {number} minLength - Minimum length
     * @returns {boolean} True if length meets requirement
     */
    static validateMinLength(value, minLength) {
        return value && value.length >= minLength;
    }

    /**
     * Validate field format
     * @param {string} value - Value to validate
     * @param {string} type - Type of validation ('email', 'number', 'phone')
     * @returns {boolean} True if valid
     */
    static validateFormat(value, type) {
        switch (type) {
            case 'email':
                return this.validateEmail(value);
            case 'number':
                return /^\d+$/.test(value);
            case 'phone':
                return /^\d{10,}$/.test(value);
            default:
                return true;
        }
    }
}

/* ==================== Error Handler Class ==================== */
class ErrorHandler {
    /**
     * Handle different error types
     * @param {Error} error - Error object
     * @param {UIManager} uiManager - UI manager instance
     */
    static handle(error, uiManager) {
        console.error('Error Details:', error);

        if (error.name === 'TimeoutError') {
            uiManager.showError(
                'Request Timeout',
                'The operation took too long',
                error.message || 'Please check your connection and retry.'
            );
        } else if (error.message.includes('network')) {
            uiManager.showError(
                'Network Error',
                'Connection failed',
                error.message || 'Unable to connect to the server.'
            );
        } else if (error.name === 'ValidationError') {
            uiManager.showError(
                'Validation Error',
                'Input validation failed',
                error.message || 'Please check your input and try again.'
            );
        } else {
            uiManager.showError(
                'Error',
                error.message || 'An unexpected error occurred',
                'Please try again later or contact support.'
            );
        }
    }
}

/* ==================== API Service Class ==================== */
class APIService {
    /**
     * Simulate API call with timeout
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise} API response
     */
    static fetchWithTimeout(timeout = 5000) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                const error = new Error('Request timeout');
                error.name = 'TimeoutError';
                reject(error);
            }, timeout);

            // Simulate API call
            setTimeout(() => {
                clearTimeout(timeoutId);
                resolve({
                    status: 200,
                    data: ['Sample data 1', 'Sample data 2', 'Sample data 3']
                });
            }, 1000);
        });
    }

    /**
     * Validate API response
     * @param {Object} response - Response object
     * @throws {Error} If response is invalid
     */
    static validateResponse(response) {
        if (!response || !response.status) {
            throw new Error('Invalid response format');
        }

        if (response.status !== 200) {
            const error = new Error('API request failed');
            error.name = 'APIError';
            throw error;
        }
    }
}

/* ==================== Initialization ==================== */
document.addEventListener('DOMContentLoaded', () => {
    const uiManager = new UIManager();
    
    console.log('✅ Loader + Error Handling UI Initialized');
    console.log('Features:');
    console.log('- ✓ Animated Loader with Progress Bar');
    console.log('- ✓ Error Handling (Timeout, Network, Validation)');
    console.log('- ✓ Success State with Data Display');
    console.log('- ✓ Retry Mechanism');
    console.log('- ✓ Input Validation Helper');
    console.log('- ✓ Clean Modular Code');
    console.log('- ✓ Responsive Design');
});
