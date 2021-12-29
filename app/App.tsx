import React from "react";
import { Provider } from "react-redux";
import messaging from "@react-native-firebase/messaging";
import { INativeActionTypes } from "./store/native/interface";
import { IUtilActionTypes } from "./store/util/interface";
import { IUserActionTypes } from "./store/user/interface";
import App from "./components/App";
import { ConfigureStore } from "./store";
import ThemeManager from "./services/theme";
const store: any = ConfigureStore();

// A este entra cuando esta en background
messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  console.log("Message handled in the background!", remoteMessage);
  // cuando esta en segundo plano
  // {"collapseKey": "com.mrroinseriesapp", "data": {"type": "offers"}, "from": "501359414298", "messageId": "0:1621809294235667%efa69e76efa69e76", "notification": {"android": {"imageUrl": "https://firebasestorage.googleapis.com/v0/b/mr-roin-app-series.appspot.com/o/company%2Fseriesapplogo.png?alt=media&token=01dbdf53-a671-46f3-9615-6820fbc8a934"}, "body": "¡Esta semana traemos muchas ofertas para ti!", "title": "Mira nuestras ofertas"}, "sentTime": 1621809278131, "ttl": 2419200}
  store.dispatch({
    type: INativeActionTypes.NOTIFICATION,
    payload: { notification: remoteMessage },
  });
});

const AppRedux = () => (
  <Provider store={store}>
    <ThemeManager>
      <App store={store} />
    </ThemeManager>
  </Provider>
);
export default AppRedux;
