import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchJobsByCategoryName
} from './categorythunk';

const initialState = {
  categories: [],
  categoryJobs: [],
  category: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 Fetch All Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch categories';
      })

      // 🔍 Fetch Single Category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload || null;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch category';
      })

      // ➕ Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create category';
      })

      // ✏️ Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (updated) {
          const index = state.categories.findIndex((cat) => cat._id === updated._id);
          if (index !== -1) {
            state.categories[index] = updated;
          }
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update category';
      })

      // ❌ Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete category';
      })

      // 📦 Fetch Jobs by Category Name
      .addCase(fetchJobsByCategoryName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsByCategoryName.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryJobs = action.payload || [];
      })
      .addCase(fetchJobsByCategoryName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch jobs for category';
      });
  },
});

export default categorySlice.reducer;
