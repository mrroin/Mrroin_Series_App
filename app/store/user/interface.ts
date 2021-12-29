// actions
export enum IUserActionTypes {
  ACTION = "action-User",
  SIGN_IN = "singnIn",
  RESPONSE_SIGN_IN = "responseSingnIn",
  SIGN_OUT = "singnOut",
  RESPONSE_SIGN_OUT = "responseSingnOut",
  USER_INFO = "userInfo",
  RESPONSE_USER_INFO = "responseUserInfo",
  SAVE_USER_LOADED = "saveUserLoaded",
  RESPONSE_SAVE_USER_LOADED = "responseSaveUserLoaded",
}

export interface IUserAction {
  type: IUserActionTypes.ACTION;
}

export interface ISaveUserLoadedAction {
  type: IUserActionTypes.SAVE_USER_LOADED;
  payload: { user: any };
}
export interface IResponseSaveUserLoadedAction {
  type: IUserActionTypes.RESPONSE_SAVE_USER_LOADED;
  payload: { responseSaveUserLoaded: any };
}
export interface ISignInAction {
  type: IUserActionTypes.SIGN_IN;
}

export interface IResponeSignInAction {
  type: IUserActionTypes.RESPONSE_SIGN_IN;
  payload: { singnIn: any };
}

export interface ISignOutAction {
  type: IUserActionTypes.SIGN_OUT;
}

export interface IResponeSignOutAction {
  type: IUserActionTypes.RESPONSE_SIGN_OUT;
  payload: { singnOut: any };
}

export interface IUserInfoAction {
  type: IUserActionTypes.USER_INFO;
  payload: { path: any };
}

export interface IResponseUserInfoAction {
  type: IUserActionTypes.RESPONSE_USER_INFO;
  payload: { user: any };
}
export type UserAction =
  | IUserAction
  | ISignInAction
  | IResponeSignInAction
  | ISignOutAction
  | IResponeSignOutAction
  | IUserInfoAction
  | IResponseUserInfoAction
  | ISaveUserLoadedAction
  | IResponseSaveUserLoadedAction;
// end actions
// reducer
export interface IUserReducer {
  (state: IUserState, action: UserAction): Record<string, any>;
}
export interface IUserState {
  user: any;
  singnOut: any;
  singnIn: any;
  responseSaveUserLoaded: any;
}

// end reducer
// selectors
export type IGetResponseSingInSelector = (state: IUserState) => any;
export type IGetResponseSingOutSelector = (state: IUserState) => any;
export type IGetResponseUserInfoSelector = (state: IUserState) => any;
// end selectors
