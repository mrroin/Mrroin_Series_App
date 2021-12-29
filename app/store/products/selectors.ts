import {
  IProductsState,
  IGetResponseOffersSelector,
  IGetProductSelector,
  IGetResponseCategoriesSelector,
  IGetResponseProductsSelector,
  IGetMainScreenSelector,
  IGetPhoneContactSelector,
  IGetInfoCompanySelector,
  IGetContactNumberSelector,
} from "./interface";
import { initialProductsState } from "./reducer";

const contactNumberSelector = (state: IProductsState = initialProductsState) => {
  const ong = state["contactNumber"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getContactNumberSelector: IGetContactNumberSelector = (
  state: IProductsState,
) => contactNumberSelector(state);

const latLngSelector = (state: IProductsState = initialProductsState) => {
  const ong = state["latLng"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getLatLngSelector: IGetInfoCompanySelector = (
  state: IProductsState,
) => latLngSelector(state);

const infoCompanySelector = (state: IProductsState = initialProductsState) => {
  const ong = state["infoCompany"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getInfoCompanySelector: IGetInfoCompanySelector = (
  state: IProductsState,
) => infoCompanySelector(state);

const phoneContactSelector = (state: IProductsState = initialProductsState) => {
  const ong = state["phoneContact"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getPhoneContactSelector: IGetPhoneContactSelector = (
  state: IProductsState,
) => phoneContactSelector(state);

const mainScreenSelector = (state: IProductsState = initialProductsState) => {
  const ong = state["mainScreen"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getMainScreenSelector: IGetMainScreenSelector = (
  state: IProductsState,
) => mainScreenSelector(state);

const responseCategoriesSelector = (
  state: IProductsState = initialProductsState,
) => {
  const ong = state["responseCategories"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getResponseCategoriesSelector: IGetResponseCategoriesSelector = (
  state: IProductsState,
) => responseCategoriesSelector(state);

const responseProductsSelector = (
  state: IProductsState = initialProductsState,
) => {
  const ong = state["responseProducts"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getResponseProductsSelector: IGetResponseProductsSelector = (
  state: IProductsState,
) => responseProductsSelector(state);

const responseOffersSelector = (
  state: IProductsState = initialProductsState,
) => {
  const ong = state["responseOffers"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getResponseOffersSelector: IGetResponseOffersSelector = (
  state: IProductsState,
) => responseOffersSelector(state);

const productSelector = (state: IProductsState = initialProductsState) => {
  const ong = state["product"] || undefined;
  // console.log(JSON.stringify(ong));
  return ong;
};

export const getProductSelector: IGetProductSelector = (
  state: IProductsState,
) => productSelector(state);
