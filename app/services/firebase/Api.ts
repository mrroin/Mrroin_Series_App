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
import database from "@react-native-firebase/database";

export interface IFirebaseApiService {
  getCurrentUserInfo: () => Observable<any>;
  signIn: () => Observable<any>;
  initRemoteConfig: () => Observable<any>;
}

export class FirebaseApi implements IFirebaseApiService {
  resolveError(error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // 'Process Cancelled'
      return "internal-error-firebase-proccess-cancelled";
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // 'Process in progress'
      return "internal-error-firebase-proccess-progress";
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // when play services not available
      // 'Play services are not available'
      return "internal-error-firebase-playservices-not-available";
    } else {
      // some other error
      // 'Something else went wrong... ', error.toString()
      return "internal-error-firebase";
    }
  }

  getCurrentUserInfo() {
    // console.log("getCurrentUserInfo");
    // console.log(JSON.stringify(user));
    const signInSilently = new Promise((resolve, reject) => {
      try {
        const _this_ = this;
        GoogleSignin.signInSilently().then(
          function (userInfo) {
            // console.log("signInSilently");
            // console.log(userInfo); // Success!
            resolve({
              success: true,
              data: userInfo,
            });
          },
          function (reason) {
            // console.log("signInSilently error");
            // console.log(reason); // Error!
            resolve({
              success: false,
              data: { error: _this_.resolveError(reason) },
            });
          },
        );
      } catch (error) {
        // console.log("signInSilently catch error");
        // console.error(error);
        resolve({
          success: false,
          data: { error: this.resolveError(error) },
        });
      }
    });
    return from(signInSilently).pipe(map((x) => x));
  }

  signIn() {
    // console.log("signIn");
    // console.log(JSON.stringify(user));
    const signInSilently = new Promise((resolve, reject) => {
      try {
        const _this_ = this;
        GoogleSignin.hasPlayServices().then(
          function (value) {
            // console.log("hasPlayServices");
            // console.log(value); // Success!
            const __this__ = _this_;
            GoogleSignin.signIn().then(
              function (userInfo) {
                // console.log("signIn");
                // console.log(userInfo); // Success!
                resolve({
                  success: true,
                  data: userInfo,
                });
              },
              function (reason) {
                // console.log("error signIn");
                // console.log(reason); // Error!
                resolve({
                  success: false,
                  data: { error: __this__.resolveError(reason) },
                });
              },
            );
          },
          function (reason) {
            console.log(reason); // Error!
            resolve({
              success: false,
              data: { error: _this_.resolveError(reason) },
            });
          },
        );
      } catch (error) {
        // console.error(error);
        resolve({
          success: false,
          data: { error: this.resolveError(error) },
        });
      }
    });
    return from(signInSilently).pipe(map((x) => x));
  }

  initRemoteConfig() {
    // console.log("signIn");
    // console.log(JSON.stringify(user));
    // console.log(JSON.stringify(initTranslations));
    const signInSilently = new Promise((resolve, reject) => {
      try {
        const _this_ = this;
        remoteConfig()
          .fetch(0)
          .then(() => remoteConfig().fetchAndActivate())
          .then((fetchedRemotely) => {
            if (fetchedRemotely) {
              console.log(
                "Configs were retrieved from the backend and activated.",
              );
              resolve({
                success: true,
                data: "ok",
              });
            } else {
              console.log(
                "No configs were fetched from the backend, and the local configs were already activated",
              );
              resolve({
                success: false,
                data: { error: "no config" },
              });
            }
          });
      } catch (error) {
        // console.error(error);
        resolve({
          success: false,
          data: { error: this.resolveError(error) },
        });
      }
    });
    return from(signInSilently).pipe(map((x) => x));
  }

  getInfoOffers(data: any, serviceApi: any) {
    const dataArrayPromise = new Promise(function (resolve, reject) {
      const info = data.map((d: any) => {
        // console.log(JSON.stringify(d));
        return d;
      });
      // console.log(JSON.stringify(info));
      resolve(info);
    });
    return from(dataArrayPromise).pipe(map((x) => x));
  }

  getImage(infoImage: any) {
    // console.log("getImage");
    // console.log(JSON.stringify(url));
    // console.log(JSON.stringify(initTranslations));
    const storageImage = new Promise((resolve, reject) => {
      try {
        storage()
          .refFromURL(infoImage.image)
          .getDownloadURL()
          .then((image) => {
            // console.log(image);
            // console.log("consegui imagenes");
            resolve({
              ...infoImage,
              image: image,
            });
          });
      } catch (error) {
        // console.error(error);
        console.log("error imagenes");
        resolve({
          success: false,
        });
      }
      // setTimeout(() => resolve(`Promise Resolved: ${url}`), 1000)
    });
    return from(storageImage).pipe(map((x) => x));
  }

  getUserFromDB(user: any) {
    // console.log("getUserFromDB");
    // console.log(JSON.stringify(user));
    const signInSilently = new Promise((resolve, reject) => {
      try {
        const _this_ = this;
        database()
          .ref("/users/" + user.id)
          .once("value")
          .then((snapshot) => {
            const infoUser = snapshot.val();
            // console.log("User data: ", infoUser);
            if (infoUser) {
              resolve({
                success: true,
                data: snapshot.val(),
              });
            } else {
              resolve({
                success: false,
                data: { error: "user.not.found" },
                user: user,
              });
            }
          });
      } catch (error) {
        // console.log("signInSilently catch error");
        // console.error(error);
        resolve({
          success: false,
          data: { error: this.resolveError(error) },
          user: user,
        });
      }
    });
    return from(signInSilently).pipe(map((x) => x));
  }

  setInfoDb(user: any) {
    // console.log("setInfoDb");
    // console.log(JSON.stringify(user));
    const signInSilently = new Promise((resolve, reject) => {
      try {
        const _this_ = this;
        if (user.success) {
          database()
            .ref("/users/" + user.data.id)
            .update({
              visit: user.data.visit + 1,
            })
            .then(() =>
              resolve({
                success: true,
                data: "Data updated.",
              }),
            );
        } else {
          database()
            .ref("/users/" + user.user.id)
            .set({
              ...user.user,
              visit: 1,
            })
            .then(() =>
              resolve({
                success: true,
                data: "Data set.",
              }),
            );
        }
      } catch (error) {
        // console.log("signInSilently catch error");
        // console.error(error);
        resolve({
          success: false,
          data: { error: this.resolveError(error) },
        });
      }
    });
    return from(signInSilently).pipe(map((x) => x));
  }
}
