import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import * as React from "react";
import { CANCEL_BUTTON } from "../../../constants/messages";
import CustomButton, { CLASS_TYPES } from "../Button/Button";
import classes from "./ConfirmationDialog.module.scss";

export default function ConfirmationDialog({
  title,
  isOpen,
  handleCancelDialog,
  handleConfirmAction,
  name,
  confirmLabel = "confirm"
}) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleCancelDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>

        <DialogActions>
          <CustomButton onClick={handleCancelDialog} classType={CLASS_TYPES.ACTION_SECONDARY_FORM_BTN}
            label={CANCEL_BUTTON} disableElevation />

          <CustomButton onClick={() => handleConfirmAction(name)}
            label={confirmLabel} disableElevation />

        </DialogActions>
      </Dialog>
    </div>
  );
}
