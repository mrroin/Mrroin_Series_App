import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableHighlight,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { getLoadingSelector } from "../../../store/util/selectors";
import { loadingAction } from "../../../store/util/actions";
// import Spinner from "react-native-loading-spinner-overlay";
import translate from "../../../services/language";

const Container = styled.View`
  flex: 1;
  /* add this */
  background: ${(props: any) => props.theme.backgroundAlt};
  align-items: center;
  justify-content: center;
`;
interface IProps {
  loading?: any;
  loadingOverwrite?: any;
  style?: any;
  children: any;
}
class ContainerScreen extends Component<IProps> {
  render() {
    const { loading, style, loadingOverwrite } = this.props;
    return (
      <Container
        style={
          loading || loadingOverwrite
            ? styles.spinnerTextStyle
            : style
            ? style
            : styles.container
        }
      >
        {/* <Spinner
          visible={loading}
          textContent={translate("LOADING")}
          textStyle={styles.spinnerTextStyle}
        /> */}
        <>
          {loading || loadingOverwrite ? (
            <View style={styles.loading}>
              <ActivityIndicator />
            </View>
          ) : null}
        </>
        {this.props.children}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loading: getLoadingSelector(state.util),
});

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setLoading: loadingAction,
    },
    dispatch,
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    zIndex: 1,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ContainerScreen);
