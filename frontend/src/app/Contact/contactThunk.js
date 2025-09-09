// src/redux/thunks/contactThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const API_URL = "/api/contact";

// POST - create contact
export const createContact = createAsyncThunk("contact/create", async (contactData) => {
  const response = await axios.post(API_URL, contactData);
  return response.data;
});

// GET - all contacts
export const fetchContacts = createAsyncThunk("contact/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// GET - single contact
export const fetchContactById = createAsyncThunk("contact/fetchOne", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

// PUT - update contact
export const updateContact = createAsyncThunk("contact/update", async ({ id, data }) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
});

// DELETE - remove contact
export const deleteContact = createAsyncThunk("contact/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});
