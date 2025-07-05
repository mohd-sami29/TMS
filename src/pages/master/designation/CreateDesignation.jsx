import React, { useState, useEffect } from "react";
// import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { fetchDepartment } from "../../../redux/slices/departmentSlice";
import { useSelector, useDispatch } from "react-redux";
import Modals from "../../../components/Modals";

function CreateDesignation({
  open,
  handleClose,
  label,
  modalTitle,
  handleCreate,
}) {
  const dispatch = useDispatch();
  let [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "") {
      alert(`${label} cannot be empty`);
      return;
    }
    handleCreate(name);
    handleClose();
    setName("");
    // dispatch(fetchDepartment());
  };

  const fields = [
    { label: label, name: name, setName:setName },
  ];

  return (
    // <Modal open={open} onClose={handleClose}>
    //   <Box
    //     sx={{
    //       width: 400,
    //       p: 3,
    //       backgroundColor: "#fff",
    //       margin: "100px auto",
    //       borderRadius: 2,
    //     }}
    //   >
    //     <Typography variant="h6" mb={2}>
    //       {modalTitle}
    //     </Typography>
    //     <TextField
    //       label={label}
    //       fullWidth
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <Box mt={2} display="flex" justifyContent="flex-end">
    //       <Button onClick={handleClose} sx={{ mr: 1 }}>
    //         Cancel
    //       </Button>
    //       <Button onClick={handleSubmit} variant="contained">
    //         Save
    //       </Button>
    //     </Box>
    //   </Box>
    // </Modal>

    <Modals
    width={500}
      open={open}
      handleClose={handleClose}
      modalTitle={modalTitle}
      // label={label}
      // name={name}
      fields={fields}
      // setName={setName}
      handleSubmit={handleSubmit}
    />
  );
}

export default CreateDesignation;
