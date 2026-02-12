// API Service for MyGenePortal
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

// Generic fetch wrapper with error handling
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Tests API
export const testsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.popular !== undefined) params.append('popular', filters.popular);
    const queryString = params.toString();
    return fetchAPI(`/api/tests${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: async (testId) => {
    return fetchAPI(`/api/tests/${testId}`);
  },
};

// Leads API
export const leadsAPI = {
  create: async (leadData) => {
    return fetchAPI('/api/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  },
  
  getAll: async (status = null) => {
    const params = status ? `?status=${status}` : '';
    return fetchAPI(`/api/leads${params}`);
  },
};

// Orders API
export const ordersAPI = {
  create: async (orderData) => {
    return fetchAPI('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
  
  getAll: async (email = null) => {
    const params = email ? `?email=${encodeURIComponent(email)}` : '';
    return fetchAPI(`/api/orders${params}`);
  },
  
  getById: async (orderId) => {
    return fetchAPI(`/api/orders/${orderId}`);
  },
};

// Coupon API
export const couponAPI = {
  verify: async (code, orderTotal) => {
    return fetchAPI('/api/verify-coupon', {
      method: 'POST',
      body: JSON.stringify({ code, order_total: orderTotal }),
    });
  },
  
  getAll: async () => {
    return fetchAPI('/api/coupons');
  },
};

// Blog API
export const blogAPI = {
  getAll: async (category = null) => {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    return fetchAPI(`/api/blog${params}`);
  },
  
  getById: async (postId) => {
    return fetchAPI(`/api/blog/${postId}`);
  },
};

// Sample Tracking API
export const trackingAPI = {
  track: async (trackingId) => {
    return fetchAPI(`/api/track-sample/${trackingId}`);
  },
};

// Health Categories API
export const categoriesAPI = {
  getAll: async () => {
    return fetchAPI('/api/health-categories');
  },
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async () => {
    return fetchAPI('/api/testimonials');
  },
};

// Health Check
export const healthAPI = {
  check: async () => {
    return fetchAPI('/api/health');
  },
};

export default {
  tests: testsAPI,
  leads: leadsAPI,
  orders: ordersAPI,
  coupon: couponAPI,
  blog: blogAPI,
  tracking: trackingAPI,
  categories: categoriesAPI,
  testimonials: testimonialsAPI,
  health: healthAPI,
};
