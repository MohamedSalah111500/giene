import axios from "axios";
import { DEVICE_CONFIG } from "./apiURLs";

/**
 * get device config object 
 */
export function getDeviceConfig(deviceTypeId, transGroupId) {
  return axios.get(`${DEVICE_CONFIG.BASE_URL}?deviceTypeId=${deviceTypeId}&transGroupId=${transGroupId}`);
}




