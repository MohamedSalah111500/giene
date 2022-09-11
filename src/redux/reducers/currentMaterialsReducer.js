import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import update from 'react-addons-update';
import { INITIAL_CURRENT_MATERIALS } from "../../utils/materialsUtils/materials-utils"

export default function currentMaterialsReducer(state = initialState.materials, action = {}) {
  
  switch (action.type) {

    case types.SET_LOADING_MATERIALS:
      return { ...state, isLoadingMaterials: action.loadingFlag };

    case types.SET_MATERIALS:
      return { ...state, materials: action.materials, presentMaterials: action.materials };

    case types.UPDATE_CURRENT_MATERIAL:
            return update(state, {
        presentMaterials: {
          [action.material.index]: {
            selected: { $set: action.material.material?.selected ? false : true }
          }
        }
      });

    case types.SET_SELECTED_MATERIALS:
      function toggleItem(list, item) {
        let newList = [...list];
        if (!item.selected) {
          newList.push(item)
        } else {
          newList.forEach(e => {
            if (e.id === item.id) {
              newList = newList.filter(i => i.id !== item.id);
            }
          });
        }
        return newList
      }
      return { ...state, selectedMaterials: toggleItem(state.selectedMaterials, action.material) };

    case types.SET_GROUP_SELECTED_MATERIALS:
      return { ...state, selectedMaterials: action.materials };

    case types.RESET_SELECTED_MATERIALS:
      return { ...state, selectedMaterials: [] };

    case types.SORT_MATERIALS:
      return { ...state, presentMaterials: action.materials };

    case types.FILTER_MATERIALS:
      return { ...state, filteredMaterials: action.materials };

    case types.UPDATE_ALL_MATERIALS:
      return { ...state, materials: action.materials, filteredMaterials: action.materials, groupedMaterials: action.materials, presentMaterials: action.materials , selectedMaterials: []};

    case types.SET_GROUPING_MATERIALS:
      return { ...state, presentMaterials: action.materials };




    case types.UPDATE_ACTIVE_WELLS:
      return { ...state, wells: action.wells };


    case types.RESET_CURRENT_MATERIALS:
      return INITIAL_CURRENT_MATERIALS;

    default:
      return state;
  }
}
