import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { getResponseUserInfoSelector } from "../../../store/user/selectors";
import { getResponseOffersSelector } from "../../../store/products/selectors";
import { userInfoAction } from "../../../store/user/actions";
import { loadingAction } from "../../../store/util/actions";
import { productAction } from "../../../store/products/actions";
import translate from "../../../services/language";
import BannerAdApp from "../organisms/BannerAdApp";
import Container from "../Container";
import _ from "lodash";
import Product from "../organisms/Product";
interface IProps {
  loading: any;
  setLoading: any;
  userInfo: any;
  getUserInfo: any;
  offers: any;
  setProduct: any;
  navigation: any;
}

interface IState {
  loadingState: boolean;
  userInfoState: any;
  offersState: any;
}

class Offers extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingState: false,
      userInfoState: undefined,
      offersState: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log(JSON.stringify(nextProps.offers));
    if (!_.isEqual(nextProps.offers, prevState.offersState)) {
      // console.log(JSON.stringify(nextProps.offers));
      return {
        offersState: nextProps.offers,
      };
    }
    return null;
  }

  updateLoading = () => {
    const { loading } = this.props;
    this.props.setLoading(!loading);
  };

  goProduct = (prod: any) => {
    // console.log("setProduct");
    // console.log(JSON.stringify(prod));
    const { setProduct, navigation } = this.props;
    setProduct({ ...prod, isOffer: true });
    navigation.navigate("DetailRT", {
      name: "offers-detail",
      isOffer: true,
    });
  };

  render() {
    const { setProduct } = this.props;
    const { userInfoState, offersState } = this.state;
    // console.log(JSON.stringify(offersState));
    if (undefined === offersState) {
      return (
        <Container style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#2196f3" />
        </Container>
      );
    }
    return (
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          {offersState.success ? (
            <>
              {offersState.data.map((offer: any) => {
                // console.log(JSON.stringify(offer));
                return (
                  <Product
                    key={offer.name}
                    {...offer}
                    setProduct={this.goProduct}
                  />
                );
              })}
            </>
          ) : (
            <Text>{translate("offers-empty")}</Text>
          )}
        </ScrollView>
        <BannerAdApp />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userInfo: getResponseUserInfoSelector(state.user),
  offers: getResponseOffersSelector(state.products),
});

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setLoading: loadingAction,
      getUserInfo: userInfoAction,
      setProduct: productAction,
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
export default connect(mapStateToProps, mapDispatchToProps)(Offers);
