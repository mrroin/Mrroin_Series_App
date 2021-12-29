import {
  IUserState,
  IGetResponseSingInSelector,
  IGetResponseSingOutSelector,
  IGetResponseUserInfoSelector,
} from "./interface";
import { initialUserState } from "./reducer";

const singInSelector = (state: IUserState = initialUserState) => {
  const ong = state["singnIn"] || undefined;
  return ong;
};

export const getResponseSingInSelector: IGetResponseSingInSelector = (
  state: IUserState,
) => singInSelector(state);

const singOutSelector = (state: IUserState = initialUserState) => {
  const ong = state["singnOut"] || undefined;
  return ong;
};

export const getResponseSingOutSelector: IGetResponseSingOutSelector = (
  state: IUserState,
) => singOutSelector(state);

const userInfoSelector = (state: IUserState = initialUserState) => {
  const ong = state["user"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getResponseUserInfoSelector: IGetResponseUserInfoSelector = (
  state: IUserState,
) => userInfoSelector(state);
