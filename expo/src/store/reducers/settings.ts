import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const LOCALES = {
  "en": "en",
  "es": "es"
}

export type LocaleSymbol = keyof typeof LOCALES;

type SettingsStoreState = {
  locale: LocaleSymbol;
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    locale: 'en'
  } as SettingsStoreState,
  reducers: {
    setLocale(state, actions: PayloadAction<LocaleSymbol>) {
      state.locale = actions.payload;
    }
  }
});

export const { setLocale } = settingsSlice.actions;
export const settingsSliceReducer = settingsSlice.reducer;

