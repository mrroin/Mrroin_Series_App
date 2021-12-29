import { applyMiddleware, createStore } from "redux";

import rootReducer, { initialState } from "./reducer";
import epicMiddleware, { rootEpic } from "./epics";

export const ConfigureStore = () => {
  const store = createStore(
    rootReducer(),
    initialState,
    applyMiddleware(epicMiddleware),
  );

  epicMiddleware.run(rootEpic);
  return store;
};
