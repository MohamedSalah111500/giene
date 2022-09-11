import  {INITIAL_CURRENT_MATERIALS}  from "../../utils/materialsUtils/materials-utils";

const initialState = {
  user: {
    userId: null,
    email: null,
    firstname: null,
    lastname: null,
    initials: null,
    fullname: null,
    userProfileImg: null,
    navigationMenu:[],
    roles: []
  },
  materials: INITIAL_CURRENT_MATERIALS,
  strains:[],
  deviceConfig:{}

 
};

export default initialState;
