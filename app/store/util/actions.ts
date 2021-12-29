import {
  IUtilActionTypes,
  IThemeAction,
  ILanguageAction,
  IGoPageAction,
  IBackPageAction,
  ILoadConfigAction,
  ISetLoadConfigAction,
  IMessagesAction,
  ILoadingAction,
  IInitAppAction,
  IResponseInitAppAction,
} from "./interface";

export function initAppAction(): IInitAppAction {
  return {
    type: IUtilActionTypes.INIT_APP,
  };
}

export function responseInitAppAction(data: boolean): IResponseInitAppAction {
  return {
    type: IUtilActionTypes.RESPONSE_INIT_APP,
    payload: { loadApp: data },
  };
}
export function loadConfigAction(): ILoadConfigAction {
  return {
    type: IUtilActionTypes.LOAD_CONFIG,
  };
}

export function setLoadConfigAction(data: any): ISetLoadConfigAction {
  return {
    type: IUtilActionTypes.SET_LOAD_CONFIG,
    payload: { configuration: data },
  };
}

export function goPageAction(path: string): IGoPageAction {
  return {
    type: IUtilActionTypes.GO_PAGE,
    payload: { path: path },
  };
}

export function backPageAction(): IBackPageAction {
  return {
    type: IUtilActionTypes.BACK_PAGE,
  };
}

export function themeAction(data: any): IThemeAction {
  return {
    type: IUtilActionTypes.THEME,
    payload: { theme: data },
  };
}

export function messagesAction(data: any): IMessagesAction {
  return {
    type: IUtilActionTypes.MESSAGES_APP,
    payload: { messages: data },
  };
}

export function languageAction(data: any): ILanguageAction {
  return {
    type: IUtilActionTypes.LANGUAGE,
    payload: { language: data },
  };
}

export function loadingAction(data: boolean): ILoadingAction {
  return {
    type: IUtilActionTypes.LOADING,
    payload: { loading: data },
  };
}
