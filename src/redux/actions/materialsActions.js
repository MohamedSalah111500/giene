import * as types from "./actionTypes";
import * as api from "../../api/materialsApi";

/**
 * Action to update store with materials list created by system
 * @param {*} statuses Materials  lookup
 */
export function setMaterials(materials) {
  materials.map(m => m.selected = false)
  return { type: types.SET_MATERIALS, materials };
}

export function setLoadingMaterials(loadingFlag) {
  return { type: types.SET_LOADING_MATERIALS, loadingFlag };
}
export function sortMaterials(materials) {
  return { type: types.SORT_MATERIALS, materials };
}
export function resetSelectedMaterials() {
  return { type: types.RESET_SELECTED_MATERIALS };
}
export function updateCurrentMaterial(material) {

  return { type: types.UPDATE_CURRENT_MATERIAL, material };
}

export function filterMaterials(materials) {

  return { type: types.FILTER_MATERIALS, materials };
}
export function updateAllMaterials(materials) {
  materials.map(m => m.selected = false)
  return { type: types.UPDATE_ALL_MATERIALS, materials };
}



export function setSelectedMaterials(material) {
  return { type: types.SET_SELECTED_MATERIALS, material };
}
export function setGroupSelectedMaterials(materials) {
  return { type: types.SET_GROUP_SELECTED_MATERIALS, materials };
}


export function setGroupingMaterials(materials) {

  return { type: types.SET_GROUPING_MATERIALS, materials };
}

export function updateActiveWells(wells) {
  return { type: types.UPDATE_ACTIVE_WELLS, wells };
}







/**
 * Get Materials for viewing depend on materialType Id and trans Group Id
 * @param {*} materialTypeId materialType Id
 * @param {*} transGroupId trans Group Id
 */

export function getMaterials(materialTypeId, transGroupId) {
  return function (dispatch, getState) {
    const { loadingMaterials } = getState();
    // the Materials is already loading
    if (loadingMaterials) {
      return;
    }
    dispatch(setLoadingMaterials(true));

    return api
      .getMaterialsList(materialTypeId, transGroupId)
      .then(list => {
        //dispatch actions
        dispatch(setMaterials(list));
        dispatch(updateAllMaterials(list));
        dispatch(resetSelectedMaterials());
        dispatch(setLoadingMaterials(false));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        dispatch(setLoadingMaterials(false));
        console.log("Error occurred while fetching the Materials list");
        throw error;
      });
  };
}


