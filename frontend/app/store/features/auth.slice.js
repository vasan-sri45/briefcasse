import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload ?? null;
      state.hydrated = true;

      if (typeof window !== "undefined") {
        try {
          if (action.payload) {
            localStorage.setItem("bc_user", JSON.stringify(action.payload));
          }
        } catch (e) {
          console.error("Auth Slice: localStorage write failed", e);
        }
      }
    },

    clearUser(state) {
      state.user = null;
      state.hydrated = true;

      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("bc_user");
        } catch (e) {
          console.error("Auth Slice: localStorage clear failed", e);
        }
      }
    },

    rehydrateFromStorage(state) {
      if (typeof window === "undefined") return;

      try {
        const u = localStorage.getItem("bc_user");
        if (u) state.user = JSON.parse(u);
      } catch (e) {
        console.error("Auth Slice: localStorage read failed", e);
      } finally {
        state.hydrated = true;
      }
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  rehydrateFromStorage,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;



