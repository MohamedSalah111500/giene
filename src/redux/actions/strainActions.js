import * as types from "./actionTypes";
import * as api from "../../api/strainApi";



/**
 * Get Strains for viewing depend on materialType Id and trans Group Id
 * @param {*} materialTypeId materialType Id
 * @param {*} transGroupId trans Group Id
 */

/**
 * Action to update store with Strains list created by system
 * @param {*} statuses Strains  lookup
 */
export function setStrains(strains) {
  return { type: types.SET_STRAINS, strains };
}



export function getStrains(materialTypeId, transGroupId) {
  return function (dispatch, getState) {
    const { loadingStrains } = getState();
    // the Strains is already loading
    if (loadingStrains) {
      return;
    }

    return api
      .getStrainList(materialTypeId, transGroupId)
      .then(list => {
        list = list.map((m) => { return { name: m } });
        //dispatch actions
        dispatch(setStrains(list));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("Error occurred while fetching the strains list");
        throw error;
      });
  };
}

