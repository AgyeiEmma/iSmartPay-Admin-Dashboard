declare module "../services/apiClient" {
  interface ApiRequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
  }

  const apiRequest: (
    endpoint: string,
    options?: ApiRequestOptions
  ) => Promise<any>;

  export default apiRequest;
}
