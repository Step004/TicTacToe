import { createSlice } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "./operations";
import { logOut } from "../auth/operations";
const contactInitialState = {
  items: [],
  loading: false,
  error: false,
};

const slice = createSlice({
  name: "contacts",
  initialState: contactInitialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addContact.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = false;
      })
      .addCase(updateContact.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const updatedContact = action.payload;
        const contact = state.items.find(
          (contact) => contact.id === updatedContact.id
        );
        if (contact) {
          contact.name = updatedContact.name || contact.name;
          contact.number = updatedContact.number || contact.number;
        }
        state.loading = false;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default slice.reducer;
