/* BUTTON MESSAGES */
export const BUTTONS = {
  UNDO: "Undo",
  REDO: "Redo",
  SELECT_ALL: "Select All",
  UNSELECT_ALL :"Unselect All",
  UNPLACE: "Unplace",
  EXPIRE: "Expire",
  CLEAR: "Clear",
  UNEXPIRE: "Unexpire",
  PLACE_ACROSS: "Place Across",
  PLACE_DOWN: "Place Down",
  UNPLACE_EXPIRECONTENT: "Unplace & Expire Contents",
  CLEAR_FILTERS: "Clear Filters",
};


/* DROPDOWN MESSAGES */
export const DROPDOWN = {
  DNA_MATERIALS: "DNA Materials",
  CROP_NAME: "Select Crop",
  STRAIN: "Select Strain",
  PERIOD: "Select Hand-Off Period",
  SORT_CRITERIA: "Sort Criteria",
  SELECT_RACK: "Select Rack",
  SELECT_BOX: "Select Box",

};

export const DIALOG_MSG = {
  UNEXPIRE: "Are you sure you want to unexpire this material ?",
  EXPIRE: "Are you sure you want to expire this material(s)?",
  UNPLACE_AND_EXPIRE: "Are you sure you want to unplace and expire this material(s) ?",
}
/* SEARCH BOX PLACEHOLDER */
export const SEARCH_BOX = {
  PLACEHOLDER: "Search "
};

/* SELECT TABS MESSAGES */
export const LABEL = {
  SHOW: "Show",
  SORT: "Sort",
  FILTER: "Filter",
};

/* SELECT TABS MESSAGES */
export const SELECT_TABS = {
  ALL: "All",
  PLACED: "Placed",
  UNPLACED: "Unplaced",
  EXPIRED: "Expired"
};

/* EMPTY STATE MESSAGES */
export const EMPTY_STATE = {
  MATERIALS: "No Materials...",
  WELLS: "No Wells...",
};


/* eslint-disable no-multi-str */
export const ERROR_MESSAGE = {
  REFRESH_PAGE: "An error occurred. Please refresh the page and try again.",
  MATERIALS_MORE_WELLS: "Make sure selected wells are more than or equal selected materials",
  CAN_NOT_PLACE_MATERIAL: 'One of the material(s) are placed/expired',
  CAN_NOT_UPDATE_MATERIAL: 'Error has occurred while updating material(s)',
  CAN_NOT_UNPLACED_MATERIAL: 'Error has occurred while unplacing material(s)',

}
/* eslint-disable no-multi-str */
export const SUCCESS_MESSAGE = {
  PLACE_MATERIAL: 'Material(s) are placed successfully',
  UNEXPIRE_MATERIAL: 'Material is unexpired successfully',
  EXPIRE_MATERIAL: 'Material(s) are expired successfully',
  UNPLACED_MATERIAL: 'Material(s) are unplaced successfully',

}



export const NOT_ADDED = "Not Added";
export const NO_ROWS_DEFAULT = "No Rows To Show.";

export const CLOSE_ALL = "Close All";
export const ADD_BUTTON = "Add";
export const SUBMIT_BUTTON = "Submit";
export const CANCEL_BUTTON = "cancel";
export const CONFIRM_UNEXPIRE_BUTTON = "Yes, unexpire";
export const CONFIRM_EXPIRE_BUTTON = "Yes, expire";
export const CONFIRM_UNPLACE_EXPIRE_BUTTON = "Yes, unplace & expire.";






export const BACK_BUTTON = "back";
export const REMOVE_BUTTON = "Remove";
export const EDIT = "Edit";
export const SAVE_CHANGES = "Save Changes";
export const CREATE_EVIDENCE_TYPE = "Create Evidence Type";
export const LOADING = "Loading ... ";



export const COPY_CONTENT_MSG = (label) =>
  `${label ? label : ""} value copied successfully`;

export const IDENTITY_SECTION = "Feature Identity";


export const USER_POPOVER = {
  APPLICATION_NAME: "StoreStock",
  ENVIRONMENT: "Env.",
  VERSION: "Ver.",
  GUIDE: "Help Guide",
  SETTINGS: "Settings",
  APP_MAN: "Application Management",
  LOGOUT: "Log Out"
};


export const UNAUTHORIZED = {
  TITLE: "Unauthorized Access",
  MESSAGE:
    authUser => `Sorry, ${authUser.fullname} [${authUser.email}] is not authorized to access this page. Please contact application support to
  make sure you are granted the appropriate access rights from the following roles:`,
  REQUEST_BTN_LBL: "Request Access"
};
