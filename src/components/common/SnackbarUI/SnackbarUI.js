import React, { memo, useEffect, useState } from "react";
import { Alert } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

import classes from "./SnackbarUI.module.scss";

const SnackbarUI = ({ open, alertInfo = { status: 'success', message: '' } }) => {

  const { vertical, horizontal } = {
    vertical: 'top',
    horizontal: 'center',
  };

  const [localOpen, setLocalOpen] = useState(false);


  useEffect(() => {
    setLocalOpen(true)
    setTimeout(() => {
      setLocalOpen(false)
    }, 3000)

  }, [alertInfo])


  return (
    <Snackbar open={open && localOpen}
      anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000}  >
      <Alert severity={alertInfo.status} sx={{ width: '100%' }}>
        {alertInfo.message}
      </Alert>
    </Snackbar>
  );
}

export default memo(SnackbarUI)