import {
  IUserActionTypes,
  ISignInAction,
  IResponeSignInAction,
  ISignOutAction,
  IResponeSignOutAction,
  IUserInfoAction,
  IResponseUserInfoAction,
  ISaveUserLoadedAction,
  IResponseSaveUserLoadedAction,
} from "./interface";

export function saveUserLoadedAction(data: any): ISaveUserLoadedAction {
  return {
    type: IUserActionTypes.SAVE_USER_LOADED,
    payload: { user: data },
  };
}

export function responseSaveUserLoadedAction(
  data: any,
): IResponseSaveUserLoadedAction {
  return {
    type: IUserActionTypes.RESPONSE_SAVE_USER_LOADED,
    payload: { responseSaveUserLoaded: data },
  };
}

export function signInAction(): ISignInAction {
  return {
    type: IUserActionTypes.SIGN_IN,
  };
}

export function responeSignInAction(data: any): IResponeSignInAction {
  return {
    type: IUserActionTypes.RESPONSE_SIGN_IN,
    payload: { singnIn: data },
  };
}

export function signOutAction(): ISignOutAction {
  return {
    type: IUserActionTypes.SIGN_OUT,
  };
}

export function responeSignOutAction(data: any): IResponeSignOutAction {
  return {
    type: IUserActionTypes.RESPONSE_SIGN_OUT,
    payload: { singnOut: data },
  };
}

export function userInfoAction(path: any): IUserInfoAction {
  return {
    type: IUserActionTypes.USER_INFO,
    payload: { path: path },
  };
}

export function responseUserInfoAction(data: any): IResponseUserInfoAction {
  return {
    type: IUserActionTypes.RESPONSE_USER_INFO,
    payload: { user: data },
  };
}
