import produce from "immer";
import { IUtilState, IUtilActionTypes, UtilAction } from "./interface";

export const initialUtilState: IUtilState = {
  theme: null,
  language: null,
  messageApp: null,
  configuration: null,
  loading: false,
  loadApp: false,
};

export default function utilReducer(
  state: IUtilState = initialUtilState,
  action: UtilAction,
) {
  return produce(state, (draft: any) => {
    switch (action.type) {
      case IUtilActionTypes.ACTION:
        break;

      case IUtilActionTypes.THEME:
        draft.theme = action.payload.theme;
        break;

      case IUtilActionTypes.LANGUAGE:
        draft.language = action.payload.language;
        break;

      case IUtilActionTypes.MESSAGES_APP:
        draft.messageApp = action.payload.messages;
        break;

      case IUtilActionTypes.SET_LOAD_CONFIG:
        draft.configuration = action.payload.configuration;
        break;

      case IUtilActionTypes.LOADING:
        draft.loading = action.payload.loading;
        break;

      case IUtilActionTypes.RESPONSE_INIT_APP:
        draft.loadApp = action.payload.loadApp;
        break;
    }
  });
}
