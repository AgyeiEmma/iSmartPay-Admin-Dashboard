/**
 * Core Authentication Service
 * Handles user login, registration, and password management
 */

import { apiRequest } from './apiClient.js';

/**
 * Core Authentication Service
 */
export const authService = {
  /**
   * User Login
   */
  async login(email, password) {
    console.log('🔍 Login attempt for:', email);

    const data = await apiRequest('/publicauth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.trim(),
        password: password,
      }),
    });

    console.log('✅ Login successful for:', email);
    return data;
  },

  /**
   * User Registration (Individual)
   */
  async register(userData) {
    console.log('🔍 Individual registration for:', userData.email);

    const data = await apiRequest('/publicauth/register', {
      method: 'POST',
      body: JSON.stringify({
        first_name: userData.firstName || userData.first_name,
        middle_name: userData.middleName || userData.middle_name,
        last_name: userData.surname || userData.last_name,
        email: userData.email,
        phone_number: userData.phone || userData.phone_number,
        country: userData.country,
        password: userData.password,
      }),
    });

    console.log('✅ Individual registration successful for:', userData.email);
    return data;
  },

  /**
   * Business Registration
   */
  async registerBusiness(businessData) {
    console.log('🔍 Business registration request data:', businessData);

    const data = await apiRequest('/publicauth/register-business', {
      method: 'POST',
      body: JSON.stringify(businessData),
    });

    console.log('✅ Business registration success:', data);
    return data;
  },

  /**
   * Forgot Password Request
   */
  async requestPasswordReset(email) {
    console.log('🔍 Password reset request for:', email);

    const data = await apiRequest('/publicauth/password/request-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    console.log('✅ Password reset request sent for:', email);
    return data;
  },

  /**
   * Password Reset with OTP
   */
  async resetPasswordWithOTP(email, otp, newPassword) {
    console.log('🔍 Password reset with OTP for:', email);

    const resetData = await apiRequest('/publicauth/password/reset-with-otp', {
      method: 'POST',
      body: JSON.stringify({
        email,
        otp,
        newPassword,
      }),
    });

    console.log('✅ Password reset with OTP successful');
    return resetData;
  },

  /**
   * Change Password (Authenticated)
   */
  async changePassword(oldPassword, newPassword) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Password change request');

    const changeData = await apiRequest('/auth/password/change', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    console.log('✅ Password change successful');
    return changeData;
  },

  /**
   * Get User Verification Level
   */
  async getVerificationLevel() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Fetching verification level');

    const data = await apiRequest('/publicauth/get-verification-level', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('✅ Verification level fetched');
    return data;
  },

  /**
   * Verify Email (Public)
   */
  async verifyEmail(verificationToken) {
    console.log('🔍 Verifying email address');

    const verifyEmailData = await apiRequest('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({
        token: verificationToken,
      }),
    });

    console.log('✅ Email verified successfully');
    return verifyEmailData;
  },
};

export default authService;
