import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//featch all department data
export const fetchDesignation = createAsyncThunk(
  "designation/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3306/api/designation/");
      // console.log("fetchDesignation", response.data);

      return response.data;
    } catch (error) {
      console.log("Error from fetch dept:", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //edit/update a department by id
export const updateDesignation = createAsyncThunk(
  "designation/update",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:3306/api/designation/update/${id}`,
        {
          DesignationName: name,
        }
      );
      console.log("ResponseFromUpdateDesig: ", response);
      alert(`${response.data.message}`);
      return response.data;
    } catch (error) {
      console.log("Error from edit desig:", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //delete a department by id
export const deleteDesignation = createAsyncThunk(
  "designation/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3306/api/designation/delete/${id}`
      );
      console.log("responseFromDeleteDesig",response);
      alert(`${response.data.message}`);
      return id;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("Assigned designation can't be deleted.");
      }
      console.log("Error from delete desig:", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //create a department
export const createDesignation = createAsyncThunk(
  "designation/create",
  async (name, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3306/api/designation/withID",
        { DesignationName: name }
      );
      console.log("responseFromCreateDept: ", response.data);
      alert(`${response.data.message}`);
      return response.data;
    } catch (error) {
      console.log("Error from create dept:", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const designationSlice = createSlice({
  name: "designation",
  initialState: {
    isLoading: false,
    isError: false,
    designations: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    //addcase for featching department
    builder.addCase(fetchDesignation.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(fetchDesignation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.designations = action.payload;
    });

    builder.addCase(fetchDesignation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //addcase for edit/update department
    builder.addCase(updateDesignation.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(updateDesignation.fulfilled, (state, action) => {
      console.log("fromUpdateDesig-addcase", action.payload);

      state.isLoading = false;
      const index = state.designations.findIndex(
        (desig) => desig.DesignationID === action.payload.designationId
      );
    //   console.log("index: ", index);
      if (index !== -1) {
        state.designations[index].DesignationName =
          action.payload.updatedDesignation.DesignationName;
      }
    });

    builder.addCase(updateDesignation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    // //addcase for deleting department
    builder.addCase(deleteDesignation.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(deleteDesignation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.designations = state.designations.filter(
        (desig) => desig.DesignationID !== action.payload
      );
    });
    builder.addCase(deleteDesignation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    // //addcase for create department
    builder.addCase(createDesignation.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(createDesignation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.designations = [...state.designations, action.payload.newDesignation];
    });
    builder.addCase(createDesignation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default designationSlice.reducer;
