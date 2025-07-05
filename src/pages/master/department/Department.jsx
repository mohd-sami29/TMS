import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button, IconButton, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import {
  createDepartment,
  fetchDepartment,
} from "../../../redux/slices/departmentSlice";
import DeleteDepartment from "./DeleteDepartment";
import { updateDepartment } from "../../../redux/slices/departmentSlice";
import CreateDepartment from "./CreateDepartment";
import EditDepartment from "./EditDepartment";

const Department = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  const { departments, isLoading, isError } = useSelector(
    (state) => state.department
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleEditClick = (dept) => {
    setSelectedDept(dept);
    setEditModalOpen(true);
  };

  const handleUpdate = (id, name) => {
    dispatch(updateDepartment({ id, name }));
    // dispatch(fetchDepartment());
  };

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleCreate = (name) => {
    console.log("NAME: ", name);
    dispatch(createDepartment(name));
    // dispatch(fetchDepartment());
  };

  const columns = [
    { field: "DepartmentID", headerName: "Department ID", flex: 1 },
    { field: "DepartmentName", headerName: "Department Name", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        // console.log("params in Edit column:", params)
        return (
          <IconButton
            onClick={() => handleEditClick(params.row)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => <DeleteDepartment id={params.row.DepartmentID} />,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m={2}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "large" }}>
          Department Data
        </Typography>
        <Button
          onClick={() => handleCreateClick()}
          variant="outlined"
          sx={{ fontWeight: "bold" }}
        >
          Create New Department
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box sx={{ flexGrow: 1, overflowX: "auto" }}>
          <DataGrid
            columns={columns}
            rows={departments}
            getRowId={(row) => row.DepartmentID}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{
              minWidth: "600px",
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "text.secondary",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
              },
            }}
          />
        </Box>
      </Box>

      <EditDepartment
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        departmentName={selectedDept?.DepartmentName}
        handleUpdate={(name) => handleUpdate(selectedDept?.DepartmentID, name)}
        label="Department Name"
        modalTitle="Edit Department"
      />

      <CreateDepartment
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
        handleCreate={(name) => handleCreate(name)}
        label="Department Name"
        modalTitle="New Department"
      />
    </Paper>
  );
};

export default Department;
