import { combineEpics, Epic } from "redux-observable";
import { goPageAction } from "./actions";
import { isOfType } from "typesafe-actions";
import {
  IUtilActionTypes,
  IUtilState,
  UtilAction,
  IGoPageEpic,
  IBackPageEpic,
  ILoadConfigEpic,
} from "./interface";
import { of } from "rxjs";
import { map, catchError, mergeMap, filter } from "rxjs/operators";
import { goPage, backPage } from "../../services/route";

const goEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IUtilActionTypes.GO_PAGE)),
    map((action) => {
      // console.log(JSON.stringify(action.payload.user));
      return action.payload.path;
    }),
    map((path) => {
      // console.log("tengo respuesta...");
      // console.log(path);
      return goPage(path, {});
    }),
    catchError((e) => {
      console.log(e.toString());
      return of(e);
    }),
  );

const initAppEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IUtilActionTypes.INIT_APP)),
    mergeMap(() =>
      serviceApi.firebaseApi.signIn().pipe(
        map((response) => {
          // console.log("response signIn");
          return response;
        }),
      ),
    ),
    catchError((e) => {
      console.log(e.toString());
      return of(e);
    }),
  );

const backEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IUtilActionTypes.BACK_PAGE)),
    map(() => {
      return goPageAction("");
    }),
    catchError((e) => {
      console.log(e.toString());
      return of(e);
    }),
  );

export default [goEpic, backEpic, initAppEpic];
