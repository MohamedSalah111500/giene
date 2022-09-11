import React from "react";
import "./toast-style.css";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-toastify";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";


const withCustomToast = (icon, title, content) => (
  <>
    <div className="header-wrapper">
      <span className="title">
        {icon} {title}
      </span>
    </div>
    <div item className="text-wrapper">
      <span>{content}</span>
    </div>
  </>
);

const successContent = content =>
  withCustomToast(<CheckCircleOutlineIcon className="toast-success-icon" />, "Success", ReactHtmlParser(content));

const errorContent = content =>
  withCustomToast(<ErrorOutlineIcon className="toast-error-icon" />, "Error", ReactHtmlParser(content));

const warningContent = content =>
  withCustomToast(<WarningAmberIcon className="toast-warning-icon" />, "Warning", ReactHtmlParser(content));

const infoContent = content =>
  withCustomToast(<ErrorOutlineIcon className="toast-info-icon" />, "Info", ReactHtmlParser(content));
/**
 * Toast an error with specified content
 * @param {*} content
 */
export function error(content) {
  toast.error(errorContent(content), {
    className: `toast-error`,
    position: "top-center"
  });
}

/**
 * Toast an error with specified content
 * @param {*} content
 */
export function warning(content) {
  toast.warning(warningContent(content), {
    className: `toast-warning`,
    position: "top-center"
  });
}

/**
 * Toast information with specified content
 * @param {*} content
 */
export function info(content) {
  toast.info(infoContent(content), {
    className: `toast-info`,
    position: "top-center"
  });
}

/**
 * Toast success with specified content
 * @param {*} content
 */
export function success(content) {
  toast.success(successContent(content), {
    className: `toast-success`,
    position: "top-center"
  });
}
