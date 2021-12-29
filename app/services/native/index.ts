/* eslint-disable @typescript-eslint/no-this-alias */
import {
  map,
  catchError,
  mergeMap,
  filter,
  merge,
  delay,
} from "rxjs/operators";
import { Observable, from, of } from "rxjs";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import remoteConfig from "@react-native-firebase/remote-config";
import storage from "@react-native-firebase/storage";
import { initTranslations } from "../language";
import { Linking } from "react-native";
export interface INativeApiService {
  linkingWattsApp: (number: string, message: string) => Observable<any>;
}

export class NativeApi implements INativeApiService {
  linkingWattsApp(number: string, message: string) {
    // console.log("signIn");
    // console.log(JSON.stringify(user));
    const linkingWattsApp = new Promise((resolve, reject) => {
      try {
        const _this_ = this;
        const url = "https://wa.me/" + number + "?text=" + message;
        Linking.openURL(url)
          .then((data) => {
            console.log("WhatsApp Opened");
            resolve({
              success: true,
              data: "native-wattsapp-success",
            });
          })
          .catch(() => {
            resolve({
              success: false,
              data: { error: "native-wattsapp-error" },
            });
          });
      } catch (error) {
        // console.error(error);
        resolve({
          success: false,
          data: "native-error-send-message-wattsapp",
        });
      }
    });
    return from(linkingWattsApp).pipe(map((x) => x));
  }
}
