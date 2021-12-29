import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Linking } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { getResponseUserInfoSelector } from "../../../store/user/selectors";
import { getNotificationSelector } from "../../../store/native/selectors";
import {
  getInfoCompanySelector,
  getMainScreenSelector,
  getResponseOffersSelector,
  getLatLngSelector,
} from "../../../store/products/selectors";
import { userInfoAction } from "../../../store/user/actions";
import { loadingAction, goPageAction } from "../../../store/util/actions";
import { productAction } from "../../../store/products/actions";
import { notificationAction } from "../../../store/native/actions";
import translate from "../../../services/language";
import BannerAdApp from "../organisms/BannerAdApp";
import Container from "../Container";
import _ from "lodash";
import Company from "../organisms/Company";
import Products from "../Products";
import Categories from "../Categories";
import Product from "../organisms/Product";

interface IProps {
  loading: any;
  setLoading: any;
  userInfo: any;
  getUserInfo: any;
  infoCompany: any;
  navigation: any;
  mainScreen: any;
  notification: any;
  setNotification: any;
  goPage: any;
  latLng: any;
}

interface IState {
  loadingState: boolean;
  userInfoState: any;
  infoCompanyState: any;
  offersState: any;
}

class Home extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingState: false,
      userInfoState: undefined,
      infoCompanyState: undefined,
      offersState: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log("getDerivedStateFromProps");
    // console.log(JSON.stringify(nextProps.offers));
    if (!_.isEqual(nextProps.infoCompany, prevState.infoCompanyState)) {
      // console.log(JSON.stringify(nextProps.offers));
      return {
        infoCompanyState: nextProps.infoCompany,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: any) {
    const {
      notification,
      setNotification,
      navigation,
      getUserInfo,
    } = this.props;
    if (notification && !_.isEqual(prevProps.notification, notification)) {
      this.redirectByNotification();
    } else {
      if (notification) {
        this.redirectByNotification();
      }
    }
  }

  redirectByNotification = () => {
    const {
      notification,
      setNotification,
      navigation,
      getUserInfo,
    } = this.props;
    // console.log("en home");
    // console.log(JSON.stringify(notification));
    let page: any = "HomeRT";
    if ("offers" === notification.data.type) {
      page = "OffersRT";
    } else if ("products" === notification.data.type) {
      page = "ProductsRT";
    } else if ("categories" === notification.data.type) {
      page = "CategoriesRT";
    }
    getUserInfo();
    setNotification(undefined);
    navigation.navigate(page);
  };

  updateLoading = () => {
    const { loading } = this.props;
    this.props.setLoading(!loading);
  };

  openMap = () => {
    const { latLng } = this.props;
    const { infoCompanyState } = this.state;
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    console.log(latLng);
    // const latLng = latLng; //"15.366966, -92.252731";
    const label = infoCompanyState.data.name; //"Cafe las 22";
    const url: any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    console.log(url);
    Linking.openURL(url);
  };
  render() {
    const { offersState, infoCompanyState } = this.state;
    const { mainScreen, navigation } = this.props;
    // console.log(JSON.stringify(offersState));
    // console.log(mainScreen);
    if (undefined === infoCompanyState) {
      return (
        <Container style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#2196f3" />
        </Container>
      );
    }
    return (
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          {infoCompanyState.success ? (
            <>
              <Company infoCompany={infoCompanyState.data} openMap={this.openMap} />
              {/* <Products isChild={true} /> */}
              {/* <>
                {offersState && offersState.data.map((offer: any) => {
                  // console.log(JSON.stringify(offer));
                  return (
                    <Product
                      key={offer.name}
                      {...offer}
                      setProduct={console.log}
                    />
                  );
                })}
              </> */}
              <>
                {"products" === mainScreen.data ? (
                  <Products isChild={true} navigation={navigation} />
                ) : (
                  <Categories isChild={true} navigation={navigation} />
                )}
              </>
            </>
          ) : (
            <Text>{translate("info-company-empty")}</Text>
          )}
        </ScrollView>
        <BannerAdApp />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userInfo: getResponseUserInfoSelector(state.user),
  infoCompany: getInfoCompanySelector(state.products),
  mainScreen: getMainScreenSelector(state.products),
  offers: getResponseOffersSelector(state.products),
  notification: getNotificationSelector(state.native),
  latLng: getLatLngSelector(state.products)
});

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setLoading: loadingAction,
      getUserInfo: userInfoAction,
      setProduct: productAction,
      setNotification: notificationAction,
      goPage: goPageAction,
    },
    dispatch,
  );
}
const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
