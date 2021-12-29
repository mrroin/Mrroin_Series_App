import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Button,
  Alert,
  TouchableHighlight,
} from "react-native";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { getLoadingSelector } from "../../../store/util/selectors";
import { getResponseSingInSelector } from "../../../store/user/selectors";
import { signInAction } from "../../../store/user/actions";
import translate from "../../../services/language";
import Container from "../Container";
import _ from "lodash";
import { StackActions } from "@react-navigation/native";

interface IProps {
  loading: any;
  setLoading: any;
  responseSingIn: any;
  navigation: any;
  signIn: any;
}

interface IState {
  loadingState: boolean;
}

class Login extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingState: false,
    };
  }

  componentDidUpdate(prevProps: any) {
    const { responseSingIn, navigation } = this.props;
    if (!_.isEqual(prevProps.responseSingIn, responseSingIn)) {
      if (responseSingIn.success) {
        // console.log("logueado");
        navigation.dispatch(StackActions.replace("HomeRT"));
      } else {
        Alert.alert(
          translate("login-error"),
          translate(responseSingIn.data.error),
        );
      }
    }
  }

  render() {
    const { responseSingIn, signIn } = this.props;
    // console.log(JSON.stringify(responseSingIn));
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Container style={styles.container}>
          <GoogleSigninButton
            style={styles.signInButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => signIn()}
          />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loading: getLoadingSelector(state.util),
  responseSingIn: getResponseSingInSelector(state.user),
});

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      signIn: signInAction,
    },
    dispatch,
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButton: {
    width: 192,
    height: 48,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
