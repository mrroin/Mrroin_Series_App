import { combineEpics, Epic } from "redux-observable";
import { responseLinkAction } from "./actions";
import { loadingAction } from "../util/actions";
import { isOfType } from "typesafe-actions";
import { INativeActionTypes } from "./interface";
import { map, catchError, mergeMap, filter } from "rxjs/operators";
import { goPage, backPage } from "../../services/route";
import remoteConfig from "@react-native-firebase/remote-config";
import { forkJoin, of } from "rxjs";

const nativeLoadingEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(INativeActionTypes.LINK)),
    map(() => loadingAction(true)),
  );

const linkEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(INativeActionTypes.LINK)),
    map((action) => {
      return action.payload;
    }),
    mergeMap((payload) =>
      serviceApi.nativeApi
        .linkingWattsApp(payload.number, payload.message)
        .pipe(
          map((response) => {
            // console.log("response signIn");
            return response;
          }),
        ),
    ),
    mergeMap((data) => {
      return [responseLinkAction(data), loadingAction(false)];
    }),
    catchError((e) => {
      console.log(e.toString());
      return of(e);
    }),
  );

export default [nativeLoadingEpic, linkEpic];
