import { setUseProxies } from "immer";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { Image, ScrollView, View, TouchableOpacity, Alert } from "react-native";
import translate from "../../../../services/language";

interface IProps {
  infoCompany: any;
  openMap: any;
}

class Company extends React.Component<IProps> {
  render() {
    const { infoCompany, openMap } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {translate(infoCompany.name ? infoCompany.name : "")}
          </Text>
        </View>

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>
            {translate(infoCompany.sentence ? infoCompany.sentence : "")}
          </Text>

          <Text style={styles.postDescription}>
            {translate(infoCompany.description ? infoCompany.description : "")}
          </Text>

          <Text style={styles.tags}>
            {translate(infoCompany.tags ? infoCompany.tags : "")}
          </Text>

          <Text style={styles.date}>
            {translate(infoCompany.address ? infoCompany.address : "")}
          </Text>

          <View style={styles.profile}>
            <Image
              style={styles.avatar}
              source={{
                uri: infoCompany.logo,
              }}
            />
            <Text style={styles.name}>
              {translate(infoCompany.name ? infoCompany.name : "")}
            </Text>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={openMap}>
            <Text style={styles.shareButtonText}>
              {translate("how-to-get")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.products}>
          <Text style={styles.productslabel}>
            {translate("see-more-products")}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#00BFFF",
  },
  products: {
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  productslabel: {
    fontSize: 15,
    color: "#00BFFF",
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  name2: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  postContent: {
    flex: 1,
    padding: 15,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: "600",
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  tags: {
    color: "#00BFFF",
    marginTop: 10,
  },
  date: {
    color: "#696969",
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#00BFFF",
  },
  profile: {
    flexDirection: "row",
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    color: "#00BFFF",
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: 10,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default Company;
