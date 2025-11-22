import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TranslateStateType {
  translations: Record<string, string>;
}

const initialState: TranslateStateType = {
  translations: {},
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setTranslations: (state, action: PayloadAction<Record<string, string>>) => {
      state.translations = action.payload;
    },

    clearTranslations: (state) => {
      state.translations = {};
    },
  },
});

export const { setTranslations, clearTranslations } = translateSlice.actions;

export default translateSlice.reducer;
