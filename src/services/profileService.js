/**
 * Profile Management Service
 * Handles user profile operations and preferences
 */

import { apiRequest } from './apiClient.js';

/**
 * Profile Management Service
 */
export const profileService = {
  /**
   * Get User Profile (Authenticated)
   */
  async getUserProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Fetching user profile');

    const data = await apiRequest('/auth/profile/personal-info', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('✅ User profile fetched');
    return data;
  },

  /**
   * Update User Profile (Authenticated)
   */
  async updateProfile(profileData) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Updating user profile');

    const updateData = await apiRequest('/auth/profile/personal-info', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone_number: profileData.phoneNumber,
        country: profileData.country,
        city: profileData.city,
        area: profileData.area,
        digital_address: profileData.digitalAddress,
      }),
    });

    console.log('✅ User profile updated');
    return updateData;
  },

  /**
   * Get User Preferences (Authenticated)
   */
  async getUserPreferences() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Fetching user preferences');

    const preferencesData = await apiRequest('/auth/profile/preferences', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('✅ User preferences fetched');
    return preferencesData;
  },

  /**
   * Update User Preferences (Authenticated)
   */
  async updateUserPreferences(preferences) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Updating user preferences');

    const updatePrefsData = await apiRequest('/auth/profile/preferences', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        currency: preferences.currency,
        language: preferences.language,
        notification_preference: preferences.notificationPreference,
        theme: preferences.theme,
        timezone: preferences.timezone,
      }),
    });

    console.log('✅ User preferences updated');
    return updatePrefsData;
  },
};

export default profileService;
