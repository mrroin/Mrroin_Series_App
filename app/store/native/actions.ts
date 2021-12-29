import {
  INativeActionTypes,
  ILinkAction,
  IResponseAnyAction,
  INotificationAction,
} from "./interface";

export function notificationAction(data: any): INotificationAction {
  return {
    type: INativeActionTypes.NOTIFICATION,
    payload: { notification: data },
  };
}

export function linkAction(number: string, message: string): ILinkAction {
  return {
    type: INativeActionTypes.LINK,
    payload: { number: number, message: message },
  };
}

export function responseLinkAction(data: any): IResponseAnyAction {
  return {
    type: INativeActionTypes.RESPONSE_LINK,
    payload: { responseLink: data },
  };
}
