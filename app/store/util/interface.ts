// actions
export enum IUtilActionTypes {
  ACTION = "action-util",
  THEME = "theme",
  LANGUAGE = "language",
  GO_PAGE = "goPage",
  BACK_PAGE = "backPage",
  MESSAGES_APP = "messageApp",
  LOAD_CONFIG = "loadConfig",
  SET_LOAD_CONFIG = "setLoadConfig",
  LOADING = "loading",
  INIT_APP = "initApp",
  RESPONSE_INIT_APP = "responseInitApp",
}

export interface ILoadingAction {
  type: IUtilActionTypes.LOADING;
  payload: { loading: boolean };
}

export interface IUtilAction {
  type: IUtilActionTypes.ACTION;
}

export interface IInitAppAction {
  type: IUtilActionTypes.INIT_APP;
}

export interface IResponseInitAppAction {
  type: IUtilActionTypes.RESPONSE_INIT_APP;
  payload: { loadApp: boolean };
}

export interface ILoadConfigAction {
  type: IUtilActionTypes.LOAD_CONFIG;
}

export interface ISetLoadConfigAction {
  type: IUtilActionTypes.SET_LOAD_CONFIG;
  payload: { configuration: any };
}

export interface IGoPageAction {
  type: IUtilActionTypes.GO_PAGE;
  payload: { path: string };
}

export interface IBackPageAction {
  type: IUtilActionTypes.BACK_PAGE;
}

export interface IThemeAction {
  type: IUtilActionTypes.THEME;
  payload: { theme: any };
}

export interface ILanguageAction {
  type: IUtilActionTypes.LANGUAGE;
  payload: { language: any };
}

export interface IMessagesAction {
  type: IUtilActionTypes.MESSAGES_APP;
  payload: { messages: any };
}

export type UtilAction =
  | IInitAppAction
  | IResponseInitAppAction
  | IUtilAction
  | ILoadConfigAction
  | ISetLoadConfigAction
  | IThemeAction
  | ILanguageAction
  | IGoPageAction
  | IBackPageAction
  | IMessagesAction
  | ILoadingAction;
// end actions
// reducer
export interface IUtilReducer {
  (state: IUtilState, action: UtilAction): Record<string, any>;
}
export interface IUtilState {
  theme: any;
  language: any;
  messageApp: any;
  configuration: any;
  loading: boolean;
  loadApp: boolean;
}

// end reducer
// epics
export interface IUtilT<UtilAction, ILoginState> {}

export interface IGoPageEpic {
  (action$: any, state$: IUtilT<UtilAction, IUtilReducer>): void;
}

export interface IBackPageEpic {
  (action$: any, state$: IUtilT<UtilAction, IUtilReducer>): void;
}

export interface ILoadConfigEpic {
  (action$: any, state$: IUtilT<UtilAction, IUtilReducer>): void;
}
// end epics
// selectors
export type IGetDataParentSelector = (state: IUtilState) => any;
export type IGetThemeSelector = (state: IUtilState) => any;
export type IGetAgentSelector = (state: IUtilState) => any;
export type IGetLanguageSelector = (state: IUtilState) => any;
export type ISendEventParentSelector = (state: IUtilState) => any;
export type IPopupDataSelector = (state: IUtilState) => any;
export type IMessageAppSelector = (state: IUtilState) => any;
export type IHistorySelector = (state: IUtilState) => any;
// end selectors
