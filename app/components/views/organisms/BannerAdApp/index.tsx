import React, { Component } from "react";
import { Platform, StyleSheet, Alert, View } from "react-native";
import { TestIds, BannerAd, BannerAdSize } from "@react-native-firebase/admob";
import {
  ADMOB_ANDROID_APP_ID,
  ADMOB_IOS_APP_ID,
} from "../../../../services/firebase/FirebaseConfig";
interface IState {
  showAlert: boolean;
}
class BannerAdApp extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showAlert: false,
    };
  }
  render() {
    // console.log(__DEV__);
    // __DEV__
    //   ? TestIds.BANNER
    //   :
    const adUnitId =
      Platform.OS === "ios" ? ADMOB_IOS_APP_ID : ADMOB_ANDROID_APP_ID;
    return (
      <View style={styles.view}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => {
            // console.log("Advert loaded");
            // if(!this.state.showAlert){
            //   this.setState({showAlert: true})
            //   Alert.alert(translate("alert-success"), translate("advert-loaded"));
            // }
          }}
          onAdFailedToLoad={(error) => {
            console.error("Advert failed to load: ", error);
            // if(!this.state.showAlert){
            //   this.setState({showAlert: true})
            //   Alert.alert(
            //     translate("alert-error"),
            //     translate("advert-loaded-error") + error,
            //   );
            // }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
});
export default BannerAdApp;
