import axios from "axios";

import { handleAxiosResponse ,handleError} from "./apiUtils";
import { configureAxiosToken } from "./configureAxiosToken";
import * as toast from "../utils/toast/toast";

export default function configureAxios() {
  //Configure Default axios for all requests
  configureBaseAxios();
}

function addAccessTokenToHeader(config) {
  return configureAxiosToken(config);
}

function configureBaseAxios() {
  axios.interceptors.request.use(
    config => addAccessTokenToHeader(config),
    error => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => handleAxiosResponse(response),
    error => {
       handleError(error);
       //Report issue to user
       toast.error(error.message);
       throw error;
    }
  );
}
