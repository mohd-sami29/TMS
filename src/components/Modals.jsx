import React from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

function Modals({
  open,
  handleClose,
  modalTitle,
  // label,
  // name,
  // setName,
  handleSubmit,
  fields = [],
  width = 600,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width,
          p: 3,
          backgroundColor: "#fff",
          margin: "50px auto",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {modalTitle}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            p: 2,
            overflowY: "auto",
            maxHeight: "60vh",
          }}
        >
          {fields &&
            fields.map((field) => (
              <TextField
                sx={{ flex: "1 1 calc(33.33% - 16px)" }}
                fullWidth
                label={field.label}
                value={field.name}
                onChange={(e)=>field.setName(e.target.value)}
              />
            ))}
        </Box>

        {/* <TextField
          fullWidth
          label={label}
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Modals;
