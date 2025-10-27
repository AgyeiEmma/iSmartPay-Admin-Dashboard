/**
 * Security Service
 * Handles PIN management, 2FA, and verification features
 */

import { apiRequest } from './apiClient.js';

/**
 * Security Service
 */
export const securityService = {
  /**
   * Set Security PIN (Authenticated)
   */
  async setSecurityPIN(pin) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Setting security PIN');

    const pinData = await apiRequest('/auth/profile/security', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        pin: pin,
      }),
    });

    console.log('✅ Security PIN set successfully');
    return pinData;
  },

  /**
   * Verify Security PIN (Authenticated)
   */
  async verifySecurityPIN(pin) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Verifying security PIN');

    const verifyData = await apiRequest('/auth/profile/verify-pin', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        pin: pin,
      }),
    });

    console.log('✅ Security PIN verified successfully');
    return verifyData;
  },

  /**
   * Enable 2FA for user account
   */
  async enable2FA() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Enabling 2FA for user');

    const data = await apiRequest('/auth/profile/enable-2FA', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('✅ 2FA enabled successfully');
    return data;
  },

  /**
   * Disable 2FA (Authenticated)
   */
  async disable2FA() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Disabling 2FA for user');

    const disableData = await apiRequest('/auth/profile/disable-2FA', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('✅ 2FA disabled successfully');
    return disableData;
  },

  /**
   * Verify 2FA authentication code
   */
  async verifyTwoFactorAuth(tempToken, authCode) {
    console.log('🔍 Verifying 2FA authentication code');

    const data = await apiRequest('/auth/login/verify-2fa', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tempToken}`,
      },
      body: JSON.stringify({
        code: authCode,
      }),
    });

    console.log('✅ 2FA authentication verified successfully');
    return data;
  },

  /**
   * Request Phone OTP (Authenticated)
   */
  async requestPhoneOTP(type) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Requesting phone verification OTP');

    const otpData = await apiRequest(`/auth/request-verify-phone-otp/${type}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('✅ Phone OTP requested successfully');
    return otpData;
  },

  /**
   * Verify Phone (Authenticated)
   */
  async verifyPhone(otp) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Verifying phone number');

    const verifyPhoneData = await apiRequest('/auth/verify-phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        otp: otp,
      }),
    });

    console.log('✅ Phone verified successfully');
    return verifyPhoneData;
  },
};

export default securityService;
