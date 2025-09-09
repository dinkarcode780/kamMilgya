// src/features/payment/paymentThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';

// 1. Create wallet order
export const createWalletOrderThunk = createAsyncThunk(
  'payment/createWalletOrder',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/payments/wallet/order', payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 2. Verify wallet payment
export const verifyWalletPaymentThunk = createAsyncThunk(
  'payment/verifyWalletPayment',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/payments/wallet/verify', payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 3. Create job post order
export const createJobPostOrderThunk = createAsyncThunk(
  'payment/createJobPostOrder',
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/payment/job-post/order', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// 4. Verify job post payment
export const verifyJobPostPaymentThunk = createAsyncThunk(
  'payment/verifyJobPostPayment',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/payments/job-post/verify', payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 5. Unlock candidate mobile number
export const unlockCandidateThunk = createAsyncThunk(
  'payment/unlockCandidate',
  async ({ jobId, candidateId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/payments/jobs/${jobId}/candidates/${candidateId}/unlock`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 6. Get wallet balance or data
export const getWalletThunk = createAsyncThunk(
  'payment/getWallet',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/payments/wallet');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// 7. Create Phone View Order
export const createPhoneViewOrderThunk = createAsyncThunk(
  'payment/createPhoneViewOrder',
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/payment/phone-view/order/${userId}`, payload);
    
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 8. Verify Phone View Payment
export const verifyPhoneViewPaymentThunk = createAsyncThunk(
  'payment/verifyPhoneViewPayment',
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/payments/phone-view/verify/${userId}`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fror application view details

export const verifyPhoneViewPaymentThunkk = createAsyncThunk(
  'payment/verifyPhoneViewPayment',
  async ({ userId, response }, { rejectWithValue }) => {
    try {
      // Pass razorpay fields directly
      const res = await axios.post(`/api/payment/phone-view/verify/${userId}`, {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);




export const createPhoneViewOrderThunkk = createAsyncThunk(
  'payment/createPhoneViewOrder',
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/payment/phone-view/order/${userId}`, payload);
    
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);