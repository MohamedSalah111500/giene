const LOOKUPS_API_URL_PREFIX = "lookups";
const API_SECURITY = process.env.REACT_APP_API_SECURITY;


export const MATERIALS_API = {
  BASE_URL: `${process.env.REACT_APP_MATERIALS_TYPES_API}/api/${API_SECURITY}/material/handoffmaterials`,
};


export const MATERIALS_TYPES_API = {
  BASE_URL:`${process.env.REACT_APP_MATERIALS_TYPES_API}/api/${API_SECURITY}/material/materialtypes`,
};

export const PLACE_MATERIALS = {
  BASE_URL:`${process.env.REACT_APP_MATERIALS_TYPES_API}/api/${API_SECURITY}/material/place-materials`,
};

export const UNPLACE_MATERIALS = {
  BASE_URL:`${process.env.REACT_APP_MATERIALS_TYPES_API}/api/${API_SECURITY}/material/unplace-materials`,
};


export const UNEXPIRE_MATERIALS = {
  BASE_URL:`${process.env.REACT_APP_MATERIALS_TYPES_API}/api/${API_SECURITY}/material/unexpire-materials`,
};

export const EXPIRE_MATERIALS = {
  BASE_URL:`${process.env.REACT_APP_MATERIALS_TYPES_API}/api/${API_SECURITY}/material/expire-materials`,
};


export const CROPS_API = {
  BASE_URL:`${process.env.REACT_APP_USER_API}/api/${API_SECURITY}/user/transgroups`,
};

export const STRAIN_API = {
  BASE_URL:`${process.env.REACT_APP_MATERIALS_TYPES_API}/api/${API_SECURITY}/material/handoffmaterials/strainnames`,
};
export const STRAIN_LOCATION_API = {
  BASE_URL:`${process.env.REACT_APP_MATERIALS_TYPES_API}/api/${API_SECURITY}/material/strain-locations`,
};

export const DEVICE_CONFIG = {
  BASE_URL:`${process.env.REACT_APP_DEVICE_CONFIG_API}/api/${API_SECURITY}/freezer/device-configurations`,
};

export const USER_API = {
  BASE_URL: `${process.env.REACT_APP_USER_API}/api/secure/users`
};



