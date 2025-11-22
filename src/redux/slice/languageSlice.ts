import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LanguageType {
  id: number;
  name: string;
  code: string;
  mobile_app_code: string;
  rtl: boolean;
  is_default: boolean;
  image: string;
}

export interface LanguageStateType {
  languages: LanguageType[];
}

const initialState: LanguageStateType = {
  languages: [],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguages: (state, action: PayloadAction<LanguageType[]>) => {
      state.languages = action.payload;
    },
    clearLanguageState: (state) => {
      state.languages = [];
    },
  },
});

export const { setLanguages, clearLanguageState } = languageSlice.actions;

export default languageSlice.reducer;
