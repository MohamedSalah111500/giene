import configureDevStore from "./configureStore.dev";
import configureProdStore from "./configureStore.prod";

export let store = null;

export const configureStore = state => {
  if (process.env.NODE_ENV === "production") {
    store = configureProdStore(state);
  } else {
    store = configureDevStore(state);
  }
  return store;
};
