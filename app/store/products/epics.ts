import { combineEpics, Epic } from "redux-observable";
import {
  responseOffersAction,
  responseCategoriesAction,
  responseProductsAction,
  mainScreenAction,
  infoCompanyAction,
  latLngAction,
  contactNumberAction,
} from "./actions";
import { loadingAction } from "../util/actions";
import { isOfType } from "typesafe-actions";
import {
  IProductsActionTypes,
  IProductsState,
  ProductsAction,
} from "./interface";
import { map, catchError, mergeMap, filter } from "rxjs/operators";
import { goPage, backPage } from "../../services/route";
import remoteConfig from "@react-native-firebase/remote-config";
import { forkJoin, of } from "rxjs";

const getInfoProduct = (data: any, serviceApi: any) =>
  of(data).pipe(
    mergeMap((q) => forkJoin(...q.map(serviceApi.firebaseApi.getImage))),
  );

const userInfoLoadingEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IProductsActionTypes.INITIAL_PRODUCTS)),
    map(() => loadingAction(true)),
  );

const getOffersEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IProductsActionTypes.INITIAL_PRODUCTS)),
    map((response) => {
      // console.log("set actions");
      // console.log(JSON.stringify(response));
      const dt = new Date();
      const tdt: any = new Date(dt.valueOf());
      const dayn = (dt.getDay() + 6) % 7;
      tdt.setDate(tdt.getDate() - dayn + 3);
      const firstThursday = tdt.valueOf();
      tdt.setMonth(0, 1);
      if (tdt.getDay() !== 4) {
        tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
      }
      const weekYear = 1 + Math.ceil((firstThursday - tdt) / 604800000);
      console.log("week___");
      console.log(weekYear);
      const weekOffersStr = remoteConfig()
        .getValue("week" + weekYear)
        .asString();
      // console.log(weekOffersStr);
      if ("" !== weekOffersStr) {
        // console.log(JSON
        //   .stringify(weekOffersStr));
        const weekOffersJson = JSON.parse(weekOffersStr);
        // console.log(JSON
        //   .stringify(weekOffersJson));
        return weekOffersJson;
      } else {
        return [];
      }
    }),
    mergeMap((weekOffers) =>
      getInfoProduct(weekOffers, serviceApi).pipe(map((offers: any) => offers)),
    ),
    mergeMap((offers) => {
      return [
        responseOffersAction(
          offers.length > 0
            ? {
                success: true,
                data: offers,
              }
            : {
                success: false,
              },
        ),
        loadingAction(false),
      ];
    }),
    catchError((e) => {
      console.log("an eerror un catchError");
      console.log(e.toString());
      return [
        responseOffersAction({
          success: false,
          data: {
            error: e.toString(),
          },
        }),
      ];
    }),
  );

const getCategoriesEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IProductsActionTypes.INITIAL_PRODUCTS)),
    map((response) => {
      // console.log("set actions");
      // console.log(JSON.stringify(response));
      const categoriesStr = remoteConfig().getValue("categories").asString();
      // console.log(categoriesStr);
      if ("" !== categoriesStr) {
        // console.log(JSON
        //   .stringify(categoriesStr));
        const categoriesJson = JSON.parse(categoriesStr);
        // console.log(JSON
        //   .stringify(categoriesJson));
        return categoriesJson;
      } else {
        return [];
      }
    }),
    mergeMap((categories) =>
      getInfoProduct(categories, serviceApi).pipe(
        map((category: any) => category),
      ),
    ),
    mergeMap((categories) => {
      return [
        responseCategoriesAction(
          categories.length > 0
            ? {
                success: true,
                data: categories,
              }
            : {
                success: false,
              },
        ),
        loadingAction(false),
      ];
    }),
    catchError((e) => {
      console.log(e.toString());
      return of(e);
    }),
  );

const getProductsEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IProductsActionTypes.INITIAL_PRODUCTS)),
    map((response) => {
      // console.log("set actions");
      // console.log(JSON.stringify(response));
      const productsStr = remoteConfig().getValue("products").asString();
      // console.log(productsStr);
      if ("" !== productsStr) {
        // console.log(JSON
        //   .stringify(productsStr));
        const productsJson = JSON.parse(productsStr);
        // console.log(JSON
        //   .stringify(productsJson));
        return productsJson;
      } else {
        return [];
      }
    }),
    mergeMap((products) =>
      getInfoProduct(products, serviceApi).pipe(
        map((products: any) => products),
      ),
    ),
    mergeMap((products) => {
      return [
        responseProductsAction(
          products.length > 0
            ? {
                success: true,
                data: products,
              }
            : {
                success: false,
              },
        ),
        loadingAction(false),
      ];
    }),
    catchError((e) => {
      console.log(e.toString());
      return of(e);
    }),
  );

const phoneAndMainScreenEpic: Epic = (action$, state$, { serviceApi }) =>
  action$.pipe(
    filter(isOfType(IProductsActionTypes.INITIAL_PRODUCTS)),
    map((response) => {
      // console.log("set actions");
      // console.log(JSON.stringify(response));
      const mainScreen = remoteConfig().getValue("mainScreen").asString();
      const phoneContact = remoteConfig().getValue("phoneContact").asString();
      const latLng = remoteConfig().getValue("latLng").asString();
      let infoCompanyJson: any = { success: false };
      try {
        const infoCompanyStr = remoteConfig()
          .getValue("infoCompany")
          .asString();
        // console.log(infoCompanyStr);
        if ("" !== infoCompanyStr) {
          // console.log(JSON
          //   .stringify(productsStr));
          infoCompanyJson = { success: true, data: JSON.parse(infoCompanyStr) };
        }
      } catch (e) {}
      return {
        mainScreen: mainScreen
          ? { success: true, data: mainScreen }
          : { success: false },
        phoneContact: phoneContact
          ? { success: true, data: phoneContact }
          : { success: false },
        infoCompany: infoCompanyJson,
        latLng: latLng
      };
    }),
    mergeMap((info) => {
      return [
        contactNumberAction(info.phoneContact),
        mainScreenAction(info.mainScreen),
        infoCompanyAction(info.infoCompany),
        latLngAction(info.latLng),
      ];
    }),
    catchError((e) => {
      console.log(e.toString());
      return of(e);
    }),
  );

export default [
  getOffersEpic,
  getCategoriesEpic,
  getProductsEpic,
  phoneAndMainScreenEpic,
];
