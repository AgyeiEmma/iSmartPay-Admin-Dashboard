/**
 * Token Management Service
 * Handles JWT token storage, validation, and user session management
 */

/**
 * Token Management Service
 */
export const tokenService = {
  /**
   * Store authentication data
   */
  setAuthData(data) {
    if (data.token || data.accessToken) {
      const token = data.token || data.accessToken;
      localStorage.setItem('authToken', token);
      localStorage.setItem('tokenExpiry', data.expiresAt || Date.now() + (24 * 60 * 60 * 1000));
    }

    if (data.user) {
      localStorage.setItem('userData', JSON.stringify(data.user));
    }

    // Handle verification level
    if (data.verificationLevel || data.user?.verificationLevel) {
      const verificationLevel = data.verificationLevel || data.user.verificationLevel;
      localStorage.setItem('verificationLevel', JSON.stringify(verificationLevel));
    }

    localStorage.setItem('isAuthenticated', 'true');
  },

  /**
   * Clear authentication data
   */
  clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('userData');
    localStorage.removeItem('verificationLevel');
    localStorage.removeItem('isAuthenticated');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const token = localStorage.getItem('authToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (isAuthenticated === 'true' && token) {
      // Check if token is still valid
      if (!tokenExpiry || Date.now() < parseInt(tokenExpiry)) {
        return true;
      } else {
        // Token expired, clear auth data
        this.clearAuthData();
      }
    }

    return false;
  },

  /**
   * Get stored token
   */
  getToken() {
    return localStorage.getItem('authToken');
  },

  /**
   * Get stored user data
   */
  getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Get verification level
   */
  getVerificationLevel() {
    const verificationLevel = localStorage.getItem('verificationLevel');
    return verificationLevel ? JSON.parse(verificationLevel) : null;
  },
};

export default tokenService;
