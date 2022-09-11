import axios from "axios";
import { CROPS_API } from "./apiURLs";

/**
 * list existing crops
 */
export function getCropsList() {
  return axios.get(CROPS_API.BASE_URL);
}


