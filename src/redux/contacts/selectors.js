import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter, selectNumberFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contact.items;
export const selectLoading = (state) => state.contact.loading;
export const selectError = (state) => state.contact.error;

export const selectUniversalFilter = createSelector(
  [selectNameFilter, selectNumberFilter],
  (nameFilter, numberFilter) => nameFilter || numberFilter
);

export const selectFilteredContacts = createSelector(
  [selectContacts, selectUniversalFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
);
