import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteDepartment } from "../../../redux/slices/departmentSlice";
import { fetchDepartment } from "../../../redux/slices/departmentSlice";

function DeleteDepartment({ id }) {
  const dispatch = useDispatch();

  const handleDelete = () => {

    // console.log("id for deleting row: ", id);
    
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(deleteDepartment(id));
      // dispatch(fetchDepartment())
    }
  };

  return (
    <IconButton onClick={handleDelete} color="error">
      <DeleteIcon />
    </IconButton>
  );
}

export default DeleteDepartment;
