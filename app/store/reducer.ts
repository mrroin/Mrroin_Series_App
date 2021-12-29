import { combineReducers } from "redux";
import utilReducer, { initialUtilState } from "./util/reducer";
import nativeReducer, { initialNativeState } from "./native/reducer";
import userReducer, { initialUserState } from "./user/reducer";
import productsReducer, { initialProductsState } from "./products/reducer";
import { IUtilState } from "./util/interface";
import { IUserState } from "./user/interface";
import { IProductsState } from "./products/interface";
import { INativeState } from "./native/interface";

export interface IState {
  util: IUtilState;
  user: IUserState;
  products: IProductsState;
  native: INativeState;
}

export const initialState: IState = {
  util: initialUtilState,
  user: initialUserState,
  products: initialProductsState,
  native: initialNativeState,
};

export default () =>
  combineReducers({
    util: utilReducer,
    user: userReducer,
    products: productsReducer,
    native: nativeReducer,
  });
