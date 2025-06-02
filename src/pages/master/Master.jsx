import  React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"


const paginationModel = { page: 0, pageSize: 5 };

export default function Master() {

    const [departments, setDepartments] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:3306/api/department/')
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.error('Error fetching departments:', err);
      });
  }, []);

  const handleEdit = (id) => {
    console.log('Edit DepartmentID:', id);
    
  };

  const handleDelete = async (id) => {
    console.log('Delete DepartmentID:', id);
      if (window.confirm('Are you sure you want to delete this department?')) {
    try {
      await axios.delete(`http://localhost:3306/api/department/delete/${id}`);
      setDepartments((departments) => departments.filter((department) => department.DepartmentID !== id));
      alert('Department deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete department.');
    }
  }
  };

  const columns = [
    { field: 'DepartmentID', headerName: 'Department ID', flex: 1 },
    { field: 'DepartmentName', headerName: 'Department Name', flex: 1 },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row.DepartmentID)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.DepartmentID)} color="error">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={departments}
        getRowId={(row) => row.DepartmentID}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
