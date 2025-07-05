import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//featch all department data
export const fetchDepartment = createAsyncThunk(
  "department/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3306/api/department/");
      // console.log("fetchDepartment", response.data);

      return response.data;
    } catch (error) {
      console.log("Error from fetch dept:", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//edit/update a department by id
export const updateDepartment = createAsyncThunk(
  "department/update",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:3306/api/department/update/${id}`,
        {
          DepartmentName: name,
        }
      );
      console.log("ResponseFromUpdateDept: ", response);
      alert(`${response.data.message}`);
      return response.data;
    } catch (error) {
      console.log("Error from edit dept:", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//delete a department by id
export const deleteDepartment = createAsyncThunk(
  "department/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3306/api/department/delete/${id}`
      );
      // console.log("responseFromDeleteDept",response);
      alert(`${response.data.message}`);
      return id;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("Assigned department can't be deleted.");
      }
      console.log("Error from delete dept:", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//create a department
export const createDepartment = createAsyncThunk(
  "department/create",
  async (name, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3306/api/department/withID",
        { DepartmentName: name }
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

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    isLoading: false,
    isError: false,
    departments: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    //addcase for featching department
    builder.addCase(fetchDepartment.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(fetchDepartment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.departments = action.payload;
    });

    builder.addCase(fetchDepartment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //addcase for edit/update department
    builder.addCase(updateDepartment.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      console.log("fromUpdateDepart-addcase", action.payload);

      state.isLoading = false;
      const index = state.departments.findIndex(
        (dept) => dept.DepartmentID === action.payload.departmentId
      );
      console.log("index: ", index);
      if (index !== -1) {
        state.departments[index].DepartmentName =
          action.payload.updatedDepartment.DepartmentName;
      }
    });

    builder.addCase(updateDepartment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //addcase for deleting department
    builder.addCase(deleteDepartment.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(deleteDepartment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.departments = state.departments.filter(
        (dept) => dept.DepartmentID !== action.payload
      );
    });
    builder.addCase(deleteDepartment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //addcase for create department
    builder.addCase(createDepartment.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(createDepartment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.departments = [...state.departments, action.payload.newDepartment];
    });
    builder.addCase(createDepartment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default departmentSlice.reducer;
