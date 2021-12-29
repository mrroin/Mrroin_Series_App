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
import { getResponseCategoriesSelector } from "../../../store/products/selectors";
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
  Categories?: any;
  setProduct?: any;
  navigation?: any;
  isChild?: any;
}

interface IState {
  loadingState: boolean;
  userInfoState: any;
  categoriesState: any;
}

class Categories extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingState: false,
      userInfoState: undefined,
      categoriesState: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log(JSON.stringify(nextProps.Categories));
    if (!_.isEqual(nextProps.categories, prevState.categoriesState)) {
      // console.log(JSON.stringify(nextProps.Categories));
      return {
        categoriesState: nextProps.categories,
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
    // setProduct(prod);
    navigation.navigate("ProductsRT");
  };

  render() {
    const { isChild } = this.props;
    const { userInfoState, categoriesState } = this.state;
    // console.log(JSON.stringify(categoriesState));
    if (undefined === categoriesState) {
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
            {categoriesState.success ? (
              <>
                {categoriesState.data.map((offer: any) => {
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
              <Text>{translate("Categories-empty")}</Text>
            )}
          </>
        ) : (
          <SafeAreaView>
            <ScrollView style={styles.scrollView}>
              {categoriesState.success ? (
                <>
                  {categoriesState.data.map((offer: any) => {
                    // console.log(JSON.stringify(offer));
                    return (
                      <Product
                        key={offer.name}
                        {...offer}
                        setProduct={this.goProduct}
                        isCategory
                      />
                    );
                  })}
                </>
              ) : (
                <Text>{translate("Categories-empty")}</Text>
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
  categories: getResponseCategoriesSelector(state.products),
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
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
