import * as types from "./actionTypes";
import * as api from "../../api/wellsApi";



/**
 * Get device Configuration for viewing depend on deviceTypeId Id and trans Group Id
 * @param {*} deviceTypeId deviceType  Id
 * @param {*} transGroupId trans Group Id
 */

/**
 * Action to update store with device config list created by system
 * @param {*} statuses Materials  lookup
 */
export function setDeviceConfig(config) {
  return { type: types.SET_DEVICE_CONFIG, config };
}



export function getDeviceConfig(deviceTypeId, transGroupId) {
  return function (dispatch, getState) {
    const { loadingStrains } = getState();
    // the Strains is already loading
    if (loadingStrains) {
      return;
    }

    return api
      .getDeviceConfig(deviceTypeId, transGroupId)
      .then(config => {
        //dispatch actions
        dispatch(setDeviceConfig(config));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("Error occurred while fetching the config object");
        throw error;
      });
  };
}

