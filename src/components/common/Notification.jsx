import { Snackbar, Alert, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../store/slicers/Notification";

const Notification = () => {
  const {
    open,
    type,
    message,
    timeout,
    vertical,
    horizontal
  } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const handleClose = (reason) => {
    if (reason !== "clickaway") { dispatch(clearNotification()); return }
    dispatch(clearNotification())
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      autoHideDuration={timeout}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        <Typography
          // color={color}
          fontSize='10px'
          fontWeight='bold'
        >
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};
export default Notification;
