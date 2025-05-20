import apiClient from "./axios";

// const query = process.env.NEXT_PUBLIC_API_URL_LOCAL;

export const getTodaysQuery = async () => {
  try {
    const res = await apiClient.get(`/api/checkout/today`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllTimeQuery = async (pageNo, limit) => {
  try {
    const res = await apiClient.get(
      `/api/checkout/all?page=${pageNo}&limit=${limit}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getUserLoggedIn = async (data) => {
  try {
    const res = await apiClient.post(`/api/auth/login`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// export const uploadBulkCoupon = async (data) => {
//   try {
//     const res = await apiClient.post(`/api/coupon/bulk`, data);
//     return res.data;
//   } catch (err) {
//     throw err;
//   }
// };
export const uploadSingleCoupon = async (data) => {
  try {
    const res = await apiClient.post(`/api/coupon/add-single`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const getAllCoupons = async (data) => {
  try {
    const res = await apiClient.get(`/api/coupon/get-all`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
