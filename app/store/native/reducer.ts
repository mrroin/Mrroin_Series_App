import produce from "immer";
import { INativeState, INativeActionTypes, NativeAction } from "./interface";

export const initialNativeState: INativeState = {
  responseLink: null,
  notification: null,
};

export default function nativeReducer(
  state: INativeState = initialNativeState,
  action: NativeAction,
) {
  return produce(state, (draft: any) => {
    switch (action.type) {
      case INativeActionTypes.ACTION:
        break;

      case INativeActionTypes.RESPONSE_LINK:
        draft.responseLink = action.payload.responseLink;
        break;

      case INativeActionTypes.NOTIFICATION:
        draft.notification = action.payload.notification;
        break;
    }
  });
}
