import produce from "immer";
import {
  IProductsState,
  IProductsActionTypes,
  ProductsAction,
} from "./interface";

export const initialProductsState: IProductsState = {
  responseOffers: null,
  product: null,
  responseCategories: null,
  responseProducts: null,
  mainScreen: null,
  phoneContact: null,
  infoCompany: null,
  latLng: null,
  contactNumber: null,
};

export default function productsReducer(
  state: IProductsState = initialProductsState,
  action: ProductsAction,
) {
  return produce(state, (draft: any) => {
    switch (action.type) {
      case IProductsActionTypes.ACTION:
        break;

      case IProductsActionTypes.RESPONSE_OFFERS:
        draft.responseOffers = action.payload.responseOffers;
        break;

      case IProductsActionTypes.RESPONSE_CATEGORIES:
        draft.responseCategories = action.payload.responseCategories;
        break;

      case IProductsActionTypes.RESPONSE_PRODUCTS:
        draft.responseProducts = action.payload.responseProducts;
        break;

      case IProductsActionTypes.PHONE_CONTACT:
        draft.phoneContact = action.payload.phoneContact;
        break;

      case IProductsActionTypes.MAIN_SCREEN:
        draft.mainScreen = action.payload.mainScreen;
        break;

      case IProductsActionTypes.PRODUCT:
        draft.product = action.payload.product;
        break;

      case IProductsActionTypes.INFO_COMPANNY:
        draft.infoCompany = action.payload.infoCompany;
        break;

      case IProductsActionTypes.LAT_LNG:
        draft.latLng = action.payload.latLng;
        break;

      case IProductsActionTypes.CONTACT_NUMBER:
        draft.contactNumber = action.payload.contactNumber;
        break;
    }
  });
}
