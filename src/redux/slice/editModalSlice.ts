import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type editModalSliceType = unknown | null;

const editModalSlice = createSlice({
  name: "modal",
  initialState: null as editModalSliceType,

  reducers: {
    setEditModal: (
      _state: editModalSliceType,
      action: PayloadAction<editModalSliceType>
    ) => action.payload,
    clearEditModal: () => null,
  },
});

export const { setEditModal, clearEditModal } = editModalSlice.actions;
export default editModalSlice.reducer;
