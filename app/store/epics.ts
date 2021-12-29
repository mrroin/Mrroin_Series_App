import { combineEpics, createEpicMiddleware } from "redux-observable";
import utilEpics from "./util/epics";
import userEpics from "./user/epics";
import productsEpics from "./products/epics";
import nativeEpics from "./native/epics";
import { HistoryFactory } from "./factory/HistoryFactory";
import { EstadoServiceApi } from "../services/api/EstadoServiceApi";
import { FirebaseApi } from "../services/firebase/Api";
import { NativeApi } from "../services/native";

export const rootEpic = combineEpics(
  ...utilEpics,
  ...userEpics,
  ...productsEpics,
  ...nativeEpics,
);

const historyFactory = new HistoryFactory().create(
  new EstadoServiceApi(),
  new FirebaseApi(),
  new NativeApi(),
);

export default createEpicMiddleware({
  dependencies: { serviceApi: historyFactory },
});
