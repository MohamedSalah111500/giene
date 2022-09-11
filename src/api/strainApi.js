import axios from "axios";
import { STRAIN_API, STRAIN_LOCATION_API } from "./apiURLs";

/**
 * list existing Strain
 */
export function getStrainList(materialTypeId, transGroupId) {
  return axios.get(`${STRAIN_API.BASE_URL}?materialtypeId=${materialTypeId}&transgroupId=${transGroupId}`);

}

/**
 * get Strain location
 */
export function getStrainLocation(transFreezerId, rack, box) {
  return axios.get(`${STRAIN_LOCATION_API.BASE_URL}?transFreezerId=${transFreezerId}&rack=${rack}&box=${box}`);

}




