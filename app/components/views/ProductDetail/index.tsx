import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  Button,
  Alert,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { getResponseUserInfoSelector } from "../../../store/user/selectors";
import { getResponseLinkSelector } from "../../../store/native/selectors";
import {
  getContactNumberSelector,
  getProductSelector,
} from "../../../store/products/selectors";
import { userInfoAction } from "../../../store/user/actions";
import { loadingAction } from "../../../store/util/actions";
import { linkAction, responseLinkAction } from "../../../store/native/actions";
import { productAction } from "../../../store/products/actions";
import translate from "../../../services/language";
import Container from "../Container";
import _ from "lodash";
import BannerAdApp from "../organisms/BannerAdApp";

interface IProps {
  loading: any;
  setLoading: any;
  userInfo: any;
  getUserInfo: any;
  productDetails: any;
  product: any;
  linkResponse: any;
  link: any;
  setResponseLink: any;
  navigation: any;
  route: any;
  contactNumber: any;
}

interface IState {
  loadingState: boolean;
  userInfoState: any;
  productState: any;
  linkResponseState: any;
}

class ProductDetail extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingState: false,
      userInfoState: undefined,
      productState: undefined,
      linkResponseState: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log("getDerivedStateFromProps");
    // if (!_.isEqual(nextProps.userInfo, prevState.userInfoState)) {
    //   // console.log(JSON.stringify(nextProps.userInfo.data));
    //   return {
    //     userInfoState: nextProps.userInfo,
    //   };
    // }
    // console.log(JSON.stringify(nextProps.product));
    if (!_.isEqual(nextProps.product, prevState.productState)) {
      // console.log(JSON.stringify(nextProps.product));
      return {
        productState: nextProps.product,
      };
    }
    if (!_.isEqual(nextProps.product, prevState.productState)) {
      // console.log(JSON.stringify(nextProps.product));
      return {
        productState: nextProps.product,
      };
    }
    if (!_.isEqual(nextProps.linkResponse, prevState.linkResponseState)) {
      // console.log(JSON.stringify(nextProps.product));
      if (!nextProps.linkResponse.success) {
        Alert.alert(
          translate("alert-error"),
          translate(nextProps.linkResponse.data.error),
        );
      }
      nextProps.setResponseLink(undefined);
      return {
        linkResponseState: nextProps.linkResponse,
      };
    }
    return null;
  }

  sendMessage = () => {
    const { productState } = this.state;
    const { link, contactNumber } = this.props;
    console.log(contactNumber.data);
    link(
      contactNumber.data,
      translate("detail-product-send-message") +
        productState.name +
        "; " +
        productState.desription,
    );
  };

  render() {
    const { productState } = this.state;
    // console.log(JSON.stringify(this.props.route.params));
    return (
      <>
        <View style={styles.container}>
          <>
            {productState ? (
              <>
                <Image
                  style={styles.productImg}
                  source={{
                    uri: productState.image,
                  }}
                />
                <Text style={{ ...styles.title }}>
                  {translate(productState.name ? productState.name : "")}
                </Text>
                <Text style={styles.price}>
                  ${" "}
                  {translate(productState.price ? productState.price + "" : "")}
                </Text>
                <Text style={styles.description}>
                  {translate(
                    productState.description ? productState.description : "",
                  )}
                </Text>
                <Button
                  title={translate(
                    this.props.route.params.isOffer
                      ? "ask-detail-offer"
                      : "ask-detail-product",
                  )}
                  onPress={this.sendMessage}
                />
              </>
            ) : (
              <Container loadingOverwrite={true}>
                <Text style={{ display: "none" }}>...</Text>
              </Container>
            )}
          </>
        </View>
        <BannerAdApp />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userInfo: getResponseUserInfoSelector(state.user),
  product: getProductSelector(state.products),
  linkResponse: getResponseLinkSelector(state.products),
  contactNumber: getContactNumberSelector(state.products)
});

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setLoading: loadingAction,
      getUserInfo: userInfoAction,
      link: linkAction,
      setResponseLink: responseLinkAction,
    },
    dispatch,
  );
}
const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    marginBottom: 10,
    marginTop: 20,
  },
  name: {
    color: "#5a647d",
    fontWeight: "bold",
    fontSize: 30,
  },
  price: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  productImg: {
    height: 200,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginBottom: 50,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
