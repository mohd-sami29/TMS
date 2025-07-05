import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteDesignation } from "../../../redux/slices/designationSlice";
import { fetchDesignation } from "../../../redux/slices/designationSlice";

function DeleteDesignation({ id }) {
  const dispatch = useDispatch();

  const handleDelete = () => {

    // console.log("id for deleting row: ", id);
    
    if (window.confirm("Are you sure you want to delete this designation?")) {
      dispatch(deleteDesignation(id));
      // dispatch(fetchDesignation())
    }
  };

  return (
    <IconButton onClick={handleDelete} color="error">
      <DeleteIcon />
    </IconButton>
  );
}

export default DeleteDesignation;
