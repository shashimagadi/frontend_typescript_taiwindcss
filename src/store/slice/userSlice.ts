



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../api/baseURL";
import UserDetails from "../../components/UserDetails";
import api from "../../utils/api";
import { toast } from "react-toastify";

export interface UserDetails {
  id?: number;
  name: string;
  position: string;
  description: string;
}

interface UserState {
  users: UserDetails[];
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  users: [],
  status: "idle",
};

//  GET USERS
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await api.get(`/userDetails/getUserDetails`);
  return response.data;
});

// CREATE USER
export const createUser = createAsyncThunk("users/createUser", async (user: UserDetails) => {
    
    
  const response = await api.post(`/userDetails/createUserDetails`, user);
  if(response.data.message==='success'){
    toast.success("User created successfully!");
  }
  
  return response.data;
});

//  UPDATE USER
export const updateUser = createAsyncThunk("users/updateUser", async (user: UserDetails) => {
  const response = await api.put(`/userDetails/updateUserDetails/${user.id}`, user);
  console.log("response dtaaaaaa ", response.data);
  if(response.data.message==='success'){
    toast.success("User updated successfully!");
  }
  
  return response.data;
});

// DELETE USER
export const deleteUser = createAsyncThunk("users/deleteUser", async (id: number) => {
  await api.delete(`/userDetails/deleteUserDetails/${id}`);
  return id; // Return the ID to remove from the Redux state
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET USERS
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = "failed";
      })
      // CREATE USER
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        
      })
      .addCase(createUser.rejected, (state) => {
        toast.error("Failed to create user");
      })
      // UPDATE USER
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
          
        }
      })
      .addCase(updateUser.rejected, (state) => {
        toast.error("Failed to update user");
      })
      // DELETE USER
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        toast.success("User deleted successfully!");
      })
      .addCase(deleteUser.rejected, (state) => {
        toast.error("Failed to delete user");
      });
  },
});

export default userSlice.reducer;
