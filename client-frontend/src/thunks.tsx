import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//step 9 creating thunks
//post
export const postUser = createAsyncThunk(
  "/user/post",
  async ({ id, name, age }: { id: number; name: string; age: string }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        id,
        name,
        age,
      });
      console.log("post response ",response.data);
      return response.data;
    } catch (e) {
      return e;
    }
  }
);

//delete
export const deleteUser = createAsyncThunk(
  "/user/delete",
  async ({ id }: { id: number }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${id}`
      );
      console.log(`Deleted user with id: ${id}, response: ${response.data}`);
      return { id };
    } catch (e) {
      return e;
    }
  }
);

//put
export const updateUser = createAsyncThunk(
  "/user/put",
  async ({ id, name, age }: { id: number; name: string; age: string }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        { name, age }
      );
      console.log("put response ",response.data);  
      return response.data;
    } catch (e) {
      return e;
    }
  }
);

//get
export const fetchUsers=createAsyncThunk('/user/get',async()=>{
    try {
        const response=await axios.get("http://localhost:5000/api/users")
        console.log("get response ",response.data)
        return response.data
    } catch(e){
        return e
    }
})

