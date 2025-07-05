import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { fetchDepartment } from "../../../redux/slices/departmentSlice";
import { useSelector, useDispatch } from "react-redux";
import Modals from "../../../components/Modals";

function EditDepartment({
  open,
  handleClose,
  departmentName,
  handleUpdate,
  label,
  modalTitle,
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  useEffect(() => {
    setName(departmentName || "");
  }, [departmentName]);

  const handleSubmit = () => {
    if (name.trim() === "") {
      alert(`${label} cannot be empty`);
      return;
    }
    handleUpdate(name);
    handleClose();
    // dispatch(fetchDepartment());
  };

  const fields=[{label:label, name:name, setName:setName}]

  return (
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

export default EditDepartment;
