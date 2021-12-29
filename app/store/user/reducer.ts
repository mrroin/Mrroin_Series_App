import produce from "immer";
import { IUserState, IUserActionTypes, UserAction } from "./interface";

export const initialUserState: IUserState = {
  user: null,
  singnOut: null,
  singnIn: null,
  responseSaveUserLoaded: null,
};

export default function loginReducer(
  state: IUserState = initialUserState,
  action: UserAction,
) {
  return produce(state, (draft: any) => {
    switch (action.type) {
      case IUserActionTypes.ACTION:
        break;

      case IUserActionTypes.RESPONSE_SIGN_IN:
        draft.singnIn = action.payload.singnIn;
        break;

      case IUserActionTypes.RESPONSE_SIGN_OUT:
        draft.singnOut = action.payload.singnOut;
        break;

      case IUserActionTypes.RESPONSE_USER_INFO:
        draft.user = action.payload.user;
        break;

      case IUserActionTypes.RESPONSE_SAVE_USER_LOADED:
        draft.responseSaveUserLoaded = action.payload.responseSaveUserLoaded;
        break;
    }
  });
}
