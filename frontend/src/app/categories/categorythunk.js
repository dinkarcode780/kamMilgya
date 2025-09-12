import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const API_URL = "/api/category";

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      const normalizedData = response.data.map((cat) => ({
        ...cat,
        subcategories: Array.isArray(cat.subcategories) ? cat.subcategories : [], 
      }));
      return normalizedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


export const fetchCategoryById = createAsyncThunk(
  'categories/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// export const createCategory = createAsyncThunk(
//   'categories/create',
//   async (data, thunkAPI) => {
//     try {
//       const response = await axios.post(`${API_URL}/`, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log(response, "Category created successfully"); // ✅ Yeh ab sahi jagah pe hai

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
//     }
//   }
// );

export const createCategory = createAsyncThunk(
  'categories/create',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      // ✅ Backend ka error safe return karo
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
  }
);


  export const updateCategory = createAsyncThunk(
    'categories/update',
    async ({ id, data }, thunkAPI) => {

      
      try {
        const response = await axios.put(`${API_URL}/${id}`, data, {
          headers: {
            // ❗ Let browser set boundary automatically
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response, "Category updated successfully"); // ✅ Yeh ab sahi jagah pe hai
        
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );


export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // return deleted id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


export const fetchJobsByCategoryName = createAsyncThunk(
  'categories/fetchJobsByCategoryName',
  async (categoryName, thunkAPI) => {
    try {
      // 👇 yaha categoryName dynamically URL me add ho raha hai
      const response = await axios.get(`/api/category/${categoryName}/jobs`);
      console.log(response.data, "jobs in category thunk");
      console.log("Fetching jobs for category:", categoryName);
      
      return response.data;   
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
      // const message = error.response?.data?.message || error.response?.data || error.message || 'Something went wrong';
      // return thunkAPI.rejectWithValue(message);
    }
  }
);





