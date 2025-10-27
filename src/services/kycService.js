/**
 * KYC Service
 * Handles KYC document upload and verification
 */

import { apiRequest } from './apiClient.js';

/**
 * KYC Service
 */
export const kycService = {
  /**
   * Get KYC Documents (Authenticated)
   */
  async getKYCDocuments() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Fetching KYC documents');

    const kycData = await apiRequest('/auth/profile/kyc-docs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('✅ KYC documents fetched');
    return kycData;
  },

  /**
   * Upload KYC Document (Authenticated)
   */
  async uploadKYCDocument(formData) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Uploading KYC document');

    const uploadData = await apiRequest('/auth/profile/kyc-docs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    console.log('✅ KYC document uploaded successfully');
    return uploadData;
  },
};

export default kycService;
