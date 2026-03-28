// constants.js

// 1. The Single Source of Truth for your Backend URL
export const BASE_URL = "https://marketbasex-backend.onrender.com";

// 2. API Route Definitions (built using the BASE_URL above)
export const USERS_URL = `${BASE_URL}/api/users`;
export const CATEGORY_URL = `${BASE_URL}/api/category`;
export const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;
