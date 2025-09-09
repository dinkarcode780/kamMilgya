// src/features/payment/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  createWalletOrderThunk,
  verifyWalletPaymentThunk,
  createJobPostOrderThunk,
  verifyJobPostPaymentThunk,
  createPhoneViewOrderThunk,
  verifyPhoneViewPaymentThunk,
  unlockCandidateThunk,
  getWalletThunk
  
} from './Paymenthunk';

const initialState = {
  loading: false,
  error: null,
  wallet: null,
  jobOrder: null,
  unlockStatus: null,
    phoneViewOrder: null,        // ✅ नया field
  phoneViewVerified: false,    // ✅ नया field
  success: false,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.phoneViewVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Wallet Order
      .addCase(createWalletOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWalletOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
        state.success = true;
      })
      .addCase(createWalletOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Wallet Verify
      .addCase(verifyWalletPaymentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyWalletPaymentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyWalletPaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Job Post Order
      .addCase(createJobPostOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJobPostOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.jobOrder = action.payload;
        state.success = true;
      })
      .addCase(createJobPostOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Job Post Verify
      .addCase(verifyJobPostPaymentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyJobPostPaymentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyJobPostPaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Unlock Candidate
      .addCase(unlockCandidateThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(unlockCandidateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.unlockStatus = action.payload;
        state.success = true;
      })
      .addCase(unlockCandidateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Wallet
      .addCase(getWalletThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWalletThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(getWalletThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Phone View Order
.addCase(createPhoneViewOrderThunk.pending, (state) => {
  state.loading = true;
})
.addCase(createPhoneViewOrderThunk.fulfilled, (state, action) => {
  state.loading = false;
  state.phoneViewOrder = action.payload;
  state.success = true;
})
.addCase(createPhoneViewOrderThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

// Phone View Verify
.addCase(verifyPhoneViewPaymentThunk.pending, (state) => {
  state.loading = true;
})
.addCase(verifyPhoneViewPaymentThunk.fulfilled, (state, action) => {
  state.loading = false;
  state.phoneViewVerified = true;
  state.success = true;
})
.addCase(verifyPhoneViewPaymentThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

  },
});

export const { clearPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
