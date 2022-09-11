 import {ERROR_MESSAGE} from "../constants/messages";
import * as toast from "../utils/toast/toast";
import {UN_AUTHORIZED} from "../routes/route-definitions";


export async function handleAxiosResponse(response) {

   if (response.status === 200 || response.status === 201  || response.status === 204) {
    return response.data;
  }

  //unauthorized user
  if (response.status === 401 || response.status === 403) {
    window.location.href = UN_AUTHORIZED;
  }

  // Service-side Validation
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    handleServerSideValidations(response);
  }

  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleServerSideValidations(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed with validations. " + error);

  if (error.response && error.response.data) {
    const errorMessage = `${error.message} \n ${error.response.data.join(" ,\n")}`;
    throw new Error(errorMessage);
  }
  throw error;
}


export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " , error);
  if (error.status === 400 ||(error.response && error.response.status===400)) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    handleServerSideValidations(error);
  } else if (error.status === 500||(error.response && error.response.status===500)) {
    toast.error(error.response.data);
  }else{
    toast.error(ERROR_MESSAGE.REFRESH_PAGE);
  }
 throw error;
}

