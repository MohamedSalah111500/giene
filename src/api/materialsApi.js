import axios from "axios";
import { EXPIRE_MATERIALS, MATERIALS_API, MATERIALS_TYPES_API, PLACE_MATERIALS,UNPLACE_MATERIALS, UNEXPIRE_MATERIALS } from "./apiURLs";

/**
 * list existing materials
 */
export function getMaterialsList(materialTypeId, transGroupId) {
  return axios.get(`${MATERIALS_API.BASE_URL}?materialtypeId=${materialTypeId}&transgroupId=${transGroupId}`);
}


/**
 * list existing materials Types
 */
export function getMaterialsTypesList() {
  return axios.get(MATERIALS_TYPES_API.BASE_URL);
}

/**
 * list existing materials Types
 */
export function placeMaterialsToWells(list) {
  return axios.post(PLACE_MATERIALS.BASE_URL, list);
}

/**
 * list existing materials Types
 */
 export function setUnplaceMaterials(list) {
  return axios.post(UNPLACE_MATERIALS.BASE_URL, list);
}


/**
 * list unexpire materials Types
 */
export function setUnexpire(materialTypeId) {
  return axios.put(`${UNEXPIRE_MATERIALS.BASE_URL}?materialId=${materialTypeId}`);
}

/**
 * list unexpire materials Types
 */
export function setExpire(list) {
  return axios.put(EXPIRE_MATERIALS.BASE_URL, list);
}





