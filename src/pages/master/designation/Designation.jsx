import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button, IconButton, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDesignation,
  updateDesignation,
  createDesignation,
} from "../../../redux/slices/designationSlice";
// import Delete from "./Delete";
import CreateDesignation from "./CreateDesignation";
import EditDesignation from "./EditDesignation";
import DeleteDesignation from "./DeleteDesignation";

const Designation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDesignation());
  }, [dispatch]);

  const { designations, isLoading, isError } = useSelector(
    (state) => state.designation
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDesig, setSelectedDesig] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleEditClick = (desig) => {
    setSelectedDesig(desig);
    setEditModalOpen(true);
  };

  const handleUpdate = (id, name) => {
    dispatch(updateDesignation({ id, name }));
    // dispatch(fetchDepartment());
  };

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleCreate = (name) => {
    console.log("NAME: ", name);
    dispatch(createDesignation(name));
    // dispatch(fetchDepartment());
  };

  const columns = [
    { field: "DesignationID", headerName: "Designation ID", flex: 1 },
    { field: "DesignationName", headerName: "Designation Name", flex: 1 },
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
      renderCell: (params) => <DeleteDesignation id={params.row.DesignationID} />,
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
          Designation Data
        </Typography>
        <Button
          onClick={() => handleCreateClick()}
          variant="outlined"
          sx={{ fontWeight: "bold" }}
        >
          Create New Designation
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
            rows={designations}
            getRowId={(row) => row.DesignationID}
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

      <EditDesignation
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        DesignationName={selectedDesig?.DesignationName}
        handleUpdate={(name) => handleUpdate(selectedDesig?.DesignationID, name)}
        label="Designation Name"
        modalTitle="Edit Designation"
      />

      <CreateDesignation
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
        handleCreate={(name) => handleCreate(name)}
        label="Designation Name"
        modalTitle="New Designation"
      />
    </Paper>
  );
};

export default Designation;
