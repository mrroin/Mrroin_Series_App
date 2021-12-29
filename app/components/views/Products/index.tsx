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
import { getResponseProductsSelector } from "../../../store/products/selectors";
import { userInfoAction } from "../../../store/user/actions";
import { loadingAction } from "../../../store/util/actions";
import { productAction } from "../../../store/products/actions";
import translate from "../../../services/language";
import BannerAdApp from "../organisms/BannerAdApp";
import Container from "../Container";
import _ from "lodash";
import Product from "../organisms/Product";

interface IProps {
  loading?: any;
  setLoading?: any;
  userInfo?: any;
  getUserInfo?: any;
  products?: any;
  setProduct?: any;
  navigation?: any;
  isChild?: any;
}

interface IState {
  loadingState: boolean;
  userInfoState: any;
  productsState: any;
}

class Products extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingState: false,
      userInfoState: undefined,
      productsState: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log(JSON.stringify(nextProps.Products));
    if (!_.isEqual(nextProps.products, prevState.productsState)) {
      // console.log(JSON.stringify(nextProps.Products));
      return {
        productsState: nextProps.products,
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
    setProduct(prod);
    navigation.navigate("DetailRT", {
      name: "product-detail",
    });
  };

  render() {
    const { isChild } = this.props;
    const { userInfoState, productsState } = this.state;
    // console.log(JSON.stringify(productsState));
    if (undefined === productsState) {
      return (
        <Container style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#2196f3" />
        </Container>
      );
    }
    return (
      <>
        {isChild ? (
          <>
            {productsState.success ? (
              <>
                {productsState.data.map((offer: any) => {
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
              <Text>{translate("products-empty")}</Text>
            )}
          </>
        ) : (
          <SafeAreaView>
            <ScrollView style={styles.scrollView}>
              {productsState.success ? (
                <>
                  {productsState.data.map((offer: any) => {
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
                <Text>{translate("products-empty")}</Text>
              )}
            </ScrollView>
            <BannerAdApp />
          </SafeAreaView>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userInfo: getResponseUserInfoSelector(state.user),
  products: getResponseProductsSelector(state.products),
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
export default connect(mapStateToProps, mapDispatchToProps)(Products);
