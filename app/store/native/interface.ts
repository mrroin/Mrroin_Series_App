// actions
export enum INativeActionTypes {
  ACTION = "action-Native",
  LINK = "link",
  RESPONSE_LINK = "responseLink",
  NOTIFICATION = "notification",
}

export interface INotificationAction {
  type: INativeActionTypes.NOTIFICATION;
  payload: { notification: any };
}

export interface INativeAction {
  type: INativeActionTypes.ACTION;
}

export interface ILinkAction {
  type: INativeActionTypes.LINK;
  payload: { number: any; message: any };
}

export interface IResponseAnyAction {
  type: INativeActionTypes.RESPONSE_LINK;
  payload: { responseLink: any };
}

export type NativeAction =
  | INativeAction
  | ILinkAction
  | IResponseAnyAction
  | INotificationAction;
// end actions
// reducer
export interface INativeReducer {
  (state: INativeState, action: NativeAction): Record<string, any>;
}
export interface INativeState {
  responseLink: any;
  notification: any;
}

// end reducer
// epics
// end epics
// selectors
export type IGetResponseLinkSelector = (state: INativeState) => any;
export type IGetNotificationSelector = (state: INativeState) => any;
// end selectors
