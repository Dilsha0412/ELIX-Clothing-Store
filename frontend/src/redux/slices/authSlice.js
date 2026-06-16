import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getInitialUser = () => {
  try {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
  }
  return null;
};

const userFromStorage = getInitialUser();
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      localStorage.setItem("userToken", response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Login failed" });
    }
  }
);

// Async Thunk for User Registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      localStorage.setItem("userToken", response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Registration failed" });
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.removeItem("token");
      localStorage.removeItem("auth_token");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Handlers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error?.message || "Login failed. Server is unreachable.";
      })

      // Register Handlers
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error?.message || "Registration failed. Server is unreachable.";
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;