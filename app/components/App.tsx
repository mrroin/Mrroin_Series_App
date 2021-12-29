import React, { useState, createContext, useEffect } from "react";
import { Alert } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Appearance, AppearanceProvider } from "react-native-appearance";
import AppRoute from "../services/route";
import {
  getLanguageSelector,
  getMessageAppSelector,
  getThemeSelector,
} from "../store/util/selectors";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  firebaseConfig,
  WEB_CLIENT_ID,
  CLIENT_ID_IOS,
  CLIENT_ID_ANDROID,
  CLIENT_ID,
  DATABASE_URL,
} from "../services/firebase/FirebaseConfig";
import messaging from "@react-native-firebase/messaging";
import { IUserActionTypes } from "../store/user/interface";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
const defaultMode = Appearance.getColorScheme() || "light";

const ThemeContext = createContext({
  mode: defaultMode,
  setMode: (mode: any) => console.log(mode),
});

export const useTheme = () => React.useContext(ThemeContext);
const App = (props: any) => {
  const [themeState, setThemeState] = useState(defaultMode);
  const setMode = (mode: any) => {
    setThemeState(mode);
  };
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  // console.log("initialize firebase");
  useEffect(() => {
    if (!firebase.apps.length) {
      // console.log("firebase.initializeApp(firebaseConfig)");

      firebase.initializeApp(firebaseConfig);
    } else {
      // console.log("firebase.app()");
      firebase.app(); // if already initialized, use that one
    }
    GoogleSignin.configure({
      iosClientId: CLIENT_ID_IOS,
      webClientId: CLIENT_ID,
      offlineAccess: false,
    });
    // const reference = database().ref('/users');
    const database = firebase.app().database(DATABASE_URL);
    database.ref();

    // messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
    //   // const navigation = useNavigation();
    //   console.log(
    //     "Notification caused app to open from background state:",
    //     remoteMessage,
    //   );
    //   // navigation.navigate(remoteMessage.data.type);
    // });
  }, []);
  useEffect(() => {
    (async () => await messaging().registerDeviceForRemoteMessages())();
    // setTimeout(() => SplashScreen.hide(), 2000);
    messaging()
      .requestPermission()
      .then(
        function (authStatus) {
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            console.log("Authorization status:", authStatus);
          }
        },
        function (reason) {
          console.log("Error in permision.");
          console.log(reason);
        },
      );
    // se  inicia la app desde la notificacion que no esta en background
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log("getInitialNotification", remoteMessage);
        // Alert.alert('getInitialNotification ', JSON.stringify(remoteMessage))
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage,
          );
        }
      });
    const subscribers = [
      // notificacion y la app esta abierta
      messaging().onMessage(async (remoteMessage: any) => {
        console.log("onMessage", remoteMessage);
        // aqui sacar alert que pregunte si quiere hacer algo con la notificacion
        // {"collapseKey": "com.mrroinseriesapp", "data": {"type": "offers"},  "notification": {"body": "¡Esta semana traemos muchas ofertas para ti!", "title": "Mira nuestras ofertas"}, "sentTime": 1621909164263, "ttl": 2419200}
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                let page: any = "HomeRT";
                if ("offers" === remoteMessage.data.type) {
                  page = "OffersRT";
                } else if ("products" === remoteMessage.data.type) {
                  page = "ProductsRT";
                } else if ("categories" === remoteMessage.data.type) {
                  page = "CategoriesRT";
                }
                props.store.dispatch({
                  type: IUserActionTypes.USER_INFO,
                  payload: { path: page },
                });
              },
            },
          ],
        );
      }),

      // se  inicia la app desde la notificacion que esta en background
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log("onNotificationOpenedApp", remoteMessage);
        // Alert.alert("onNotificationOpenedApp", JSON.stringify(remoteMessage))
      }),

      messaging().onTokenRefresh(async (token) => {
        console.log("onTokenRefresh", token);
        // Alert.alert("onTokenRefresh", JSON.stringify(token))
      }),
    ];

    return () => {
      subscribers.forEach((unsubscribeCallback) => {
        if (unsubscribeCallback) unsubscribeCallback();
      });
    };
  }, []);
  // console.log("end initialize firebase");
  return (
    <ThemeContext.Provider value={{ mode: themeState, setMode }}>
      <ThemeProvider theme={props.theme ? props.theme : {}}>
        <AppRoute {...props}></AppRoute>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const mapStateToProps = (state: any) => ({
  theme: getThemeSelector(state),
  language: getLanguageSelector(state),
  messageApp: getMessageAppSelector(state),
});

const AppProvider = connect(mapStateToProps, null)(App);

export default AppProvider;
