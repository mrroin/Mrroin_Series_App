import { combineEpics, Epic } from "redux-observable";
import {
  responseUserInfoAction,
  userInfoAction,
  responeSignInAction,
  responseSaveUserLoadedAction,
  saveUserLoadedAction,
} from "./actions";
import { goPageAction, loadingAction } from "../util/actions";
import { initialProducts } from "../products/actions";
import { getNotificationSelector } from "../native/selectors";
import { notificationAction } from "../native/actions";
import { isOfType } from "typesafe-actions";
import { IUserActionTypes } from "./interface";
import { of } from "rxjs";
import { map, catchError, mergeMap, filter } from "rxjs/operators";
import SplashScreen from "react-native-splash-screen";
import remoteConfig from "@react-native-firebase/remote-config";
import I18n from "react-native-i18n"; // You can import i18n-js as well if you don"t want the app to set default locale from the device locale.
import { initTranslations } from "../../services/language";
import { goPage } from "../../services/route";

const userInfoLoadingEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(
      isOfType(IUserActionTypes.USER_INFO) ||
        isOfType(IUserActionTypes.SIGN_IN),
    ),
    map(() => loadingAction(true)),
  );

const signInAEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IUserActionTypes.SIGN_IN)),
    mergeMap(() =>
      serviceApi.firebaseApi.signIn().pipe(
        map((response) => {
          // console.log("response signIn");
          return response;
        }),
      ),
    ),
    mergeMap((response) => {
      // console.log("set actions");
      return [
        responeSignInAction(response),
        loadingAction(false),
        userInfoAction(""),
      ];
    }),
    catchError((error: any) => {
      console.log("error getCurrentUserInfo");
      console.error(error);
      return [
        loadingAction(false),
        responseUserInfoAction({
          success: false,
          data: {
            error: error.toString(),
          },
        }),
      ];
    }),
  );

const userInfoAEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IUserActionTypes.USER_INFO)),
    map((action) => {
      return action.payload.path;
    }),
    mergeMap((path) =>
      serviceApi.firebaseApi.getCurrentUserInfo().pipe(
        map((response) => {
          // console.log("response getCurrentUserInfo");
          // console.log(JSON.stringify(response));
          return { userInfo: response, path };
        }),
      ),
    ),
    mergeMap((data) =>
      serviceApi.firebaseApi.initRemoteConfig().pipe(
        map((response) => {
          // console.log("response getCurrentUserInfo");
          return data;
        }),
      ),
    ),
    mergeMap((response: any) => {
      // console.log("set actions");
      // console.log(JSON.stringify(response));
      SplashScreen.hide();
      const languagestr = remoteConfig().getValue("language").asString();
      const languageJson = JSON.parse(languagestr);
      I18n.translations = {
        es: {
          ...initTranslations.es,
          ...languageJson.es,
        },
        en: {
          ...initTranslations.en,
          ...languageJson.en,
        },
      };
      if (response.path) {
        goPage(response.path, {});
      }
      return [
        responseUserInfoAction(response.userInfo),
        loadingAction(false),
        initialProducts(),
        saveUserLoadedAction(response.userInfo.data),
      ];
    }),
    catchError((error: any) => {
      console.log("error getCurrentUserInfo");
      console.error(error);
      SplashScreen.hide();
      return [
        loadingAction(false),
        responseUserInfoAction({
          success: false,
          data: {
            error: error.toString(),
          },
        }),
      ];
    }),
  );

const saveUserLoadedEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IUserActionTypes.SAVE_USER_LOADED)),
    map((action) => {
      // console.log("IUserActionTypes.SAVE_USER_LOADED");
      // console.log(JSON.stringify(action.payload.user));
      return action.payload.user;
    }),
    mergeMap((data: any) =>
      serviceApi.firebaseApi.getUserFromDB(data.user).pipe(
        map((response) => {
          // console.log("response getCurrentUserInfo");
          // console.log(JSON.stringify(response));
          return response;
        }),
      ),
    ),
    mergeMap((user) =>
      serviceApi.firebaseApi.setInfoDb(user).pipe(
        map((response) => {
          // console.log("response getCurrentUserInfo");
          return response;
        }),
      ),
    ),
    map((response) => {
      // console.log(JSON.stringify(response));
      return responseSaveUserLoadedAction(response);
    }),
    catchError((error: any) => {
      console.log("error SAVE_USER_LOADED");
      console.error(error);
      return [
        responseSaveUserLoadedAction({
          success: false,
          data: {
            error: error.toString(),
          },
        }),
      ];
    }),
  );
export default [
  signInAEpic,
  userInfoLoadingEpic,
  userInfoAEpic,
  saveUserLoadedEpic,
];
