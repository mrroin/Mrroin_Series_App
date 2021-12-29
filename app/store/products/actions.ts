import {
  IProductsActionTypes,
  IGetOffersAction,
  IResponseGetOffersAction,
  IProductAction,
  IResponseCategoriesAction,
  IResponseProductsAction,
  IPhoneContactAction,
  IMainScreenAction,
  IInfoCompanyAction,
  ILatLngAction,
  IContactNumberAction,
} from "./interface";

export function contactNumberAction(data: any): IContactNumberAction {
  return {
    type: IProductsActionTypes.CONTACT_NUMBER,
    payload: { contactNumber: data },
  };
}

export function latLngAction(data: any): ILatLngAction {
  return {
    type: IProductsActionTypes.LAT_LNG,
    payload: { latLng: data },
  };
}

export function infoCompanyAction(data: any): IInfoCompanyAction {
  return {
    type: IProductsActionTypes.INFO_COMPANNY,
    payload: { infoCompany: data },
  };
}

export function mainScreenAction(data: any): IMainScreenAction {
  return {
    type: IProductsActionTypes.MAIN_SCREEN,
    payload: { mainScreen: data },
  };
}

export function initialProducts(): IGetOffersAction {
  return {
    type: IProductsActionTypes.INITIAL_PRODUCTS,
  };
}

export function responseOffersAction(data: any): IResponseGetOffersAction {
  return {
    type: IProductsActionTypes.RESPONSE_OFFERS,
    payload: { responseOffers: data },
  };
}

export function responseCategoriesAction(data: any): IResponseCategoriesAction {
  return {
    type: IProductsActionTypes.RESPONSE_CATEGORIES,
    payload: { responseCategories: data },
  };
}

export function responseProductsAction(data: any): IResponseProductsAction {
  return {
    type: IProductsActionTypes.RESPONSE_PRODUCTS,
    payload: { responseProducts: data },
  };
}

export function productAction(data: any): IProductAction {
  return {
    type: IProductsActionTypes.PRODUCT,
    payload: { product: data },
  };
}
