import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postUser, deleteUser, updateUser, fetchUsers } from "../thunks";

interface UserState {
  users: any[];
  status: string;
  name: string;
  age: string;
  buttonState: string;
  editingUserId: null | number;
}
const initialState: UserState = {
  users: [],
  status: "",
  name: "",
  age: "",
  buttonState: "add",
  editingUserId: null,
};
//step 3 creating slices
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAge(state, action: PayloadAction<string>) {
      state.age = action.payload;
    },
    setButtonState(state, action: PayloadAction<string>) {
      state.buttonState = action.payload;
    },
    setEditingUserId(state, action: PayloadAction<null | number>) {
      state.editingUserId = action.payload;
    },
  },
  //step 11 validating thunks using extraReducer
  extraReducers: (builder) => {
    builder
      .addCase(postUser.pending, (state) => {
        state.status = "pending postUser";
        console.log(state.status);
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.status = "fulfilled postUser";
        state.users.push(action.payload);
        console.log("fulfilled - Created user ", action.payload);
      })
      .addCase(postUser.rejected, (state) => {
        state.status = "rejected postUser";
        console.log(state.status);
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "pending deleteUser";
        console.log(state.status);
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "fulfilled deleteUser";
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        console.log("fulfilled - Deleted user with id of ", action.payload.id);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = "rejected deleteUser";
        console.log(state.status);
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "pening updateUser";
        console.log(state.status);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "fulfilled updateUser";
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        console.log("fulfilled - Updated user with the id ", action.payload.id);
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "rejected updateUser";
        console.log(state.status);
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending fetchUsers";
        console.log(state.status);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "fulfilled fetchUsers";
        state.users = action.payload;
        console.log("fulfilled - Got users", state.users);
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "rejected fetchUsers";
        console.log(state.status);
      });
  },
});
//step 4 actions
export const { setName, setAge, setButtonState, setEditingUserId } =
  userSlice.actions;
//step 5 reducer
export default userSlice.reducer;
