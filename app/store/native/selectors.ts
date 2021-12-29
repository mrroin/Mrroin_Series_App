import {
  INativeState,
  IGetResponseLinkSelector,
  IGetNotificationSelector,
} from "./interface";
import { initialNativeState } from "./reducer";

const responseLinkSelector = (state: INativeState = initialNativeState) => {
  const ong = state["responseLink"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getResponseLinkSelector: IGetResponseLinkSelector = (
  state: INativeState,
) => responseLinkSelector(state);

const notificationSelector = (state: INativeState = initialNativeState) => {
  // console.log(JSON.stringify(state));
  const ong = state["notification"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getNotificationSelector: IGetNotificationSelector = (
  state: INativeState,
) => notificationSelector(state);
