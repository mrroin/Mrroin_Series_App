// actions
export enum IProductsActionTypes {
  ACTION = "action-products",
  INITIAL_PRODUCTS = "initialProducts",
  RESPONSE_OFFERS = "responseOffers",
  MAIN_SCREEN = "mainScreen",
  PHONE_CONTACT = "phoneContact",
  RESPONSE_CATEGORIES = "responseCategories",
  RESPONSE_PRODUCTS = "responseProducts",
  PRODUCT = "product",
  INFO_COMPANNY = "infoCompany",
  CONTACT_NUMBER = "contactNumber",
  LAT_LNG = "latLng",
}

export interface IProductsAction {
  type: IProductsActionTypes.ACTION;
}
export interface IContactNumberAction {
  type: IProductsActionTypes.CONTACT_NUMBER;
  payload: { contactNumber: any };
}

export interface ILatLngAction {
  type: IProductsActionTypes.LAT_LNG;
  payload: { latLng: any };
}

export interface IGetOffersAction {
  type: IProductsActionTypes.INITIAL_PRODUCTS;
}

export interface IResponseGetOffersAction {
  type: IProductsActionTypes.RESPONSE_OFFERS;
  payload: { responseOffers: any };
}

export interface IMainScreenAction {
  type: IProductsActionTypes.MAIN_SCREEN;
  payload: { mainScreen: any };
}

export interface IInfoCompanyAction {
  type: IProductsActionTypes.INFO_COMPANNY;
  payload: { infoCompany: any };
}

export interface IPhoneContactAction {
  type: IProductsActionTypes.PHONE_CONTACT;
  payload: { phoneContact: any };
}

export interface IResponseCategoriesAction {
  type: IProductsActionTypes.RESPONSE_CATEGORIES;
  payload: { responseCategories: any };
}

export interface IResponseProductsAction {
  type: IProductsActionTypes.RESPONSE_PRODUCTS;
  payload: { responseProducts: any };
}

export interface IProductAction {
  type: IProductsActionTypes.PRODUCT;
  payload: { product: any };
}

export type ProductsAction =
  | IProductsAction
  | IGetOffersAction
  | IResponseGetOffersAction
  | IProductAction
  | IResponseCategoriesAction
  | IResponseProductsAction
  | IMainScreenAction
  | IPhoneContactAction
  | IInfoCompanyAction
  | ILatLngAction
  | IContactNumberAction;
// end actions
// reducer
export interface IProductsReducer {
  (state: IProductsState, action: ProductsAction): Record<string, any>;
}
export interface IProductsState {
  responseOffers: any;
  responseCategories: any;
  product: any;
  responseProducts: any;
  mainScreen: any;
  phoneContact: any;
  infoCompany: any;
  latLng: any;
  contactNumber: any;
}

// end reducer
// epics
// end epics
// selectors
export type IGetResponseOffersSelector = (state: IProductsState) => any;
export type IGetResponseCategoriesSelector = (state: IProductsState) => any;
export type IGetMainScreenSelector = (state: IProductsState) => any;
export type IGetPhoneContactSelector = (state: IProductsState) => any;
export type IGetInfoCompanySelector = (state: IProductsState) => any;
export type IGetResponseProductsSelector = (state: IProductsState) => any;
export type IGetProductSelector = (state: IProductsState) => any;
export type IGetLatLngSelector = (state: IProductsState) => any;
export type IGetContactNumberSelector = (state: IProductsState) => any;
// end selectors
