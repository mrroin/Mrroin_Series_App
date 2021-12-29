import React, { Component } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { getResponseUserInfoSelector } from "../../../store/user/selectors";
import { userInfoAction } from "../../../store/user/actions";
import ActionBarImage from "../organisms/ActionBarImage";
import _ from "lodash";
import { StackActions } from "@react-navigation/native";

interface IProps {
  loading?: any;
  setLoading?: any;
  getUserInfo?: any;
  userInfo?: any;
  navigation?: any;
}

interface IState {
  loadingState: boolean;
  userInfoState: any;
}

class BarUser extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingState: false,
      userInfoState: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log("getDerivedStateFromProps");
    if (!_.isEqual(nextProps.userInfo, prevState.userInfoState)) {
      return {
        userInfoState: nextProps.userInfo,
      };
    }
    return null;
  }

  render() {
    const { userInfo } = this.props;
    // console.log(userInfo.data.user.photo);
    return (
      <ActionBarImage
        photo={
          userInfo && userInfo.data && userInfo.data.user && userInfo.data.user
            ? userInfo.data.user.photo
            : null
        }
      />
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
export default connect(mapStateToProps, mapDispatchToProps)(BarUser);
