import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { fetchDesignation } from "../../../redux/slices/designationSlice";
import { useSelector, useDispatch } from "react-redux";
import Modals from "../../../components/Modals";

function EditDesignation({
  open,
  handleClose,
  DesignationName,
  handleUpdate,
  label,
  modalTitle,
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  useEffect(() => {
    setName(DesignationName || "");
  }, [DesignationName]);

  const handleSubmit = () => {
    if (name.trim() === "") {
      alert(`${label} cannot be empty`);
      return;
    }
    handleUpdate(name);
    handleClose();
    // dispatch(fetchDesignation());
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

export default EditDesignation;
