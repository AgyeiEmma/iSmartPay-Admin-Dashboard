/**
 * API Services - Main Export File
 * Combining all API services for easy importing
 */

import apiRequest from './apiClient.js';
import authService from './coreAuthService.js';
import profileService from './profileService.js';
import securityService from './securityService.js';
import kycService from './kycService.js';
import businessService from './businessService.js';
import tokenService from './tokenService.js';

export {
  apiRequest,
  authService,
  profileService,
  securityService,
  kycService,
  businessService,
  tokenService
};

// Combined export for easy importing
export default {
  auth: authService,
  profile: profileService,
  security: securityService,
  kyc: kycService,
  business: businessService,
  token: tokenService,
};
