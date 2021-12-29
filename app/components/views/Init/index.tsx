import React, { Component } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { getResponseUserInfoSelector } from "../../../store/user/selectors";
import { userInfoAction } from "../../../store/user/actions";
import Container from "../Container";
import _ from "lodash";
import { StackActions } from "@react-navigation/native";

interface IProps {
  loading: any;
  setLoading: any;
  getUserInfo: any;
  userInfo: any;
  navigation: any;
}

interface IState {
  loadingState: boolean;
  userInfoState: any;
}

class Home extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingState: false,
      userInfoState: undefined,
    };
  }

  componentDidMount() {
    // console.log("get profile");
    const { getUserInfo } = this.props;
    getUserInfo();
  }
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log("getDerivedStateFromProps");
    if (!_.isEqual(nextProps.userInfo, prevState.userInfoState)) {
      // console.log("userInfo");
      // console.log(JSON.stringify(prevState.userInfoState));
      // console.log(JSON.stringify(nextProps.userInfo));
      return {
        userInfoState: nextProps.userInfo,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { userInfo, navigation } = this.props;
    const { userInfoState } = this.state;
    if (!_.isEqual(prevState.userInfoState, userInfoState)) {
      // console.log("aqui hacer algo");
      if (userInfoState && userInfoState.success) {
        navigation.dispatch(StackActions.replace("HomeRT"));
      } else {
        navigation.dispatch(StackActions.replace("LoginRT"));
      }
    } else if(userInfo) {
      navigation.dispatch(StackActions.replace("HomeRT"));
    }
  }

  render() {
    const { userInfo } = this.props;
    return (
      <Container style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#2196f3" />
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userInfo: getResponseUserInfoSelector(state.user),
});

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      getUserInfo: userInfoAction,
    },
    dispatch,
  );
}
const styles = StyleSheet.create({
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
