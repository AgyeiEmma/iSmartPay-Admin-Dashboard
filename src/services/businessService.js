/**
 * Business Service
 * Handles business profile and management operations
 */

import { apiRequest } from './apiClient.js';

/**
 * Business Service
 */
export const businessService = {
  /**
   * Get Business Information (Authenticated)
   */
  async getBusinessInfo(businessId) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Fetching business information');

    const businessData = await apiRequest(`/auth/business/${businessId}/business-info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('✅ Business information fetched');
    return businessData;
  },

  /**
   * Update Business Information (Authenticated)
   */
  async updateBusinessInfo(businessId, businessInfo) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('🔍 Updating business information');

    const updateBusinessData = await apiRequest(`/auth/business/${businessId}/business-info`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        trading_name: businessInfo.tradingName,
        description: businessInfo.description,
        staff_size: businessInfo.staffSize,
        expected_monthly_revenue: businessInfo.expectedMonthlyRevenue,
        tin_number: businessInfo.tinNumber,
        registration_type: businessInfo.registrationType,
      }),
    });

    console.log('✅ Business information updated');
    return updateBusinessData;
  },
};

export default businessService;
